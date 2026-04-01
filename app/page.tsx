"use client";

import { useState } from "react";
import ErrorForm from "@/components/ErrorForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleResult = (data: any, errorInput: string) => {
    setResult(data);

    setHistory((prev) => [
      { id: Date.now(), error: errorInput, data },
      ...prev,
    ]);
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      {/* 🧠 Sidebar */}
      <div className="w-80 border-r border-gray-800 p-4 space-y-4">
        <h2 className="text-lg font-semibold text-purple-400">History</h2>

        <div className="space-y-2 overflow-y-auto max-h-screen">
          {history.length === 0 && (
            <p className="text-gray-500 text-sm">No history yet</p>
          )}

          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => setResult(item.data)}
              className="p-3 bg-gray-900 rounded cursor-pointer
                         hover:bg-gray-800 transition text-sm"
            >
              {item.error.slice(0, 80)}...
            </div>
          ))}
        </div>
      </div>

      {/* 🖥 Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-blue-400">
            AI Debug Assistant 🚀
          </h1>

          <ErrorForm
            onResult={(data: any, error: string) => handleResult(data, error)}
          />

          {result && <ResultCard data={result} />}
        </div>
      </div>
    </main>
  );
}
