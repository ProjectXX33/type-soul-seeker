
import AptitudeMatrixComponent from "@/components/AptitudeMatrix";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AptitudeMatrixPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if previous tests were completed
    const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const mbtiCompleted = allResults.some((r: any) => r.testType === 'mbti');
    const riasecCompleted = allResults.some((r: any) => r.testType === 'riasec');
    
    if (!mbtiCompleted || !riasecCompleted) {
      toast({
        title: "Test Sequence Required",
        description: "Please complete the previous tests first.",
        variant: "destructive"
      });
      
      if (!riasecCompleted && mbtiCompleted) {
        navigate('/riasec');
      } else {
        navigate('/');
      }
      return;
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/riasec">
            <Button variant="outline" className="text-black border-black hover:bg-zinc-100">
              &larr; Back to RIASEC
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-black">Aptitude Matrix Assessment</h1>
        </div>

        <AptitudeMatrixComponent />

        <div className="flex justify-center mt-8">
          <Link to="/values">
            <Button className="bg-black hover:bg-zinc-800 text-white">
              Continue to Values Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AptitudeMatrixPage;
