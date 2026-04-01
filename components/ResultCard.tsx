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
  return (
    <div className="mt-8 space-y-6">
      {data.explanation && (
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Explanation</h2>
          <p>{data.explanation}</p>
        </div>
      )}

      {data.rootCause && (
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Root Cause</h2>
          <p>{data.rootCause}</p>
        </div>
      )}

      {data.fix && (
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Fix</h2>
          <p>{data.fix}</p>
        </div>
      )}

      {data.improvedCode && (
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Improved Code</h2>
          <pre className="bg-gray-100 p-3 rounded overflow-auto whitespace-pre-wrap">
            {data.improvedCode}
          </pre>
        </div>
      )}

      {data.bestPractices && data.bestPractices.length > 0 && (
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Best Practices</h2>
          <ul className="list-disc ml-5 space-y-1">
            {data.bestPractices.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
