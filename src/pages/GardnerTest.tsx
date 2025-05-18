
import { useState, useEffect } from "react";
import GardnerTest from "@/components/GardnerTest";
import GardnerResults from "@/components/GardnerResults";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const GardnerPage = () => {
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if previous tests were completed
    const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const mbtiCompleted = allResults.some((r: any) => r.testType === 'mbti');
    const riasecCompleted = allResults.some((r: any) => r.testType === 'riasec');
    const aptitudeCompleted = allResults.some((r: any) => r.testType === 'aptitude');
    
    if (!mbtiCompleted || !riasecCompleted || !aptitudeCompleted) {
      toast({
        title: "Test Sequence Required",
        description: "Please complete the previous tests first.",
        variant: "destructive"
      });
      
      if (!aptitudeCompleted && mbtiCompleted && riasecCompleted) {
        navigate('/aptitude-matrix');
      } else if (!riasecCompleted && mbtiCompleted) {
        navigate('/riasec');
      } else {
        navigate('/');
      }
      return;
    }
    
    // Check if Gardner was already completed
    const gardnerCompleted = allResults.some((r: any) => r.testType === 'gardner');
    if (gardnerCompleted) {
      const gardnerResult = allResults.find((r: any) => r.testType === 'gardner');
      if (gardnerResult) {
        setResults(gardnerResult.data.scores);
        setTestCompleted(true);
      }
    }
  }, [navigate, toast]);

  const handleCompleteTest = (scores: Record<string, number>) => {
    setResults(scores);
    setTestCompleted(true);
    
    // Save Gardner results to localStorage
    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const gardnerResults = {
      testType: 'gardner',
      timestamp: new Date().toISOString(),
      data: {
        scores
      }
    };
    
    localStorage.setItem('testResults', JSON.stringify([...existingResults, gardnerResults]));
  };

  const handleRetakeTest = () => {
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/aptitude-matrix">
            <Button variant="outline" className="text-amber-600">
              &larr; Back to Aptitude Matrix
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-green-800">Gardner's Multiple Intelligences Assessment</h1>
        </div>

        {!testCompleted ? (
          <GardnerTest onCompleteTest={handleCompleteTest} />
        ) : (
          <div className="space-y-6">
            <GardnerResults 
              scores={results}
              onRetakeTest={handleRetakeTest}
            />
            
            <div className="flex justify-center mt-8">
              <Link to="/all-results">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  View All Results
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GardnerPage;
