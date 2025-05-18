
import { useState, useEffect } from "react";
import ValuesTest from "@/components/ValuesTest";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const ValuesPage = () => {
  const [testCompleted, setTestCompleted] = useState(false);
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
      setTestCompleted(true);
    }
  }, [navigate, toast]);

  const handleCompleteTest = (results: Record<number, number>) => {
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
    setTestCompleted(true);
    
    toast({
      title: "Values Assessment Complete",
      description: "Your responses have been saved. Continue to the next assessment.",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/aptitude-matrix">
            <Button variant="outline" className="text-black border-black hover:bg-zinc-100">
              &larr; Back to Aptitude Matrix
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-black">Personal Values Assessment</h1>
        </div>

        {!testCompleted ? (
          <ValuesTest onCompleteTest={handleCompleteTest} />
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold text-black">Values Assessment Completed</h2>
                <p className="text-gray-600">Your responses have been saved. Continue to the next assessment to see your full results at the end.</p>
                
                <div className="flex justify-center mt-8">
                  <Link to="/gardner">
                    <Button className="bg-black hover:bg-zinc-800 text-white">
                      Continue to Gardner Test
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ValuesPage;
