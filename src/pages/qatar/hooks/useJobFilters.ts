
import { useState, useMemo } from "react";
import { QatarJob } from "../types/jobTypes";

export function useJobFilters(
  jobs: QatarJob[],
  initialStatus?: "COMPLETED" | "CANCELLED" | string
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL SECTORS");
  const [jobNumberFilter, setJobNumberFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [statusFilter, setStatusFilter] = useState(initialStatus || "ALL STATUSES");
  const [vehicleFilter, setVehicleFilter] = useState("ALL VEHICLES");
  const [jobTypeFilter, setJobTypeFilter] = useState("ALL JOBS");

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const jobNumberMatch = job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const customerMatch = job.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const phoneMatch = job.mobileNumber.includes(searchTerm);
      
      const sectorMatch = sectorFilter === "ALL SECTORS" || job.sector === sectorFilter;
      
      // Optional filters
      const vehicleMatch = !vehicleFilter || vehicleFilter === "ALL VEHICLES" || job.vehicle === vehicleFilter;
      const jobTypeMatch = !jobTypeFilter || jobTypeFilter === "ALL JOBS" || job.jobType === jobTypeFilter;
      const statusMatch = !statusFilter || statusFilter === "ALL STATUSES" || job.status === statusFilter;
      
      // Date filtering
      let dateMatch = true;
      if (startDate && endDate) {
        const jobDate = new Date(job.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        dateMatch = jobDate >= start && jobDate <= end;
      }
      
      return (jobNumberMatch || customerMatch || phoneMatch) && 
             sectorMatch && vehicleMatch && jobTypeMatch && statusMatch && dateMatch;
    });
  }, [
    jobs, 
    searchTerm, 
    sectorFilter, 
    vehicleFilter, 
    jobTypeFilter, 
    statusFilter, 
    startDate, 
    endDate
  ]);

  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);

  return {
    searchTerm,
    setSearchTerm,
    sectorFilter,
    setSectorFilter,
    jobNumberFilter,
    setJobNumberFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    setEntriesPerPage,
    statusFilter,
    setStatusFilter,
    vehicleFilter,
    setVehicleFilter,
    jobTypeFilter,
    setJobTypeFilter,
    filteredJobs,
    currentEntries,
    indexOfFirstEntry,
    indexOfLastEntry,
    totalPages
  };
}
