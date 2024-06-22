import { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

export default middleware(async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("req.nextUrl. middleware >>>", req.nextUrl.pathname);

  if (!req.auth) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (req.auth?.user) {
    if (pathname === "/login" || pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/user/:path*"],
};
