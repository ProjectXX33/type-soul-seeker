
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTestResults } from "@/utils/mbtiUtils";

const Dashboard = () => {
  const [mbtiResults, setMbtiResults] = useState([]);
  const [typeStats, setTypeStats] = useState<Record<string, number>>({});
  const [totalTests, setTotalTests] = useState(0);
  const [allResults, setAllResults] = useState<any[]>([]);
  
  useEffect(() => {
    // Get MBTI results from the mbtiUtils (for backward compatibility)
    const data = getTestResults();
    setMbtiResults(data);
    
    // Calculate statistics
    const total = data.length;
    setTotalTests(total);
    
    // Count occurrences of each personality type
    const typeCounts: Record<string, number> = {};
    data.forEach((result: any) => {
      const type = result.result.type;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    setTypeStats(typeCounts);
    
    // Get all test results from localStorage
    const storedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    setAllResults(storedResults);
  }, []);
  
  // Get the top 3 most common types
  const topTypes = Object.entries(typeStats)
    .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
    .slice(0, 3);
  
  // Count test types
  const testCounts = {
    mbti: allResults.filter(r => r.testType === 'mbti').length,
    riasec: allResults.filter(r => r.testType === 'riasec').length,
    aptitude: allResults.filter(r => r.testType === 'aptitude').length,
    gardner: allResults.filter(r => r.testType === 'gardner').length,
  };
  
  // Calculate completed assessment sequences
  const completedSequences = allResults.filter(r => r.testType === 'gardner').length;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total MBTI Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{testCounts.mbti}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total RIASEC Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{testCounts.riasec}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Aptitude Matrices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{testCounts.aptitude}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Gardner Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{testCounts.gardner}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Assessment Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold mb-4">
            {completedSequences} users completed all assessments
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <div className="font-medium text-purple-800">MBTI</div>
              <div className="text-2xl font-bold mt-2">{testCounts.mbti}</div>
              <div className="text-sm mt-1">Tests</div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="font-medium text-blue-800">RIASEC</div>
              <div className="text-2xl font-bold mt-2">{testCounts.riasec}</div>
              <div className="text-sm mt-1">Tests</div>
            </div>
            <div className="bg-amber-100 p-4 rounded-lg text-center">
              <div className="font-medium text-amber-800">Aptitude</div>
              <div className="text-2xl font-bold mt-2">{testCounts.aptitude}</div>
              <div className="text-sm mt-1">Tests</div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="font-medium text-green-800">Gardner</div>
              <div className="text-2xl font-bold mt-2">{testCounts.gardner}</div>
              <div className="text-sm mt-1">Tests</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Personality Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(typeStats).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{type}</span>
                <span className="text-sm text-gray-500">
                  {count} ({totalTests > 0 ? Math.round((count as number) / totalTests * 100) : 0}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
