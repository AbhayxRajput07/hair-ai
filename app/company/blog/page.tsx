'use client'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#07090f] to-black text-white px-6 py-28">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">HairAI Blog</h1>
        <p className="text-gray-400 mb-12">
          Insights, research, and updates from the HairAI team.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-effect rounded-2xl p-6 border border-white/10"
            >
              <h3 className="font-semibold mb-2">Coming Soon</h3>
              <p className="text-sm text-gray-400">
                Hair care insights and AI research articles will be published here.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
