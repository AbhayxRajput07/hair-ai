import { CheckCircle, Lightbulb, AlertCircle } from "lucide-react";

export default function ScanInstructions() {
  const steps = [
    {
      icon: "📸",
      title: "Take a Clear Photo",
      description: "Use good lighting, preferably natural light. Avoid shadows on your hair.",
      tip: "Stand near a window during daytime",
    },
    {
      icon: "👱‍♀️",
      title: "Focus on Hair & Scalp",
      description: "Capture from roots to tips. Pull hair back to show scalp if possible.",
      tip: "Use back camera for better quality",
    },
    {
      icon: "⚙️",
      title: "Upload & Analyze",
      description: "Our AI detects split ends, density, scalp health, and damage levels.",
      tip: "Results in under 60 seconds",
    },
  ];

  const dosAndDonts = [
    { text: "✅ Do take multiple angles", type: "do" },
    { text: "✅ Do use plain background", type: "do" },
    { text: "✅ Do keep hair dry", type: "do" },
    { text: "❌ Don't use filters or editing", type: "dont" },
    { text: "❌ Don't blur the photo", type: "dont" },
    { text: "❌ Don't wear hats or caps", type: "dont" },
  ];

  return (
    <div className="space-y-8">
      {/* Steps Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">3-Step Perfect Scan</h3>
        </div>
        
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-xl">
                {step.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{step.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-700 font-medium">{step.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dos & Don'ts */}
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-900">Dos & Don'ts</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {dosAndDonts.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                item.type === "do" 
                  ? "bg-green-50 border border-green-100" 
                  : "bg-red-50 border border-red-100"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.type === "do" ? "bg-green-100" : "bg-red-100"
              }`}>
                {item.type === "do" ? "✓" : "✗"}
              </div>
              <span className={`font-medium ${
                item.type === "do" ? "text-green-800" : "text-red-800"
              }`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Note */}
      <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-2xl border border-purple-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-purple-700 font-bold">🔒</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Your Privacy First</h4>
            <p className="text-sm text-gray-600 mt-1">
              All photos are encrypted, analyzed anonymously, and deleted after 24 hours. We never share your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}