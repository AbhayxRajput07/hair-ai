"use client";

import { useState, type ChangeEvent } from "react";
import {
  Upload,
  Camera,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

export default function ScanInterface() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generating, setGenerating] = useState(false);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      setImage(event.target?.result as string);

      let prog = 0;
      const interval = setInterval(() => {
        prog += 10;
        setProgress(prog);

        if (prog >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploading(false), 300);
        }
      }, 200);
    };

    reader.readAsDataURL(file);
  };

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      alert("Camera access granted! Implement capture logic here.");
      stream.getTracks().forEach((track) => track.stop());
    } catch (err: any) {
      alert(`Camera error: ${err.message}`);
    }
  };

  const resetImage = () => {
    setImage(null);
    setProgress(0);
    setUploading(false);
    setGenerating(false);
  };

  // ✅ NEW: Generate report API call
  const generateReport = async () => {
    if (!image) return;

    try {
      setGenerating(true);

      const res = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          createdAt: new Date(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ Failed to generate report");
        console.error(data);
        setGenerating(false);
        return;
      }

      alert("✅ AI Hair Report Generated Successfully!");
      console.log("Report:", data);
      setGenerating(false);
    } catch (error) {
      console.error(error);
      alert("❌ Server error while generating report");
      setGenerating(false);
    }
  };

  return (
    <div className="w-full">
      {!image ? (
        <div className="border-4 border-dashed border-gray-300 rounded-3xl p-8 md:p-12 text-center hover:border-blue-500 transition-colors bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-8">
              <Upload className="w-12 h-12 text-blue-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Upload Hair Photo
            </h3>

            <p className="text-gray-600 mb-8">
              Ensure good lighting and clear focus on hair & scalp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-2xl"
                onClick={() =>
                  document.getElementById("file-upload")?.click()
                }
              >
                <Upload className="mr-2 w-5 h-5" />
                Choose from Device
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 rounded-2xl"
                onClick={handleCameraClick}
              >
                <Camera className="mr-2 w-5 h-5" />
                Use Camera
              </Button>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              JPG, PNG, WEBP • Max 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200">
            <img
              src={image}
              alt="Hair preview"
              className="w-full max-h-96 object-cover"
            />

            <button
              onClick={resetImage}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {uploading ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Uploading & Analyzing</span>
                <span className="font-bold text-blue-600">{progress}%</span>
              </div>

              <Progress value={progress} className="h-3" />

              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="animate-spin" />
                AI is analyzing your hair & scalp...
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
                <div>
                  <h4 className="text-xl font-bold">
                    Photo Ready for Analysis
                  </h4>
                  <p className="text-gray-700">
                    Generate your AI hair report now.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={generateReport}
                  disabled={generating}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white flex-1"
                >
                  {generating ? "Generating..." : "🧠 Generate Full AI Report"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={resetImage}
                >
                  Try Another Photo
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
