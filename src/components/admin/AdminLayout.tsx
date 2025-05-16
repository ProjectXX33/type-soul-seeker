
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("mbtiAdminToken");
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the admin dashboard",
        variant: "destructive",
      });
      navigate("/admin");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("mbtiAdminToken");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/admin");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-lg font-bold text-purple-600">MBTI Admin</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                <Button 
                  variant="ghost"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => navigate("/admin/results")}
                >
                  Results
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => navigate("/")}
                >
                  Take Test
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <Button 
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
