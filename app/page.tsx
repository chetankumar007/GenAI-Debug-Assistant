"use client";

import { useState } from "react";
import ErrorForm from "@/components/ErrorForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        AI Debug Assistant 🚀
      </h1>

      <ErrorForm onResult={setResult} />

      {result && <ResultCard data={result} />}
    </div>
  );
}