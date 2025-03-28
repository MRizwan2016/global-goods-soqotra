
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QatarContainer } from "../../../types/containerTypes";

interface ContainerDetailsProps {
  container: QatarContainer;
}

const ContainerDetails: React.FC<ContainerDetailsProps> = ({ container }) => {
  return (
    <Card className="mb-6 print-container">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg company-name">Container Details</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Container Number</p>
            <p className="font-medium">{container.containerNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Seal Number</p>
            <p className="font-medium">{container.sealNumber || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{container.containerType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium">{container.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-medium">{container.weight || 0} kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Volume</p>
            <p className="font-medium">{container.volume || 0} m³</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Packages</p>
            <p className="font-medium">{container.packages || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Shipping Line</p>
            <p className="font-medium">{container.shippingLine || "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerDetails;
