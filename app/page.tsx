import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-center text-center p-6">

      <h1 className="text-5xl font-bold mb-4 text-gray-900">
        Hair AI Wellness Assistant
      </h1>

      <p className="text-lg text-gray-700 max-w-2xl mb-6">
        Scan your hair using AI, get instant health reports, personalized care routines,
        meal suggestions, and track your hair wellness journey — all in one place.
      </p>

      <Link href="/quiz">
  <button className="px-6 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition">
    Get Started
  </button>
</Link>


    </div>
  );
}
