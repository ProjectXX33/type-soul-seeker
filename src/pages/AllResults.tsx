
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { valuesList } from "@/data/valuesData";
import { useToast } from "@/hooks/use-toast";
import { personalityTypes } from "@/data/mbtiTypes";
import { gardnerTypes } from "@/data/gardnerQuestions";

const AllResults = () => {
  const [mbtiResults, setMbtiResults] = useState<any>(null);
  const [riasecResults, setRiasecResults] = useState<any>(null);
  const [aptitudeResults, setAptitudeResults] = useState<any>(null);
  const [valuesResults, setValuesResults] = useState<any>(null);
  const [gardnerResults, setGardnerResults] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load all test results from localStorage
    const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    
    // Find the most recent result of each test type
    const mbti = allResults.filter((r: any) => r.testType === 'mbti').pop();
    const riasec = allResults.filter((r: any) => r.testType === 'riasec').pop();
    const aptitude = allResults.filter((r: any) => r.testType === 'aptitude').pop();
    const values = allResults.filter((r: any) => r.testType === 'values').pop();
    const gardner = allResults.filter((r: any) => r.testType === 'gardner').pop();
    
    setMbtiResults(mbti);
    setRiasecResults(riasec);
    setAptitudeResults(aptitude);
    setValuesResults(values);
    setGardnerResults(gardner);
  }, []);

  const allTestsComplete = mbtiResults && riasecResults && aptitudeResults && valuesResults && gardnerResults;

  if (!allTestsComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-2xl font-bold text-center">Black Box Assessment</CardTitle>
              <CardDescription className="text-gray-300 text-center">
                You need to complete all tests to view your results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className={`p-4 rounded-lg ${mbtiResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">MBTI Test</h3>
                  <p className="text-sm mt-1">{mbtiResults ? 'Completed' : 'Not completed'}</p>
                  {!mbtiResults && (
                    <Link to="/" className="block mt-2">
                      <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-100">
                        Take Test
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${riasecResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">RIASEC Test</h3>
                  <p className="text-sm mt-1">{riasecResults ? 'Completed' : 'Not completed'}</p>
                  {!riasecResults && mbtiResults && (
                    <Link to="/riasec" className="block mt-2">
                      <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-100">
                        Take Test
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${aptitudeResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">Aptitude Matrix</h3>
                  <p className="text-sm mt-1">{aptitudeResults ? 'Completed' : 'Not completed'}</p>
                  {!aptitudeResults && mbtiResults && riasecResults && (
                    <Link to="/aptitude-matrix" className="block mt-2">
                      <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-100">
                        Take Test
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${valuesResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">Values Test</h3>
                  <p className="text-sm mt-1">{valuesResults ? 'Completed' : 'Not completed'}</p>
                  {!valuesResults && mbtiResults && riasecResults && aptitudeResults && (
                    <Link to="/values" className="block mt-2">
                      <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-100">
                        Take Test
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${gardnerResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">Gardner Test</h3>
                  <p className="text-sm mt-1">{gardnerResults ? 'Completed' : 'Not completed'}</p>
                  {!gardnerResults && mbtiResults && riasecResults && aptitudeResults && valuesResults && (
                    <Link to="/gardner" className="block mt-2">
                      <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-100">
                        Take Test
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Link to="/">
                  <Button className="bg-black hover:bg-gray-800 text-white">Return to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Function to get values by importance level
  const getValuesByImportance = (level: number) => {
    if (!valuesResults?.data?.rankings) return [];
    
    const valueIds = Object.entries(valuesResults.data.rankings)
      .filter(([_, importance]) => Number(importance) === level)
      .map(([id, _]) => Number(id));
      
    return valueIds.map(id => valuesList.find(v => v.id === id)?.name).filter(Boolean);
  };

  // Get top values (importance 4-5)
  const topValues = [...getValuesByImportance(5), ...getValuesByImportance(4)];

  // Convert MBTI type to personality data
  const personalityData = mbtiResults?.data?.type ? 
    personalityTypes[mbtiResults.data.type as keyof typeof personalityTypes] || 
    { name: "Unknown", title: "Your results couldn't be determined", strengths: [], weaknesses: [], careers: [] } :
    { name: "Unknown", title: "Your results couldn't be determined", strengths: [], weaknesses: [], careers: [] };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black">Black Box Assessment Results</h1>
          <p className="mt-2 text-gray-600">Congratulations on completing all five assessments!</p>
        </div>
        
        <div className="space-y-12">
          {/* MBTI Results */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-xl">MBTI Personality Type: {mbtiResults?.data?.type}</CardTitle>
              <CardDescription className="text-gray-300">{personalityData.title}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-6">{mbtiResults?.data?.description}</p>
              
              {mbtiResults?.data?.dimensionScores && (
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-800 mb-4">Your Dimension Scores</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-blue-600">Extraversion (E) {mbtiResults.data.dimensionScores.ei.e}%</span>
                        <span className="text-sm font-medium text-indigo-600">Introversion (I) {mbtiResults.data.dimensionScores.ei.i}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${mbtiResults.data.dimensionScores.ei.e}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-green-600">Sensing (S) {mbtiResults.data.dimensionScores.sn.s}%</span>
                        <span className="text-sm font-medium text-teal-600">Intuition (N) {mbtiResults.data.dimensionScores.sn.n}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ width: `${mbtiResults.data.dimensionScores.sn.s}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-amber-600">Thinking (T) {mbtiResults.data.dimensionScores.tf.t}%</span>
                        <span className="text-sm font-medium text-red-600">Feeling (F) {mbtiResults.data.dimensionScores.tf.f}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-amber-600 h-2.5 rounded-full" 
                          style={{ width: `${mbtiResults.data.dimensionScores.tf.t}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-purple-600">Judging (J) {mbtiResults.data.dimensionScores.jp.j}%</span>
                        <span className="text-sm font-medium text-pink-600">Perceiving (P) {mbtiResults.data.dimensionScores.jp.p}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-purple-600 h-2.5 rounded-full" 
                          style={{ width: `${mbtiResults.data.dimensionScores.jp.j}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-black mb-2">Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {personalityData.strengths.map((strength, index) => (
                      <li key={index} className="text-gray-700">{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-black mb-2">Potential Challenges</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {personalityData.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-gray-700">{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-black bg-opacity-5 p-4 rounded-lg border border-black border-opacity-10">
                <h3 className="text-lg font-medium text-black mb-2">Recommended Career Paths</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {personalityData.careers.map((career, index) => (
                    <li key={index} className="text-gray-700">{career}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* RIASEC Results */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-xl">RIASEC Career Code: {riasecResults?.data?.code}</CardTitle>
              <CardDescription className="text-gray-300">Holland Occupational Themes</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {riasecResults?.data?.scores && Object.entries(riasecResults.data.scores).map(([type, score]: [string, any]) => (
                  <div key={type} className="bg-gray-50 p-3 rounded-lg text-center border border-gray-200">
                    <h4 className="font-medium">{type}</h4>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-black rounded-full" 
                        style={{ width: `${score}%` }} 
                      />
                    </div>
                    <p className="text-sm mt-1">{score}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Aptitude Matrix Results */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-xl">Aptitude Matrix Analysis</CardTitle>
              <CardDescription className="text-gray-300">Your Skills and Preferences</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-medium text-black mb-2">Strengths (High Skill & High Enjoyment)</h4>
                  {aptitudeResults?.data?.quadrants?.topRight?.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {aptitudeResults.data.quadrants.topRight.map((item: any) => (
                        <li key={item.id} className="text-gray-700">{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 italic">No items in this quadrant</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-medium text-black mb-2">Hidden Talents (High Skill & Low Enjoyment)</h4>
                  {aptitudeResults?.data?.quadrants?.topLeft?.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {aptitudeResults.data.quadrants.topLeft.map((item: any) => (
                        <li key={item.id} className="text-gray-700">{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 italic">No items in this quadrant</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Values Results */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-xl">Core Personal Values</CardTitle>
              <CardDescription className="text-gray-300">What Matters Most to You</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <h4 className="text-lg font-medium text-black mb-2">Your Top Values</h4>
                {topValues.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {topValues.map((value, index) => (
                      <div key={index} className="bg-black bg-opacity-5 px-3 py-1 rounded-md border border-black border-opacity-10">
                        {value}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 italic">No top values identified</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[5, 4, 3, 2, 1].map(level => (
                  <div key={level} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <h4 className="text-sm font-medium mb-2">
                      Level {level} Values
                    </h4>
                    {getValuesByImportance(level).length > 0 ? (
                      <ul className="text-xs space-y-1 list-disc list-inside">
                        {getValuesByImportance(level).map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500 italic">None</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Gardner Results */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-xl">Multiple Intelligences Profile</CardTitle>
              <CardDescription className="text-gray-300">Gardner's Theory of Multiple Intelligences</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gardnerResults?.data?.scores && Object.entries(gardnerResults.data.scores).map(([type, score]: [string, any]) => {
                  const intelligenceName = gardnerTypes[type as keyof typeof gardnerTypes]?.name || type;
                  return (
                    <div key={type} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <h4 className="font-medium">{intelligenceName}</h4>
                      <div className="mt-2 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-black rounded-full" 
                          style={{ width: `${(score / 5) * 100}%` }} 
                        />
                      </div>
                      <p className="text-sm mt-1">{score}/5</p>
                    </div>
                  );
                })}
              </div>
              
              {gardnerResults?.data?.scores && (
                <div className="mt-6 bg-black bg-opacity-5 p-4 rounded-lg border border-black border-opacity-10">
                  <h3 className="text-lg font-medium text-black mb-2">Your Primary Intelligence Strengths</h3>
                  {Object.entries(gardnerResults.data.scores)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 2)
                    .map(([type, score]) => {
                      const intelligenceType = gardnerTypes[type as keyof typeof gardnerTypes];
                      return (
                        <div key={type} className="mb-4">
                          <h4 className="font-medium text-black">{intelligenceType?.name}</h4>
                          <p className="text-gray-700 mb-2">{intelligenceType?.description}</p>
                          <h5 className="text-sm font-medium text-black">Recommended Careers:</h5>
                          <ul className="list-disc pl-5 space-y-1">
                            {intelligenceType?.careers.slice(0, 5).map((career, index) => (
                              <li key={index} className="text-gray-700">{career}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })
                  }
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/">
              <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                Return to Home
              </Button>
            </Link>
            <Button 
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => {
                localStorage.setItem('testResults', '[]');
                toast({
                  title: "Results Cleared",
                  description: "All test results have been reset.",
                });
              }}
            >
              Clear All Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllResults;
