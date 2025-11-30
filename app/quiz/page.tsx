"use client";

import { useState, FormEvent } from "react";

export default function HairQuizPage() {
  const [started, setStarted] = useState(false);
  const [scalpType, setScalpType] = useState("");
  const [hairFall, setHairFall] = useState("");
  const [goal, setGoal] = useState("");
  const [styling, setStyling] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let summary: string[] = [];

    if (scalpType === "oily") {
      summary.push(
        "Your scalp tends to be oily. Use a gentle, sulfate-free shampoo 2–3 times a week and avoid heavy oils on the scalp."
      );
    } else if (scalpType === "dry") {
      summary.push(
        "Your scalp seems dry. Focus on hydrating shampoos, oiling 1–2 times a week, and avoid very hot water."
      );
    } else if (scalpType === "normal") {
      summary.push(
        "Your scalp looks balanced. Try to maintain this with a mild shampoo and simple routine."
      );
    } else if (scalpType === "combination") {
      summary.push(
        "You have combination scalp. Keep roots clean but use conditioners and masks mainly on lengths and ends."
      );
    }

    if (hairFall === "light") {
      summary.push(
        "You have light hair fall. Make sure you eat enough protein and avoid tight hairstyles."
      );
    } else if (hairFall === "moderate") {
      summary.push(
        "Your hair fall is moderate. Support your hair with a good diet, gentle handling, and avoid harsh products."
      );
    } else if (hairFall === "heavy") {
      summary.push(
        "Your hair fall sounds heavy. This tool can give general tips, but you should also consider seeing a dermatologist."
      );
    }

    if (styling === "often" || styling === "daily") {
      summary.push(
        "You use heat styling quite often. Always use a heat protectant and try to reduce frequency to protect your hair."
      );
    }

    if (goal === "dandruff") {
      summary.push(
        "For dandruff control, use an anti-dandruff shampoo 1–2 times a week and keep the scalp clean and dry."
      );
    } else if (goal === "growth") {
      summary.push(
        "For growth, focus on scalp massage, a protein-rich diet, and consistent sleep and stress management."
      );
    } else if (goal === "shine") {
      summary.push(
        "For more shine, use lightweight serums on lengths and ends and avoid overwashing."
      );
    } else if (goal === "strength") {
      summary.push(
        "For strength, include protein treatments occasionally and be gentle while detangling."
      );
    }

    if (summary.length === 0) {
      summary.push(
        "Please answer the questions so we can create a useful hair wellness summary for you."
      );
    }

    const finalSummary = summary.join(" ");
    setResult(finalSummary);

    // ✅ SAVE TO LOCALSTORAGE FOR REPORT PAGE
    if (typeof window !== "undefined") {
      localStorage.setItem("hairQuizSummary", finalSummary);
      localStorage.setItem("hairQuizScalpType", scalpType);
      localStorage.setItem("hairQuizHairFall", hairFall);
      localStorage.setItem("hairQuizGoal", goal);
      localStorage.setItem("hairQuizStyling", styling);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
          Hair Health Quiz
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Answer a few quick questions about your hair and scalp to get a
          personalised wellness summary.
        </p>

        {!started ? (
          <div className="flex justify-center">
            <button
              onClick={() => setStarted(true)}
              className="px-6 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Scalp type */}
            <div>
              <h2 className="font-semibold mb-2">1. What is your scalp type?</h2>
              <div className="grid grid-cols-2 gap-2">
                {["oily", "dry", "normal", "combination"].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setScalpType(type)}
                    className={`border rounded-xl px-3 py-2 text-sm capitalize ${
                      scalpType === type
                        ? "bg-black text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair fall */}
            <div>
              <h2 className="font-semibold mb-2">
                2. How much hair fall do you notice?
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "none", label: "Almost none" },
                  { value: "light", label: "Light" },
                  { value: "moderate", label: "Moderate" },
                  { value: "heavy", label: "Heavy" },
                ].map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setHairFall(option.value)}
                    className={`border rounded-xl px-3 py-2 text-sm ${
                      hairFall === option.value
                        ? "bg-black text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main goal */}
            <div>
              <h2 className="font-semibold mb-2">
                3. What is your main hair goal right now?
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "dandruff", label: "Control dandruff" },
                  { value: "growth", label: "Better growth" },
                  { value: "shine", label: "More shine" },
                  { value: "strength", label: "More strength" },
                ].map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setGoal(option.value)}
                    className={`border rounded-xl px-3 py-2 text-sm ${
                      goal === option.value
                        ? "bg-black text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Heat styling */}
            <div>
              <h2 className="font-semibold mb-2">
                4. How often do you use heat styling (straightener / dryer)?
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "never", label: "Almost never" },
                  { value: "sometimes", label: "Sometimes" },
                  { value: "often", label: "Often" },
                  { value: "daily", label: "Almost daily" },
                ].map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setStyling(option.value)}
                    className={`border rounded-xl px-3 py-2 text-sm ${
                      styling === option.value
                        ? "bg-black text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-2 px-6 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition"
              >
                Get My Summary
              </button>
            </div>
          </form>
        )}

        {result && (
          <div className="mt-8 border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">
              Your Hair Wellness Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{result}</p>
            <p className="text-xs text-gray-500 mt-3">
              This is a general AI-style suggestion, not a medical diagnosis.
              Please talk to a dermatologist for serious hair or scalp problems.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
