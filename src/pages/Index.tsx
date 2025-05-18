
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import MbtiTest from "@/components/MbtiTest";
import MbtiResults from "@/components/MbtiResults";
import { Link } from "react-router-dom";

const Index = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState({ 
    type: "", 
    description: "",
    dimensionScores: null 
  });

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleCompleteTest = (mbtiType: string, description: string, dimensionScores: any) => {
    setResults({ type: mbtiType, description, dimensionScores });
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Personality Assessment Suite</h1>
          <Link to="/admin">
            <Button variant="outline" size="sm" className="text-gray-600">
              Admin Login
            </Button>
          </Link>
        </div>

        {!testStarted && !testCompleted ? (
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Complete Assessment Journey
              </CardTitle>
              <CardDescription className="mt-4 text-lg text-gray-600">
                Discover yourself through our sequential assessment tests
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Step 1: MBTI Personality Test</h3>
                  <p className="text-gray-600 mb-4">Discover your personality type with the Myers-Briggs Type Indicator assessment.</p>
                  <Button 
                    onClick={handleStartTest}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                  >
                    Start MBTI Test
                  </Button>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Step 2: RIASEC Career Test</h3>
                  <p className="text-gray-600 mb-4">Identify your career interests and matching occupations based on Holland's theory.</p>
                  <Link to="/riasec">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                      disabled={!testCompleted}
                    >
                      {testCompleted ? "Continue to RIASEC Test" : "Complete MBTI Test First"}
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Step 3: Multiple Intelligences</h3>
                  <p className="text-gray-600 mb-4">Explore Gardner's theory of multiple intelligences and discover your unique strengths.</p>
                  <Link to="/gardner">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white px-6"
                      disabled={!testCompleted}
                    >
                      {testCompleted ? "Continue to MI Test" : "Complete Previous Tests First"}
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-100">
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">Step 4: Aptitude Matrix</h3>
                  <p className="text-gray-600 mb-4">Plot your skills and interests to identify your strengths and areas for growth.</p>
                  <Link to="/aptitude-matrix">
                    <Button 
                      className="bg-amber-600 hover:bg-amber-700 text-white px-6"
                      disabled={!testCompleted}
                    >
                      {testCompleted ? "Continue to Aptitude Matrix" : "Complete Previous Tests First"}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {testStarted && <MbtiTest onCompleteTest={handleCompleteTest} />}

        {testCompleted && (
          <div className="space-y-6">
            <MbtiResults 
              type={results.type} 
              description={results.description} 
              dimensionScores={results.dimensionScores}
              onRetakeTest={handleRetakeTest} 
            />
            
            <div className="flex justify-center mt-8">
              <Link to="/riasec">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Continue to RIASEC Test
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
