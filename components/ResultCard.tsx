"use client";

type Props = {
  data: {
    explanation?: string;
    rootCause?: string;
    fix?: string;
    improvedCode?: string;
    bestPractices?: string[];
  };
};

export default function ResultCard({ data }: Props) {
  const copy = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const formatText = (text: string) => {
    if (!text) return "";

    return text
      .replace(/\*\*(.*?)\*\*/g, "<b class='text-white'>$1</b>")
      .replace(/`(.*?)`/g, "<span class='bg-gray-800 px-1 rounded'>$1</span>")
      .replace(/\n/g, "<br/>");
  };

  const Section = ({ title, content }: any) => (
    <div
      className="bg-black border border-gray-800 p-5 rounded-xl
                    shadow-[0_0_10px_rgba(59,130,246,0.2)]
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition"
    >
      <div className="flex justify-between items-center mb-3">
        <h2
          className="font-semibold text-lg text-blue-400
                       drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"
        >
          {title}
        </h2>

        <button
          onClick={() => copy(content)}
          className="text-xs text-gray-400 hover:text-blue-400 transition"
        >
          Copy
        </button>
      </div>

      <div
        className="text-gray-300 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatText(content) }}
      />
    </div>
  );

  return (
    <div className="mt-8 space-y-4">
      {/* ⚡ Quick Insight */}
      {data.explanation && (
        <div
          className="bg-blue-900/20 border border-blue-500 p-4 rounded-xl
                        shadow-[0_0_20px_rgba(59,130,246,0.6)]"
        >
          <p className="text-sm text-blue-300">
            ⚡ <b>Quick Insight:</b> {data.explanation.split(".")[0]}
          </p>
        </div>
      )}

      {/* Sections */}
      {data.explanation && (
        <Section title="Explanation" content={data.explanation} />
      )}

      {data.rootCause && (
        <Section title="Root Cause" content={data.rootCause} />
      )}

      {data.fix && <Section title="Fix" content={data.fix} />}

      {/* Code */}
      {data.improvedCode && (
        <div
          className="bg-black border border-gray-800 p-5 rounded-xl
                        shadow-[0_0_15px_rgba(34,197,94,0.4)]"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg text-green-400">
              Improved Code
            </h2>

            <button
              onClick={() => copy(data.improvedCode)}
              className="text-xs text-gray-400 hover:text-green-400"
            >
              Copy
            </button>
          </div>

          <pre className="bg-black p-3 rounded text-sm overflow-auto whitespace-pre-wrap">
            {data.improvedCode}
          </pre>
        </div>
      )}

      {/* Best Practices */}
      {data.bestPractices && data.bestPractices.length > 0 && (
        <div
          className="bg-black border border-gray-800 p-5 rounded-xl
                        shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          <h2 className="font-semibold text-lg text-purple-400 mb-2">
            Best Practices
          </h2>

          <ul className="list-disc ml-5 text-gray-300 text-sm space-y-1">
            {data.bestPractices.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
