'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-[#8B0000]/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#ff3b3b] flex items-center justify-center font-black text-white">
            H
          </div>
          <span className="text-xl font-bold premium-text">
            HairAI
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="elegant-underline">Home</Link>
          <Link href="/hair-assistant" className="elegant-underline">AI Assistant</Link>
          <Link href="/scan" className="elegant-underline">AI Scan</Link>
          <Link href="/reports" className="elegant-underline">Reports</Link>
          <Link href="/routines" className="elegant-underline">Routines</Link>
          <Link href="/meal-plans" className="elegant-underline">Meal Plans</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block px-5 py-2 rounded-xl border border-[#8B0000]/40 text-gray-300 hover:bg-[#8B0000]/10"
            >
              Sign In
            </motion.button>
          </Link>

          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="premium-glow px-6 py-2 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#ff3b3b] text-white font-bold"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
