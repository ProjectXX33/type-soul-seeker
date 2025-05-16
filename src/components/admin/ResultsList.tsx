
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getTestResults } from "@/utils/mbtiUtils";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const ResultsList = () => {
  const [results, setResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would be an API call
    const data = getTestResults();
    setResults(data);
    setFilteredResults(data);
  }, []);
  
  useEffect(() => {
    // Filter results based on search term and type filter
    let filtered = [...results];
    
    if (searchTerm) {
      filtered = filtered.filter(result => 
        result.userCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (typeFilter) {
      filtered = filtered.filter(result => 
        result.result.type === typeFilter
      );
    }
    
    setFilteredResults(filtered);
  }, [results, searchTerm, typeFilter]);
  
  const handleExportCSV = () => {
    // Create CSV content
    let csvContent = "User Code,Date,Type,E Score,I Score,S Score,N Score,T Score,F Score,J Score,P Score\n";
    
    filteredResults.forEach(result => {
      const row = [
        result.userCode,
        result.timestamp,
        result.result.type,
        result.result.raw.e,
        result.result.raw.i,
        result.result.raw.s,
        result.result.raw.n,
        result.result.raw.t,
        result.result.raw.f,
        result.result.raw.j,
        result.result.raw.p
      ].join(',');
      
      csvContent += row + '\n';
    });
    
    // Create download link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mbti-results-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    
    // Download the CSV file
    link.click();
    
    toast({
      title: "Export Successful",
      description: `${filteredResults.length} results exported to CSV`,
    });
  };
  
  const personalityTypes = [...new Set(results.map(r => r.result.type))].sort();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Test Results</h2>
        
        <Button 
          onClick={handleExportCSV}
          className="bg-green-600 hover:bg-green-700"
          disabled={filteredResults.length === 0}
        >
          Export to CSV
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-64">
          <Input
            placeholder="Search by user code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <select
            className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {personalityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredResults.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No results found</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Code</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{result.userCode}</TableCell>
                  <TableCell>{formatDate(result.timestamp)}</TableCell>
                  <TableCell>{result.result.type}</TableCell>
                  <TableCell>
                    <Link to={`/admin/results/${index}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ResultsList;
