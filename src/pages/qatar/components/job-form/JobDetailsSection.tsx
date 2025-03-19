
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobTypeSelector from "./details/JobTypeSelector";
import CitySelector from "./details/CitySelector";
import LocationSelector from "./details/LocationSelector";
import VehicleSelector from "./details/VehicleSelector";
import DateTimeSelector from "./details/DateTimeSelector";
import AdvanceAmount from "./details/AdvanceAmount";

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
        <JobTypeSelector 
          jobType={jobData.jobType}
          handleSelectChange={handleSelectChange}
        />
        
        <CitySelector
          city={jobData.city}
          handleSelectChange={handleSelectChange}
        />
        
        <LocationSelector
          town={jobData.town}
          location={jobData.location}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        
        <VehicleSelector
          vehicle={jobData.vehicle}
          handleSelectChange={handleSelectChange}
        />
        
        <DateTimeSelector
          date={jobData.date}
          time={jobData.time}
          amPm={jobData.amPm}
          sameDay={jobData.sameDay}
          collectDate={jobData.collectDate}
          jobType={jobData.jobType}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        
        <AdvanceAmount
          advanceAmount={jobData.advanceAmount}
          handleInputChange={handleInputChange}
        />
      </CardContent>
    </Card>
  );
};

export default JobDetailsSection;
