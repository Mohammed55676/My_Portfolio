import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value

  // Validate the signature and expiry — not just the presence of a cookie.
  if (!(await verifySession(token))) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true })
}
