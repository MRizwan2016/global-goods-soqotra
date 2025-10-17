import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2 } from "lucide-react";
import { AlgeriaContainer } from "../types/algeriaTypes";

interface ContainerSelectionProps {
  containers: AlgeriaContainer[];
  onContainerSelect: (container: AlgeriaContainer) => void;
  onContainerCreate: (container: Omit<AlgeriaContainer, 'id'>) => void;
  onContainerEdit?: (containerId: string, updatedContainer: Partial<AlgeriaContainer>) => void;
  onContainerDelete?: (containerId: string) => void;
}

const ContainerSelection: React.FC<ContainerSelectionProps> = ({
  containers,
  onContainerSelect,
  onContainerCreate,
  onContainerEdit,
  onContainerDelete
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newContainer, setNewContainer] = useState({
    containerNumber: "",
    type: "40HC",
    vesselName: "",
    portOfLoading: "DOHA, QATAR",
    portOfDischarge: "ALGIERS" as "ALGIERS" | "SKIKDA",
    sealNumber: ""
  });

  const handleCreateContainer = () => {
    if (!newContainer.containerNumber.trim()) {
      alert("Please enter a container number");
      return;
    }

    const isDuplicate = containers.some(container => 
      container.containerNumber.toLowerCase() === newContainer.containerNumber.toLowerCase()
    );
    
    if (isDuplicate) {
      alert("Container number already exists! Please use a different number.");
      return;
    }

    const container: Omit<AlgeriaContainer, 'id'> = {
      ...newContainer,
      maxVehicles: 4,
      loadedVehicles: [],
      personalEffects: [],
      status: "LOADING",
      totalFreightCharge: 0,
      totalPersonalEffectsCharge: 0,
      totalCharge: 0
    };
    
    onContainerCreate(container);
    setShowCreateForm(false);
    setNewContainer({
      containerNumber: "",
      type: "40HC",
      vesselName: "",
      portOfLoading: "DOHA, QATAR",
      portOfDischarge: "ALGIERS",
      sealNumber: ""
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">Algeria Container Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {containers.map((container) => (
            <Card 
              key={container.id}
              className={`border-2 transition-all hover:shadow-lg cursor-pointer ${
                container.status === 'LOADING' ? 'border-orange-500 bg-orange-50' :
                container.status === 'SEALED' ? 'border-blue-500 bg-blue-50' :
                'border-gray-300'
              }`}
              onClick={() => onContainerSelect(container)}
            >
              <CardContent className="p-4">
                <div className="text-sm font-semibold text-primary">
                  {container.containerNumber}
                </div>
                <div className="text-xs text-muted-foreground">
                  Seal: {container.sealNumber}
                </div>
                <div className="text-xs text-muted-foreground">
                  Port: {container.portOfDischarge}
                </div>
                <div className="text-xs">
                  Vehicles: {container.loadedVehicles.length}/{container.maxVehicles}
                </div>
                <div className={`text-xs font-medium mt-2 px-2 py-1 rounded ${
                  container.status === 'LOADING' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {container.status}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!showCreateForm ? (
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-primary hover:bg-primary/90"
          >
            + Add New Container
          </Button>
        ) : (
          <Card className="border-2 border-dashed border-primary">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Container Number</label>
                  <Input
                    value={newContainer.containerNumber}
                    onChange={(e) => setNewContainer({...newContainer, containerNumber: e.target.value})}
                    placeholder="MAEU2656245"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Seal Number</label>
                  <Input
                    value={newContainer.sealNumber}
                    onChange={(e) => setNewContainer({...newContainer, sealNumber: e.target.value})}
                    placeholder="ML-QA23564"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Vessel Name</label>
                  <Input
                    value={newContainer.vesselName}
                    onChange={(e) => setNewContainer({...newContainer, vesselName: e.target.value})}
                    placeholder="MSC MEDITERRANEAN"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Port of Discharge</label>
                  <Select 
                    value={newContainer.portOfDischarge} 
                    onValueChange={(value: "ALGIERS" | "SKIKDA") => setNewContainer({...newContainer, portOfDischarge: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALGIERS">Algiers Port</SelectItem>
                      <SelectItem value="SKIKDA">Skikda Port</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateContainer} className="flex-1">
                  Create Container
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ContainerSelection;
