'use client'

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#07090f] to-black text-white px-6 py-28">
      <div className="max-w-5xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-6"
        >
          About <span className="bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] bg-clip-text text-transparent">HairAI</span>
        </motion.h1>

        <p className="text-gray-400 text-lg mb-12">
          HairAI is a premium AI-powered hair wellness platform built to help people
          understand, improve, and maintain their hair health with confidence.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-400 text-sm">
              To make hair care simple, personalized, and science-driven using AI,
              so users can take better decisions for their hair and scalp health.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Why HairAI</h3>
            <p className="text-gray-400 text-sm">
              Generic advice doesn’t work. HairAI adapts to your hair type,
              scalp condition, lifestyle, and goals — just like a real expert.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3">AI & Technology</h3>
            <p className="text-gray-400 text-sm">
              We combine AI analysis, structured routines, and nutrition insights
              to deliver a complete hair wellness experience.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Ethics & Trust</h3>
            <p className="text-gray-400 text-sm">
              Your data stays private. HairAI is designed with transparency,
              security, and user trust at its core.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
