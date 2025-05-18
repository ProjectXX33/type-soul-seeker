
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { personalityTypes } from "@/data/mbtiTypes";
import { Progress } from "@/components/ui/progress";

interface DimensionScores {
  ei: { e: number; i: number };
  sn: { s: number; n: number };
  tf: { t: number; f: number };
  jp: { j: number; p: number };
}

interface MbtiResultsProps {
  type: string;
  description: string;
  dimensionScores?: DimensionScores;
  onRetakeTest: () => void;
}

const MbtiResults = ({ type, description, dimensionScores, onRetakeTest }: MbtiResultsProps) => {
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
            
            {dimensionScores && (
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Your Dimension Scores</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-blue-600">Extraversion (E) {dimensionScores.ei.e}%</span>
                      <span className="text-sm font-medium text-indigo-600">Introversion (I) {dimensionScores.ei.i}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${dimensionScores.ei.e}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-green-600">Sensing (S) {dimensionScores.sn.s}%</span>
                      <span className="text-sm font-medium text-teal-600">Intuition (N) {dimensionScores.sn.n}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${dimensionScores.sn.s}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-amber-600">Thinking (T) {dimensionScores.tf.t}%</span>
                      <span className="text-sm font-medium text-red-600">Feeling (F) {dimensionScores.tf.f}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-amber-600 h-2.5 rounded-full" 
                        style={{ width: `${dimensionScores.tf.t}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-purple-600">Judging (J) {dimensionScores.jp.j}%</span>
                      <span className="text-sm font-medium text-pink-600">Perceiving (P) {dimensionScores.jp.p}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full" 
                        style={{ width: `${dimensionScores.jp.j}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
            className="border-purple-300 text-purple-700 hover:bg-purple-50 mr-4"
          >
            Take Test Again
          </Button>
          
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            Print Results
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MbtiResults;
