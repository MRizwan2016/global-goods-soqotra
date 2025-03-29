
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-600 h-16 w-16" />
        </div>
        <div className="text-red-600 text-6xl font-bold mb-4">404</div>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col gap-2">
          <Button 
            onClick={handleBack}
            className="w-full"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Link 
            to="/" 
            className="bg-soqotra-blue text-white px-6 py-2 rounded-md hover:bg-soqotra-blue/90 transition-colors block flex items-center justify-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <Link 
            to="/accounts/payment/add" 
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors block flex items-center justify-center mt-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card mr-2">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            Go to Payment Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
