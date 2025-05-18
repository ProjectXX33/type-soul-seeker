
import { useState, useRef, useEffect, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { skills } from "@/data/aptitudeSkills";
import { Link } from "react-router-dom";

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

const Cell = ({ skillLevel, enjoymentLevel, items, onDrop, onDragEnter, active }: CellProps) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const item = JSON.parse(id);
    onDrop(item, skillLevel, enjoymentLevel);
  };

  return (
    <div
      className={`border border-gray-300 w-full aspect-square flex flex-wrap content-start p-1 overflow-y-auto transition-colors
      ${active ? "bg-blue-100" : "bg-white hover:bg-gray-50"}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={onDragEnter}
    >
      {items.map(item => (
        <div 
          key={item.id}
          className="m-0.5 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full whitespace-nowrap"
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
  const [activeCell, setActiveCell] = useState<{skill: number, enjoyment: number} | null>(null);
  const [showResults, setShowResults] = useState(false);

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
        skill.id === item.id 
          ? { ...skill, skill: skillLevel, enjoyment: enjoymentLevel }
          : skill
      ));
    } else {
      // Adding a new skill from the available list
      const updatedItem = { ...item, skill: skillLevel, enjoyment: enjoymentLevel };
      
      setPlacedSkills(prev => [...prev, updatedItem]);
      setAvailableSkills(prev => prev.filter(skill => skill.id !== item.id));
    }
    
    setActiveCell(null);
  };

  const handleCellDragEnter = (skillLevel: number, enjoymentLevel: number) => {
    setActiveCell({skill: skillLevel, enjoyment: enjoymentLevel});
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
    return placedSkills.filter(
      item => item.skill === skillLevel && item.enjoyment === enjoymentLevel
    );
  };

  // Generate the quadrant results
  const getQuadrantResults = () => {
    const topRight = placedSkills.filter(item => item.skill >= 4 && item.enjoyment >= 4);
    const topLeft = placedSkills.filter(item => item.skill >= 4 && item.enjoyment <= 2);
    const bottomRight = placedSkills.filter(item => item.skill <= 2 && item.enjoyment >= 4);
    const bottomLeft = placedSkills.filter(item => item.skill <= 2 && item.enjoyment <= 2);
    
    return { topRight, topLeft, bottomRight, bottomLeft };
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  const results = getQuadrantResults();

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-800">
            Aptitude Matrix
          </CardTitle>
          <CardDescription>
            Drag and place each skill where it belongs based on your skill level and how much you enjoy it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-8">
              <div className="grid grid-cols-6 gap-1">
                {/* Header row */}
                <div className=""></div>
                <div className="text-center text-sm font-medium text-gray-600 -rotate-45 origin-bottom-left translate-x-[20%] translate-y-[70%]">
                  1<br />Strongly Dislike
                </div>
                <div className="text-center text-sm font-medium text-gray-600 -rotate-45 origin-bottom-left translate-x-[20%] translate-y-[70%]">
                  2<br />Dislike
                </div>
                <div className="text-center text-sm font-medium text-gray-600 -rotate-45 origin-bottom-left translate-x-[20%] translate-y-[70%]">
                  3<br />Neutral
                </div>
                <div className="text-center text-sm font-medium text-gray-600 -rotate-45 origin-bottom-left translate-x-[20%] translate-y-[70%]">
                  4<br />Like
                </div>
                <div className="text-center text-sm font-medium text-gray-600 -rotate-45 origin-bottom-left translate-x-[20%] translate-y-[70%]">
                  5<br />Strongly Like
                </div>

                {/* Row 5: Very Good */}
                <div className="flex items-center justify-end pr-2 font-medium text-gray-600">
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
                <div className="flex items-center justify-end pr-2 font-medium text-gray-600">
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
                <div className="flex items-center justify-end pr-2 font-medium text-gray-600">
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
                <div className="flex items-center justify-end pr-2 font-medium text-gray-600">
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
                <div className="flex items-center justify-end pr-2 font-medium text-gray-600">
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
                <h3 className="text-lg font-medium mb-2">Available Skills:</h3>
                <div className="border border-gray-300 rounded-lg p-4 flex flex-wrap gap-2 min-h-[100px]">
                  {availableSkills.map(skill => (
                    <div
                      key={skill.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, skill)}
                      className="px-3 py-1 bg-amber-100 border border-amber-200 rounded-lg text-sm cursor-move hover:bg-amber-200 transition-colors"
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
                <Button
                  variant="outline"
                  onClick={handleReset}
                >
                  Reset Matrix
                </Button>
                <Button
                  className="bg-amber-600 hover:bg-amber-700"
                  disabled={availableSkills.length > 0}
                  onClick={handleViewResults}
                >
                  {availableSkills.length > 0 
                    ? `Place all ${availableSkills.length} remaining skills` 
                    : "View Analysis"
                  }
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">Your Aptitude Matrix Analysis</h3>
                <p className="text-gray-600">
                  Based on how you've plotted your skills, here's an analysis of your strengths and areas for development.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="text-lg font-medium text-green-800 mb-2">Strengths (High Skill & High Enjoyment)</h4>
                  {results.topRight.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {results.topRight.map(item => (
                        <li key={item.id} className="text-gray-700">{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 italic">No items in this quadrant</p>
                  )}
                  <p className="mt-3 text-sm text-gray-600">
                    These are your core strengths. Focus on leveraging these skills in your career and pursue opportunities to use them.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">Hidden Talents (High Skill & Low Enjoyment)</h4>
                  {results.topLeft.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {results.topLeft.map(item => (
                        <li key={item.id} className="text-gray-700">{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 italic">No items in this quadrant</p>
                  )}
                  <p className="mt-3 text-sm text-gray-600">
                    You're good at these but don't enjoy them. Consider using these skills occasionally or finding ways to make using them more enjoyable.
                  </p>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h4 className="text-lg font-medium text-amber-800 mb-2">Growth Areas (Low Skill & High Enjoyment)</h4>
                  {results.bottomRight.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {results.bottomRight.map(item => (
                        <li key={item.id} className="text-gray-700">{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 italic">No items in this quadrant</p>
                  )}
                  <p className="mt-3 text-sm text-gray-600">
                    You enjoy these activities but need more experience. These are great development opportunities that you'll likely find fulfilling.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Avoidance Areas (Low Skill & Low Enjoyment)</h4>
                  {results.bottomLeft.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {results.bottomLeft.map(item => (
                        <li key={item.id} className="text-gray-700">{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 italic">No items in this quadrant</p>
                  )}
                  <p className="mt-3 text-sm text-gray-600">
                    These activities may drain your energy. Try to minimize time spent on these or delegate these tasks when possible.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleReset}
                >
                  Reset & Start Over
                </Button>
                <Link to="/">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AptitudeMatrix;
