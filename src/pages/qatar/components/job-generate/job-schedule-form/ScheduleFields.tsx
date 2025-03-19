
import React from "react";
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
import { mockVehicles, mockSalesReps, mockDrivers } from "../../../data/mockJobData";

interface ScheduleFieldsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
}

const ScheduleFields: React.FC<ScheduleFieldsProps> = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange,
  handleDateChange 
}) => {
  const selectedDate = formData.scheduleDate 
    ? new Date(formData.scheduleDate) 
    : new Date();

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
            {mockVehicles.map(vehicle => (
              <SelectItem key={vehicle.id} value={vehicle.number}>
                {vehicle.number}/{vehicle.type}/{vehicle.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          <SelectContent>
            {mockSalesReps.map(rep => (
              <SelectItem key={rep.id} value={rep.name}>
                {rep.name}/{rep.code}
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
                {driver.name}
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
          <SelectContent>
            {mockSalesReps.map(rep => (
              <SelectItem key={rep.id} value={rep.name}>
                {rep.name}/{rep.code}
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
    </>
  );
};

export default ScheduleFields;
