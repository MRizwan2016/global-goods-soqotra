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
import { mockCities } from "../../data/mockLocations";
import { mockVehicles } from "../../data/mockVehicles";

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
          <Label htmlFor="town">TOWN:</Label>
          <Input 
            id="town"
            name="town"
            value={jobData.town}
            onChange={handleInputChange}
            placeholder="TOWN"
          />
        </div>
        
        <div>
          <Label htmlFor="location">LOCATION:</Label>
          <Input 
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleInputChange}
            placeholder="LOCATION"
          />
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
