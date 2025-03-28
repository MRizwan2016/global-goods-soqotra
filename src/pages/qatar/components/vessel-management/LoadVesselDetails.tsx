
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Ship } from "lucide-react";
import { mockVesselData, QatarVessel } from "./mockVesselData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import mockContainers from "../../data/mockContainers";
import { toast } from "sonner";

interface LoadVesselDetailsProps {
  vesselId: string;
  onContainersLoaded: () => void;
  onCancel: () => void;
}

const LoadVesselDetails: React.FC<LoadVesselDetailsProps> = ({
  vesselId,
  onContainersLoaded,
  onCancel
}) => {
  const [vessel, setVessel] = useState<QatarVessel | null>(null);
  const [selectedContainers, setSelectedContainers] = useState<string[]>([]);
  const [availableContainers, setAvailableContainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Find vessel data
  useEffect(() => {
    setLoading(true);
    const foundVessel = mockVesselData.find(v => v.id === vesselId);
    if (foundVessel) {
      setVessel(foundVessel);
      // Load existing containers if any
      if (foundVessel.containers && foundVessel.containers.length > 0) {
        setSelectedContainers(foundVessel.containers);
      }
    }
    
    // Get all containers, not just those with specific statuses
    // This ensures containers show up for loading
    const allContainers = mockContainers.map(container => ({
      id: container.id,
      runningNumber: container.runningNumber,
      containerNumber: container.containerNumber,
      containerType: container.containerType,
      status: container.status
    }));
    
    setAvailableContainers(allContainers);
    setLoading(false);
  }, [vesselId]);
  
  const handleAddContainer = (containerId: string) => {
    if (!selectedContainers.includes(containerId)) {
      setSelectedContainers([...selectedContainers, containerId]);
      toast.success("Container added to vessel");
    }
  };
  
  const handleRemoveContainer = (containerId: string) => {
    setSelectedContainers(selectedContainers.filter(id => id !== containerId));
    toast.info("Container removed from vessel");
  };
  
  const handleSave = () => {
    if (selectedContainers.length === 0) {
      toast.error("Please add at least one container to the vessel");
      return;
    }
    
    // In a real app, save to database
    toast.success("Containers assigned to vessel successfully");
    onContainersLoaded();
  };
  
  if (loading) {
    return <div className="flex justify-center p-8">Loading vessel details...</div>;
  }
  
  if (!vessel) {
    return <div className="flex justify-center p-8 text-red-500">Vessel not found</div>;
  }
  
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-xl text-blue-800 flex items-center">
            <Ship className="mr-2" size={20} />
            Vessel Details - {vessel.vesselName || vessel.runningNumber}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Vessel Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Running Number:</span>
                  <span className="font-medium">{vessel.runningNumber}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Vessel Name:</span>
                  <span className="font-medium">{vessel.vesselName || "Not Set"}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Voyage:</span>
                  <span className="font-medium">{vessel.voyage || "Not Set"}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Sector:</span>
                  <span className="font-medium">{vessel.sector}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Port Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Port of Loading:</span>
                  <span className="font-medium">{vessel.portOfLoading || "Not Set"}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Port of Discharge:</span>
                  <span className="font-medium">{vessel.portOfDischarge || "Not Set"}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Direction:</span>
                  <span className="font-medium">{vessel.direction}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Shipping Line:</span>
                  <span className="font-medium">{vessel.shippingLine || "Not Set"}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Schedule Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">ETD:</span>
                  <span className="font-medium">{vessel.etd || "Not Set"}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">ETA:</span>
                  <span className="font-medium">{vessel.eta || "Not Set"}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Master B/L:</span>
                  <span className="font-medium">{vessel.masterBL || "Not Set"}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{vessel.status || "NEW"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-xl text-green-800">Load Containers to Vessel</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Available Containers</h3>
              {availableContainers.length > 0 ? (
                <div className="border rounded-md divide-y max-h-80 overflow-y-auto">
                  {availableContainers.map(container => (
                    <div key={container.id} className="p-3 flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <div className="font-medium">Container #{container.runningNumber}</div>
                        <div className="text-sm text-gray-500">
                          {container.containerNumber} ({container.containerType})
                          {container.status && <span className="ml-2 text-blue-500">Status: {container.status}</span>}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddContainer(container.runningNumber)}
                        disabled={selectedContainers.includes(container.runningNumber)}
                      >
                        {selectedContainers.includes(container.runningNumber) ? 'Added' : 'Add'}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 border rounded-md">
                  No available containers. Please create containers first.
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Selected Containers ({selectedContainers.length})</h3>
              {selectedContainers.length > 0 ? (
                <div className="border rounded-md divide-y max-h-80 overflow-y-auto">
                  {selectedContainers.map(containerId => {
                    const container = mockContainers.find(c => c.runningNumber === containerId);
                    return (
                      <div key={containerId} className="p-3 flex justify-between items-center hover:bg-gray-50">
                        <div>
                          <div className="font-medium">Container #{containerId}</div>
                          {container && (
                            <div className="text-sm text-gray-500">
                              {container.containerNumber} ({container.containerType})
                            </div>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveContainer(containerId)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 border rounded-md">
                  No containers selected. Select containers from the available list.
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
            
            <Button 
              onClick={handleSave}
              disabled={selectedContainers.length === 0}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={16} />
              Save and Proceed
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadVesselDetails;
