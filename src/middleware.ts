import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookies = request.cookies.getAll();
  let signInToken = null;

  cookies.map((cookie) => {
    /* Dev and prod environments both have different names for the token cookie so this is essential */
    if (cookie.name.includes('.session-token')) {
      signInToken = cookie.value;
    }
  });

  if (path === '/sign-in') {
    if (signInToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/timer';
      return NextResponse.redirect(url.href);
    }
  }
  return;
}

export const config = {
  matcher: ['/sign-in'],
};
