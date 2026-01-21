import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/register');
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/movies');

    // If trying to access movies without a token, redirect to login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If trying to access login/register with a token, redirect to movies list
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/movies', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/movies/:path*', '/login', '/register'],
};
