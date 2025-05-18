
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { valuesList } from "@/data/valuesData";
import { useToast } from "@/hooks/use-toast";

interface ValuesTestProps {
  onCompleteTest: (results: Record<number, number>) => void;
}

const ValuesTest = ({ onCompleteTest }: ValuesTestProps) => {
  const { toast } = useToast();
  const [rankings, setRankings] = useState<Record<number, number>>({});
  const dragValue = useRef<number | null>(null);
  
  // Initialize the list of values that haven't been ranked yet
  const unrankedValues = valuesList.filter(value => rankings[value.id] === undefined);
  
  // Organize the ranked values by importance level
  const rankedValuesByLevel: Record<number, number[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  };
  
  Object.entries(rankings).forEach(([valueId, importanceLevel]) => {
    rankedValuesByLevel[importanceLevel].push(Number(valueId));
  });
  
  const handleDragStart = (valueId: number) => {
    dragValue.current = valueId;
  };
  
  const handleDrop = (importanceLevel: number) => {
    if (dragValue.current !== null) {
      setRankings(prev => ({
        ...prev,
        [dragValue.current as number]: importanceLevel
      }));
      dragValue.current = null;
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleRemoveRanking = (valueId: number) => {
    const newRankings = { ...rankings };
    delete newRankings[valueId];
    setRankings(newRankings);
  };
  
  const handleSubmit = () => {
    if (unrankedValues.length > 0) {
      toast({
        title: "Not All Values Ranked",
        description: `Please rank all ${unrankedValues.length} remaining values.`,
        variant: "destructive"
      });
      return;
    }
    
    onCompleteTest(rankings);
  };
  
  const importanceLevels = [
    { level: 1, label: "Not at all Important" },
    { level: 2, label: "Slightly Important" },
    { level: 3, label: "Moderately Important" },
    { level: 4, label: "Very Important" },
    { level: 5, label: "Extremely Important" }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-800">Values Ranking Exercise</CardTitle>
          <CardDescription>
            Drag each value into the column that represents how important it is to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Grid Headers */}
          <div className="grid grid-cols-5 gap-2 mb-1">
            {importanceLevels.map((level) => (
              <div 
                key={level.level} 
                className="text-center text-sm font-medium p-2 bg-gray-100 rounded-t-md"
              >
                {level.level} – {level.label}
              </div>
            ))}
          </div>
          
          {/* Drop Zones */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {importanceLevels.map((level) => (
              <div
                key={level.level}
                className={`min-h-[300px] p-2 rounded-b-md border-2 border-dashed ${
                  level.level === 5 ? 'border-purple-400 bg-purple-50' : 
                  level.level === 4 ? 'border-blue-400 bg-blue-50' : 
                  level.level === 3 ? 'border-amber-400 bg-amber-50' : 
                  level.level === 2 ? 'border-orange-400 bg-orange-50' : 
                  'border-red-400 bg-red-50'
                } flex flex-col gap-2`}
                onDrop={() => handleDrop(level.level)}
                onDragOver={handleDragOver}
              >
                {rankedValuesByLevel[level.level].map((valueId) => {
                  const value = valuesList.find(v => v.id === valueId);
                  return value ? (
                    <div 
                      key={value.id}
                      className="bg-white p-2 rounded shadow text-sm cursor-pointer hover:bg-gray-50 relative group"
                      onClick={() => handleRemoveRanking(value.id)}
                    >
                      <div className="font-medium">{value.name}</div>
                      <div className="text-xs text-gray-600">{value.description}</div>
                      <span className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 text-red-500 text-xs">✕</span>
                    </div>
                  ) : null;
                })}
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Unranked Values ({unrankedValues.length})</h3>
            <div className="flex flex-wrap gap-2">
              {unrankedValues.map((value) => (
                <div
                  key={value.id}
                  className="bg-white border border-gray-200 p-2 rounded shadow-sm cursor-grab"
                  draggable
                  onDragStart={() => handleDragStart(value.id)}
                >
                  <div className="font-medium">{value.name}</div>
                  <div className="text-xs text-gray-600">{value.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={unrankedValues.length > 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Submit Values Rankings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValuesTest;
