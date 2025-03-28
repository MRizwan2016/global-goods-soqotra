
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContainerList from "../../ContainerList";
import { QatarContainer } from "../../../../types/containerTypes";

interface ContainerDetailsTabProps {
  containerData: any[];
  container: QatarContainer | null;
}

const ContainerDetailsTab: React.FC<ContainerDetailsTabProps> = ({ containerData, container }) => {
  return (
    <>
      <ContainerList containerData={containerData} />
      
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle>CARGO SUMMARY</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">TOTAL PACKAGES:</p>
              <p className="text-lg">{container?.packages || 0}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">TOTAL VOLUME:</p>
              <p className="text-lg">{container?.volume || 0} m³</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">TOTAL WEIGHT:</p>
              <p className="text-lg">{container?.weight || 0} kg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ContainerDetailsTab;
