import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const error = body?.error || "";
    const code = body?.code || "";

    if (!error && !code) {
      return NextResponse.json(
        { error: "Error or code is required" },
        { status: 400 },
      );
    }

    const prompt = `
You are a senior backend engineer.

Analyze the following error and code.

Error:
${error}

Code:
${code}

Return ONLY valid JSON in this exact format:

{
  "explanation": "clear explanation",
  "rootCause": "why this happened",
  "fix": "steps to fix",
  "improvedCode": "fixed version of code",
  "bestPractices": ["point1", "point2"]
}
`;

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful senior software engineer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const raw = response.choices[0]?.message?.content || "{}";

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      // fallback if AI gives invalid JSON
      parsed = {
        explanation: raw,
        rootCause: "",
        fix: "",
        improvedCode: "",
        bestPractices: [],
      };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
