
import React from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-medium text-gray-900 mb-4">Personal Effects Customer Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jobNumber" className="block text-sm font-medium text-gray-700 mb-1">
            JOB NUMBER:
          </label>
          <input
            type="text"
            id="customerJobNumber"
            name="jobNumber"
            value={jobData.jobNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full font-semibold bg-gray-50"
            readOnly
            placeholder="Job number will be displayed here"
          />
        </div>
        
        <div>
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
            CUSTOMER:
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={jobData.customer}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="Customer name"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
            MOBILE NUMBER:
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={jobData.mobileNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="Customer mobile number"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="landNumber" className="block text-sm font-medium text-gray-700 mb-1">
            LAND NUMBER:
          </label>
          <input
            type="text"
            id="landNumber"
            name="landNumber"
            value={jobData.landNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="Land line number"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            COUNTRY:
          </label>
          <Select
            value={jobData.country}
            onValueChange={(value) => handleSelectChange("country", value)}
            disabled={!isEnabled}
          >
            <option value="">Select Country</option>
            <option value="Qatar">Qatar</option>
            <option value="UAE">UAE</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Sri Lanka">Sri Lanka</option>
          </Select>
        </div>
        
        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
            SECTOR:
          </label>
          <Select
            value={jobData.sector}
            onValueChange={(value) => handleSelectChange("sector", value)}
            disabled={!isEnabled}
          >
            <option value="">Select Sector</option>
            <option value="COLOMBO : C">COLOMBO : C</option>
            <option value="GAMPAHA : G">GAMPAHA : G</option>
            <option value="KALUTARA : K">KALUTARA : K</option>
          </Select>
        </div>
        
        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
            BRANCH:
          </label>
          <Select
            value={jobData.branch}
            onValueChange={(value) => handleSelectChange("branch", value)}
            disabled={!isEnabled}
          >
            <option value="">Select Branch</option>
            <option value="Head Office">Head Office</option>
            <option value="Branch 1">Branch 1</option>
            <option value="Branch 2">Branch 2</option>
          </Select>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
            REMARKS:
          </label>
          <Textarea
            id="remarks"
            name="remarks"
            value={jobData.remarks}
            onChange={handleInputChange}
            placeholder="Enter any additional information about personal effects or household goods"
            className="border border-gray-300 rounded w-full h-24 resize-none"
            disabled={!isEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoSection;
