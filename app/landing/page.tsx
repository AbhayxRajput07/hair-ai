// app/landing/page.tsx

export default function Page() {
  return (
    <main className="hero-bg h-screen flex items-center justify-center px-4">
      <section
        className="
          glass-card float-soft glow-border
          max-w-3xl w-full mx-auto
          border border-white/40 shadow-2xl
          p-8 md:p-12 text-center
          text-white
        "
      >
        <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-white/70 mb-3">
          Smart • Gentle • Personalized
        </p>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-xl">
          Your AI Hair Wellness Studio
        </h1>

        <p className="mt-4 md:mt-6 text-sm md:text-lg text-white/85 leading-relaxed">
          Scan your hair, get instant health insights, and receive cozy, curated
          routines that adapt to your lifestyle, climate, and nutrition.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="
              px-8 py-3 rounded-full
              bg-black/80 hover:bg-black
              text-sm md:text-base font-semibold
              shadow-lg shadow-black/30
              transition-transform duration-300
              hover:scale-105
            "
          >
            Get Started
          </button>

          <button
            className="
              px-8 py-3 rounded-full
              bg-white/15 hover:bg-white/25
              border border-white/40
              text-sm md:text-base font-medium
              backdrop-blur-xl
              transition-transform duration-300
              hover:scale-105
            "
          >
            View Wellness Reports
          </button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs md:text-sm text-white/80">
          <span className="px-3 py-1 rounded-full bg-white/15">
            Live scalp health score
          </span>
          <span className="px-3 py-1 rounded-full bg-white/15">
            Adaptive care routines
          </span>
          <span className="px-3 py-1 rounded-full bg-white/15">
            Nutrition & meal hints
          </span>
        </div>
      </section>
    </main>
  );
}
