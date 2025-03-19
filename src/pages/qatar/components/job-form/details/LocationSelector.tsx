
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { qatarTowns, industrialAreaStreets } from "../../../data/mockLocations";

interface LocationSelectorProps {
  town: string;
  location: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const LocationSelector = ({ 
  town, 
  location,
  handleInputChange, 
  handleSelectChange 
}: LocationSelectorProps) => {
  const [isIndustrialArea, setIsIndustrialArea] = useState(false);
  const [isAddTownDialogOpen, setIsAddTownDialogOpen] = useState(false);
  const [newTownName, setNewTownName] = useState("");

  useEffect(() => {
    // Check if selected town is an industrial area
    setIsIndustrialArea(
      town === "Industrial Area" || 
      town === "New Industrial Area"
    );
  }, [town]);

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
    <>
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
          value={town} 
          onValueChange={(value) => handleSelectChange("town", value)}
        >
          <SelectTrigger id="town" className="bg-blue-600 text-white">
            <SelectValue placeholder="SELECT TOWN" />
          </SelectTrigger>
          <SelectContent>
            {qatarTowns.map((town, index) => (
              <SelectItem key={index} value={town}>
                {town}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
      
      <div>
        <Label htmlFor="location">LOCATION:</Label>
        {isIndustrialArea ? (
          <Select 
            value={location} 
            onValueChange={(value) => handleSelectChange("location", value)}
          >
            <SelectTrigger id="location" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT STREET NUMBER" />
            </SelectTrigger>
            <SelectContent>
              {industrialAreaStreets.map((street, index) => (
                <SelectItem key={index} value={street}>
                  {street}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input 
            id="location"
            name="location"
            value={location}
            onChange={handleInputChange}
            placeholder="LOCATION"
          />
        )}
      </div>
    </>
  );
};

export default LocationSelector;
