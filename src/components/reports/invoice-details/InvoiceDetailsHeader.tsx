
import React from 'react';
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

interface InvoiceDetailsHeaderProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const InvoiceDetailsHeader: React.FC<InvoiceDetailsHeaderProps> = ({ 
  isFullScreen, 
  toggleFullScreen 
}) => {
  return (
    <>
      {/* Removed DialogTitle as it was causing the error by being outside a Dialog context */}
      <div className="flex justify-between items-center bg-green-100 p-3 mb-4 rounded sticky top-0 z-10">
        <h2 className="text-green-800 font-medium text-lg">Display Invoice</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 animate-pulse hover:animate-none"
          onClick={toggleFullScreen}
        >
          {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </Button>
      </div>
    </>
  );
};

export default InvoiceDetailsHeader;
