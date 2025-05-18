
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="bg-black text-white p-6">
          <h1 className="text-3xl font-bold">MBTI Assessment Complete</h1>
          <p className="mt-3 text-xl opacity-90">Your personality type has been recorded</p>
        </div>

        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Your MBTI type is <strong>{type}</strong>. Continue with all the assessments to see your complete results at the end.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={onRetakeTest}
            variant="outline"
            className="border-black text-black hover:bg-gray-100 mr-4"
          >
            Take Test Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MbtiResults;
