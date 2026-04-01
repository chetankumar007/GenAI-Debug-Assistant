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
      onResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">

      <textarea
        placeholder="Paste your error..."
        value={error}
        onChange={(e) => setError(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Paste your code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded font-medium"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}