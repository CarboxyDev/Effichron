import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookies = request.cookies.getAll();
  const url = request.nextUrl.clone();
  let signInToken = null;

  cookies.map((cookie) => {
    /* Dev and prod environments both have different names for the token cookie so this is essential */
    if (cookie.name.includes('.session-token')) {
      signInToken = cookie.value;
    }
  });

  if (path === '/sign-in') {
    if (signInToken) {
      url.pathname = '/timer';
      return NextResponse.redirect(url.href);
    }
  }

  if (path === '/admin') {
    const searchPassword = request.nextUrl.searchParams.get('password');
    if (searchPassword !== process.env.ADMIN_PASSWORD) {
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url.href);
    }
    console.info('[!] Admin interface was accessed');
  }

  return;
}

export const config = {
  matcher: ['/sign-in', '/admin'],
};
