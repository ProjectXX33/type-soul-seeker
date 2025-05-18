
import { useState, useEffect } from "react";
import GardnerTest from "@/components/GardnerTest";
import GardnerResults from "@/components/GardnerResults";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

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
    const valuesCompleted = allResults.some((r: any) => r.testType === 'values');
    
    if (!mbtiCompleted || !riasecCompleted || !aptitudeCompleted || !valuesCompleted) {
      toast({
        title: "Test Sequence Required",
        description: "Please complete the previous tests first.",
        variant: "destructive"
      });
      
      if (!valuesCompleted && mbtiCompleted && riasecCompleted && aptitudeCompleted) {
        navigate('/values');
      } else if (!aptitudeCompleted && mbtiCompleted && riasecCompleted) {
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
    
    // Show completion toast
    toast({
      title: "Final Assessment Complete!",
      description: "You've completed all tests. View your comprehensive results now.",
    });
    
    // Automatically navigate to all results
    navigate('/all-results');
  };

  const handleRetakeTest = () => {
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/values">
            <Button variant="outline" className="text-black border-black hover:bg-zinc-100">
              &larr; Back to Values Assessment
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-black">Gardner's Multiple Intelligences Assessment</h1>
        </div>

        {!testCompleted ? (
          <GardnerTest onCompleteTest={handleCompleteTest} />
        ) : (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-semibold text-black">Gardner Assessment Completed</h2>
                  <p className="text-gray-600">View your comprehensive results now!</p>
                  
                  <div className="flex justify-center mt-8">
                    <Link to="/all-results">
                      <Button className="bg-black hover:bg-gray-800 text-white">
                        View All Results
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GardnerPage;
