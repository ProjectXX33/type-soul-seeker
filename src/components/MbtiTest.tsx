
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Radio } from "lucide-react";
import { Input } from "@/components/ui/input";
import { calculateMbtiType, saveTestResult } from "@/utils/mbtiUtils";
import { questions } from "@/data/mbtiQuestions";
import { useToast } from "@/hooks/use-toast";

interface MbtiTestProps {
  onCompleteTest: (mbtiType: string, description: string, dimensionScores: any) => void;
}

const MbtiTest = ({ onCompleteTest }: MbtiTestProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userCode, setUserCode] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Check for saved progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("mbtiTestProgress");
    if (savedProgress) {
      try {
        const { savedAnswers, savedIndex, savedUserCode } = JSON.parse(savedProgress);
        setAnswers(savedAnswers || {});
        setCurrentQuestionIndex(savedIndex || 0);
        setUserCode(savedUserCode || "");
        
        // If there's an answer for the current question, select it
        if (savedAnswers && savedAnswers[savedIndex]) {
          setSelectedOption(savedAnswers[savedIndex]);
        }
        
        toast({
          title: "Test Progress Restored",
          description: "We've restored your previous progress.",
        });
      } catch (error) {
        console.error("Error restoring progress:", error);
      }
    }
  }, []);

  // Save progress when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(
        "mbtiTestProgress",
        JSON.stringify({
          savedAnswers: answers,
          savedIndex: currentQuestionIndex,
          savedUserCode: userCode,
        })
      );
    }
  }, [answers, currentQuestionIndex, userCode]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      // Save the answer
      const updatedAnswers = { ...answers, [currentQuestionIndex]: selectedOption };
      setAnswers(updatedAnswers);
      
      // Move to next question or complete the test
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(answers[currentQuestionIndex + 1] || null);
      } else {
        // Calculate the results and complete the test
        const result = calculateMbtiType(updatedAnswers);
        
        // Clear saved progress
        localStorage.removeItem("mbtiTestProgress");
        
        // Save result if user provided a code
        if (userCode.trim()) {
          saveTestResult(userCode, updatedAnswers);
        }
        
        onCompleteTest(result.type, result.description, result.dimensionScores);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || null);
    }
  };

  const handleSaveAndExit = () => {
    setIsSaving(true);
    // Save current progress and generate a recovery code
    const recoveryCode = userCode || `mbti-${Math.random().toString(36).substring(2, 8)}`;
    
    // Update userCode if not set yet
    if (!userCode) {
      setUserCode(recoveryCode);
    }
    
    // Save the progress with the code
    localStorage.setItem(
      "mbtiTestProgress",
      JSON.stringify({
        savedAnswers: answers,
        savedIndex: currentQuestionIndex,
        savedUserCode: recoveryCode,
      })
    );
    
    toast({
      title: "Progress Saved",
      description: `Use this code to resume later: ${recoveryCode}`,
    });
    
    setIsSaving(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium text-purple-600">{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-medium text-gray-900">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOption === option.value
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                  selectedOption === option.value ? "bg-purple-600" : "bg-gray-200"
                }`}>
                  {selectedOption === option.value && (
                    <Radio className="h-4 w-4 text-white" />
                  )}
                </div>
                <div>{option.text}</div>
              </div>
            ))}
          </div>
          
          {/* User Code Input */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Enter a unique code to save/resume your progress later:</p>
            <Input
              placeholder="Your unique code (optional)"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="outline"
            onClick={handleSaveAndExit}
            disabled={Object.keys(answers).length === 0}
            className="text-purple-600 border-purple-200"
          >
            Save & Exit
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`bg-purple-600 hover:bg-purple-700 ${!selectedOption ? 'opacity-50' : ''}`}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Complete Test"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MbtiTest;
