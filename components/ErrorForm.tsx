"use client";

import { useState } from "react";

type Props = {
  onResult: (data: any) => void;
};

export default function ErrorForm({ onResult }: Props) {
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
    <div className="space-y-4">
      <textarea
        placeholder="Paste error message..."
        value={error}
        onChange={(e) => setError(e.target.value)}
        className="w-full border rounded p-3"
      />

      <textarea
        placeholder="Paste your code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border rounded p-3"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}