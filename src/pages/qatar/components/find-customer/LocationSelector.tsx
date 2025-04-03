
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { qatarTowns, industrialAreaStreets } from "../../data/mockLocations";

interface LocationSelectorProps {
  selectedTown: string;
  setSelectedTown: (town: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedTown,
  setSelectedTown,
  selectedLocation,
  setSelectedLocation
}) => {
  const [isIndustrialArea, setIsIndustrialArea] = useState(false);
  const [isAddTownDialogOpen, setIsAddTownDialogOpen] = useState(false);
  const [newTownName, setNewTownName] = useState("");

  useEffect(() => {
    // Check if selected town is an industrial area
    setIsIndustrialArea(
      selectedTown === "Industrial Area" || 
      selectedTown === "New Industrial Area"
    );
    
    // Reset location if town changes
    if (!isIndustrialArea) {
      setSelectedLocation("");
    }
  }, [selectedTown]);

  const handleAddNewTown = () => {
    if (newTownName.trim()) {
      // In a real application, this would add to the database
      // For now, we just close the dialog
      setIsAddTownDialogOpen(false);
      setNewTownName("");
      // Show confirmation
      alert(`Town "${newTownName}" would be added to the database.`);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="town" className="flex justify-between">
          <span>TOWN:</span>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            className="text-blue-600 h-6 p-1"
            onClick={() => setIsAddTownDialogOpen(true)}
          >
            <Plus size={16} />
            <span className="text-xs">ADD TOWN</span>
          </Button>
        </Label>
        <Select
          value={selectedTown || ""}
          onValueChange={setSelectedTown}
        >
          <SelectTrigger id="town" className="bg-blue-600 text-white">
            <SelectValue placeholder="SELECT TOWN" />
          </SelectTrigger>
          <SelectContent>
            {qatarTowns.length > 0 ? (
              qatarTowns.map((town, index) => (
                <SelectItem key={index} value={town}>
                  {town}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-towns" disabled>No towns available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {isIndustrialArea && (
        <div>
          <Label htmlFor="location">LOCATION (STREET NO.):</Label>
          <Select
            value={selectedLocation || ""}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger id="location" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT STREET NUMBER" />
            </SelectTrigger>
            <SelectContent>
              {industrialAreaStreets.length > 0 ? (
                industrialAreaStreets.map((street, index) => (
                  <SelectItem key={index} value={street}>
                    {street}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-streets" disabled>No streets available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedTown && !isIndustrialArea && (
        <div>
          <Label htmlFor="locationInput">LOCATION:</Label>
          <Input
            id="locationInput"
            value={selectedLocation || ""}
            onChange={(e) => setSelectedLocation(e.target.value)}
            placeholder="Enter location details"
          />
        </div>
      )}

      {/* Dialog to add new town */}
      <Dialog open={isAddTownDialogOpen} onOpenChange={setIsAddTownDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Town</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="newTownName">Town Name:</Label>
            <Input
              id="newTownName"
              value={newTownName}
              onChange={(e) => setNewTownName(e.target.value)}
              placeholder="Enter new town name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTownDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddNewTown}>Add Town</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationSelector;
