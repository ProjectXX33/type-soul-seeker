
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { riasecTypes } from "@/data/riasecQuestions";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface RiasecResultsProps {
  code: string;
  scores: Record<string, number>;
  onRetakeTest: () => void;
}

const RiasecResults = ({ code, scores, onRetakeTest }: RiasecResultsProps) => {
  // Get top 3 types
  const topTypes = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  // Primary type (highest score)
  const primaryType = topTypes[0][0];
  
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Your RIASEC Results</h1>
          <div className="mt-4 flex items-baseline">
            <span className="text-5xl font-extrabold tracking-tight">{code}</span>
            <span className="ml-3 text-xl font-medium opacity-90">
              ({code.split('').map(letter => riasecTypes[letter as keyof typeof riasecTypes].name).join(", ")})
            </span>
          </div>
          <p className="mt-3 text-xl opacity-90">Your primary interest area: {riasecTypes[primaryType as keyof typeof riasecTypes].name}</p>
        </div>

        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              {riasecTypes[primaryType as keyof typeof riasecTypes].description}
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-800 mb-4">Your Interest Profile</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-blue-600">Realistic (R) {scores.R}%</span>
                  </div>
                  <Progress value={scores.R} className="h-2.5" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-indigo-600">Investigative (I) {scores.I}%</span>
                  </div>
                  <Progress value={scores.I} className="h-2.5 bg-gray-200">
                    <div className="h-2.5 bg-indigo-600 rounded-full" style={{ width: `${scores.I}%` }} />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-purple-600">Artistic (A) {scores.A}%</span>
                  </div>
                  <Progress value={scores.A} className="h-2.5 bg-gray-200">
                    <div className="h-2.5 bg-purple-600 rounded-full" style={{ width: `${scores.A}%` }} />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-pink-600">Social (S) {scores.S}%</span>
                  </div>
                  <Progress value={scores.S} className="h-2.5 bg-gray-200">
                    <div className="h-2.5 bg-pink-600 rounded-full" style={{ width: `${scores.S}%` }} />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-amber-600">Enterprising (E) {scores.E}%</span>
                  </div>
                  <Progress value={scores.E} className="h-2.5 bg-gray-200">
                    <div className="h-2.5 bg-amber-600 rounded-full" style={{ width: `${scores.E}%` }} />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-green-600">Conventional (C) {scores.C}%</span>
                  </div>
                  <Progress value={scores.C} className="h-2.5 bg-gray-200">
                    <div className="h-2.5 bg-green-600 rounded-full" style={{ width: `${scores.C}%` }} />
                  </Progress>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-blue-800 mb-3">Recommended Career Paths</h3>
              <p className="mb-4">Based on your top interest area ({riasecTypes[primaryType as keyof typeof riasecTypes].name}), 
              these career paths might be a good fit for you:</p>
              <ul className="list-disc pl-5 space-y-1">
                {riasecTypes[primaryType as keyof typeof riasecTypes].careers.map((career, index) => (
                  <li key={index} className="text-gray-700">{career}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6 space-x-4">
          <Button
            onClick={onRetakeTest}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            Take Test Again
          </Button>
          
          <Link to="/gardner">
            <Button
              className="bg-green-600 hover:bg-green-700"
            >
              Continue to Multiple Intelligences
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RiasecResults;
