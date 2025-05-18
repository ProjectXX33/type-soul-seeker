
import { useState, useRef, useEffect, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { skills } from "@/data/aptitudeSkills";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SkillItem {
  id: string;
  name: string;
  enjoyment: number;
  skill: number;
}

interface CellProps {
  skillLevel: number;
  enjoymentLevel: number;
  items: SkillItem[];
  onDrop: (item: SkillItem, skillLevel: number, enjoymentLevel: number) => void;
  onDragEnter: () => void;
  active: boolean;
}

const Cell = ({
  skillLevel,
  enjoymentLevel,
  items,
  onDrop,
  onDragEnter,
  active
}: CellProps) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    try {
      const item = JSON.parse(id);
      onDrop(item, skillLevel, enjoymentLevel);
    } catch (error) {
      console.error("Error parsing dragged item:", error);
    }
  };

  return (
    <div 
      className={`border border-gray-300 w-full aspect-square flex flex-wrap content-start p-1 overflow-y-auto transition-colors
      ${active ? "bg-zinc-800 bg-opacity-10" : "bg-white hover:bg-gray-50"}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={onDragEnter}
    >
      {items.map(item => (
        <div 
          key={item.id} 
          className="m-0.5 px-1.5 py-0.5 text-xs bg-black text-white rounded-full whitespace-nowrap"
          draggable
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

const AptitudeMatrix = () => {
  const [availableSkills, setAvailableSkills] = useState<SkillItem[]>(
    skills.map((skill, index) => ({
      id: `skill-${index}`,
      name: skill,
      enjoyment: 0,
      skill: 0
    }))
  );
  const [placedSkills, setPlacedSkills] = useState<SkillItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<SkillItem | null>(null);
  const [activeCell, setActiveCell] = useState<{
    skill: number;
    enjoyment: number;
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: SkillItem) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
    setDraggedItem(item);
  };

  const handleDrop = (item: SkillItem, skillLevel: number, enjoymentLevel: number) => {
    // Check if we're moving an already placed skill
    const isMovingPlaced = placedSkills.some(skill => skill.id === item.id);

    if (isMovingPlaced) {
      // Update the position of an existing placed skill
      setPlacedSkills(prev => prev.map(skill => 
        skill.id === item.id ? {
          ...skill,
          skill: skillLevel,
          enjoyment: enjoymentLevel
        } : skill
      ));
    } else {
      // Adding a new skill from the available list
      const updatedItem = {
        ...item,
        skill: skillLevel,
        enjoyment: enjoymentLevel
      };
      setPlacedSkills(prev => [...prev, updatedItem]);
      setAvailableSkills(prev => prev.filter(skill => skill.id !== item.id));
    }
    setActiveCell(null);
  };

  const handleCellDragEnter = (skillLevel: number, enjoymentLevel: number) => {
    setActiveCell({
      skill: skillLevel,
      enjoyment: enjoymentLevel
    });
  };

  const handleReset = () => {
    setAvailableSkills(skills.map((skill, index) => ({
      id: `skill-${index}`,
      name: skill,
      enjoyment: 0,
      skill: 0
    })));
    setPlacedSkills([]);
    setShowResults(false);
  };

  const getSkillsInCell = (skillLevel: number, enjoymentLevel: number) => {
    return placedSkills.filter(item => item.skill === skillLevel && item.enjoyment === enjoymentLevel);
  };

  // Generate the quadrant results
  const getQuadrantResults = () => {
    const topRight = placedSkills.filter(item => item.skill >= 4 && item.enjoyment >= 4);
    const topLeft = placedSkills.filter(item => item.skill >= 4 && item.enjoyment <= 2);
    const bottomRight = placedSkills.filter(item => item.skill <= 2 && item.enjoyment >= 4);
    const bottomLeft = placedSkills.filter(item => item.skill <= 2 && item.enjoyment <= 2);

    return {
      topRight,
      topLeft,
      bottomRight,
      bottomLeft
    };
  };

  const handleSaveResults = () => {
    if (availableSkills.length > 0) {
      toast({
        title: "Not all skills placed",
        description: `Please place all ${availableSkills.length} remaining skills before continuing.`,
        variant: "destructive"
      });
      return;
    }
    
    // Save results to localStorage for admin dashboard
    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const aptitudeResults = {
      testType: 'aptitude',
      timestamp: new Date().toISOString(),
      data: {
        quadrants: getQuadrantResults(),
        skills: placedSkills
      }
    };
    
    localStorage.setItem('testResults', JSON.stringify([...existingResults, aptitudeResults]));
    
    toast({
      title: "Results saved",
      description: "Your aptitude matrix results have been saved. Continue to the next test.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Aptitude Matrix
          </CardTitle>
          <CardDescription>
            Drag and place each skill where it belongs based on your skill level and how much you enjoy it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid grid-cols-6 gap-1">
              {/* Header row */}
              <div className=""></div>
              <div className="text-center text-sm font-medium text-black text-nowrap pb-2 flex justify-center items-end h-16">
                1<br />Strongly Dislike
              </div>
              <div className="text-center text-sm font-medium text-black text-nowrap flex justify-center items-end h-16">
                2<br />Dislike
              </div>
              <div className="text-center text-sm font-medium text-black text-nowrap flex justify-center items-end h-16">
                3<br />Neutral
              </div>
              <div className="text-center text-sm font-medium text-black text-nowrap flex justify-center items-end h-16">
                4<br />Like
              </div>
              <div className="text-center text-sm font-medium text-black text-nowrap flex justify-center items-end h-16">
                5<br />Strongly Like
              </div>

              {/* Row 5: Very Good */}
              <div className="text-center text-sm font-medium text-black flex items-center justify-center">
                5<br />Very Good
              </div>
              {[1, 2, 3, 4, 5].map(enjoyment => (
                <Cell 
                  key={`5-${enjoyment}`} 
                  skillLevel={5} 
                  enjoymentLevel={enjoyment} 
                  items={getSkillsInCell(5, enjoyment)}
                  onDrop={handleDrop}
                  onDragEnter={() => handleCellDragEnter(5, enjoyment)}
                  active={activeCell?.skill === 5 && activeCell?.enjoyment === enjoyment}
                />
              ))}

              {/* Row 4: Good */}
              <div className="text-center text-sm font-medium text-black flex items-center justify-center">
                4<br />Good
              </div>
              {[1, 2, 3, 4, 5].map(enjoyment => (
                <Cell 
                  key={`4-${enjoyment}`} 
                  skillLevel={4} 
                  enjoymentLevel={enjoyment} 
                  items={getSkillsInCell(4, enjoyment)}
                  onDrop={handleDrop}
                  onDragEnter={() => handleCellDragEnter(4, enjoyment)}
                  active={activeCell?.skill === 4 && activeCell?.enjoyment === enjoyment}
                />
              ))}

              {/* Row 3: Average */}
              <div className="text-center text-sm font-medium text-black flex items-center justify-center">
                3<br />Average
              </div>
              {[1, 2, 3, 4, 5].map(enjoyment => (
                <Cell 
                  key={`3-${enjoyment}`} 
                  skillLevel={3} 
                  enjoymentLevel={enjoyment} 
                  items={getSkillsInCell(3, enjoyment)}
                  onDrop={handleDrop}
                  onDragEnter={() => handleCellDragEnter(3, enjoyment)}
                  active={activeCell?.skill === 3 && activeCell?.enjoyment === enjoyment}
                />
              ))}

              {/* Row 2: Below Average */}
              <div className="text-center text-sm font-medium text-black flex items-center justify-center">
                2<br />Below Average
              </div>
              {[1, 2, 3, 4, 5].map(enjoyment => (
                <Cell 
                  key={`2-${enjoyment}`} 
                  skillLevel={2} 
                  enjoymentLevel={enjoyment} 
                  items={getSkillsInCell(2, enjoyment)}
                  onDrop={handleDrop}
                  onDragEnter={() => handleCellDragEnter(2, enjoyment)}
                  active={activeCell?.skill === 2 && activeCell?.enjoyment === enjoyment}
                />
              ))}

              {/* Row 1: Novice */}
              <div className="text-center text-sm font-medium text-black flex items-center justify-center">
                1<br />Novice
              </div>
              {[1, 2, 3, 4, 5].map(enjoyment => (
                <Cell 
                  key={`1-${enjoyment}`} 
                  skillLevel={1} 
                  enjoymentLevel={enjoyment} 
                  items={getSkillsInCell(1, enjoyment)}
                  onDrop={handleDrop}
                  onDragEnter={() => handleCellDragEnter(1, enjoyment)}
                  active={activeCell?.skill === 1 && activeCell?.enjoyment === enjoyment}
                />
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2 text-black">Available Skills:</h3>
              <div className="border border-gray-300 rounded-lg p-4 flex flex-wrap gap-2 min-h-[100px]">
                {availableSkills.map(skill => (
                  <div 
                    key={skill.id} 
                    draggable 
                    onDragStart={e => handleDragStart(e, skill)} 
                    className="px-3 py-1 bg-zinc-100 border border-zinc-300 rounded-lg text-sm cursor-move hover:bg-zinc-200 transition-colors"
                  >
                    {skill.name}
                  </div>
                ))}
                {availableSkills.length === 0 && (
                  <p className="text-gray-500 text-sm">All skills have been placed in the matrix.</p>
                )}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleReset} className="border-black text-black hover:bg-zinc-100">
                Reset Matrix
              </Button>
              <Button 
                className="bg-black hover:bg-zinc-800" 
                disabled={availableSkills.length > 0}
                onClick={handleSaveResults}
              >
                {availableSkills.length > 0 ? 
                  `Place all ${availableSkills.length} remaining skills` : 
                  "Save & Continue"
                }
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AptitudeMatrix;
