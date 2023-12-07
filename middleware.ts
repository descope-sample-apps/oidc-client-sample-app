import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  let access_token = request.cookies.get('access_token')?.value;

  // In production you should validate the access token here (signature, etc).
  // We simply check the expiration date

  if (pathName === '/' && access_token && !isJwtExpired(access_token)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (pathName === '/dashboard' && (!access_token || isJwtExpired(access_token))) {
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

const isJwtExpired = (token: string) => {
    if (typeof token !== 'string' || !token) throw Error('Invalid token provided')
    const { exp } = jwtDecode(token);
    const currentTime = new Date().getTime() / 1000;
    return exp && exp < currentTime;
}