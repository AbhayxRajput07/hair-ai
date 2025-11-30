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
      ? "Use a gentle, sulfate-free shampoo 2–3× week. Avoid heavy oils on scalp."
      : data.scalpType === "dry"
      ? "Use hydrating shampoo 1–2× week. Oil scalp lightly before wash."
      : data.scalpType === "combination"
      ? "Shampoo roots regularly, but keep conditioner/mask on lengths only."
      : data.scalpType === "normal"
      ? "Mild shampoo 2× week is enough. Focus on maintaining balance."
      : "First take the quiz to get a better routine.";

  const hairFallLine =
    data.hairFall === "moderate" || data.hairFall === "heavy"
      ? "Be extra gentle while combing, avoid tight hairstyles, and ensure protein + iron in diet."
      : data.hairFall === "light"
      ? "Normal light hair fall — keep a healthy routine and avoid stress."
      : data.hairFall === "none"
      ? "Hair fall looks minimal. Maintain your routine and avoid harsh changes."
      : "Take the quiz so we can understand your hair fall level.";

  const goalLine =
    data.goal === "dandruff"
      ? "Use anti-dandruff shampoo 1–2× week and keep scalp clean and dry."
      : data.goal === "growth"
      ? "Regular scalp massage, good sleep, and protein-rich food will support growth."
      : data.goal === "shine"
      ? "Use serum on lengths, avoid overwashing, and finish with cool water rinse."
      : data.goal === "strength"
      ? "Include protein treatments sometimes and avoid rough towel rubbing."
      : "Pick a main goal in the quiz to personalise this more.";

  const stylingLine =
    data.styling === "daily"
      ? "Daily heat is risky — try to reduce to 1–2× week and ALWAYS use heat protectant."
      : data.styling === "often"
      ? "Use heat protectant and try more heat-free styles."
      : data.styling === "sometimes"
      ? "Good that you don’t overdo heat; still use protectant whenever you style."
      : data.styling === "never"
      ? "Great, minimal heat damage!"
      : "Answer the styling question in the quiz.";

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Your Daily & Weekly Hair Routine
        </h1>
        <p className="text-center text-gray-700 mb-4">
          This routine is auto-generated from your quiz answers. Complete the
          quiz first for a more accurate plan.
        </p>

        {/* Quick profile */}
        <div className="bg-gray-100 p-4 rounded-xl text-sm md:text-base">
          <p>
            <strong>Scalp Type:</strong>{" "}
            {data.scalpType || "Not set (take quiz)"}
          </p>
          <p>
            <strong>Hair Fall:</strong>{" "}
            {data.hairFall || "Not set (take quiz)"}
          </p>
          <p>
            <strong>Main Goal:</strong> {data.goal || "Not set (take quiz)"}
          </p>
          <p>
            <strong>Heat Styling:</strong>{" "}
            {data.styling || "Not set (take quiz)"}
          </p>
        </div>

        {/* Daily routine */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">🗓 Daily Routine</h2>
          <div className="bg-gray-100 p-4 rounded-xl text-sm md:text-base text-gray-700 space-y-2">
            <p>
              <strong>Morning:</strong> Keep hair tied loosely, avoid very tight
              ponytails. If going out, use a light serum on lengths, not on
              scalp.
            </p>
            <p>
              <strong>Night:</strong> Comb gently from ends to roots, tie hair
              in a loose braid or bun. Use a soft pillow cover (cotton/satin).
            </p>
            <p>
              <strong>Scalp focus:</strong> {scalpLine}
            </p>
            <p>
              <strong>Hair fall care:</strong> {hairFallLine}
            </p>
          </div>
        </section>

        {/* Weekly routine */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">📅 Weekly Routine</h2>
          <div className="bg-gray-100 p-4 rounded-xl text-sm md:text-base text-gray-700 space-y-2">
            <p>
              <strong>2× per week:</strong> Oil scalp lightly 1–2 hours before
              washing (coconut, almond or blended oils).
            </p>
            <p>
              <strong>Wash days:</strong> Use mild shampoo, focus on scalp;
              conditioner/mask only on lengths & ends.
            </p>
            <p>
              <strong>Goal based care:</strong> {goalLine}
            </p>
            <p>
              <strong>Heat styling advice:</strong> {stylingLine}
            </p>
          </div>
        </section>

        {/* Extra tips */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">✨ Extra Tips</h2>
          <div className="bg-gray-100 p-4 rounded-xl text-sm md:text-base text-gray-700 space-y-2">
            <p>• Drink enough water daily to support scalp hydration.</p>
            <p>• Combine this routine with the Meal Plan for best results.</p>
            <p>
              • Track photos every 2–4 weeks using the Scan page to see
              progress.
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center">
            This routine is for general wellness and education only. For
            medical issues, always consult a dermatologist.
          </p>
        </section>
      </div>
    </div>
  );
}
