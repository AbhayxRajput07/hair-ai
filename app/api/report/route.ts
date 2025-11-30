// app/api/report/route.ts
import { NextResponse } from "next/server";
import ScanReport from "@/lib/models/ScanReport";
import { connectToDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();

    const reports = await ScanReport.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json(reports, { status: 200 });
  } catch (err: any) {
    console.error("Get reports error:", err);
    // 👉 DEBUG ke liye actual error client ko bhej rahe hain
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
