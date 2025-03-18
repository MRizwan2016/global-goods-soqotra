
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer, FileText, ArrowLeft } from "lucide-react";

interface ActionButtonsProps {
  handleBack: () => void;
  isFullScreen?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  handleBack, 
  isFullScreen = false 
}) => {
  return (
    <div className={`mt-6 flex justify-center space-x-4 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <Button className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-transform">
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      
      <Button className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-transform">
        <FileText className="mr-2 h-4 w-4" />
        Print Certificate
      </Button>
      
      <Button className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-transform">
        <FileText className="mr-2 h-4 w-4" />
        Print HBL
      </Button>
      
      <Button 
        className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-transform"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
};

export default ActionButtons;
