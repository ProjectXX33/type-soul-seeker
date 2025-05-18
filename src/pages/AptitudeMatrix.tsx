
import AptitudeMatrixComponent from "@/components/AptitudeMatrix";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AptitudeMatrixPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/gardner">
            <Button variant="outline" className="text-amber-600">
              &larr; Back to Multiple Intelligences
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-amber-800">Aptitude Matrix Assessment</h1>
        </div>

        <AptitudeMatrixComponent />
      </div>
    </div>
  );
};

export default AptitudeMatrixPage;
