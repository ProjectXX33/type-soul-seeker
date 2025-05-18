
import { useState, useEffect } from "react";
import ValuesTest from "@/components/ValuesTest";
import ValuesResults from "@/components/ValuesResults";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ValuesPage = () => {
  const [testCompleted, setTestCompleted] = useState(false);
  const [rankings, setRankings] = useState<Record<number, number>>({});
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
    
    // Check if Values test was already completed
    const valuesCompleted = allResults.some((r: any) => r.testType === 'values');
    if (valuesCompleted) {
      const valuesResult = allResults.find((r: any) => r.testType === 'values');
      if (valuesResult) {
        setRankings(valuesResult.data.rankings);
        setTestCompleted(true);
      }
    }
  }, [navigate, toast]);

  const handleCompleteTest = (results: Record<number, number>) => {
    setRankings(results);
    setTestCompleted(true);
    
    // Save Values results to localStorage
    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const valuesResults = {
      testType: 'values',
      timestamp: new Date().toISOString(),
      data: {
        rankings: results
      }
    };
    
    localStorage.setItem('testResults', JSON.stringify([...existingResults, valuesResults]));
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
          <h1 className="text-2xl font-bold text-purple-800">Personal Values Assessment</h1>
        </div>

        {!testCompleted ? (
          <ValuesTest onCompleteTest={handleCompleteTest} />
        ) : (
          <div className="space-y-6">
            <ValuesResults 
              rankings={rankings}
              onRetakeTest={handleRetakeTest}
            />
            
            <div className="flex justify-center mt-8">
              <Link to="/gardner">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Continue to Gardner Test
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValuesPage;
