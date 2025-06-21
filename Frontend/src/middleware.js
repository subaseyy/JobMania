import { NextResponse } from "next/server";

export function middleware(request) {
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;

  console.log("MIDDLEWARE IS RUNNING", pathname, "role:", role);

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/company");

  if (isProtected && !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/user") && role !== "jobseeker") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/company") && role !== "company") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/company/:path*"],
};
