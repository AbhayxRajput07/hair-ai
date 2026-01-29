'use client'

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#07090f] to-black text-white px-6 py-28">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">Careers at HairAI</h1>
        <p className="text-gray-400 mb-12">
          Join us in building the future of AI-powered hair wellness.
        </p>

        <div className="space-y-6">
          {[
            "Frontend Engineer (Next.js)",
            "AI / ML Engineer",
            "Product Designer (UI/UX)",
            "Content & Research Specialist",
          ].map((role, i) => (
            <div
              key={i}
              className="glass-effect rounded-2xl p-6 border border-white/10 flex items-center justify-between"
            >
              <span className="font-medium">{role}</span>
              <span className="text-sm text-gray-400">Remote</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-gray-400 text-sm">
          Send your resume to <span className="text-white">careers@hairai.app</span>
        </p>
      </div>
    </div>
  );
}
