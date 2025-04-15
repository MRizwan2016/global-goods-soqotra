
import React, { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Printer,
  Search,
  FileDown,
  ArrowLeft,
  Calendar,
  Filter
} from "lucide-react";
import { JobStorageService } from "./services/JobStorageService";
import { QatarJob } from "./types/jobTypes";
import { useReactToPrint } from "react-to-print";
import JobStatusBadge from "./components/job-tracking/JobStatusBadge";

const JobStatusList = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL SECTORS");
  const [vehicleFilter, setVehicleFilter] = useState("ALL VEHICLES");
  const [jobTypeFilter, setJobTypeFilter] = useState("ALL JOBS");
  const [statusFilter, setStatusFilter] = useState("ALL STATUSES");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [jobs, setJobs] = useState<QatarJob[]>(() => {
    return JobStorageService.getAllJobs();
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  const vehicles = ["ALL VEHICLES", "PICKUP", "SUZUKI", "HIACE VAN", "3 TON TRUCK", "7 TON TRUCK"];
  const jobTypes = ["ALL JOBS", "COLLECTION", "DELIVERY", "PACKING", "UNPACKING"];
  const statuses = ["ALL STATUSES", "PENDING", "IN_PROGRESS", "SCHEDULED", "COMPLETED", "CANCELLED"];
  
  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const jobNumberMatch = job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const customerMatch = job.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = job.mobileNumber.includes(searchTerm);
    
    const sectorMatch = sectorFilter === "ALL SECTORS" || job.sector === sectorFilter;
    const vehicleMatch = vehicleFilter === "ALL VEHICLES" || job.vehicle === vehicleFilter;
    const jobTypeMatch = jobTypeFilter === "ALL JOBS" || job.jobType === jobTypeFilter;
    const statusMatch = statusFilter === "ALL STATUSES" || job.status === statusFilter;
    
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
  
  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);
  
  // Handle printing - fixed to return a Promise<void>
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Job Status Report - ${new Date().toLocaleDateString()}`,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print completed"),
  });

  // Status counts for summary
  const statusCounts = {
    total: filteredJobs.length,
    pending: filteredJobs.filter(job => job.status === "PENDING").length,
    inProgress: filteredJobs.filter(job => job.status === "IN_PROGRESS").length,
    scheduled: filteredJobs.filter(job => job.status === "SCHEDULED").length,
    completed: filteredJobs.filter(job => job.status === "COMPLETED").length,
    cancelled: filteredJobs.filter(job => job.status === "CANCELLED").length
  };

  return (
    <Layout title="Job Status List">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-blue-50 p-4 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">VIEW JOB STATUS LIST</h3>
          <p className="text-sm text-blue-700">
            Record Listed: {filteredJobs.length} jobs found
            {startDate && endDate && ` (${startDate} to ${endDate})`}
          </p>
        </div>
        
        <div className="p-4">
          {/* Status summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <p className="text-sm text-gray-500">TOTAL JOBS</p>
              <p className="text-xl font-semibold">{statusCounts.total}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <p className="text-sm text-yellow-600">PENDING</p>
              <p className="text-xl font-semibold text-yellow-600">{statusCounts.pending}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm text-orange-600">IN PROGRESS</p>
              <p className="text-xl font-semibold text-orange-600">{statusCounts.inProgress}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm text-blue-600">SCHEDULED</p>
              <p className="text-xl font-semibold text-blue-600">{statusCounts.scheduled}</p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm text-green-600">COMPLETED</p>
              <p className="text-xl font-semibold text-green-600">{statusCounts.completed}</p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm text-red-600">CANCELLED</p>
              <p className="text-xl font-semibold text-red-600">{statusCounts.cancelled}</p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="min-w-[150px]">
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-full bg-blue-600 text-white">
                  <SelectValue placeholder="ALL SECTORS" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="min-w-[150px]">
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger className="w-full bg-blue-600 text-white">
                  <SelectValue placeholder="ALL VEHICLES" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle} value={vehicle}>
                      {vehicle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="min-w-[150px]">
              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger className="w-full bg-blue-600 text-white">
                  <SelectValue placeholder="ALL JOBS" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="min-w-[150px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full bg-blue-600 text-white">
                  <SelectValue placeholder="ALL STATUSES" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[150px]"
                placeholder="Start Date"
              />
              <span>to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[150px]"
                placeholder="End Date"
              />
              <Button 
                onClick={() => {
                  if (startDate && endDate) {
                    // Apply date filter
                    console.log(`Filtering from ${startDate} to ${endDate}`);
                  } else {
                    alert("Please select both start and end dates");
                  }
                }}
                className="bg-amber-600 hover:bg-amber-700"
                size="sm"
              >
                <Filter size={14} className="mr-1" />
                APPLY
              </Button>
            </div>
          </div>
          
          {/* Search and Print controls */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex-grow">
              <div className="relative">
                <Input 
                  type="text"
                  placeholder="Search by job number, customer name, or mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            
            {/* Fixed button to properly use the handlePrint function */}
            <Button 
              type="button"
              onClick={() => handlePrint()}
              className="bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Printer size={16} />
              PRINT REPORT
            </Button>
          </div>
          
          {/* Entries control */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select value={entriesPerPage.toString()} onValueChange={(value) => setEntriesPerPage(Number(value))}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="50" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">entries</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={16} />
                BACK
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => {
                  // Export to CSV functionality could be added here
                  alert("Export functionality will be implemented here");
                }}
              >
                <FileDown size={16} />
                EXPORT
              </Button>
            </div>
          </div>
          
          {/* Jobs Table */}
          <div ref={printRef} className="overflow-x-auto">
            <div className="print:text-center print:mb-4 hidden print:block">
              <h2 className="text-xl font-bold">JOB STATUS REPORT</h2>
              <p>Date: {new Date().toLocaleDateString()}</p>
              {startDate && endDate && (
                <p>Period: {startDate} to {endDate}</p>
              )}
              <div className="flex justify-center gap-4 my-4">
                <p>Total: {statusCounts.total}</p>
                <p>Pending: {statusCounts.pending}</p>
                <p>In Progress: {statusCounts.inProgress}</p>
                <p>Scheduled: {statusCounts.scheduled}</p>
                <p>Completed: {statusCounts.completed}</p>
                <p>Cancelled: {statusCounts.cancelled}</p>
              </div>
            </div>
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2 text-left border border-blue-700">Num</th>
                  <th className="p-2 text-left border border-blue-700">JOB NUMBER</th>
                  <th className="p-2 text-left border border-blue-700">JOB DATE</th>
                  <th className="p-2 text-left border border-blue-700">JOB TYPE</th>
                  <th className="p-2 text-left border border-blue-700">STATUS</th>
                  <th className="p-2 text-left border border-blue-700">SECTOR</th>
                  <th className="p-2 text-left border border-blue-700">CUSTOMER</th>
                  <th className="p-2 text-left border border-blue-700">MOBILE NUMBER</th>
                  <th className="p-2 text-left border border-blue-700">TOWN</th>
                  <th className="p-2 text-left border border-blue-700">VEHICLE</th>
                  <th className="p-2 text-left border border-blue-700">INVOICE</th>
                  <th className="p-2 text-left border border-blue-700 print:hidden">DISPLAY</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((job, index) => (
                    <tr key={job.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-2 border border-gray-200">{indexOfFirstEntry + index + 1}</td>
                      <td className="p-2 border border-gray-200">{job.jobNumber}</td>
                      <td className="p-2 border border-gray-200">{job.date}</td>
                      <td className="p-2 border border-gray-200">{job.jobType}</td>
                      <td className="p-2 border border-gray-200">
                        <JobStatusBadge status={job.status} />
                      </td>
                      <td className="p-2 border border-gray-200">{job.sector}</td>
                      <td className="p-2 border border-gray-200">{job.customer}</td>
                      <td className="p-2 border border-gray-200">{job.mobileNumber}</td>
                      <td className="p-2 border border-gray-200">{job.town}</td>
                      <td className="p-2 border border-gray-200">{job.vehicle}</td>
                      <td className="p-2 border border-gray-200">{job.invoiceNumber || "-"}</td>
                      <td className="p-2 border border-gray-200 print:hidden">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => window.open(`/qatar/job/${job.id}`, '_blank')}
                        >
                          Display
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="p-4 text-center">No jobs found matching your filters</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {filteredJobs.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, filteredJobs.length)} of {filteredJobs.length} entries
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <Button 
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobStatusList;
