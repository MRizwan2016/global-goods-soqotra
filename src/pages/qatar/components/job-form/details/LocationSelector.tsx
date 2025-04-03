
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Plus, MapPin } from "lucide-react";
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
import { cityVehicleMapping } from "../../../data/cityVehicleMapping";

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

  // Get all location names from the cityVehicleMapping
  const locationNames = Object.keys(cityVehicleMapping)
    .filter(name => name && name.trim() !== "" && !name.includes("STREET NO.") && !["DOH", "RAK", "WAK", "UMS", "KHO", "DAY", "SHA", "WSB"].includes(name))
    .sort();

  // Get all industrial area street numbers
  const industrialAreaStreets = Object.keys(cityVehicleMapping)
    .filter(name => name && name.trim() !== "" && name.includes("STREET NO."))
    .sort((a, b) => {
      const numA = parseInt(a.replace("STREET NO. ", ""));
      const numB = parseInt(b.replace("STREET NO. ", ""));
      return numA - numB;
    });

  useEffect(() => {
    // Check if selected town is an industrial area
    setIsIndustrialArea(town === "INDUSTRIAL AREA");
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

  // Group locations by the first letter for better organization
  const groupedLocations = locationNames.reduce((acc: Record<string, string[]>, location) => {
    const firstLetter = location.charAt(0);
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(location);
    return acc;
  }, {});

  // Sort the keys for consistent display
  const sortedGroups = Object.keys(groupedLocations).sort();

  // Add default town value if current town value is empty
  const safeTown = town || "default-town";

  return (
    <>
      <div>
        <Label htmlFor="town" className="flex justify-between">
          <span>LOCATION:</span>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            className="text-blue-600 h-6 p-1"
            onClick={() => setIsAddTownDialogOpen(true)}
          >
            <Plus size={16} />
            <span className="text-xs">ADD LOCATION</span>
          </Button>
        </Label>
        <Select 
          value={safeTown} 
          onValueChange={(value) => handleSelectChange("town", value)}
        >
          <SelectTrigger id="town" className="bg-blue-600 text-white">
            <SelectValue placeholder="SELECT LOCATION" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {sortedGroups.length > 0 ? (
              sortedGroups.map(group => (
                <div key={group}>
                  <div className="px-2 py-1.5 text-xs font-semibold bg-gray-100">{group}</div>
                  {groupedLocations[group].map((locationName) => (
                    <SelectItem key={locationName} value={locationName || `unknown-location-${group}`}>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1.5 text-blue-500" />
                        {locationName}
                      </div>
                    </SelectItem>
                  ))}
                </div>
              ))
            ) : (
              <SelectItem value="no-locations-available">No locations available</SelectItem>
            )}
          </SelectContent>
        </Select>

        {/* Dialog to add new town */}
        <Dialog open={isAddTownDialogOpen} onOpenChange={setIsAddTownDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="newTownName">Location Name:</Label>
              <Input
                id="newTownName"
                value={newTownName}
                onChange={(e) => setNewTownName(e.target.value)}
                placeholder="Enter new location name"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTownDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddNewTown}>Add Location</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {isIndustrialArea && (
        <div className="mt-4">
          <Label htmlFor="location">STREET NUMBER:</Label>
          <Select 
            value={location || "default-street"} 
            onValueChange={(value) => handleSelectChange("location", value)}
          >
            <SelectTrigger id="location" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT STREET NUMBER" />
            </SelectTrigger>
            <SelectContent>
              {industrialAreaStreets.length > 0 ? (
                industrialAreaStreets.map((street) => (
                  <SelectItem key={street} value={street || `unknown-street-${Date.now()}`}>
                    {street}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-streets-available">No streets available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {!isIndustrialArea && town && (
        <div className="mt-4">
          <Label htmlFor="location">ADDITIONAL LOCATION DETAILS:</Label>
          <Input 
            id="location"
            name="location"
            value={location || ""}
            onChange={handleInputChange}
            placeholder="Building name, block number, etc."
          />
        </div>
      )}
    </>
  );
};

export default LocationSelector;
