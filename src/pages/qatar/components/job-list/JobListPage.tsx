
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { QatarJob } from "../../types/jobTypes";
import { usePrintReport } from "../../hooks/usePrintReport";
import { Input } from "@/components/ui/input";

interface JobListPageProps {
  title: string;
  headerTitle: string;
  headerSubtitle: string;
  headerClassName?: string;
  reportTitle: string;
  jobs: QatarJob[];
  sectors: string[];
  showVehicleFilter?: boolean;
  showJobTypeFilter?: boolean;
  initialStatus?: string;
  renderTable: ({ 
    currentEntries, 
    indexOfFirstEntry 
  }: { 
    currentEntries: QatarJob[], 
    indexOfFirstEntry: number 
  }) => React.ReactNode;
  refreshJobs?: () => void;
}

const JobListPage: React.FC<JobListPageProps> = ({
  title,
  headerTitle,
  headerSubtitle,
  headerClassName = "bg-white",
  reportTitle,
  jobs,
  sectors,
  showVehicleFilter = false,
  showJobTypeFilter = false,
  initialStatus = "",
  renderTable,
  refreshJobs
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [filteredJobs, setFilteredJobs] = useState<QatarJob[]>(jobs);
  
  // Filters
  const [sectorFilter, setSectorFilter] = useState("ALL SECTORS");
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [vehicleFilter, setVehicleFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Print functionality
  const { printRef, handlePrint } = usePrintReport(reportTitle);
  
  useEffect(() => {
    let result = jobs;
    
    // Apply sector filter
    if (sectorFilter && sectorFilter !== "ALL SECTORS") {
      result = result.filter(job => job.sector && job.sector.startsWith(sectorFilter.split(" : ")[0]));
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(job => job.status === statusFilter);
    }
    
    // Apply vehicle filter
    if (vehicleFilter) {
      result = result.filter(job => job.vehicle === vehicleFilter);
    }
    
    // Apply job type filter
    if (jobTypeFilter) {
      result = result.filter(job => job.jobType === jobTypeFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(job => 
        (job.jobNumber && job.jobNumber.toLowerCase().includes(search)) ||
        (job.customer && job.customer.toLowerCase().includes(search)) ||
        (job.town && job.town.toLowerCase().includes(search)) ||
        (job.location && job.location.toLowerCase().includes(search))
      );
    }
    
    setFilteredJobs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [jobs, sectorFilter, statusFilter, vehicleFilter, jobTypeFilter, searchTerm]);
  
  // Get unique vehicles
  const vehicles = [...new Set(jobs.map(job => job.vehicle))].filter(Boolean).sort();
  
  // Get current entries for pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);
  
  // Calculate page numbers
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Export data to Excel
  const exportToExcel = () => {
    toast.info("Exporting to Excel...");
    // Excel export functionality would be implemented here
  };
  
  // Handle print report
  const printReport = async () => {
    toast.info("Preparing print...");
    try {
      await handlePrint();
    } catch (error) {
      console.error("Print error:", error);
      toast.error("Failed to print report");
    }
  };
  
  // Handle manual refresh
  const handleRefresh = () => {
    if (refreshJobs) {
      refreshJobs();
      toast.success("Job list refreshed");
    }
  };

  return (
    <Layout title={title}>
      <div className="space-y-4">
        {/* Header */}
        <div className={`p-6 rounded-lg shadow-sm border ${headerClassName}`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{headerTitle}</h1>
              <p className="text-gray-500">{headerSubtitle}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={exportToExcel}
              >
                <Download size={18} />
                EXPORT
              </Button>
              {refreshJobs && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={handleRefresh}
                >
                  <RefreshCw size={18} />
                  REFRESH
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              {/* Sector Filter */}
              <select 
                className="border border-gray-300 rounded px-3 py-2 text-sm"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
              >
                {sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))}
              </select>
              
              {/* Vehicle Filter */}
              {showVehicleFilter && (
                <select 
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value)}
                >
                  <option value="">ALL VEHICLES</option>
                  {vehicles.map((vehicle, index) => (
                    <option key={index} value={vehicle}>{vehicle}</option>
                  ))}
                </select>
              )}
              
              {/* Job Type Filter */}
              {showJobTypeFilter && (
                <select 
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                >
                  <option value="">ALL JOB TYPES</option>
                  <option value="COLLECTION">COLLECTION</option>
                  <option value="DELIVERY">DELIVERY</option>
                  <option value="PACKING">PACKING</option>
                  <option value="UNPACKING">UNPACKING</option>
                </select>
              )}
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search by job number, customer, town or location..."
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Results summary */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredJobs.length)} of {filteredJobs.length} entries
            </div>
            <div>
              <select 
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="ml-2">entries per page</span>
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div>
          {renderTable({ currentEntries, indexOfFirstEntry })}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <div className="flex gap-1">
                <button 
                  className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                
                {pageNumbers.map(number => (
                  <button 
                    key={number}
                    className={`px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Printable content - hidden until print */}
        <div className="hidden">
          <div ref={printRef} className="p-8">
            <h1 className="text-2xl font-bold mb-4">{reportTitle}</h1>
            {/* Printable table content would go here */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Job Number</th>
                  <th className="border p-2 text-left">Date</th>
                  <th className="border p-2 text-left">Customer</th>
                  <th className="border p-2 text-left">Location</th>
                  <th className="border p-2 text-left">Vehicle</th>
                  <th className="border p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map(job => (
                  <tr key={job.id} className="border-b">
                    <td className="border p-2">{job.jobNumber}</td>
                    <td className="border p-2">{job.date}</td>
                    <td className="border p-2">{job.customer}</td>
                    <td className="border p-2">{job.location || "-"}</td>
                    <td className="border p-2">{job.vehicle}</td>
                    <td className="border p-2">{job.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobListPage;
