"use client";

import { useEffect, useState } from "react";

interface ReportData {
  scalpType: string;
  hairFall: string;
  goal: string;
  styling: string;
  scanResult: string;
}

export default function ReportPage() {
  const [data, setData] = useState<ReportData>({
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
      scalpType: localStorage.getItem("hairQuizScalpType") || "",
      hairFall: localStorage.getItem("hairQuizHairFall") || "",
      goal: localStorage.getItem("hairQuizGoal") || "",
      styling: localStorage.getItem("hairQuizStyling") || "",
      scanResult: localStorage.getItem("hairScanResult") || "",
    });
  }, []);

  async function handleSave() {
    setSaveMessage(null);

    if (!data.scalpType && !data.scanResult) {
      setSaveMessage("Please complete quiz and scan to generate your report.");
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
        body: JSON.stringify({ email, ...data }),
      });

      const json = await res.json();

      setSaveMessage(
        json.success
          ? "Report saved successfully to your account."
          : "Failed to save report."
      );
    } catch {
      setSaveMessage("Error while saving report.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-[#0b1020] via-[#07090f] to-black text-white px-4">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="block">Your Hair</span>
            <span className="block bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] bg-clip-text text-transparent">
              Wellness Report
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This report is generated using your quiz answers and hair scan.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] text-black font-semibold shadow-xl hover:scale-105 transition disabled:opacity-50"
          >
            {saving ? "Saving Report..." : "Save Report"}
          </button>
        </div>

        {saveMessage && (
          <p className="text-center text-sm text-gray-400">{saveMessage}</p>
        )}

        {/* Profile Summary */}
        <section>
          <h2 className="text-2xl font-bold mb-6">📋 Your Hair Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["Scalp Type", data.scalpType],
              ["Hair Fall", data.hairFall],
              ["Goal", data.goal],
              ["Heat Styling", data.styling],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
              >
                <p className="text-xs text-gray-400">{label}</p>
                <p className="font-semibold capitalize">
                  {value || "Not available"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Scan Result */}
        <section>
          <h2 className="text-2xl font-bold mb-4">📷 Scan Analysis</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 text-sm leading-relaxed">
            {data.scanResult || "No scan analysis available yet."}
          </div>
        </section>

        {/* Smart Insights */}
        <section>
          <h2 className="text-2xl font-bold mb-4">💡 Key Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Scalp & Hair Care</h3>
              <p className="text-gray-300 text-sm">
                Based on your scalp type and hair fall level, follow a gentle
                routine with minimal heat and consistent nourishment.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Lifestyle Impact</h3>
              <p className="text-gray-300 text-sm">
                Sleep, stress, diet and styling habits directly affect your hair
                growth cycle. Consistency is more important than perfection.
              </p>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            ✅ Recommended Next Steps
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-gray-300 space-y-2">
            <p>• Follow your personalised Routine daily.</p>
            <p>• Use Meal Plan for internal nourishment.</p>
            <p>• Avoid harsh shampoos and frequent heat.</p>
            <p>• Re-scan every 3–4 weeks to track progress.</p>
          </div>

          <p className="text-xs text-gray-500 mt-6 text-center">
            This report is for general wellness only. For medical conditions,
            consult a dermatologist.
          </p>
        </section>
      </div>
    </div>
  );
}
