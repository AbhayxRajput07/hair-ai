"use client";

import { useState } from "react";

export default function ScanPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function analyzeImage() {
    if (!imageFile) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch("/api/analyze-hair", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("AI Response:", data);

      if (!res.ok) {
        alert("Error: " + data.error);
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
        AI Hair Scan
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-3 rounded-xl w-full mb-4"
        />

        {preview && (
          <img
            src={preview}
            alt="Uploaded Hair"
            className="w-full rounded-xl mb-4 shadow"
          />
        )}

        <button
          onClick={analyzeImage}
          disabled={loading}
          className="px-6 py-3 bg-black text-white rounded-full shadow hover:bg-gray-800 transition disabled:bg-gray-400"
        >
          {loading ? "Analyzing..." : "Analyze Hair"}
        </button>

        {result && (
          <div className="mt-6 text-left bg-gray-100 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">AI Hair Analysis</h2>

            <p><strong>Hair Type:</strong> {result.hairType}</p>
            <p><strong>Scalp Health:</strong> {result.scalpHealth}</p>

            <p className="mt-3 font-semibold">Issues:</p>
            <ul className="list-disc ml-6">
              {result.issues?.map((i: string, idx: number) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <p className="mt-3 font-semibold">Recommendations:</p>
            <ul className="list-disc ml-6">
              {result.recommendations?.map((r: string, idx: number) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
