
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { gardnerTypes } from "@/data/gardnerQuestions";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface GardnerResultsProps {
  scores: Record<string, number>;
  onRetakeTest: () => void;
}

const GardnerResults = ({ scores, onRetakeTest }: GardnerResultsProps) => {
  // Sort intelligences by score (highest first)
  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);
  
  // Get top 3 intelligences
  const topIntelligences = sortedScores.slice(0, 3);
  
  // Primary intelligence (highest score)
  const primaryIntelligence = topIntelligences[0][0];
  
  // Colors for the different intelligence bars
  const colors: Record<string, string> = {
    linguistic: "blue",
    logical: "indigo",
    spatial: "purple",
    musical: "pink",
    kinesthetic: "red",
    interpersonal: "orange",
    intrapersonal: "amber",
    naturalist: "green"
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-black to-gray-800 p-6 text-white">
          <h1 className="text-3xl font-bold">Your Multiple Intelligences Profile</h1>
          <div className="mt-4">
            <p className="text-xl font-medium">
              Your dominant intelligence: {gardnerTypes[primaryIntelligence as keyof typeof gardnerTypes].name}
            </p>
          </div>
          <p className="mt-2 text-lg opacity-90">
            You have a unique combination of intelligences that shape how you learn and interact with the world
          </p>
        </div>

        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              {gardnerTypes[primaryIntelligence as keyof typeof gardnerTypes].description}
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-800 mb-4">Your Intelligence Profile</h3>
              
              <div className="space-y-6">
                {sortedScores.map(([type, score]) => (
                  <div key={type}>
                    <div className="flex justify-between mb-1">
                      <span className={`text-sm font-medium text-${colors[type]}-600`}>
                        {gardnerTypes[type as keyof typeof gardnerTypes].name} ({score}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`bg-${colors[type]}-600 h-2.5 rounded-full`} 
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-green-800 mb-3">Your Key Strengths</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {gardnerTypes[primaryIntelligence as keyof typeof gardnerTypes].strengths.map((strength, index) => (
                    <li key={index} className="text-gray-700">{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-800 mb-3">Recommended Careers</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {gardnerTypes[primaryIntelligence as keyof typeof gardnerTypes].careers.slice(0, 6).map((career, index) => (
                    <li key={index} className="text-gray-700">{career}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6 space-x-4">
          <Button
            onClick={onRetakeTest}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            Take Test Again
          </Button>
          
          <Link to="/all-results">
            <Button
              className="bg-black hover:bg-gray-800 text-white"
            >
              View All Results
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GardnerResults;
