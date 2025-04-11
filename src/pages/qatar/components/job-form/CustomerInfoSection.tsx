
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CustomerInfoSectionProps {
  jobData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isEnabled?: boolean;
}

const CustomerInfoSection = ({
  jobData,
  handleInputChange,
  handleSelectChange,
  isEnabled = true
}: CustomerInfoSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PERSONAL EFFECTS CUSTOMER INFORMATION</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="jobNumberDisplay" className="font-medium text-gray-700 mb-1 block">
            JOB NUMBER:
          </Label>
          <input
            type="text"
            id="jobNumberDisplay"
            name="jobNumberDisplay"
            value={jobData.jobNumber}
            className="border border-gray-300 px-3 py-2 rounded w-full font-semibold bg-gray-50 text-lg"
            readOnly
          />
        </div>
        
        <div>
          <Label htmlFor="customer" className="font-medium text-gray-700 mb-1 block">
            CUSTOMER:
          </Label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={jobData.customer}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="Customer name"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <Label htmlFor="mobileNumber" className="font-medium text-gray-700 mb-1 block">
            MOBILE NUMBER:
          </Label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={jobData.mobileNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="Customer mobile number"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <Label htmlFor="landNumber" className="font-medium text-gray-700 mb-1 block">
            LAND NUMBER:
          </Label>
          <input
            type="text"
            id="landNumber"
            name="landNumber"
            value={jobData.landNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="Land line number"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <Label htmlFor="country" className="font-medium text-gray-700 mb-1 block">
            COUNTRY:
          </Label>
          <Select
            value={jobData.country}
            onValueChange={(value) => handleSelectChange("country", value)}
            disabled={!isEnabled}
          >
            <SelectTrigger id="country" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <SelectValue placeholder="SELECT COUNTRY" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Qatar">QATAR</SelectItem>
              <SelectItem value="UAE">UAE</SelectItem>
              <SelectItem value="Bahrain">BAHRAIN</SelectItem>
              <SelectItem value="Saudi Arabia">SAUDI ARABIA</SelectItem>
              <SelectItem value="Sri Lanka">SRI LANKA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="sector" className="font-medium text-gray-700 mb-1 block">
            SECTOR:
          </Label>
          <Select
            value={jobData.sector}
            onValueChange={(value) => handleSelectChange("sector", value)}
            disabled={!isEnabled}
          >
            <SelectTrigger id="sector" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <SelectValue placeholder="SELECT SECTOR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COLOMBO : C">COLOMBO : C</SelectItem>
              <SelectItem value="GAMPAHA : G">GAMPAHA : G</SelectItem>
              <SelectItem value="KALUTARA : K">KALUTARA : K</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="branch" className="font-medium text-gray-700 mb-1 block">
            BRANCH:
          </Label>
          <Select
            value={jobData.branch}
            onValueChange={(value) => handleSelectChange("branch", value)}
            disabled={!isEnabled}
          >
            <SelectTrigger id="branch" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <SelectValue placeholder="SELECT BRANCH" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Head Office">HEAD OFFICE</SelectItem>
              <SelectItem value="Branch 1">BRANCH 1</SelectItem>
              <SelectItem value="Branch 2">BRANCH 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="remarks" className="font-medium text-gray-700 mb-1 block">
            REMARKS:
          </Label>
          <Textarea
            id="remarks"
            name="remarks"
            value={jobData.remarks}
            onChange={handleInputChange}
            placeholder="Enter any additional information about personal effects or household goods"
            className="border border-gray-300 rounded w-full h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            disabled={!isEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoSection;
