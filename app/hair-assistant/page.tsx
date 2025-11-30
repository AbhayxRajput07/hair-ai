// app/hair-assistant/page.tsx
"use client";

import { useState, useRef, type FormEvent } from "react";
import type { HairAssistantResult } from "../types/hair-assistant";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  result?: HairAssistantResult;
};

export default function HairAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input && !imageFile) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: input || (imageFile ? "Uploaded a hair photo." : ""),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", input);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/hair-assistant", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "Here is your hair wellness analysis and routine.",
        result: data.result as HairAssistantResult,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error(error);
      const errMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text:
          "Sorry, something went wrong while analyzing. Please try again after some time.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
      setInput("");
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1 flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Hair AI Assistant
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Chat with your personal hair wellness assistant. Describe your hair,
            upload a clear photo, and get a complete{" "}
            <span className="font-medium">analysis, routine, and meal plan</span>{" "}
            in one place.
          </p>
        </header>

        {/* Chat Area */}
        <div className="flex-1 border border-gray-200 rounded-2xl bg-white shadow-sm flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-2">
                <span className="text-sm md:text-base">
                  Start by telling me about your hair:
                </span>
                <ul className="text-xs md:text-sm space-y-1">
                  <li>• Hair fall, dandruff, dryness, frizz, split ends etc.</li>
                  <li>• Your routine (oiling, shampoo, heat styling)</li>
                  <li>• Upload a clear photo of your scalp & hair.</li>
                </ul>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm md:text-base ${
                    msg.role === "user"
                      ? "bg-black text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-900 rounded-bl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {msg.role === "assistant" && msg.result && (
                    <AssistantResultView result={msg.result} />
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm text-sm md:text-base">
                  Analyzing your hair details…
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSend}
            className="border-t border-gray-200 p-3 flex flex-col md:flex-row gap-3 items-center"
          >
            <div className="flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={handleImageButtonClick}
                className="flex-shrink-0 border border-gray-300 rounded-full px-3 py-2 text-xs md:text-sm hover:bg-gray-50 transition"
              >
                {imageFile ? "Image Selected ✅" : "Upload Photo"}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImageFile(file);
                }}
              />

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your hair issues, routine, products, etc…"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-black/70"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-shrink-0 bg-black text-white px-5 py-2 rounded-full text-sm md:text-base font-medium disabled:opacity-60"
            >
              {isLoading ? "Analyzing..." : "Ask Assistant"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Assistant reply ka structured view
function AssistantResultView({ result }: { result: HairAssistantResult }) {
  return (
    <div className="mt-3 space-y-3 text-xs md:text-sm">
      {/* Summary */}
      <div className="bg-white/70 border border-gray-200 rounded-xl p-3">
        <h3 className="font-semibold mb-1">Overall Summary</h3>
        <p className="text-gray-700">{result.summary}</p>
      </div>

      {/* Hair & Scalp */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white/70 border border-gray-200 rounded-xl p-3">
          <h3 className="font-semibold mb-1">Hair Type</h3>
          <p className="text-gray-700">{result.hair_type}</p>
        </div>
        <div className="bg-white/70 border border-gray-200 rounded-xl p-3">
          <h3 className="font-semibold mb-1">Scalp Condition</h3>
          <p className="text-gray-700">{result.scalp_condition}</p>
          <p className="mt-1 text-[11px] text-gray-500">
            Severity score:{" "}
            <span className="font-semibold">{result.severity_score}/10</span>
          </p>
        </div>
      </div>

      {/* Issues */}
      {result.issues?.length > 0 && (
        <div className="bg-white/70 border border-gray-200 rounded-xl p-3">
          <h3 className="font-semibold mb-1">Key Issues</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-0.5">
            {result.issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Routine */}
      <div className="bg-white/70 border border-gray-200 rounded-xl p-3 space-y-2">
        <h3 className="font-semibold mb-1">Recommended Routine</h3>
        <RoutineSection title="Morning" items={result.recommended_routine.morning} />
        <RoutineSection title="Night" items={result.recommended_routine.night} />
        <RoutineSection title="Weekly" items={result.recommended_routine.weekly} />
      </div>

      {/* Meal suggestions */}
      {result.meal_suggestions?.length > 0 && (
        <div className="bg-white/70 border border-gray-200 rounded-xl p-3">
          <h3 className="font-semibold mb-1">Meal Suggestions</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-0.5">
            {result.meal_suggestions.map((food, i) => (
              <li key={i}>{food}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Lifestyle tips */}
      {result.lifestyle_tips?.length > 0 && (
        <div className="bg-white/70 border border-gray-200 rounded-xl p-3">
          <h3 className="font-semibold mb-1">Lifestyle & Extra Tips</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-0.5">
            {result.lifestyle_tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function RoutineSection({ title, items }: { title: string; items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="font-semibold text-gray-800">{title}</p>
      <ul className="list-disc list-inside text-gray-700 space-y-0.5">
        {items.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
