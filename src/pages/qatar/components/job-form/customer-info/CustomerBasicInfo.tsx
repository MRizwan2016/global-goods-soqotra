
import React from "react";
import { Label } from "@/components/ui/label";
import { useJobForm } from "../context/JobFormContext";
import { JobNumberService } from "@/services/JobNumberService";
import { toast } from "sonner";

const CustomerBasicInfo = () => {
  const { jobData, handleInputChange, isJobNumberGenerated, setJobData } = useJobForm();
  
  const handleMobileNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Call the original handler first
    handleInputChange(e);
    
    // If this is a mobile number change and it has enough digits, try to auto-fill
    if (name === 'mobileNumber' && value.length >= 8) {
      try {
        // Get existing jobs from localStorage
        const existingJobs = JSON.parse(localStorage.getItem('qatarJobs') || '[]');
        
        // Find a job with matching mobile number
        const matchingJob = existingJobs.find((job: any) => 
          job.mobileNumber && job.mobileNumber.includes(value.replace(/[^\d]/g, ''))
        );
        
        if (matchingJob) {
          // Auto-fill the customer data
          setJobData(prev => ({
            ...prev,
            customer: matchingJob.customer || prev.customer,
            country: matchingJob.country || prev.country,
            city: matchingJob.city || prev.city,
            sector: matchingJob.sector || prev.sector,
            branch: matchingJob.branch || prev.branch,
            location: matchingJob.location || prev.location,
            packageDetails: matchingJob.packageDetails || prev.packageDetails
          }));
          
          toast.success(`Auto-filled customer data for ${matchingJob.customer}`);
        }
      } catch (error) {
        console.error('Error during auto-fill:', error);
      }
    }
  };

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
        <Label htmlFor="customerPrefix" className="font-medium text-gray-700 mb-1 block">
          NAME PREFIX:
        </Label>
        <select
          id="customerPrefix"
          name="customerPrefix"
          value={jobData.customerPrefix || ""}
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
          disabled={!isJobNumberGenerated}
        >
          <option value="">Select prefix</option>
          <option value="Mr.">Mr.</option>
          <option value="Mrs.">Mrs.</option>
          <option value="Ms.">Ms.</option>
          <option value="Dr.">Dr.</option>
          <option value="Prof.">Prof.</option>
        </select>
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
          onChange={handleMobileNumberChange}
          className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
          placeholder="Customer mobile number (auto-fills data)"
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
