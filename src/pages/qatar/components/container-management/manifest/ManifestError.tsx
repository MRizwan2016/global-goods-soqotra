
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FileX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ManifestErrorProps {
  error: string | null;
  onCancel: () => void;
}

const ManifestError: React.FC<ManifestErrorProps> = ({ error, onCancel }) => {
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-red-50 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <FileX className="mr-2 text-red-600" size={22} />
          Error Loading Container Manifest
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 mb-4">
          {error || "Container data not found. Please try again or contact support if the issue persists."}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCancel}
          className="mt-4 flex items-center gap-1 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Container List
        </Button>
      </CardContent>
    </Card>
  );
};

export default ManifestError;
