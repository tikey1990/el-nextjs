import { NextResponse } from "next/server";

export function middleware(request) {
  const nextUrl = request.nextUrl;
  if (nextUrl.pathname === "/logout") {
    const response = NextResponse.rewrite(new URL("/", request.url), {
      headers: { "x-middleware-cache": "no-cache" },
    });
    response.cookies.set("auth", "", {
      expires: new Date(0),
      path: "/",
      domain: ".easyliker.ru",
    });
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
