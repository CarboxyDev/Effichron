import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return;
}

export const config = {
  matcher: '/',
};
