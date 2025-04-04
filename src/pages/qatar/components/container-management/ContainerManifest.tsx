
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ContainerManifestProps } from "../../types/containerTypes";
import useContainerManifest from "../../hooks/useContainerManifest";

const ContainerManifest: React.FC<ContainerManifestProps> = ({
  containerId,
  onClose
}) => {
  const {
    container,
    cargoItems,
    confirmDate,
    setConfirmDate,
    vgmWeight,
    setVgmWeight,
    activeTab,
    setActiveTab,
    printViewVisible,
    handleConfirm,
    handlePrint
  } = useContainerManifest(containerId, onClose);

  if (!container) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            Loading container information...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle>
            Container Manifest - {container.containerNumber}
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p>Container manifest content will be displayed here...</p>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Confirm Manifest
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerManifest;
