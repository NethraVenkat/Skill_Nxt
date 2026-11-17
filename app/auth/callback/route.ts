import { NextResponse } from "next/server.js";

export async function GET() {
  return NextResponse.redirect(new URL("/hq", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
}
