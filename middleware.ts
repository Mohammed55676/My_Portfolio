import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'

// Endpoints that must stay reachable without a valid admin session.
const PUBLIC_PATHS = new Set([
  '/api/admin/login',
  '/api/admin/logout',
  '/api/contact',
])

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

// Centrally protect every mutating API request. This is the real auth gate:
// the signed `admin_token` cookie is validated here (not just checked for
// existence), so forged cookies are rejected before reaching any route handler.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (MUTATING_METHODS.has(request.method) && pathname.startsWith('/api/')) {
    if (PUBLIC_PATHS.has(pathname)) {
      return NextResponse.next()
    }

    const token = request.cookies.get('admin_token')?.value
    if (!(await verifySession(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
