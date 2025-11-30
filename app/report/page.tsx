"use client";

import { useEffect, useState } from "react";

interface ReportData {
  quizSummary: string;
  scalpType: string;
  hairFall: string;
  goal: string;
  styling: string;
  scanResult: string;
}

export default function ReportPage() {
  const [data, setData] = useState<ReportData>({
    quizSummary: "",
    scalpType: "",
    hairFall: "",
    goal: "",
    styling: "",
    scanResult: "",
  });

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setData({
      quizSummary: localStorage.getItem("hairQuizSummary") || "",
      scalpType: localStorage.getItem("hairQuizScalpType") || "",
      hairFall: localStorage.getItem("hairQuizHairFall") || "",
      goal: localStorage.getItem("hairQuizGoal") || "",
      styling: localStorage.getItem("hairQuizStyling") || "",
      scanResult: localStorage.getItem("hairScanResult") || "",
    });
  }, []);

  async function handleSave() {
    setSaveMessage(null);

    if (!data.quizSummary && !data.scanResult) {
      setSaveMessage("Please complete quiz and scan before saving your report.");
      return;
    }

    setSaving(true);

    try {
      const email =
        typeof window !== "undefined"
          ? localStorage.getItem("hairUserEmail")
          : "";

      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          scalpType: data.scalpType,
          hairFall: data.hairFall,
          goal: data.goal,
          styling: data.styling,
          quizSummary: data.quizSummary,
          scanResult: data.scanResult,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setSaveMessage("Report saved successfully to your account!");
      } else {
        setSaveMessage("Failed to save report. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setSaveMessage("Error while saving report.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
          Your Hair Wellness Report
        </h1>

        {/* Save button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Report to My Account"}
          </button>
        </div>
        {saveMessage && (
          <p className="text-center text-sm text-gray-700 mb-4">
            {saveMessage}
          </p>
        )}

        {/* Quiz Summary */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">📋 Quiz Summary</h2>

          <div className="bg-gray-100 p-4 rounded-xl space-y-1 text-sm md:text-base">
            <p>
              <strong>Scalp Type:</strong>{" "}
              {data.scalpType || "Not answered yet"}
            </p>
            <p>
              <strong>Hair Fall Level:</strong>{" "}
              {data.hairFall || "Not answered yet"}
            </p>
            <p>
              <strong>Main Goal:</strong> {data.goal || "Not answered yet"}
            </p>
            <p>
              <strong>Heat Styling:</strong>{" "}
              {data.styling || "Not answered yet"}
            </p>
          </div>

          <div className="mt-3 bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {data.quizSummary || "No quiz summary available yet."}
            </p>
          </div>
        </section>

        {/* Scan Summary */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">📷 Scan Analysis</h2>
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {data.scanResult || "No scan analysis done yet."}
            </p>
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            💡 General Recommendations
          </h2>
          <div className="bg-gray-100 p-4 rounded-xl space-y-2 text-gray-700 text-sm md:text-base">
            <p>• Avoid harsh shampoos — use gentle sulfate-free ones.</p>
            <p>• Oil your scalp 1–2 times a week with coconut or almond oil.</p>
            <p>• Use conditioner/mask mainly on mid-lengths and ends.</p>
            <p>• Avoid daily heat styling; always use a heat protectant.</p>
            <p>• Maintain a protein-rich diet (dal, paneer, eggs, nuts).</p>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            This report is for general wellness only, not a medical diagnosis.
            Please consult a dermatologist for serious hair or scalp issues.
          </p>
        </section>
      </div>
    </div>
  );
}
