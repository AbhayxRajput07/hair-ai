// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export const runtime = "nodejs";

export async function GET() {
  try {
    // 👇 NEW: cookies() ko await karo
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value as string | undefined;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Me API error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
