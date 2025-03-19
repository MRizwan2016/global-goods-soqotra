import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBranches, mockSectors } from "../../data/mockLocations";

interface CustomerInfoSectionProps {
  jobData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const CustomerInfoSection = ({ 
  jobData, 
  handleInputChange, 
  handleSelectChange 
}: CustomerInfoSectionProps) => {
  return (
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
            placeholder="CUSTOMER NAME"
          />
        </div>
        
        <div>
          <Label htmlFor="mobileNumber">MOBILE NUMBER:</Label>
          <Input 
            id="mobileNumber"
            name="mobileNumber"
            value={jobData.mobileNumber}
            onChange={handleInputChange}
            placeholder="MOBILE NUMBER"
          />
        </div>
        
        <div>
          <Label htmlFor="landNumber">LAND NUMBER:</Label>
          <Input 
            id="landNumber"
            name="landNumber"
            value={jobData.landNumber}
            onChange={handleInputChange}
            placeholder="LAND NUMBER"
          />
        </div>
        
        <div>
          <Label htmlFor="sector">SECTOR:</Label>
          <Select 
            value={jobData.sector} 
            onValueChange={(value) => handleSelectChange("sector", value)}
          >
            <SelectTrigger id="sector" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT SECTOR" />
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
              <SelectValue placeholder="SELECT BRANCH" />
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
            placeholder="ENTER ANY ADDITIONAL INFORMATION"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoSection;
