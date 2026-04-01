import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // 1. Truy cập vào /admin, điều hướng sang /admin/login
    if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 2. Logic Check Auth sau này:
    // if (pathname.startsWith('/admin') && !hasToken) {
    //    return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    // Giới hạn middleware chỉ chạy khi vào các route admin
    matcher: ['/admin/:path*'],
};