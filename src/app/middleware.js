import { NextResponse } from "next/server";

export function middleware(request) {
  const nextUrl = request.nextUrl;
  if (nextUrl.pathname === "/") {
    if (request.cookies.auth) {
      return NextResponse.rewrite(new URL("/services", request.url));
    }
  }
}
