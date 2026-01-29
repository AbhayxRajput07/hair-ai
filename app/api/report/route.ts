// app/api/report/route.ts
import { NextResponse } from "next/server";
import ScanReport from "@/lib/models/ScanReport";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

/* ======================
   POST → Generate Report
====================== */
export async function POST(req: Request) {
  try {
    await connectDB();

    // frontend se image/url future me aayega
    const body = await req.json().catch(() => ({}));

    const report = await ScanReport.create({
      userId: "guest",
      imageUrl: body.imageUrl || "",
      hairType: "Normal",
      scalpHealth: "Healthy",
      issues: [
        "Mild hair fall",
        "Dry scalp"
      ],
      recommendations: [
        "Use mild shampoo",
        "Oil massage twice a week",
        "Increase water intake"
      ],
    });

    return NextResponse.json(
      { success: true, report },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST /api/report error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

/* ======================
   GET → Fetch Reports
====================== */
export async function GET() {
  try {
    await connectDB();

    const reports = await ScanReport.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json(reports, { status: 200 });
  } catch (err: any) {
    console.error("GET /api/report error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
