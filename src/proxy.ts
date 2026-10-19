import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host')?.split(':')[0]; // strip port if any

  // 1. Canonical Domain & Legacy 301 Redirects:
  // Redirect www.henoticdiagnostics.co.in, henoticdiagnostics.com, www.henoticdiagnostics.com
  // to the canonical https://henoticdiagnostics.co.in
  if (
    host === 'www.henoticdiagnostics.co.in' ||
    host === 'henoticdiagnostics.com' ||
    host === 'www.henoticdiagnostics.com'
  ) {
    url.host = 'henoticdiagnostics.co.in';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // 2. Pass request with Security Headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|sitemap/).*)',
  ],
};
