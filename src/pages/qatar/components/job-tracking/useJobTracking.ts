
import { useState, useMemo } from "react";
import { mockJobs } from "../../data/mockJobData";
import { QatarJob } from "../../types/jobTypes";

export const useJobTracking = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const entriesPerPage = 10;

  // Filter jobs based on search text and selected filters
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Search filter
      const searchMatch = 
        job.jobNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        job.customer.toLowerCase().includes(searchText.toLowerCase()) ||
        job.mobileNumber.includes(searchText) ||
        job.town.toLowerCase().includes(searchText.toLowerCase());

      // Status filter
      const statusMatch = statusFilter === "all" || job.status === statusFilter;

      // Type filter
      const typeMatch = typeFilter === "all" || job.jobType === typeFilter;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [searchText, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);

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
    currentEntries
  };
};
