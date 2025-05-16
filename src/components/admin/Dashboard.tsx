
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTestResults } from "@/utils/mbtiUtils";

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [typeStats, setTypeStats] = useState<Record<string, number>>({});
  const [totalTests, setTotalTests] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const data = getTestResults();
    setResults(data);
    
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
  }, []);
  
  // Get the top 3 most common types
  const topTypes = Object.entries(typeStats)
    .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tests Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTests}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(results.map((r: any) => r.userCode)).size}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Most Common Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {topTypes.length > 0 ? topTypes[0][0] : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>
      
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
