
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gardnerQuestions } from "@/data/gardnerQuestions";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GardnerTestProps {
  onCompleteTest: (results: Record<string, number>) => void;
}

const GardnerTest = ({ onCompleteTest }: GardnerTestProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const questionsPerPage = 10;
  const totalPages = Math.ceil(gardnerQuestions.length / questionsPerPage);
  const progress = (currentPage / totalPages) * 100;

  const currentQuestions = gardnerQuestions.slice(
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
    // Initialize scores for each intelligence type
    const scores: Record<string, { total: number, count: number }> = {
      linguistic: { total: 0, count: 0 },
      logical: { total: 0, count: 0 },
      spatial: { total: 0, count: 0 },
      musical: { total: 0, count: 0 },
      kinesthetic: { total: 0, count: 0 },
      interpersonal: { total: 0, count: 0 },
      intrapersonal: { total: 0, count: 0 },
      naturalist: { total: 0, count: 0 }
    };

    // Calculate raw scores
    gardnerQuestions.forEach(question => {
      const answer = answers[question.id] || 0;
      scores[question.type].total += answer;
      scores[question.type].count += 1;
    });

    // Convert to percentages (out of 100)
    const percentageScores: Record<string, number> = {};
    Object.entries(scores).forEach(([type, data]) => {
      const maxPossible = data.count * 5; // 5 is max score per question
      percentageScores[type] = Math.round((data.total / maxPossible) * 100);
    });

    onCompleteTest(percentageScores);
  };

  const isCurrentPageComplete = currentQuestions.every(
    (question) => answers[question.id] !== undefined
  );

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-2xl font-bold text-green-800">
            Multiple Intelligences Assessment
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
            For each statement, indicate how much you agree from 1 (Not at all like me) to 5 (Very much like me).
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
                      {value === 1 && <span className="text-xs text-gray-500 mt-1">Not at all like me</span>}
                      {value === 3 && <span className="text-xs text-gray-500 mt-1">Somewhat like me</span>}
                      {value === 5 && <span className="text-xs text-gray-500 mt-1">Very much like me</span>}
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
              className="bg-green-600 hover:bg-green-700"
            >
              {currentPage === totalPages - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GardnerTest;
