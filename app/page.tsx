"use client";

import { useState } from "react";
import ErrorForm from "@/components/ErrorForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          AI Debug Assistant 🚀
        </h1>
        <p className="text-gray-400 mb-8">
          Paste your error and get instant debugging insights
        </p>

        <ErrorForm onResult={setResult} />

        {result && <ResultCard data={result} />}
      </div>
    </main>
  );
}