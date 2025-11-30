// app/api/analyze-hair/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { connectToDatabase } from "@/lib/mongodb";
import ScanReport from "@/lib/models/ScanReport";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // image → base64 → data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type || "image/jpeg"};base64,${base64}`;

    // OpenAI se hair analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a hair & scalp health expert. Reply ONLY with valid JSON.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Analyze this hair/scalp image. Return JSON with keys: " +
                "hairType (string), scalpHealth (string), " +
                "issues (string[]), recommendations (string[]).",
            },
            {
              type: "image_url",
              image_url: { url: dataUrl },
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "AI returned empty response" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(raw as string);

    const result = {
      hairType: parsed.hairType || "Unknown",
      scalpHealth: parsed.scalpHealth || "Unknown",
      issues: Array.isArray(parsed.issues) ? parsed.issues : [],
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations
        : [],
    };

    // DB me SAVE
    const doc = await ScanReport.create(result);

    return NextResponse.json(
      {
        _id: doc._id,
        ...result,
        createdAt: doc.createdAt,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Analyze hair error:", err);
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
