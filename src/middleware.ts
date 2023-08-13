import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === '/sign-in') {
    const token = request.cookies.get('next-auth.session-token'); // User always has token if signed in
    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url.href);
    }
  }
  return;
}

export const config = {
  matcher: ['/sign-in'],
};
