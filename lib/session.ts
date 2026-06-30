// Signed, expiring session tokens for the admin panel.
// Uses Web Crypto (HMAC-SHA256) so it runs in both the Node and Edge runtimes
// (route handlers AND middleware). No external dependencies.

const encoder = new TextEncoder()
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

function getSecret(): string {
  // Prefer a dedicated secret; fall back to the admin password so the app still
  // works if only ADMIN_PASSWORD is set. Set ADMIN_SECRET in production.
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD_HASH ||
    process.env.ADMIN_PASSWORD ||
    'insecure-dev-secret-change-me'
  )
}

function toBase64Url(bytes: Uint8Array): string {
  let str = ''
  bytes.forEach((b) => {
    str += String.fromCharCode(b)
  })
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(input: string): Uint8Array {
  let s = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0
  s += '='.repeat(pad)
  const bin = atob(s)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return toBase64Url(new Uint8Array(sig))
}

// Constant-time string comparison
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function signSession(ttlMs: number = DEFAULT_TTL_MS): Promise<string> {
  const payload = toBase64Url(encoder.encode(JSON.stringify({ exp: Date.now() + ttlMs })))
  const sig = await hmac(payload)
  return `${payload}.${sig}`
}

export async function verifySession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false

  const expected = await hmac(payload)
  if (!safeEqual(sig, expected)) return false

  try {
    const data = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)))
    return typeof data.exp === 'number' && data.exp > Date.now()
  } catch {
    return false
  }
}
