import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname;
  // console.log(path);

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || null;

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // matcher: ["/offrs", "/login", "/signup", "/mess-bill/:path*"],
  matcher: [],
};
