
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTestResults } from "@/utils/mbtiUtils";
import { ArrowLeft } from "lucide-react";

const ResultDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call to get a specific result
    const results = getTestResults();
    const index = parseInt(id || "0");
    
    if (results && results[index]) {
      setResult(results[index]);
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (!result) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Result not found</p>
        <Link to="/admin/results">
          <Button className="mt-4">Back to Results</Button>
        </Link>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin/results">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              User Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{result.userCode}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{formatDate(result.timestamp)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Personality Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{result.result.type}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dimension Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Extraversion (E) vs Introversion (I)</h3>
              <div className="flex gap-4">
                <div className="bg-blue-100 p-2 rounded text-center flex-1">
                  <p className="text-sm text-gray-600">E Score</p>
                  <p className="text-xl font-bold">{result.result.raw.e}</p>
                </div>
                <div className="bg-indigo-100 p-2 rounded text-center flex-1">
                  <p className="text-sm text-gray-600">I Score</p>
                  <p className="text-xl font-bold">{result.result.raw.i}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Sensing (S) vs Intuition (N)</h3>
              <div className="flex gap-4">
                <div className="bg-green-100 p-2 rounded text-center flex-1">
                  <p className="text-sm text-gray-600">S Score</p>
                  <p className="text-xl font-bold">{result.result.raw.s}</p>
                </div>
                <div className="bg-teal-100 p-2 rounded text-center flex-1">
                  <p className="text-sm text-gray-600">N Score</p>
                  <p className="text-xl font-bold">{result.result.raw.n}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Thinking (T) vs Feeling (F)</h3>
              <div className="flex gap-4">
                <div className="bg-amber-100 p-2 rounded text-center flex-1">
                  <p className="text-sm text-gray-600">T Score</p>
                  <p className="text-xl font-bold">{result.result.raw.t}</p>
                </div>
                <div className="bg-red-100 p-2 rounded text-center flex-1">
                  <p className="text-sm text-gray-600">F Score</p>
                  <p className="text-xl font-bold">{result.result.raw.f}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Judging (J) vs Perceiving (P)</h3>
              <div className="flex gap-4">
                <div className="bg-purple-100 p-2 rounded text-center flex-1">
                  <p className="text-sm text-gray-600">J Score</p>
                  <p className="text-xl font-bold">{result.result.raw.j}</p>
                </div>
                <div className="bg-pink-100 p-2 rounded text-center flex-1">
                  <p className="text-sm text-gray-600">P Score</p>
                  <p className="text-xl font-bold">{result.result.raw.p}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Question Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(result.answers).map(([questionIndex, answer]) => (
              <div key={questionIndex} className="border p-2 rounded">
                <p className="text-sm font-medium">Question {parseInt(questionIndex) + 1}</p>
                <p className="text-sm text-gray-600">Answer: {answer === 'a' ? 'A' : 'B'}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultDetail;
