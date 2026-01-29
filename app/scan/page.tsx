import {
  ScanInterface,
  ScanInstructions,
  ScanTips,
} from "../components/scan";

export default function ScanPage() {
  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-[#0b1020] via-[#07090f] to-black px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="block text-white">AI Hair Scan</span>
            <span className="block mt-2 bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] bg-clip-text text-transparent">
              Smart Scalp & Hair Analysis
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Upload a clear photo of your hair and scalp. Our AI analyzes scalp
            health, hair density, split ends and growth patterns — in under
            60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT – Instructions */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-effect rounded-3xl p-6">
              <ScanInstructions />
            </div>

            <div className="glass-effect rounded-3xl p-6">
              <ScanTips />
            </div>
          </div>

          {/* RIGHT – Scanner */}
          <div className="lg:col-span-2 space-y-12">

            {/* Scan Interface */}
            <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
              <ScanInterface />
            </div>

            {/* Recent Scans */}
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Recent Scans
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="relative group rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-white/5"
                  >
                    <div className="aspect-square flex items-center justify-center">
                      <span className="text-gray-400 text-sm">
                        Scan #{item}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] text-black text-sm font-semibold">
                        View Report
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-12 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm mb-10 uppercase tracking-widest">
            Trusted by professionals worldwide
          </p>

          <div className="flex flex-wrap justify-center items-center gap-10">
            {[
              "🔒 Secure & Private",
              "✅ 99.8% Accuracy",
              "⚡ Instant Results",
              "🩺 Dermatologist Verified",
            ].map((item) => (
              <div
                key={item}
                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
