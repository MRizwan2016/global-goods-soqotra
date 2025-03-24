
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";

interface PrintScheduleControlsProps {
  handleBack: () => void;
  handlePrint: (e?: React.MouseEvent) => void;
}

const PrintScheduleControls: React.FC<PrintScheduleControlsProps> = ({
  handleBack,
  handlePrint
}) => {
  return (
    <div className="print:hidden p-4 bg-white shadow-md mb-4 sticky top-0 z-10 flex items-center justify-between">
      <Button
        variant="outline"
        onClick={handleBack}
        className="flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        BACK
      </Button>
      <div className="text-xl font-bold flex-1 text-center">Job Schedule</div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handlePrint(e);
        }}
        className="flex items-center bg-blue-500 hover:bg-blue-600"
      >
        <Printer className="mr-2 h-4 w-4" />
        PRINT
      </Button>
    </div>
  );
};

export default PrintScheduleControls;
