// app/api/hair-assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { HairAssistantResult } from "@/app/types/hair-assistant";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const message = (formData.get("message") as string) || "";
    const imageFile = formData.get("image");

    if (!message && !imageFile) {
      return NextResponse.json(
        { error: "Please provide text, image, or both." },
        { status: 400 }
      );
    }

    // build messages
    const systemPrompt =
      "You are an expert hair & scalp wellness assistant. " +
      "User will send text about their hair issues and may also upload a photo. " +
      "You MUST reply ONLY as a single JSON object with this exact shape: " +
      "{ summary: string, hair_type: string, scalp_condition: string, severity_score: number (0-10), " +
      "issues: string[], recommended_routine: { morning: string[], night: string[], weekly: string[] }, " +
      "meal_suggestions: string[], lifestyle_tips: string[] }. " +
      "No extra text, no explanations outside JSON.";

    const userContent: any[] = [];

    if (message) {
      userContent.push({
        type: "text",
        text:
          "User description of their hair & scalp:\n" +
          message +
          "\n\nUse this + image (if provided) to generate the JSON structure.",
      });
    }

    if (imageFile && imageFile instanceof File) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${imageFile.type || "image/jpeg"};base64,${base64}`;

      userContent.push({
        type: "image_url",
        image_url: { url: dataUrl },
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(raw as string);

    const result: HairAssistantResult = {
      summary: parsed.summary || "",
      hair_type: parsed.hair_type || "",
      scalp_condition: parsed.scalp_condition || "",
      severity_score:
        typeof parsed.severity_score === "number"
          ? parsed.severity_score
          : 0,
      issues: Array.isArray(parsed.issues) ? parsed.issues : [],
      recommended_routine: {
        morning:
          parsed.recommended_routine?.morning &&
          Array.isArray(parsed.recommended_routine.morning)
            ? parsed.recommended_routine.morning
            : [],
        night:
          parsed.recommended_routine?.night &&
          Array.isArray(parsed.recommended_routine.night)
            ? parsed.recommended_routine.night
            : [],
        weekly:
          parsed.recommended_routine?.weekly &&
          Array.isArray(parsed.recommended_routine.weekly)
            ? parsed.recommended_routine.weekly
            : [],
      },
      meal_suggestions: Array.isArray(parsed.meal_suggestions)
        ? parsed.meal_suggestions
        : [],
      lifestyle_tips: Array.isArray(parsed.lifestyle_tips)
        ? parsed.lifestyle_tips
        : [],
    };

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    console.error("Hair assistant error:", err);
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
