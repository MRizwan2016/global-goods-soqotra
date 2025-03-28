
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QatarContainer } from "../../../types/containerTypes";

interface ContainerDetailsProps {
  container: QatarContainer;
}

const ContainerDetails: React.FC<ContainerDetailsProps> = ({ container }) => {
  return (
    <Card className="mb-6 print-container shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-lg flex items-center">
          CONTAINER #{container.containerNumber}
          {container.runningNumber && (
            <span className="ml-2 text-sm text-gray-500">
              (Running #: {container.runningNumber})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">CONTAINER NUMBER:</p>
            <p className="text-lg">{container.containerNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">TYPE:</p>
            <p className="text-lg">{container.containerType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">SEAL NUMBER:</p>
            <p className="text-lg">{container.sealNumber || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">SHIPPING LINE:</p>
            <p className="text-lg">{container.shippingLine || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">SECTOR:</p>
            <p className="text-lg">{container.sector || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">STATUS:</p>
            <p className="text-lg">
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {container.status}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerDetails;
