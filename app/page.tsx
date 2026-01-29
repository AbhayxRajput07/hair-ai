'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1020] via-[#06080f] to-black">

      {/* Ambient Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-[#7c7cff]/30 to-[#4fd1c5]/30 blur-[160px]" />
        <div className="absolute bottom-[-40%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#4fd1c5]/20 to-[#7c7cff]/20 blur-[160px]" />
      </div>

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-6xl rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_0_90px_rgba(124,124,255,0.18)] px-10 py-16 md:px-16 md:py-20 text-center"
        >

          {/* Badge */}
          <div className="mx-auto mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2">
            <span>✨</span>
            <span className="text-sm tracking-wide text-gray-300">
              PREMIUM AI HAIR WELLNESS
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="block text-white">Hair AI</span>
            <span className="block mt-2 bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] bg-clip-text text-transparent">
              Wellness Platform
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mb-14 max-w-2xl text-lg md:text-xl text-gray-400">
            AI-powered hair analysis, personalized routines, smart meal plans,
            and complete scalp wellness tracking — built for real results.
          </p>

          {/* Primary Actions */}
          <div className="mb-20 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/quiz">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl font-bold text-black text-lg bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] shadow-[0_0_40px_rgba(124,124,255,0.45)]"
              >
                Start Hair Quiz →
              </motion.button>
            </Link>

            <Link href="/features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl border border-white/20 text-gray-300 font-semibold text-lg hover:bg-white/5 transition"
              >
                Explore Platform
              </motion.button>
            </Link>
          </div>

          {/* AI Assistant Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(79,209,197,0.15)]"
          >
            <h2 className="mb-3 text-3xl font-bold text-white">
              Meet Aura — Your AI Hair Assistant
            </h2>
            <p className="mb-8 text-gray-400">
              Chat or talk with Aura to get instant, personalized guidance
              for hair fall, scalp health, routines, and nutrition.
            </p>

            <Link href="/hair-assistant">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="px-9 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] shadow-[0_0_35px_rgba(79,209,197,0.45)]"
              >
                🤖 Launch AI Assistant
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats_toggle */}
          <div className="mt-20 border-t border-white/10 pt-12">
            <p className="mb-8 text-sm uppercase tracking-widest text-gray-500">
              Trusted by thousands worldwide
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "4.9★", label: "User Rating" },
                { value: "98%", label: "Satisfaction" },
                { value: "AI", label: "Powered" },
                { value: "24/7", label: "Support" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="mb-1 text-3xl font-bold bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
