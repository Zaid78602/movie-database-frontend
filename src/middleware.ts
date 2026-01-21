import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
    const isProtectedRoute = pathname.startsWith('/movies');
    const isRoot = pathname === '/';

    // 1. Handle Root Path (/)
    if (isRoot) {
        if (token) {
            return NextResponse.redirect(new URL('/movies', request.url));
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. If trying to access movies without a token, redirect to login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. If trying to access login/register with a token, redirect to movies list
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/movies', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/movies/:path*', '/login', '/register'],
};
