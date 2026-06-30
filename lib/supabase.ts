import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Server-only secret (service_role) key. MUST NOT be prefixed with NEXT_PUBLIC_,
// so Next.js never inlines it into the browser bundle.
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

// Public, browser-safe client. Used for READS only (RLS allows public SELECT).
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

// Server-only client used for WRITES (create/update/delete) inside API routes.
// The service_role key bypasses RLS, so mutations work even though the public
// key is read-only. This must never be imported by client components — only the
// API routes / lib/db.ts (server) use it, and the key is not exposed to the browser.
// Falls back to the anon client if the secret key isn't configured, in which case
// writes will fail with a clear RLS error instead of silently using elevated access.
export const supabaseAdmin = supabaseUrl && supabaseSecretKey
  ? createClient(supabaseUrl, supabaseSecretKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : supabase

// True when the server-only secret key is configured (writes will work).
export const isAdminConfigured = Boolean(supabaseUrl && supabaseSecretKey)
