import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import FloatingAssistant from "./components/FloatingAssistant";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hair AI | Premium Wellness Assistant",
  description:
    "AI-powered hair analysis with a bold, glossy, premium wellness experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased text-white`}
        style={{
          background:
            "radial-gradient(1200px circle at top, #0e1325 0%, #07090f 60%)",
        }}
      >
        {/* ================= NAVBAR ================= */}
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7c7cff] to-[#4fd1c5] flex items-center justify-center shadow-xl premium-glow">
                <span className="font-black text-lg">H</span>
              </div>
              <span className="text-2xl font-extrabold premium-text">
                HairAI
              </span>
            </Link>

            <nav className="hidden md:flex gap-10 text-sm font-medium text-gray-300">
              <Link href="/" className="elegant-underline hover:text-white">Home</Link>
              <Link href="/hair-assistant" className="elegant-underline hover:text-white">AI Assistant</Link>
              <Link href="/scan" className="elegant-underline hover:text-white">AI Scan</Link>
              <Link href="/report" className="elegant-underline hover:text-white">Reports</Link>
              <Link href="/routine" className="elegant-underline hover:text-white">Routines</Link>
              <Link href="/meal-plan" className="elegant-underline hover:text-white">Meal Plans</Link>
            </nav>

            <div className="hidden md:flex gap-4">
              <Link href="/login">
              <button className="px-6 py-2 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition">
                Sign In
              </button>
              </Link>
              <Link href="/quiz">
                <button className="px-7 py-2 rounded-xl font-semibold bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] text-black shadow-xl hover:scale-105 transition premium-glow">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="min-h-screen">{children}</main>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7c7cff] to-[#4fd1c5] flex items-center justify-center">
                  H
                </div>
                <span className="font-bold premium-text">HairAI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A bold AI-powered wellness platform built for the future of hair care.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/scan" className="hover:text-white">AI Scan</Link></li>
                <li><Link href="/report" className="hover:text-white">Reports</Link></li>
                <li><Link href="/routine" className="hover:text-white">Routines</Link></li>
                <li><Link href="/meal-plan" className="hover:text-white">Meal Plans</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/company/about" className="hover:text-white">About</Link></li>
                <li><Link href="/company/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/company/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/company/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/legal/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/legal/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-center py-6 border-t border-white/5 text-sm text-gray-500">
            © {new Date().getFullYear()} HairAI — Designed for the future ✨
          </div>
        </footer>

        <FloatingAssistant />
      </body>
    </html>
  );
}
