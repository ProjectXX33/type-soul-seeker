
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { riasecQuestions } from "@/data/riasecQuestions";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RiasecTestProps {
  onCompleteTest: (riasecCode: string, scores: Record<string, number>) => void;
}

const RiasecTest = ({ onCompleteTest }: RiasecTestProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const questionsPerPage = 10;
  const totalPages = Math.ceil(riasecQuestions.length / questionsPerPage);
  const progress = (currentPage / totalPages) * 100;

  const currentQuestions = riasecQuestions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    window.scrollTo(0, 0);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateResults = () => {
    // Calculate score for each RIASEC type
    const scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    riasecQuestions.forEach(question => {
      const answer = answers[question.id] || 0;
      scores[question.type] += answer;
    });
    
    // Normalize scores to percentages
    const maxPossibleScore = 5 * 5; // 5 questions per type * max score of 5
    Object.keys(scores).forEach(type => {
      scores[type] = Math.round((scores[type] / maxPossibleScore) * 100);
    });
    
    // Get top 3 types to create RIASEC code
    const sortedTypes = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
    
    const riasecCode = sortedTypes.slice(0, 3).join("");
    
    onCompleteTest(riasecCode, scores);
  };

  const isCurrentPageComplete = currentQuestions.every(
    (question) => answers[question.id] !== undefined
  );

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-2xl font-bold text-blue-800">
            RIASEC Career Interest Test
          </CardTitle>
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-1">
              Page {currentPage + 1} of {totalPages}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-6 text-gray-600">
            For each statement, indicate how much you agree from 1 (Strongly Disagree) to 5 (Strongly Agree).
          </p>
          <div className="space-y-8">
            {currentQuestions.map((question) => (
              <div key={question.id} className="space-y-3">
                <p className="font-medium">{question.text}</p>
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                  className="flex justify-between"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <RadioGroupItem value={value.toString()} id={`q${question.id}-${value}`} />
                      <Label htmlFor={`q${question.id}-${value}`} className="mt-1 text-sm">
                        {value}
                      </Label>
                      {value === 1 && <span className="text-xs text-gray-500 mt-1">Strongly Disagree</span>}
                      {value === 3 && <span className="text-xs text-gray-500 mt-1">Neutral</span>}
                      {value === 5 && <span className="text-xs text-gray-500 mt-1">Strongly Agree</span>}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-10">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isCurrentPageComplete}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentPage === totalPages - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiasecTest;
