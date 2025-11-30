// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // page load pe current user fetch
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user ?? null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      // home pe bhej do
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  const linkClass =
    "px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition";
  const activeClass =
    "bg-black text-white border-black hover:bg-black";

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        {/* Left side links */}
        <div className="flex flex-wrap gap-2">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/quiz" className={linkClass}>
            Quiz
          </Link>
          <Link href="/scan" className={linkClass}>
            Scan
          </Link>
          <Link href="/meal-plan" className={linkClass}>
            Meal Plan
          </Link>
          <Link href="/routine" className={linkClass}>
            Routine
          </Link>
          <Link href="/report" className={linkClass}>
            Report
          </Link>
          <Link href="/my-reports" className={linkClass}>
            My Reports
          </Link>
          <Link href="/hair-assistant" className={linkClass}>
            Assistant
          </Link>
        </div>

        {/* Right side account section */}
        <div className="flex items-center gap-3">
          {!loading && user && (
            <>
              <span className="text-sm text-gray-700">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className={`${linkClass} ${activeClass}`}
              >
                Logout
              </button>
            </>
          )}

          {!loading && !user && (
            <Link
              href="/auth"
              className={`${linkClass} ${activeClass}`}
            >
              Account
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
