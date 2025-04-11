
import React from "react";
import { Select } from "@/components/ui/select";

interface CustomerInfoSectionProps {
  jobData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isEnabled?: boolean;
}

const CustomerInfoSection = ({ jobData, handleInputChange, handleSelectChange, isEnabled = true }: CustomerInfoSectionProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-medium text-gray-900 mb-4">Customer Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={jobData.customer}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={jobData.mobileNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="landNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Land Number (Optional)
          </label>
          <input
            type="text"
            id="landNumber"
            name="landNumber"
            value={jobData.landNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Select
            value={jobData.country}
            onValueChange={(value) => handleSelectChange("country", value)}
            disabled={!isEnabled}
          >
            <option value="">Select Country</option>
            <option value="QATAR">Qatar</option>
            <option value="UAE">UAE</option>
            <option value="KSA">Saudi Arabia</option>
          </Select>
        </div>
        
        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <input
            type="text"
            id="sector"
            name="sector"
            value={jobData.sector}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
            Branch
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={jobData.branch}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={jobData.city}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="town" className="block text-sm font-medium text-gray-700 mb-1">
            Town
          </label>
          <input
            type="text"
            id="town"
            name="town"
            value={jobData.town}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location / Address
          </label>
          <textarea
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleInputChange}
            rows={2}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="advanceAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Advance Amount (Optional)
          </label>
          <input
            type="text"
            id="advanceAmount"
            name="advanceAmount"
            value={jobData.advanceAmount}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="collectDate" className="block text-sm font-medium text-gray-700 mb-1">
            Collection Date
          </label>
          <input
            type="text"
            id="collectDate"
            name="collectDate"
            value={jobData.collectDate}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
            Remarks (Optional)
          </label>
          <textarea
            id="remarks"
            name="remarks"
            value={jobData.remarks}
            onChange={handleInputChange}
            rows={2}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoSection;
