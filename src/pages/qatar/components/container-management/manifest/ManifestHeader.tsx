
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, ArrowLeft, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ManifestHeaderProps {
  containerNumber: string;
  status: string;
  onCancel: () => void;
}

const ManifestHeader: React.FC<ManifestHeaderProps> = ({ 
  containerNumber, 
  status, 
  onCancel 
}) => {
  return (
    <CardHeader className="bg-green-50 border-b flex justify-between items-center">
      <div>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <FileCheck className="mr-2 text-green-600" size={22} />
          Container Manifest Confirmation
          <span className="ml-2 text-sm font-normal text-gray-600">
            Container: {containerNumber} | Status: {status}
          </span>
        </CardTitle>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onCancel}
        className="flex items-center gap-1 hover:scale-105 transition-transform"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </CardHeader>
  );
};

export default ManifestHeader;
