
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, MapPin } from "lucide-react";
import { useJobForm } from "../context/JobFormContext";

const CitySelector = () => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();
  const [showAddCityDialog, setShowAddCityDialog] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [customCities, setCustomCities] = useState<string[]>([]);

  // Base cities list with all the requested ones
  const baseCities = [
    "MANSOORA", "NAJMA", "MARKIYA", "UM GARAN", "UM SALAL ALI", 
    "UM SALAL MOHAMED", "UM AL AFFAI", "MAKAINIS", "ONAIZA", "WUKAIR", 
    "NUAIJA", "AL HILAL", "MATHAR AL KADEEM", "THUMAMA", "BAAYA", "MUAITHAR",
    "DOHA", "AL RAYYAN", "AL WAKRAH", "AL KHOR", "UMM SALAL", "AL SHAMAL", "DUKHAN",
    "WESTBAY", "DAFFNA", "KARARA", "KATARA", "INDUSTRIAL AREA",
  ];

  // Combine base cities with any custom ones
  const allCities = [...new Set([...baseCities, ...customCities])].sort();

  const handleAddCity = () => {
    if (newCity.trim()) {
      setCustomCities([...customCities, newCity.toUpperCase().trim()]);
      setNewCity("");
      setShowAddCityDialog(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor="city" className="font-medium text-gray-700">
          CITY
        </Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setShowAddCityDialog(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add City
        </Button>
      </div>
      <Select
        value={jobData.city}
        onValueChange={(value) => handleSelectChange("city", value)}
        disabled={!isJobNumberGenerated}
      >
        <SelectTrigger id="city" className="border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
          <SelectValue placeholder="SELECT CITY" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectGroup>
            <SelectLabel>Cities</SelectLabel>
            {allCities.map((city, index) => (
              <SelectItem key={index} value={city}>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{city}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Add City Dialog */}
      <Dialog open={showAddCityDialog} onOpenChange={setShowAddCityDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New City</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                City Name
              </Label>
              <Input
                id="name"
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

export default CitySelector;
