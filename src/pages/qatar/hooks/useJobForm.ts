
import { useState } from "react";
import { useJobNumber } from "./job-form/useJobNumber";
import { useJobItems } from "./job-form/useJobItems";
import { useFormHandlers } from "./job-form/useFormHandlers";
import { JobData } from "../components/job-form/context/JobFormContext";

const useJobForm = (initialJobData?: Partial<JobData>, isEditMode = false) => {
  const [jobData, setJobData] = useState<JobData>({
    jobNumber: initialJobData?.jobNumber || "",
    customer: initialJobData?.customer || "",
    mobileNumber: initialJobData?.mobileNumber || "",
    landNumber: initialJobData?.landNumber || "",
    country: initialJobData?.country || "",
    sector: initialJobData?.sector || "",
    branch: initialJobData?.branch || "",
    vehicle: initialJobData?.vehicle || "",
    jobType: initialJobData?.jobType || "Collection",
    location: initialJobData?.location || "",
    city: initialJobData?.city || "",
    date: initialJobData?.date || "",
    time: initialJobData?.time || "",
    advanceAmount: initialJobData?.advanceAmount || "",
    remarks: initialJobData?.remarks || "",
    packageDetails: initialJobData?.packageDetails || "",
    invoiceNumber: initialJobData?.invoiceNumber || "",
    amPm: initialJobData?.amPm || "AM",
    sameDay: initialJobData?.sameDay || "Y",
    collectDate: initialJobData?.collectDate || "",
    status: initialJobData?.status || "PENDING",
  });

  const { isJobNumberGenerated, setIsJobNumberGenerated, generateJobNumber } = useJobNumber(isEditMode, !!initialJobData?.jobNumber);
  const { jobItems, handleAddItem } = useJobItems();
  const { handleInputChange, handleSelectChange } = useFormHandlers(setJobData);

  return {
    jobData,
    setJobData,
    isJobNumberGenerated,
    setIsJobNumberGenerated,
    generateJobNumber,
    jobItems,
    handleAddItem,
    handleInputChange,
    handleSelectChange,
  };
};

export default useJobForm;
