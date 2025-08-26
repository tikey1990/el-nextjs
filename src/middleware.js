import { NextResponse } from "next/server";

export function middleware(request) {
  const nextUrl = request.nextUrl;
  if (request.cookies.get("auth")?.value) {
    if (
      nextUrl.pathname === "/" ||
      nextUrl.pathname === "/auth" ||
      nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/services", request.url));
    }
  }
}
