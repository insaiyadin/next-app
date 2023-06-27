import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Hitting get session");
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
