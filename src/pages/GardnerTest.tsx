
import { useState } from "react";
import GardnerTest from "@/components/GardnerTest";
import GardnerResults from "@/components/GardnerResults";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GardnerPage = () => {
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});

  const handleCompleteTest = (scores: Record<string, number>) => {
    setResults(scores);
    setTestCompleted(true);
  };

  const handleRetakeTest = () => {
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/riasec">
            <Button variant="outline" className="text-green-600">
              &larr; Back to RIASEC
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-green-800">Gardner's Multiple Intelligences Assessment</h1>
        </div>

        {!testCompleted ? (
          <GardnerTest onCompleteTest={handleCompleteTest} />
        ) : (
          <GardnerResults 
            scores={results}
            onRetakeTest={handleRetakeTest}
          />
        )}
      </div>
    </div>
  );
};

export default GardnerPage;
