
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import MbtiTest from "@/components/MbtiTest";
import MbtiResults from "@/components/MbtiResults";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState({ 
    type: "", 
    description: "",
    dimensionScores: null 
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Track completion of each test
  const [testsCompleted, setTestsCompleted] = useState({
    mbti: false,
    riasec: false,
    aptitude: false,
    values: false,
    gardner: false
  });

  useEffect(() => {
    // Check localStorage for test completion
    const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    
    setTestsCompleted({
      mbti: allResults.some((r: any) => r.testType === 'mbti'),
      riasec: allResults.some((r: any) => r.testType === 'riasec'),
      aptitude: allResults.some((r: any) => r.testType === 'aptitude'),
      values: allResults.some((r: any) => r.testType === 'values'),
      gardner: allResults.some((r: any) => r.testType === 'gardner')
    });
    
    // If MBTI is completed, set the test as completed
    if (allResults.some((r: any) => r.testType === 'mbti')) {
      const mbtiResult = allResults.find((r: any) => r.testType === 'mbti');
      if (mbtiResult) {
        setResults({
          type: mbtiResult.data.type,
          description: mbtiResult.data.description,
          dimensionScores: mbtiResult.data.dimensionScores
        });
        setTestCompleted(true);
      }
    }
  }, []);

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleCompleteTest = (mbtiType: string, description: string, dimensionScores: any) => {
    setResults({ type: mbtiType, description, dimensionScores });
    setTestCompleted(true);
    setTestsCompleted(prev => ({...prev, mbti: true}));
    setTestStarted(false);
    
    // Save MBTI results to localStorage
    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const mbtiResults = {
      testType: 'mbti',
      timestamp: new Date().toISOString(),
      data: {
        type: mbtiType,
        description,
        dimensionScores
      }
    };
    
    localStorage.setItem('testResults', JSON.stringify([...existingResults, mbtiResults]));
    
    toast({
      title: "MBTI Assessment Complete",
      description: "Continue to the next assessment in the sequence.",
    });
  };

  const handleRetakeTest = () => {
    setTestStarted(true);
    setTestCompleted(false);
  };

  const allTestsComplete = testsCompleted.mbti && testsCompleted.riasec && 
                          testsCompleted.aptitude && testsCompleted.values && testsCompleted.gardner;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Black Box Assessment Suite</h1>
          <div className="space-x-2">
            {allTestsComplete && (
              <Link to="/all-results">
                <Button variant="outline" size="sm" className="text-black border-black hover:bg-gray-100">
                  View All Results
                </Button>
              </Link>
            )}
            <Link to="/admin">
              <Button variant="outline" size="sm" className="text-gray-600">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>

        {!testStarted && !testCompleted ? (
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center bg-black text-white">
              <CardTitle className="text-3xl font-bold sm:text-4xl">
                Complete Assessment Journey
              </CardTitle>
              <CardDescription className="mt-4 text-lg text-gray-300">
                Discover yourself through our sequential assessment tests
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-2">Step 1: MBTI Personality Test</h3>
                  <p className="text-gray-600 mb-4">Discover your personality type with the Myers-Briggs Type Indicator assessment.</p>
                  <Button 
                    onClick={handleStartTest}
                    className="bg-black hover:bg-gray-800 text-white px-6"
                  >
                    Start MBTI Test
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-2">Step 2: RIASEC Career Test</h3>
                  <p className="text-gray-600 mb-4">Identify your career interests and matching occupations based on Holland's theory.</p>
                  <Link to="/riasec">
                    <Button 
                      className="bg-black hover:bg-gray-800 text-white px-6"
                      disabled={!testsCompleted.mbti}
                    >
                      {testsCompleted.mbti ? "Continue to RIASEC Test" : "Complete MBTI Test First"}
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-2">Step 3: Aptitude Matrix</h3>
                  <p className="text-gray-600 mb-4">Plot your skills and interests to identify your strengths and areas for growth.</p>
                  <Link to="/aptitude-matrix">
                    <Button 
                      className="bg-black hover:bg-gray-800 text-white px-6"
                      disabled={!testsCompleted.mbti || !testsCompleted.riasec}
                    >
                      {testsCompleted.mbti && testsCompleted.riasec ? "Continue to Aptitude Matrix" : "Complete Previous Tests First"}
                    </Button>
                  </Link>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-2">Step 4: Values Assessment</h3>
                  <p className="text-gray-600 mb-4">Identify your core personal values to better understand what truly matters to you.</p>
                  <Link to="/values">
                    <Button 
                      className="bg-black hover:bg-gray-800 text-white px-6"
                      disabled={!testsCompleted.mbti || !testsCompleted.riasec || !testsCompleted.aptitude}
                    >
                      {testsCompleted.mbti && testsCompleted.riasec && testsCompleted.aptitude ? 
                        "Continue to Values Assessment" : "Complete Previous Tests First"}
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-2">Step 5: Multiple Intelligences</h3>
                  <p className="text-gray-600 mb-4">Explore Gardner's theory of multiple intelligences and discover your unique strengths.</p>
                  <Link to="/gardner">
                    <Button 
                      className="bg-black hover:bg-gray-800 text-white px-6"
                      disabled={!testsCompleted.mbti || !testsCompleted.riasec || !testsCompleted.aptitude || !testsCompleted.values}
                    >
                      {testsCompleted.mbti && testsCompleted.riasec && testsCompleted.aptitude && testsCompleted.values ? 
                        "Continue to MI Test" : "Complete Previous Tests First"}
                    </Button>
                  </Link>
                </div>
                
                {allTestsComplete && (
                  <div className="bg-black bg-opacity-5 p-6 rounded-xl shadow-sm border border-black border-opacity-10">
                    <h3 className="text-xl font-semibold text-black mb-2">All Tests Completed!</h3>
                    <p className="text-gray-600 mb-4">You've completed all assessments. View your comprehensive results.</p>
                    <Link to="/all-results">
                      <Button 
                        className="bg-black hover:bg-gray-800 text-white px-6"
                      >
                        View All Results
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {testStarted && <MbtiTest onCompleteTest={handleCompleteTest} />}

        {testCompleted && !testStarted && (
          <div className="space-y-6">
            <MbtiResults 
              type={results.type} 
              description={results.description} 
              dimensionScores={results.dimensionScores}
              onRetakeTest={handleRetakeTest} 
            />
            
            <div className="flex justify-center mt-8">
              <Link to="/riasec">
                <Button className="bg-black hover:bg-gray-800 text-white">
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
