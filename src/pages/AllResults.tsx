
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { valuesList } from "@/data/valuesData";

const AllResults = () => {
  const [mbtiResults, setMbtiResults] = useState<any>(null);
  const [riasecResults, setRiasecResults] = useState<any>(null);
  const [aptitudeResults, setAptitudeResults] = useState<any>(null);
  const [valuesResults, setValuesResults] = useState<any>(null);
  const [gardnerResults, setGardnerResults] = useState<any>(null);

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
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-600 text-center">Tests Incomplete</CardTitle>
              <CardDescription className="text-center">
                You need to complete all tests to view your results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className={`p-4 rounded-lg ${mbtiResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">MBTI Test</h3>
                  <p className="text-sm mt-1">{mbtiResults ? 'Completed' : 'Not completed'}</p>
                  {!mbtiResults && (
                    <Link to="/" className="block mt-2">
                      <Button size="sm" variant="outline">Take Test</Button>
                    </Link>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${riasecResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">RIASEC Test</h3>
                  <p className="text-sm mt-1">{riasecResults ? 'Completed' : 'Not completed'}</p>
                  {!riasecResults && mbtiResults && (
                    <Link to="/riasec" className="block mt-2">
                      <Button size="sm" variant="outline">Take Test</Button>
                    </Link>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${aptitudeResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">Aptitude Matrix</h3>
                  <p className="text-sm mt-1">{aptitudeResults ? 'Completed' : 'Not completed'}</p>
                  {!aptitudeResults && mbtiResults && riasecResults && (
                    <Link to="/aptitude-matrix" className="block mt-2">
                      <Button size="sm" variant="outline">Take Test</Button>
                    </Link>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${valuesResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">Values Test</h3>
                  <p className="text-sm mt-1">{valuesResults ? 'Completed' : 'Not completed'}</p>
                  {!valuesResults && mbtiResults && riasecResults && aptitudeResults && (
                    <Link to="/values" className="block mt-2">
                      <Button size="sm" variant="outline">Take Test</Button>
                    </Link>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${gardnerResults ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium">Gardner Test</h3>
                  <p className="text-sm mt-1">{gardnerResults ? 'Completed' : 'Not completed'}</p>
                  {!gardnerResults && mbtiResults && riasecResults && aptitudeResults && valuesResults && (
                    <Link to="/gardner" className="block mt-2">
                      <Button size="sm" variant="outline">Take Test</Button>
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Link to="/">
                  <Button>Return to Home</Button>
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-purple-800">Your Comprehensive Assessment Results</h1>
          <p className="mt-2 text-gray-600">Congratulations on completing all five assessments!</p>
        </div>
        
        <div className="space-y-12">
          {/* MBTI Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-700">MBTI Personality Type: {mbtiResults?.data?.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{mbtiResults?.data?.description}</p>
            </CardContent>
          </Card>
          
          {/* RIASEC Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">RIASEC Career Code: {riasecResults?.data?.code}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {riasecResults?.data?.scores && Object.entries(riasecResults.data.scores).map(([type, score]: [string, any]) => (
                  <div key={type} className="bg-blue-50 p-3 rounded-lg text-center">
                    <h4 className="font-medium">{type}</h4>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
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
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-amber-700">Aptitude Matrix Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="text-lg font-medium text-green-800 mb-2">Strengths (High Skill & High Enjoyment)</h4>
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
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">Hidden Talents (High Skill & Low Enjoyment)</h4>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-700">Core Personal Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-purple-800 mb-2">Your Top Values</h4>
                {topValues.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {topValues.map((value, index) => (
                      <div key={index} className="bg-purple-50 px-3 py-1 rounded-md border border-purple-200">
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
                  <div key={level} className={`p-3 rounded-lg 
                    ${level === 5 ? 'bg-purple-50 border border-purple-200' : 
                     level === 4 ? 'bg-blue-50 border border-blue-200' : 
                     level === 3 ? 'bg-amber-50 border border-amber-200' : 
                     level === 2 ? 'bg-orange-50 border border-orange-200' : 
                                  'bg-red-50 border border-red-200'}
                  `}>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700">Multiple Intelligences Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gardnerResults?.data?.scores && Object.entries(gardnerResults.data.scores).map(([type, score]: [string, any]) => (
                  <div key={type} className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium">{type}</h4>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-600 rounded-full" 
                        style={{ width: `${(score / 5) * 100}%` }} 
                      />
                    </div>
                    <p className="text-sm mt-1">{score}/5</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => localStorage.setItem('testResults', '[]')}
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
