
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { mockCities } from "../../data/mockLocations";
import { mockVehicles } from "../../data/mockVehicles";
import { qatarTowns, industrialAreaStreets } from "../../data/mockLocations";

interface JobDetailsSectionProps {
  jobData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const JobDetailsSection = ({ 
  jobData, 
  handleInputChange, 
  handleSelectChange 
}: JobDetailsSectionProps) => {
  const [isIndustrialArea, setIsIndustrialArea] = useState(false);
  const [isAddTownDialogOpen, setIsAddTownDialogOpen] = useState(false);
  const [newTownName, setNewTownName] = useState("");

  useEffect(() => {
    // Check if selected town is an industrial area
    setIsIndustrialArea(
      jobData.town === "Industrial Area" || 
      jobData.town === "New Industrial Area"
    );
    
    // Reset location if town changes and it's not industrial area
    if (!isIndustrialArea) {
      // Don't reset through handleInputChange to avoid side effects
      // Just use handleSelectChange for location if needed
    }
  }, [jobData.town]);

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
    <Card>
      <CardHeader className="bg-gray-50 pb-2">
        <CardTitle className="text-md">JOB DETAILS</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="jobType">JOB TYPE:</Label>
          <Select 
            value={jobData.jobType} 
            onValueChange={(value) => handleSelectChange("jobType", value)}
          >
            <SelectTrigger id="jobType" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT TYPE" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COLLECTION">COLLECTION</SelectItem>
              <SelectItem value="DELIVERY">DELIVERY</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="city">CITY:</Label>
          <Select 
            value={jobData.city} 
            onValueChange={(value) => handleSelectChange("city", value)}
          >
            <SelectTrigger id="city" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT CITY" />
            </SelectTrigger>
            <SelectContent>
              {mockCities.map(city => (
                <SelectItem key={city.id} value={city.code}>
                  {city.name} - {city.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
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
            value={jobData.town} 
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
              value={jobData.location} 
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
              value={jobData.location}
              onChange={handleInputChange}
              placeholder="LOCATION"
            />
          )}
        </div>
        
        <div>
          <Label htmlFor="vehicle">VEHICLE:</Label>
          <Select 
            value={jobData.vehicle} 
            onValueChange={(value) => handleSelectChange("vehicle", value)}
          >
            <SelectTrigger id="vehicle" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT VEHICLE" />
            </SelectTrigger>
            <SelectContent>
              {mockVehicles.map(vehicle => (
                <SelectItem key={vehicle.id} value={vehicle.number}>
                  {vehicle.number}/{vehicle.type}/{vehicle.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="jobDate">JOB DATE:</Label>
          <Input 
            id="jobDate"
            name="date"
            type="text"
            value={jobData.date}
            onChange={handleInputChange}
            placeholder="DD/MM/YYYY"
          />
        </div>
        
        <div>
          <Label htmlFor="jobTime">JOB TIME:</Label>
          <Input 
            id="jobTime"
            name="time"
            value={jobData.time}
            onChange={handleInputChange}
            placeholder="00:00"
          />
        </div>
        
        <div>
          <Label htmlFor="amPm">AM/PM:</Label>
          <Select 
            value={jobData.amPm} 
            onValueChange={(value) => handleSelectChange("amPm", value)}
          >
            <SelectTrigger id="amPm" className="bg-blue-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="sameDay">SAME DAY JOB:</Label>
          <Select 
            value={jobData.sameDay} 
            onValueChange={(value) => handleSelectChange("sameDay", value)}
          >
            <SelectTrigger id="sameDay" className="bg-blue-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Y">YES</SelectItem>
              <SelectItem value="N">NO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="advanceAmount">ADVANCE AMOUNT:</Label>
          <Input 
            id="advanceAmount"
            name="advanceAmount"
            type="number"
            value={jobData.advanceAmount}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
        
        {jobData.jobType === "COLLECTION" && (
          <div>
            <Label htmlFor="collectDate">COLLECT DATE:</Label>
            <Input 
              id="collectDate"
              name="collectDate"
              value={jobData.collectDate}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobDetailsSection;
