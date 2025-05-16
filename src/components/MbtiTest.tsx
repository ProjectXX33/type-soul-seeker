
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Radio } from "lucide-react";
import { calculateMbtiType } from "@/utils/mbtiUtils";
import { questions } from "@/data/mbtiQuestions";

interface MbtiTestProps {
  onCompleteTest: (mbtiType: string, description: string) => void;
}

const MbtiTest = ({ onCompleteTest }: MbtiTestProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      // Save the answer
      setAnswers({ ...answers, [currentQuestionIndex]: selectedOption });
      
      // Move to next question or complete the test
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        // Calculate the results
        const result = calculateMbtiType(answers);
        onCompleteTest(result.type, result.description);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || null);
    }
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
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
