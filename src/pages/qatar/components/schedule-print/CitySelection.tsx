
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QatarJob } from "../../types/jobTypes";
import { cityVehicleMapping } from "../../data/cityVehicleMapping";
import { MapPin, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { groupBy } from "lodash";

interface CitySelectionProps {
  jobsByCity: Record<string, QatarJob[]>;
  selectedCity: string | null;
  setSelectedCity: (city: string) => void;
}

const CitySelection: React.FC<CitySelectionProps> = ({ 
  jobsByCity, 
  selectedCity, 
  setSelectedCity 
}) => {
  const cityNames = Object.keys(jobsByCity).filter(c => c);
  const [showAddCityDialog, setShowAddCityDialog] = React.useState(false);
  const [newCity, setNewCity] = React.useState("");
  const [customCities, setCustomCities] = React.useState<string[]>([]);

  const handleAddCity = () => {
    if (newCity.trim()) {
      setCustomCities([...customCities, newCity.toUpperCase().trim()]);
      setNewCity("");
      setShowAddCityDialog(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Select City:</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => setShowAddCityDialog(true)}
          className="h-8 px-2"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add City
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {cityNames.length > 0 ? (
          cityNames.map(city => {
            const recommendedVehicle = cityVehicleMapping[city]?.[0];
            return (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                onClick={() => setSelectedCity(city)}
                className="mb-2"
              >
                <MapPin className="mr-1 h-4 w-4" />
                {city} ({jobsByCity[city].length} jobs)
                {recommendedVehicle && (
                  <Badge className="ml-2">Truck: {recommendedVehicle}</Badge>
                )}
              </Button>
            );
          })
        ) : (
          <p>No cities with assigned jobs found</p>
        )}
      </div>

      {/* Add City Dialog */}
      <Dialog open={showAddCityDialog} onOpenChange={setShowAddCityDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New City</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city-name" className="text-right">
                City Name
              </Label>
              <Input
                id="city-name"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="col-span-3"
                placeholder="Enter city name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddCityDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddCity}>
              Add City
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CitySelection;
