// app/auth/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/register";

    const body: any = { email, password };
    if (mode === "register") body.name = name;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text(); // 👈 pehle text lo
    let data: any = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      console.error("Non-JSON response from API:", text);
    }

    if (!res.ok) {
      const msg =
        data?.error ||
        `Request failed (${res.status}) – check server terminal logs.`;
      throw new Error(msg);
    }

    // ✅ success
    router.push("/");
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          {mode === "login" ? "Welcome back to HairAI" : "Create your HairAI account"}
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-100 rounded-full p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-full ${
              mode === "register"
                ? "bg-black text-white shadow"
                : "text-gray-600"
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-full ${
              mode === "login"
                ? "bg-black text-white shadow"
                : "text-gray-600"
            }`}
          >
            Login
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium disabled:opacity-60"
          >
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Creating account..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          This account system uses a secure backend + MongoDB. Avoid using your
          real passwords in this demo.
        </p>
      </div>
    </main>
  );
}
