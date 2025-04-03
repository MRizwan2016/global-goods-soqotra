
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
import { countrySectorMap } from "@/pages/invoicing/constants/countrySectorMap";
import { warehouseOptions } from "@/pages/invoicing/constants/locationData";

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
  // Get list of countries from countrySectorMap
  const countries = Object.keys(countrySectorMap).filter(country => country.trim() !== "");
  
  // Get branches for selected country if any
  const getBranchesForCountry = (country: string) => {
    if (!country) return [];
    
    // Use warehouse options as branches for simplicity
    return (warehouseOptions[country] || []).filter(branch => branch && branch.trim() !== "");
  };
  
  const branches = jobData.country ? getBranchesForCountry(jobData.country) : [];

  return (
    <Card>
      <CardHeader className="bg-gray-50 pb-2">
        <CardTitle className="text-md">PERSONAL EFFECTS CUSTOMER INFORMATION</CardTitle>
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
          <Label htmlFor="country">COUNTRY:</Label>
          <Select 
            value={jobData.country || "default-country"} 
            onValueChange={(value) => {
              // Update country and associated sector
              handleSelectChange("country", value);
              handleSelectChange("sector", countrySectorMap[value] || "");
            }}
          >
            <SelectTrigger id="country" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT COUNTRY" />
            </SelectTrigger>
            <SelectContent>
              {countries.length > 0 ? (
                countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="default-country">No countries available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="sector">SECTOR:</Label>
          <Input 
            id="sector"
            name="sector"
            value={jobData.sector || ""}
            onChange={handleInputChange}
            readOnly={true}
            className="bg-gray-100"
          />
        </div>
        
        <div>
          <Label htmlFor="branch">BRANCH:</Label>
          <Select 
            value={jobData.branch || "default-branch"} 
            onValueChange={(value) => handleSelectChange("branch", value)}
            disabled={branches.length === 0}
          >
            <SelectTrigger id="branch" className="bg-blue-600 text-white">
              <SelectValue placeholder="SELECT BRANCH" />
            </SelectTrigger>
            <SelectContent>
              {branches.length > 0 ? (
                branches.map(branch => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="default-branch">No branches available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-2">
          <Label htmlFor="remarks">REMARKS:</Label>
          <Textarea 
            id="remarks"
            name="remarks"
            value={jobData.remarks || ""}
            onChange={handleInputChange}
            placeholder="ENTER ANY ADDITIONAL INFORMATION ABOUT PERSONAL EFFECTS OR HOUSEHOLD GOODS"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoSection;
