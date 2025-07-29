import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { eritreaSectors, eritreaSectorPricing, createNewSector } from "../data/eritreaData";

interface SectorManagementProps {
  onSectorAdded: (sector: any) => void;
}

const SectorManagement: React.FC<SectorManagementProps> = ({ onSectorAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sectorName, setSectorName] = useState("");
  const [freightPerKg, setFreightPerKg] = useState(11.00);
  const [doorToDoorAvailable, setDoorToDoorAvailable] = useState(true);
  const [doorToDoorCharge, setDoorToDoorCharge] = useState(4.00);
  const [customSectors, setCustomSectors] = useState<any[]>([]);

  const handleAddSector = () => {
    if (!sectorName.trim()) {
      toast.error("Please enter a sector name");
      return;
    }

    if (freightPerKg <= 0) {
      toast.error("Freight per kg must be greater than 0");
      return;
    }

    if (doorToDoorAvailable && doorToDoorCharge < 0) {
      toast.error("Door-to-door charge cannot be negative");
      return;
    }

    const newSector = createNewSector(
      sectorName,
      freightPerKg,
      doorToDoorAvailable,
      doorToDoorCharge
    );

    // Add to custom sectors list
    const updatedSectors = [...customSectors, newSector];
    setCustomSectors(updatedSectors);

    // Update localStorage for persistence
    localStorage.setItem('eritreaCustomSectors', JSON.stringify(updatedSectors));

    // Add to pricing data
    const updatedPricing = {
      ...eritreaSectorPricing,
      [newSector.value]: newSector.pricing
    };
    localStorage.setItem('eritreaSectorPricing', JSON.stringify(updatedPricing));

    onSectorAdded(newSector);
    
    toast.success(`Sector "${sectorName}" added successfully`);
    
    // Reset form
    setSectorName("");
    setFreightPerKg(11.00);
    setDoorToDoorAvailable(true);
    setDoorToDoorCharge(4.00);
    setIsOpen(false);
  };

  const handleDeleteSector = (sectorValue: string) => {
    const updatedSectors = customSectors.filter(s => s.value !== sectorValue);
    setCustomSectors(updatedSectors);
    localStorage.setItem('eritreaCustomSectors', JSON.stringify(updatedSectors));
    
    // Remove from pricing data
    const currentPricing = JSON.parse(localStorage.getItem('eritreaSectorPricing') || '{}');
    delete currentPricing[sectorValue];
    localStorage.setItem('eritreaSectorPricing', JSON.stringify(currentPricing));
    
    toast.success("Sector deleted successfully");
  };

  // Load custom sectors on component mount
  React.useEffect(() => {
    const savedSectors = localStorage.getItem('eritreaCustomSectors');
    if (savedSectors) {
      setCustomSectors(JSON.parse(savedSectors));
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sector Management</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Sector
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Sector</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sectorName">Sector Name</Label>
                <Input
                  id="sectorName"
                  value={sectorName}
                  onChange={(e) => setSectorName(e.target.value)}
                  placeholder="Enter sector name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="freightPerKg">Freight Per Kg (QAR)</Label>
                <Input
                  id="freightPerKg"
                  type="number"
                  step="0.50"
                  min="0"
                  value={freightPerKg}
                  onChange={(e) => setFreightPerKg(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="doorToDoorAvailable"
                  checked={doorToDoorAvailable}
                  onCheckedChange={setDoorToDoorAvailable}
                />
                <Label htmlFor="doorToDoorAvailable">Door-to-Door Service Available</Label>
              </div>

              {doorToDoorAvailable && (
                <div className="space-y-2">
                  <Label htmlFor="doorToDoorCharge">Door-to-Door Charge (QAR)</Label>
                  <Input
                    id="doorToDoorCharge"
                    type="number"
                    step="0.50"
                    min="0"
                    value={doorToDoorCharge}
                    onChange={(e) => setDoorToDoorCharge(parseFloat(e.target.value) || 0)}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSector}>
                  Add Sector
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Display existing sectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Default sectors */}
        <div>
          <h4 className="font-medium mb-2">Default Sectors</h4>
          <div className="space-y-2">
            {eritreaSectors.map((sector) => (
              <div key={sector.value} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{sector.label}</p>
                    <p className="text-sm text-gray-600">Port: {sector.port}</p>
                    {eritreaSectorPricing[sector.value as keyof typeof eritreaSectorPricing] && (
                      <div className="text-xs text-gray-500 mt-1">
                        <p>Freight: {eritreaSectorPricing[sector.value as keyof typeof eritreaSectorPricing].freightPerKg} QAR/kg</p>
                        <p>Door-to-Door: {eritreaSectorPricing[sector.value as keyof typeof eritreaSectorPricing].doorToDoor.available ? 
                          `${eritreaSectorPricing[sector.value as keyof typeof eritreaSectorPricing].doorToDoor.charge} QAR` : 'Not Available'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom sectors */}
        <div>
          <h4 className="font-medium mb-2">Custom Sectors</h4>
          {customSectors.length === 0 ? (
            <p className="text-gray-500 text-sm">No custom sectors added yet.</p>
          ) : (
            <div className="space-y-2">
              {customSectors.map((sector) => (
                <div key={sector.value} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{sector.label}</p>
                      <p className="text-sm text-gray-600">Port: {sector.port}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        <p>Freight: {sector.pricing.freightPerKg} QAR/kg</p>
                        <p>Door-to-Door: {sector.pricing.doorToDoor.available ? 
                          `${sector.pricing.doorToDoor.charge} QAR` : 'Not Available'}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSector(sector.value)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectorManagement;