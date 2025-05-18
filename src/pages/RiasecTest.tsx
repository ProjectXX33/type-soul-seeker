
import { useState, useEffect } from "react";
import RiasecTest from "@/components/RiasecTest";
import RiasecResults from "@/components/RiasecResults";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const RiasecPage = () => {
  const [testCompleted, setTestCompleted] = useState(false);
  const [riasecCode, setRiasecCode] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if MBTI was completed
    const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const mbtiCompleted = allResults.some((r: any) => r.testType === 'mbti');
    
    if (!mbtiCompleted) {
      toast({
        title: "Test Sequence Required",
        description: "Please complete the MBTI test first.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
    
    // Check if RIASEC was already completed
    const riasecCompleted = allResults.some((r: any) => r.testType === 'riasec');
    if (riasecCompleted) {
      const riasecResult = allResults.find((r: any) => r.testType === 'riasec');
      if (riasecResult) {
        setRiasecCode(riasecResult.data.code);
        setScores(riasecResult.data.scores);
        setTestCompleted(true);
      }
    }
  }, [navigate, toast]);

  const handleCompleteTest = (code: string, testScores: Record<string, number>) => {
    setRiasecCode(code);
    setScores(testScores);
    setTestCompleted(true);
    
    // Save RIASEC results to localStorage
    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const riasecResults = {
      testType: 'riasec',
      timestamp: new Date().toISOString(),
      data: {
        code,
        scores: testScores
      }
    };
    
    localStorage.setItem('testResults', JSON.stringify([...existingResults, riasecResults]));
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
          <div className="space-y-6">
            <RiasecResults 
              code={riasecCode}
              scores={scores}
              onRetakeTest={handleRetakeTest}
            />
            
            <div className="flex justify-center mt-8">
              <Link to="/aptitude-matrix">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Continue to Aptitude Matrix
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiasecPage;
