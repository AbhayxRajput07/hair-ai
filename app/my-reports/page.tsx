"use client";

import { useEffect, useState } from "react";

type ScanReportType = {
  _id: string;
  hairType: string;
  scalpHealth: string;
  issues: string[];
  recommendations: string[];
  createdAt: string;
};

export default function MyReportsPage() {
  const [reports, setReports] = useState<ScanReportType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/report"); // 👈 yahi route hai
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load");

        setReports(data);
      } catch (err: any) {
        setError(err.message || "Error loading reports");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading reports...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">My Reports</h1>

      {reports.length === 0 ? (
        <p className="text-gray-500">
          No reports yet. Go to the <b>Scan</b> page and do your first scan.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reports.map((r) => (
            <div
              key={r._id}
              className="border rounded-xl p-5 shadow-sm bg-white"
            >
              <p className="text-xs text-gray-500 mb-2">
                {new Date(r.createdAt).toLocaleString()}
              </p>

              <h2 className="text-xl font-bold mb-1">{r.hairType}</h2>
              <p className="text-gray-700 mb-3">
                Scalp Health: <b>{r.scalpHealth}</b>
              </p>

              <div className="mb-3">
                <h3 className="font-medium text-sm">Issues</h3>
                <ul className="list-disc list-inside text-xs text-gray-700">
                  {r.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-sm">Recommendations</h3>
                <ul className="list-disc list-inside text-xs text-gray-700">
                  {r.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
