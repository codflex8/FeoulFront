import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");
  if (!token) {
    return NextResponse.redirect(new URL("/ar/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/ar/dashboard/:path*"], 
};
