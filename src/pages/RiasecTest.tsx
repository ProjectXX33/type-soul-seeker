
import { useState } from "react";
import RiasecTest from "@/components/RiasecTest";
import RiasecResults from "@/components/RiasecResults";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RiasecPage = () => {
  const [testCompleted, setTestCompleted] = useState(false);
  const [riasecCode, setRiasecCode] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleCompleteTest = (code: string, testScores: Record<string, number>) => {
    setRiasecCode(code);
    setScores(testScores);
    setTestCompleted(true);
  };

  const handleRetakeTest = () => {
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" className="text-blue-600">
              &larr; Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-blue-800">RIASEC Career Interest Assessment</h1>
        </div>

        {!testCompleted ? (
          <RiasecTest onCompleteTest={handleCompleteTest} />
        ) : (
          <RiasecResults 
            code={riasecCode}
            scores={scores}
            onRetakeTest={handleRetakeTest}
          />
        )}
      </div>
    </div>
  );
};

export default RiasecPage;
