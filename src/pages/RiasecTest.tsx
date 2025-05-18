
import { useState, useEffect } from "react";
import RiasecTest from "@/components/RiasecTest";
import RiasecResults from "@/components/RiasecResults";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

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
    
    toast({
      title: "RIASEC Assessment Complete",
      description: "Continue to the next assessment in the sequence.",
    });
  };

  const handleRetakeTest = () => {
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" className="text-black border-black hover:bg-zinc-100">
              &larr; Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-black">RIASEC Career Interest Assessment</h1>
        </div>

        {!testCompleted ? (
          <RiasecTest onCompleteTest={handleCompleteTest} />
        ) : (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-semibold text-black">RIASEC Assessment Complete</h2>
                  <p className="text-gray-600">Your career code is <strong>{riasecCode}</strong>. Continue to the next assessment in the sequence.</p>
                  
                  <div className="flex justify-center mt-8">
                    <Link to="/aptitude-matrix">
                      <Button className="bg-black hover:bg-gray-800 text-white">
                        Continue to Aptitude Matrix
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4">
                    <Button
                      onClick={handleRetakeTest}
                      variant="outline"
                      className="text-black border-black hover:bg-gray-100"
                    >
                      Take Test Again
                    </Button>
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

export default RiasecPage;
