"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  question: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "mainConcern",
    question: "What is your main hair concern right now?",
    options: [
      "Hair fall / thinning",
      "Dandruff / itchy scalp",
      "Oily scalp",
      "Dry / frizzy hair",
      "Just general wellness",
    ],
  },
  {
    id: "scalpType",
    question: "How would you describe your scalp type?",
    options: ["Oily", "Dry", "Normal", "Combination / changes with weather"],
  },
  {
    id: "hairType",
    question: "What is your natural hair type?",
    options: ["Straight", "Wavy", "Curly", "Coily / very curly"],
  },
  {
    id: "styling",
    question: "How often do you use heat or chemical treatments?",
    options: [
      "Almost every day",
      "1–2 times a week",
      "Rarely",
      "Almost never",
    ],
  },
  {
    id: "lifestyle",
    question: "How is your sleep + stress level these days?",
    options: [
      "High stress, low sleep",
      "Okay-ish",
      "Mostly relaxed & good sleep",
      "Varies a lot",
    ],
  },
];

type Answers = Record<string, string>;

export default function QuizPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [completed, setCompleted] = useState(false);

  const totalSteps = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentStep];
  const selected = currentQuestion ? answers[currentQuestion.id] : "";

  function handleOptionSelect(option: string) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  }

  function handleNext() {
    if (!currentQuestion) return;

    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      if (typeof window !== "undefined") {
        const existingProfile = JSON.parse(
          localStorage.getItem("hairAI_profile") || "{}"
        );

        const updatedProfile = {
          ...existingProfile,
          quizReport: {
            answers,
            completedAt: Date.now(),
          },
          updatedAt: Date.now(),
        };

        localStorage.setItem(
          "hairAI_profile",
          JSON.stringify(updatedProfile)
        );
      }

      setCompleted(true);
    }
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/quiz-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="relative flex items-center justify-center min-h-screen px-4 py-16">
        <div className="floating-card max-w-2xl w-full text-center">

          {/* START */}
          {!started && !completed && (
            <>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300 mb-3">
                Hair wellness check
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Hair Health Quiz
              </h1>
              <p className="text-slate-200 mb-8 max-w-xl mx-auto">
                Answer a few quick questions to unlock your personalised report.
              </p>
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-3 rounded-full font-semibold bg-white text-slate-900 shadow-xl hover:scale-105 transition"
              >
                Start Quiz
              </button>
            </>
          )}

          {/* QUESTIONS */}
          {started && !completed && currentQuestion && (
            <div className="text-left">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-slate-300">
                  Question {currentStep + 1} of {totalSteps}
                </p>
                <div className="h-1 flex-1 ml-4 rounded-full bg-slate-800">
                  <div
                    className="h-full bg-sky-400 transition-all"
                    style={{
                      width: `${((currentStep + 1) / totalSteps) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <h2 className="text-lg md:text-xl font-semibold mb-4">
                {currentQuestion.question}
              </h2>

              <div className="space-y-2 mb-6">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                      selected === option
                        ? "bg-sky-400 text-black border-sky-200"
                        : "bg-slate-900/60 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="px-4 py-2 rounded-full text-xs border border-slate-600 disabled:opacity-40"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className="px-6 py-2 rounded-full bg-sky-400 text-black font-semibold disabled:opacity-40"
                >
                  {currentStep === totalSteps - 1 ? "Finish Quiz" : "Next →"}
                </button>
              </div>
            </div>
          )}

          {/* COMPLETED */}
          {completed && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-sky-200">
                Quiz Completed 🎉
              </h2>
              <p className="text-slate-300">
                Your personalised hair report is ready.
              </p>

              <div
                onClick={() => router.push("/report")}
                className="cursor-pointer bg-white/10 border border-white/20 rounded-2xl p-6 hover:scale-105 transition shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2">
                  View Your Hair Report
                </h3>
                <p className="text-sm text-slate-300">
                  Based on your quiz answers and lifestyle.
                </p>
                <p className="mt-4 text-sky-300 font-semibold">
                  Open Report →
                </p>
              </div>

              <button
                onClick={() => {
                  setCompleted(false);
                  setStarted(false);
                  setAnswers({});
                  setCurrentStep(0);
                }}
                className="text-xs text-slate-400 underline"
              >
                Retake Quiz
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
