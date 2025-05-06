// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdmin = request.nextUrl.pathname.startsWith('/admin')
  const token = request.cookies.get('sb-access-token')?.value

  if (isAdmin && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
