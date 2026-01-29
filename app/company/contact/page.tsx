'use client'

import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_ro7iweo",
        "template_8qgzrm4",
        e.currentTarget,
        "0JFY1f2xFq_qT4oLQ"
      )
      .then(
        () => {
          alert("Message sent successfully ✅");
          e.currentTarget.reset();
          setLoading(false);
        },
        () => {
          alert("Failed to send message ❌");
          setLoading(false);
        }
      );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#07090f] to-black text-white px-6 py-28">
      <div className="max-w-4xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-4"
        >
          Contact{" "}
          <span className="bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] bg-clip-text text-transparent">
            HairAI
          </span>
        </motion.h1>

        <p className="text-gray-400 mb-12">
          Need help, have feedback, or want to collaborate?  
          Send us a message and we’ll get back to you.
        </p>

        {/* CONTACT INFO */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="font-semibold mb-2">📧 Email</h3>
            <p className="text-gray-300 text-sm break-all">
              rajput.abhay1713@gmail.com
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="font-semibold mb-2">📞 Phone</h3>
            <p className="text-gray-300 text-sm">
              +91 9670421522
            </p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <form
          onSubmit={sendEmail}
          className="glass-effect rounded-2xl p-6 border border-white/10 space-y-4"
        >
          <input
            name="user_name"
            required
            placeholder="Your name"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-[#7c7cff]"
          />

          <input
            name="user_email"
            type="email"
            required
            placeholder="Your email"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-[#7c7cff]"
          />

          <textarea
            name="message"
            required
            rows={4}
            placeholder="Your message"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-[#7c7cff]"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-xl font-semibold text-black bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

      </div>
    </div>
  );
}
