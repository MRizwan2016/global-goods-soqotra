
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBranches, mockCities, mockSectors, mockVehicles } from "../data/mockJobData";

interface JobFormProps {
  jobId?: string;
  isNewJob?: boolean;
  onSubmit: (data: any) => void;
}

const JobForm = ({ jobId, isNewJob = false, onSubmit }: JobFormProps) => {
  const [jobData, setJobData] = useState({
    jobType: "COLLECTION",
    jobNumber: isNewJob ? "29912" : "",
    invoiceNumber: "",
    date: "",
    time: "",
    amPm: "AM",
    sameDay: "N",
    customer: "",
    mobileNumber: "",
    landNumber: "",
    sector: "",
    branch: "",
    city: "",
    town: "",
    location: "",
    vehicle: "",
    advanceAmount: "",
    remarks: "",
    collectDate: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(jobData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                  <SelectValue placeholder="Select Type" />
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
                  <SelectValue placeholder="Select City" />
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
              <Label htmlFor="town">TOWN:</Label>
              <Input 
                id="town"
                name="town"
                value={jobData.town}
                onChange={handleInputChange}
                placeholder="Town"
              />
            </div>
            
            <div>
              <Label htmlFor="location">LOCATION:</Label>
              <Input 
                id="location"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                placeholder="Location"
              />
            </div>
            
            <div>
              <Label htmlFor="vehicle">VEHICLE:</Label>
              <Select 
                value={jobData.vehicle} 
                onValueChange={(value) => handleSelectChange("vehicle", value)}
              >
                <SelectTrigger id="vehicle" className="bg-blue-600 text-white">
                  <SelectValue placeholder="Select Vehicle" />
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
        
        <Card>
          <CardHeader className="bg-gray-50 pb-2">
            <CardTitle className="text-md">CUSTOMER INFORMATION</CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="jobNumber">JOB NUMBER:</Label>
              <Input 
                id="jobNumber"
                name="jobNumber"
                value={jobData.jobNumber}
                onChange={handleInputChange}
                readOnly={true}
                className="bg-gray-100"
              />
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="customer">CUSTOMER:</Label>
              <Input 
                id="customer"
                name="customer"
                value={jobData.customer}
                onChange={handleInputChange}
                placeholder="Customer name"
              />
            </div>
            
            <div>
              <Label htmlFor="mobileNumber">MOBILE NUMBER:</Label>
              <Input 
                id="mobileNumber"
                name="mobileNumber"
                value={jobData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile number"
              />
            </div>
            
            <div>
              <Label htmlFor="landNumber">LAND NUMBER:</Label>
              <Input 
                id="landNumber"
                name="landNumber"
                value={jobData.landNumber}
                onChange={handleInputChange}
                placeholder="Land number"
              />
            </div>
            
            <div>
              <Label htmlFor="sector">SECTOR:</Label>
              <Select 
                value={jobData.sector} 
                onValueChange={(value) => handleSelectChange("sector", value)}
              >
                <SelectTrigger id="sector" className="bg-blue-600 text-white">
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent>
                  {mockSectors.map(sector => (
                    <SelectItem key={sector.id} value={sector.code}>
                      {sector.name} - {sector.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="branch">BRANCH:</Label>
              <Select 
                value={jobData.branch} 
                onValueChange={(value) => handleSelectChange("branch", value)}
              >
                <SelectTrigger id="branch" className="bg-blue-600 text-white">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {mockBranches.map(branch => (
                    <SelectItem key={branch.id} value={branch.code}>
                      {branch.name} - {branch.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="remarks">REMARKS:</Label>
              <Textarea 
                id="remarks"
                name="remarks"
                value={jobData.remarks}
                onChange={handleInputChange}
                placeholder="Enter any additional information"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isNewJob && (
        <Card className="mb-6">
          <CardHeader className="bg-blue-600 text-white py-2 px-4">
            <CardTitle className="text-md">PACKAGE DESCRIPTION</CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="itemName">ITEM:</Label>
              <Input 
                id="itemName"
                name="itemName"
                placeholder="Item description"
              />
            </div>
            
            <div>
              <Label htmlFor="sellPrice">SELL:</Label>
              <Input 
                id="sellPrice"
                name="sellPrice"
                type="number"
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="quantity">QUANTITY:</Label>
              <Input 
                id="quantity"
                name="quantity"
                type="number"
                placeholder="1"
              />
            </div>
            
            <div className="col-span-3">
              <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                INSERT
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          CANCEL
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          {isNewJob ? 'CREATE JOB' : 'UPDATE JOB'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
