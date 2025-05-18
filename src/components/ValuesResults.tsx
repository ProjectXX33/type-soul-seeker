
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { valuesList } from "@/data/valuesData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ValuesResultsProps {
  rankings: Record<number, number>;
  onRetakeTest: () => void;
}

const ValuesResults = ({ rankings, onRetakeTest }: ValuesResultsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Group values by their importance rankings
  const valuesByImportance: Record<number, typeof valuesList> = {
    5: [],
    4: [],
    3: [],
    2: [],
    1: []
  };
  
  // Populate the groupings
  Object.entries(rankings).forEach(([valueId, importance]) => {
    const value = valuesList.find(v => v.id === Number(valueId));
    if (value) {
      valuesByImportance[importance].push(value);
    }
  });
  
  // Sort values within each importance level by name
  Object.keys(valuesByImportance).forEach(level => {
    valuesByImportance[Number(level)].sort((a, b) => a.name.localeCompare(b.name));
  });
  
  // Calculate core values (importance 4-5) and least important (1-2)
  const coreValues = [...valuesByImportance[5], ...valuesByImportance[4]];
  const leastImportantValues = [...valuesByImportance[1], ...valuesByImportance[2]];
  
  // Prepare a sorted list of all values for the "all" tab
  const allValuesSorted = valuesList
    .map(value => ({
      ...value,
      importance: rankings[value.id] || 0
    }))
    .sort((a, b) => b.importance - a.importance);

  // Get color class based on importance
  const getImportanceColor = (importance: number) => {
    switch (importance) {
      case 5: return "bg-purple-100 text-purple-800 border-purple-200";
      case 4: return "bg-blue-100 text-blue-800 border-blue-200";
      case 3: return "bg-amber-100 text-amber-800 border-amber-200";
      case 2: return "bg-orange-100 text-orange-800 border-orange-200";
      case 1: return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-800">Your Values Profile</CardTitle>
        <CardDescription>
          Your values represent what is most important to you in life and can guide your decisions and priorities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All Values</TabsTrigger>
            <TabsTrigger value="core">Core Values</TabsTrigger>
            <TabsTrigger value="least">Least Important</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <h3 className="text-lg font-medium">All Values by Importance</h3>
            <div className="grid gap-2 md:grid-cols-2">
              {allValuesSorted.map((value) => (
                <div 
                  key={value.id} 
                  className={`p-3 rounded border ${getImportanceColor(value.importance)} flex justify-between items-center`}
                >
                  <div>
                    <div className="font-medium">{value.name}</div>
                    <div className="text-sm opacity-90">{value.description}</div>
                  </div>
                  <div className="text-lg font-bold">{value.importance}/5</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="core" className="space-y-4">
            <h3 className="text-lg font-medium">Your Core Values</h3>
            <p className="text-gray-600">
              These are your highest-ranked values (rated 4-5) and represent what you consider most important in life.
            </p>
            {coreValues.length > 0 ? (
              <div className="grid gap-2 md:grid-cols-2">
                {coreValues.map((value) => (
                  <div 
                    key={value.id} 
                    className={`p-3 rounded border ${getImportanceColor(rankings[value.id])} flex justify-between items-center`}
                  >
                    <div>
                      <div className="font-medium">{value.name}</div>
                      <div className="text-sm opacity-90">{value.description}</div>
                    </div>
                    <div className="text-lg font-bold">{rankings[value.id]}/5</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded text-center">
                No core values identified.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="least" className="space-y-4">
            <h3 className="text-lg font-medium">Your Least Important Values</h3>
            <p className="text-gray-600">
              These are your lowest-ranked values (rated 1-2) and may represent areas that are less significant to you currently.
            </p>
            {leastImportantValues.length > 0 ? (
              <div className="grid gap-2 md:grid-cols-2">
                {leastImportantValues.map((value) => (
                  <div 
                    key={value.id} 
                    className={`p-3 rounded border ${getImportanceColor(rankings[value.id])} flex justify-between items-center`}
                  >
                    <div>
                      <div className="font-medium">{value.name}</div>
                      <div className="text-sm opacity-90">{value.description}</div>
                    </div>
                    <div className="text-lg font-bold">{rankings[value.id]}/5</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded text-center">
                No low-priority values identified.
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={onRetakeTest} 
            variant="outline" 
            className="mr-2"
          >
            Retake Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuesResults;
