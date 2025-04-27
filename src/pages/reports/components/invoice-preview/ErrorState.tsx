
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ErrorStateProps {
  error: string | null;
  handleBack: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, handleBack }) => {
  return (
    <div className="p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-red-600 font-medium">{error || "Invoice not found."}</p>
        <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
