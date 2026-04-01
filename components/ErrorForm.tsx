"use client";

import { useState } from "react";

export default function ErrorForm({ onResult }: any) {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!error && !code) return;

    setLoading(true);

    try {
      const res = await fetch("/api/analyze-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error, code }),
      });

      const data = await res.json();
   onResult(data, error);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-black border border-gray-800 p-6 rounded-xl space-y-4
                    shadow-[0_0_20px_rgba(59,130,246,0.2)]"
    >
      <textarea
        placeholder="Paste your error..."
        value={error}
        onChange={(e) => setError(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Paste your code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 px-6 py-2 rounded font-medium
                   shadow-[0_0_15px_rgba(59,130,246,0.7)]
                   hover:shadow-[0_0_25px_rgba(59,130,246,1)]
                   transition"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
