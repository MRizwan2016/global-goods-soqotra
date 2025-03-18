
import React from "react";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportHeaderProps {
  title: string;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  title,
  isFullScreen,
  toggleFullScreen
}) => {
  return (
    <div className={isFullScreen 
      ? "p-4 bg-[#F2FCE2] border-b border-green-100 flex justify-between items-center" 
      : "p-4 bg-green-50 border-b border-green-100"
    }>
      <h3 className="text-lg font-medium text-green-800">{title}</h3>
      <Button 
        variant="outline" 
        size="sm" 
        className="ml-auto flex items-center gap-1 text-blue-600 hover:bg-blue-50"
        onClick={toggleFullScreen}
      >
        <Maximize2 size={16} />
        {isFullScreen ? "Exit Full Screen" : "Full Screen"}
      </Button>
    </div>
  );
};

export default ReportHeader;
