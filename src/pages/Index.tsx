
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import MbtiTest from "@/components/MbtiTest";
import MbtiResults from "@/components/MbtiResults";

const Index = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState({ type: "", description: "" });

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleCompleteTest = (mbtiType: string, description: string) => {
    setResults({ type: mbtiType, description });
    setTestCompleted(true);
    setTestStarted(false);
  };

  const handleRetakeTest = () => {
    setTestStarted(true);
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {!testStarted && !testCompleted && (
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 sm:text-4xl">
                MBTI Personality Test
              </CardTitle>
              <CardDescription className="mt-4 text-lg text-gray-600">
                Discover your personality type with our Myers-Briggs Type Indicator assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-gray-600">
                  The MBTI assessment helps you understand your psychological preferences in how you perceive the world and make decisions.
                </p>
                <div className="flex flex-wrap justify-center gap-6 mt-6">
                  <div className="bg-purple-50 p-4 rounded-lg text-center w-full sm:w-5/12">
                    <h3 className="font-medium text-purple-800">Extraversion (E) vs Introversion (I)</h3>
                    <p className="text-sm text-gray-600">How you focus your attention and energy</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center w-full sm:w-5/12">
                    <h3 className="font-medium text-blue-800">Sensing (S) vs Intuition (N)</h3>
                    <p className="text-sm text-gray-600">How you perceive information</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center w-full sm:w-5/12">
                    <h3 className="font-medium text-green-800">Thinking (T) vs Feeling (F)</h3>
                    <p className="text-sm text-gray-600">How you make decisions</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center w-full sm:w-5/12">
                    <h3 className="font-medium text-amber-800">Judging (J) vs Perceiving (P)</h3>
                    <p className="text-sm text-gray-600">How you approach the outside world</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={handleStartTest}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-md text-lg"
              >
                Start Test
              </Button>
            </CardFooter>
          </Card>
        )}

        {testStarted && <MbtiTest onCompleteTest={handleCompleteTest} />}

        {testCompleted && (
          <MbtiResults type={results.type} description={results.description} onRetakeTest={handleRetakeTest} />
        )}
      </div>
    </div>
  );
};

export default Index;
