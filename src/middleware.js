import { NextResponse } from "next/server";

export function middleware(request) {
  const nextUrl = request.nextUrl;
  if (nextUrl.pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/", request.url), 308);
    response.cookies.delete("auth");
    return response;
  }
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
