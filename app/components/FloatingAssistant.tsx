'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function FloatingAssistant() {
  return (
    <Link href="/hair-assistant">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-16 h-16 rounded-full premium-glow bg-gradient-to-br from-[#7c7cff] to-[#4fd1c5] flex items-center justify-center text-white text-2xl shadow-xl float-animation"
        >
          🤖

          {/* Tooltip */}
          <span className="absolute right-20 opacity-0 group-hover:opacity-100 transition bg-black/80 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap">
            Ask Hair AI
          </span>
        </motion.button>
      </motion.div>
    </Link>
  );
}
