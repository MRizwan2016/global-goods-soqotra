
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { QatarVessel } from "../mockVesselData";

interface ManifestHeaderProps {
  vessel: QatarVessel;
}

const ManifestHeader: React.FC<ManifestHeaderProps> = ({ vessel }) => {
  return (
    <CardHeader className="bg-blue-50 border-b border-blue-100">
      <CardTitle className="text-xl text-blue-800">
        Vessel Manifest - {vessel.vesselName || vessel.runningNumber}
      </CardTitle>
    </CardHeader>
  );
};

export default ManifestHeader;
