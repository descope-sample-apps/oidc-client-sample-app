import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  let access_token = request.cookies.get('access_token')?.value;

  // In production you should validate the access token here.

  if (pathName === '/' && access_token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (pathName === '/dashboard' && !access_token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next();
}
 
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
      ],
}