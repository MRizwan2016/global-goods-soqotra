import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2 } from "lucide-react";
import { TunisiaContainer } from "../types/tunisiaTypes";

interface ContainerSelectionProps {
  containers: TunisiaContainer[];
  onContainerSelect: (container: TunisiaContainer) => void;
  onContainerCreate: (container: Omit<TunisiaContainer, 'id'>) => void;
  onContainerEdit?: (containerId: string, updatedContainer: Partial<TunisiaContainer>) => void;
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
  const [editingContainer, setEditingContainer] = useState<string | null>(null);
  const [newContainer, setNewContainer] = useState({
    containerNumber: "",
    sealNumber: "",
    type: "40HC" as "40HC" | "45",
    dateOfLoading: new Date().toISOString().split('T')[0]
  });
  const [editContainer, setEditContainer] = useState({
    containerNumber: "",
    sealNumber: "",
    type: "40HC" as "40HC" | "45",
    dateOfLoading: ""
  });

  const handleCreateContainer = () => {
    // Validate container number is not empty
    if (!newContainer.containerNumber.trim()) {
      alert("Please enter a container number");
      return;
    }
    
    // Check for duplicate container number
    const isDuplicate = containers.some(container => 
      container.containerNumber.toLowerCase() === newContainer.containerNumber.toLowerCase()
    );
    
    if (isDuplicate) {
      alert("Container number already exists! Please use a different number.");
      return;
    }

    const container: Omit<TunisiaContainer, 'id'> = {
      ...newContainer,
      maxVehicles: newContainer.type === "40HC" ? 4 : 4,
      loadedVehicles: [],
      personalEffects: [],
      status: "EMPTY",
      totalFreightCharge: 0,
      totalPersonalEffectsCharge: 0,
      totalCharge: 0
    };
    
    onContainerCreate(container);
    setShowCreateForm(false);
    setNewContainer({
      containerNumber: "",
      sealNumber: "",
      type: "40HC",
      dateOfLoading: new Date().toISOString().split('T')[0]
    });
  };

  const handleEditContainer = (container: TunisiaContainer) => {
    setEditingContainer(container.id);
    setEditContainer({
      containerNumber: container.containerNumber,
      sealNumber: container.sealNumber,
      type: container.type,
      dateOfLoading: container.dateOfLoading
    });
  };

  const handleSaveEdit = () => {
    if (editingContainer && onContainerEdit) {
      onContainerEdit(editingContainer, editContainer);
      setEditingContainer(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingContainer(null);
    setEditContainer({
      containerNumber: "",
      sealNumber: "",
      type: "40HC",
      dateOfLoading: ""
    });
  };

  const handleDeleteContainer = (containerId: string) => {
    if (onContainerDelete && confirm('Are you sure you want to delete this container?')) {
      onContainerDelete(containerId);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">Container Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {containers.map((container) => (
            <Card 
              key={container.id}
              className={`border-2 transition-all hover:shadow-lg ${
                container.status === 'LOADING' ? 'border-orange-500 bg-orange-50' :
                container.status === 'LOADED' ? 'border-green-500 bg-green-50' :
                container.status === 'SEALED' ? 'border-blue-500 bg-blue-50' :
                'border-gray-300'
              }`}
            >
              <CardContent className="p-4">
                {editingContainer === container.id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium">Container Number</label>
                      <Input
                        value={editContainer.containerNumber}
                        onChange={(e) => setEditContainer({...editContainer, containerNumber: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Seal Number</label>
                      <Input
                        value={editContainer.sealNumber}
                        onChange={(e) => setEditContainer({...editContainer, sealNumber: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Container Type</label>
                      <Select 
                        value={editContainer.type} 
                        onValueChange={(value: "40HC" | "45") => setEditContainer({...editContainer, type: value})}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="40HC">40' HC</SelectItem>
                          <SelectItem value="45">45'</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium">Date of Loading</label>
                      <Input
                        type="date"
                        value={editContainer.dateOfLoading}
                        onChange={(e) => setEditContainer({...editContainer, dateOfLoading: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-1">
                      <Button onClick={handleSaveEdit} size="sm" className="flex-1 text-xs">
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm" className="flex-1 text-xs">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => onContainerSelect(container)}
                    >
                      <div className="text-sm font-semibold text-primary">
                        {container.containerNumber}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Seal: {container.sealNumber}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Type: {container.type}
                      </div>
                      <div className="text-xs">
                        Vehicles: {container.loadedVehicles.length}/{container.maxVehicles}
                      </div>
                      <div className={`text-xs font-medium mt-2 px-2 py-1 rounded ${
                        container.status === 'EMPTY' ? 'bg-gray-100 text-gray-800' :
                        container.status === 'LOADING' ? 'bg-orange-100 text-orange-800' :
                        container.status === 'LOADED' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {container.status}
                      </div>
                    </div>
                    {(onContainerEdit || onContainerDelete) && container.status !== 'SEALED' && (
                      <div className="flex gap-1 mt-2">
                        {onContainerEdit && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditContainer(container);
                            }}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <Edit2 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        )}
                        {onContainerDelete && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteContainer(container.id);
                            }}
                            variant="destructive"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create New Container */}
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
                  <label className="text-sm font-medium">Container Type</label>
                  <Select 
                    value={newContainer.type} 
                    onValueChange={(value: "40HC" | "45") => setNewContainer({...newContainer, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="40HC">40' HC</SelectItem>
                      <SelectItem value="45">45'</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Loading</label>
                  <Input
                    type="date"
                    value={newContainer.dateOfLoading}
                    onChange={(e) => setNewContainer({...newContainer, dateOfLoading: e.target.value})}
                  />
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
