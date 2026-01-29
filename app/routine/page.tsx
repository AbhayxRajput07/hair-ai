"use client";

import { useEffect, useState } from "react";

interface RoutineData {
  scalpType: string;
  hairFall: string;
  goal: string;
  styling: string;
}

export default function RoutinePage() {
  const [data, setData] = useState<RoutineData>({
    scalpType: "",
    hairFall: "",
    goal: "",
    styling: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    setData({
      scalpType: localStorage.getItem("hairQuizScalpType") || "",
      hairFall: localStorage.getItem("hairQuizHairFall") || "",
      goal: localStorage.getItem("hairQuizGoal") || "",
      styling: localStorage.getItem("hairQuizStyling") || "",
    });
  }, []);

  const scalpLine =
    data.scalpType === "oily"
      ? "Gentle shampoo 2–3× weekly. Avoid heavy oils on scalp."
      : data.scalpType === "dry"
      ? "Hydrating shampoo 1–2× weekly. Light oil before wash."
      : data.scalpType === "combination"
      ? "Clean roots, nourish lengths only."
      : data.scalpType === "normal"
      ? "Maintain balance with mild shampoo."
      : "Take the quiz to personalise scalp care.";

  const hairFallLine =
    data.hairFall === "moderate" || data.hairFall === "heavy"
      ? "Be gentle, avoid tight styles, focus on protein & iron."
      : data.hairFall === "light"
      ? "Light shedding — maintain routine."
      : data.hairFall === "none"
      ? "Minimal hair fall — keep it consistent."
      : "Quiz required for hair fall routine.";

  const goalLine =
    data.goal === "dandruff"
      ? "Anti-dandruff shampoo 1–2× weekly."
      : data.goal === "growth"
      ? "Scalp massage, protein diet, proper sleep."
      : data.goal === "shine"
      ? "Serum on lengths, avoid overwashing."
      : data.goal === "strength"
      ? "Protein treatments, gentle handling."
      : "Choose a goal in quiz.";

  const stylingLine =
    data.styling === "daily"
      ? "Reduce heat; always use heat protectant."
      : data.styling === "often"
      ? "Prefer heat-free styles when possible."
      : data.styling === "sometimes"
      ? "Occasional heat is fine with protection."
      : data.styling === "never"
      ? "Great! Minimal heat damage."
      : "Answer styling question in quiz.";

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-[#0b1020] via-[#07090f] to-black text-white px-4">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="block">Your Hair</span>
            <span className="block bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] bg-clip-text text-transparent">
              Daily Routine
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Auto-generated from your quiz answers. Follow daily for visible
            improvement.
          </p>
        </div>

        {/* Profile Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["Scalp", data.scalpType],
            ["Hair Fall", data.hairFall],
            ["Goal", data.goal],
            ["Heat", data.styling],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
            >
              <p className="text-xs text-gray-400">{label}</p>
              <p className="font-semibold capitalize">
                {value || "Not set"}
              </p>
            </div>
          ))}
        </div>

        {/* Daily Routine */}
        <section>
          <h2 className="text-2xl font-bold mb-6">🌞 Daily Routine</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="font-semibold text-lg">Morning</h3>
              <p className="text-gray-300 text-sm">
                Keep hair loosely tied. Use light serum on lengths only.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Scalp:</strong> {scalpLine}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="font-semibold text-lg">Night</h3>
              <p className="text-gray-300 text-sm">
                Gently comb, loose braid/bun, soft pillow cover.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Hair fall care:</strong> {hairFallLine}
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Routine */}
        <section>
          <h2 className="text-2xl font-bold mb-6">📅 Weekly Routine</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="font-semibold text-lg">Wash & Oil</h3>
              <p className="text-gray-300 text-sm">
                Oil scalp 1–2× weekly before wash. Mild shampoo on scalp only.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Goal based:</strong> {goalLine}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="font-semibold text-lg">Styling Care</h3>
              <p className="text-gray-400 text-sm">
                {stylingLine}
              </p>
            </div>
          </div>
        </section>

        {/* Extra Tips */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">✨ Extra Tips</h2>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• Stay hydrated for scalp health</li>
            <li>• Follow Meal Plans for faster results</li>
            <li>• Track progress every 2–4 weeks using AI Scan</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            General wellness guidance. Consult a dermatologist for medical issues.
          </p>
        </section>
      </div>
    </div>
  );
}
