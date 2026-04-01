import { groq } from "@/lib/groq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { error, code } = await req.json();

    const prompt = `
You are a senior backend engineer.

Analyze this:

Error:
${error}

Code:
${code}

Return STRICT JSON:

{
  "explanation": "",
  "rootCause": "",
  "fix": "",
  "improvedCode": "",
  "bestPractices": []
}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const result = response.choices[0]?.message?.content || "No response";

    return NextResponse.json({
      explanation: result,
      rootCause: "",
      fix: "",
      improvedCode: "",
      bestPractices: [],
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
