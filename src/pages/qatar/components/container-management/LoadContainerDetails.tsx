
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QatarContainer } from "../../types/containerTypes";
import { ArrowLeft, Truck } from "lucide-react";

interface LoadContainerDetailsProps {
  containerId: string;
  containerData?: QatarContainer | null;
  onLoadComplete: () => void;
  onCancel: () => void;
}

const LoadContainerDetails: React.FC<LoadContainerDetailsProps> = ({
  containerId,
  containerData,
  onLoadComplete,
  onCancel,
}) => {
  // This is a simplified component, in a real app you would have complex cargo loading workflows
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">
          Load Container: {containerData?.containerNumber || containerId}
        </h2>
      </div>

      <Card className="mb-6">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg">Container Details</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Container Number</p>
              <p className="font-medium">{containerData?.containerNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Seal Number</p>
              <p className="font-medium">{containerData?.sealNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{containerData?.containerType || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{containerData?.status || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg">Cargo Search</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-gray-500 mb-4">
            This section would typically contain functionality to search for and add cargo items to the container.
            For simplicity in this demo, we'll just provide a button to proceed to the manifest creation.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onLoadComplete} className="bg-blue-600 hover:bg-blue-700">
          <Truck className="h-4 w-4 mr-2" />
          Proceed to Manifest
        </Button>
      </div>
    </div>
  );
};

export default LoadContainerDetails;
