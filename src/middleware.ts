import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block the diagnostic endpoint in production
  if (pathname === "/api/sheets-test") {
    const token = request.headers.get("x-debug-token");
    if (token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/sheets-test"],
};
