
import { useState, useMemo, useEffect } from "react";
import { QatarJob } from "../types/jobTypes";
import { JobStorageService } from "../services/JobStorageService";

export const useJobTracking = () => {
  const [jobs, setJobs] = useState<QatarJob[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const entriesPerPage = 10;

  // Load jobs from storage
  useEffect(() => {
    const allJobs = JobStorageService.getAllJobs();
    setJobs(allJobs);
  }, []);

  // Filter jobs based on search text and selected filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter
      const searchMatch = 
        job.jobNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
        job.customer?.toLowerCase().includes(searchText.toLowerCase()) ||
        job.mobileNumber?.includes(searchText) ||
        job.town?.toLowerCase().includes(searchText.toLowerCase());

      // Status filter
      const statusMatch = statusFilter === "all" || job.status === statusFilter;

      // Type filter
      const typeMatch = typeFilter === "all" || job.jobType === typeFilter;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [jobs, searchText, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);

  // Refresh jobs from storage
  const refreshJobs = () => {
    const allJobs = JobStorageService.getAllJobs();
    setJobs(allJobs);
  };

  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredJobs,
    totalPages,
    indexOfLastEntry,
    indexOfFirstEntry,
    currentEntries,
    refreshJobs
  };
};
