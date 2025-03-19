
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockVehicles } from "../../../data/mockVehicles";
import { mockSalesReps, mockDrivers, mockHelpers } from "../../../data/mockSalesReps";
import { QatarJob } from "../../../types/jobTypes";
import { cityVehicleMapping } from "../../../data/cityVehicleMapping";
import { Badge } from "@/components/ui/badge";

interface ScheduleFieldsProps {
  formData: any;
  selectedJobs: QatarJob[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
}

const ScheduleFields: React.FC<ScheduleFieldsProps> = ({ 
  formData, 
  selectedJobs,
  handleInputChange, 
  handleSelectChange,
  handleDateChange 
}) => {
  const selectedDate = formData.scheduleDate 
    ? new Date(formData.scheduleDate) 
    : new Date();
    
  // Extract cities from selected jobs
  const jobCities = selectedJobs.map(job => job.city).filter(Boolean);
  const uniqueCities = [...new Set(jobCities)];
  
  // Auto select vehicle based on city
  useEffect(() => {
    if (uniqueCities.length === 1 && !formData.vehicle) {
      const city = uniqueCities[0];
      const recommendedVehicles = cityVehicleMapping[city] || [];
      if (recommendedVehicles.length > 0) {
        handleSelectChange("vehicle", recommendedVehicles[0]);
      }
    }
  }, [uniqueCities, formData.vehicle]);
  
  // Filter vehicles based on cities and job assignments
  const filteredVehicles = mockVehicles.filter(vehicle => {
    // Show all vehicles if no jobs are selected
    if (selectedJobs.length === 0) return true;
    
    // City-based truck assignment logic
    if (uniqueCities.length === 1) {
      const city = uniqueCities[0];
      const recommendedVehicles = cityVehicleMapping[city] || [];
      return recommendedVehicles.includes(vehicle.number);
    }
    
    // If multiple cities, show all vehicles that are used for any of the cities
    if (uniqueCities.length > 1) {
      return uniqueCities.some(city => {
        const cityVehicles = cityVehicleMapping[city] || [];
        return cityVehicles.includes(vehicle.number);
      });
    }
    
    // Show FORK LIFT only for warehouse jobs
    if (vehicle.type === "FORK LIFT" && selectedJobs.some(job => job.location?.includes('WAREHOUSE'))) return true;
    
    return true;
  });

  return (
    <>
      <div>
        <Label htmlFor="scheduleNumber">SCHEDULE NUMBER:</Label>
        <Input
          id="scheduleNumber"
          name="scheduleNumber"
          value={formData.scheduleNumber}
          onChange={handleInputChange}
          className="bg-gray-100"
        />
      </div>
      
      <div>
        <Label htmlFor="vehicle">VEHICLE:</Label>
        <Select 
          value={formData.vehicle} 
          onValueChange={(value) => handleSelectChange("vehicle", value)}
        >
          <SelectTrigger id="vehicle" className="bg-blue-500 text-white">
            <SelectValue placeholder="SELECT VEHICLE" />
          </SelectTrigger>
          <SelectContent>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map(vehicle => (
                <SelectItem key={vehicle.id} value={vehicle.number}>
                  {vehicle.number}/{vehicle.type}/{vehicle.description}
                  {uniqueCities.map(city => {
                    const cityVehicles = cityVehicleMapping[city] || [];
                    if (cityVehicles.includes(vehicle.number)) {
                      return (
                        <Badge key={city} className="ml-1 text-xs">{city}</Badge>
                      );
                    }
                    return null;
                  })}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-match" disabled>No matching vehicles</SelectItem>
            )}
          </SelectContent>
        </Select>
        {uniqueCities.length > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            Showing vehicles for {uniqueCities.join(', ')} ({selectedJobs.length} jobs selected)
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="salesRep">SALES REP:</Label>
        <Select 
          value={formData.salesRep} 
          onValueChange={(value) => handleSelectChange("salesRep", value)}
        >
          <SelectTrigger id="salesRep" className="bg-blue-500 text-white">
            <SelectValue placeholder="SELECT SALES REP" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {mockSalesReps.map(rep => (
              <SelectItem key={rep.id} value={rep.name}>
                {rep.name} {rep.code ? `(${rep.code})` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="driver">DRIVER:</Label>
        <Select 
          value={formData.driver} 
          onValueChange={(value) => handleSelectChange("driver", value)}
        >
          <SelectTrigger id="driver" className="bg-blue-500 text-white">
            <SelectValue placeholder="SELECT DRIVER" />
          </SelectTrigger>
          <SelectContent>
            {mockDrivers.map(driver => (
              <SelectItem key={driver.id} value={driver.name}>
                {driver.name} {driver.license ? `(${driver.license})` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="helper">HELPER:</Label>
        <Select 
          value={formData.helper} 
          onValueChange={(value) => handleSelectChange("helper", value)}
        >
          <SelectTrigger id="helper" className="bg-blue-500 text-white">
            <SelectValue placeholder="SELECT HELPER" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {mockHelpers.map(helper => (
              <SelectItem key={helper.id} value={helper.name}>
                {helper.name} {helper.code ? `(${helper.code})` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="scheduleDate">SCHEDULE DATE:</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* City Information */}
      {uniqueCities.length > 0 && (
        <div>
          <Label>CITIES:</Label>
          <div className="flex flex-wrap gap-1 mt-1">
            {uniqueCities.map(city => {
              const recommendedVehicle = cityVehicleMapping[city]?.[0];
              return (
                <Badge key={city} className="px-2 py-1 mb-1">
                  {city} {recommendedVehicle && ` → ${recommendedVehicle}`}
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleFields;
