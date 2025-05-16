
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { personalityTypes } from "@/data/mbtiTypes";

interface MbtiResultsProps {
  type: string;
  description: string;
  onRetakeTest: () => void;
}

const MbtiResults = ({ type, description, onRetakeTest }: MbtiResultsProps) => {
  const personalityData = personalityTypes[type as keyof typeof personalityTypes] || {
    name: "Unknown",
    title: "Your results couldn't be determined",
    description: "Please try taking the test again.",
    strengths: [],
    weaknesses: [],
    careers: []
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Your Personality Type</h1>
          <div className="mt-4 flex items-baseline">
            <span className="text-5xl font-extrabold tracking-tight">{type}</span>
            <span className="ml-3 text-xl font-medium opacity-90">({personalityData.name})</span>
          </div>
          <p className="mt-3 text-xl opacity-90">{personalityData.title}</p>
        </div>

        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">{description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 mb-2">Strengths</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {personalityData.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-700">{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-red-800 mb-2">Potential Challenges</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {personalityData.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-gray-700">{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Recommended Career Paths</h3>
              <ul className="list-disc pl-5 space-y-1">
                {personalityData.careers.map((career, index) => (
                  <li key={index} className="text-gray-700">{career}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={onRetakeTest}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            Take Test Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MbtiResults;
