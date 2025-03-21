
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockVehicles } from "../../../data/mockVehicles";
import { mockSalesReps, mockDrivers, mockHelpers } from "../../../data/mockSalesReps";
import { Save, ArrowLeft } from "lucide-react";
import { QatarJob } from "../../../types/jobTypes";
import { JobScheduleFormData } from "../job-schedule-form/types";

interface ScheduleDetailsEditorProps {
  scheduleData: JobScheduleFormData;
  setScheduleData: React.Dispatch<React.SetStateAction<JobScheduleFormData>>;
  onSave: () => void;
  onCancel: () => void;
  selectedJobs: QatarJob[];
}

const ScheduleDetailsEditor: React.FC<ScheduleDetailsEditorProps> = ({
  scheduleData,
  setScheduleData,
  onSave,
  onCancel,
  selectedJobs
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setScheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Extract cities from selected jobs
  const cities = [...new Set(selectedJobs.map(job => job.city).filter(Boolean))];
  const cityString = cities.join(", ");

  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl">Job Schedule Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="scheduleNumber">Schedule Number</Label>
            <Input
              id="scheduleNumber"
              name="scheduleNumber"
              value={scheduleData.scheduleNumber}
              onChange={handleInputChange}
              className="font-bold"
              readOnly
            />
          </div>
          
          <div>
            <Label htmlFor="scheduleDate">Schedule Date</Label>
            <Input
              id="scheduleDate"
              name="scheduleDate"
              type="date"
              value={scheduleData.scheduleDate}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <Label htmlFor="vehicle">Vehicle</Label>
            <Select
              value={scheduleData.vehicle}
              onValueChange={(value) => handleSelectChange("vehicle", value)}
            >
              <SelectTrigger id="vehicle" className="bg-blue-600 text-white">
                <SelectValue placeholder="SELECT VEHICLE" />
              </SelectTrigger>
              <SelectContent>
                {mockVehicles.map(vehicle => (
                  <SelectItem key={vehicle.id} value={vehicle.number}>
                    {vehicle.number} - {vehicle.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="city">City/Area</Label>
            <Input
              id="city"
              value={cityString}
              className="bg-gray-50"
              readOnly
            />
          </div>
          
          <div>
            <Label htmlFor="salesRep">Sales Representative</Label>
            <Select
              value={scheduleData.salesRep}
              onValueChange={(value) => handleSelectChange("salesRep", value)}
            >
              <SelectTrigger id="salesRep" className="bg-blue-600 text-white">
                <SelectValue placeholder="SELECT SALES REP" />
              </SelectTrigger>
              <SelectContent>
                {mockSalesReps.map(rep => (
                  <SelectItem key={rep.id} value={rep.name}>
                    {rep.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="driver">Driver</Label>
            <Select
              value={scheduleData.driver}
              onValueChange={(value) => handleSelectChange("driver", value)}
            >
              <SelectTrigger id="driver" className="bg-blue-600 text-white">
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
            <Label htmlFor="helper">Helper</Label>
            <Select
              value={scheduleData.helper}
              onValueChange={(value) => handleSelectChange("helper", value)}
            >
              <SelectTrigger id="helper" className="bg-blue-600 text-white">
                <SelectValue placeholder="SELECT HELPER" />
              </SelectTrigger>
              <SelectContent>
                {mockHelpers.map(helper => (
                  <SelectItem key={helper.id} value={helper.name}>
                    {helper.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
            <h3 className="font-medium text-amber-800 mb-2">Selected Jobs</h3>
            <p className="text-sm text-amber-700">{selectedJobs.length} personal effects jobs selected from {cities.length > 1 ? 'multiple areas' : cities[0] || 'unspecified area'}</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <Button 
            type="button" 
            variant="outline" 
            className="gap-2"
            onClick={onCancel}
          >
            <ArrowLeft size={16} />
            Cancel
          </Button>
          
          <Button 
            type="button" 
            className="bg-green-600 hover:bg-green-700 gap-2"
            onClick={onSave}
          >
            <Save size={16} />
            Save Schedule Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleDetailsEditor;
