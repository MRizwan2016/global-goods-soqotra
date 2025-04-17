
import React from "react";
import { Label } from "@/components/ui/label";
import { useJobForm } from "../context/JobFormContext";

const CustomerBasicInfo = () => {
  const { jobData, handleInputChange, isJobNumberGenerated } = useJobForm();

  return (
    <>
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
          disabled={!isJobNumberGenerated}
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
          disabled={!isJobNumberGenerated}
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
          disabled={!isJobNumberGenerated}
        />
      </div>
    </>
  );
};

export default CustomerBasicInfo;
