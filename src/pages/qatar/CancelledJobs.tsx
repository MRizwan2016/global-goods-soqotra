
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
  Calendar
} from "lucide-react";
import { JobStorageService } from "./services/JobStorageService";
import { QatarJob } from "./types/jobTypes";
import { useReactToPrint } from "react-to-print";

const CancelledJobs = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL SECTORS");
  const [jobNumberFilter, setJobNumberFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [jobs, setJobs] = useState<QatarJob[]>(() => {
    const allJobs = JobStorageService.getAllJobs();
    return allJobs.filter(job => job.status === "CANCELLED");
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  
  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const jobNumberMatch = job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const customerMatch = job.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = job.mobileNumber.includes(searchTerm);
    
    const sectorMatch = sectorFilter === "ALL SECTORS" || job.sector === sectorFilter;
    
    // Date filtering
    let dateMatch = true;
    if (startDate && endDate) {
      const jobDate = new Date(job.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      dateMatch = jobDate >= start && jobDate <= end;
    }
    
    return (jobNumberMatch || customerMatch || phoneMatch) && sectorMatch && dateMatch;
  });
  
  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);
  
  // Handle printing
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Cancelled Jobs Report - ${new Date().toLocaleDateString()}`,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print completed"),
  });

  return (
    <Layout title="Cancelled Jobs">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-red-50 p-4 border-b border-red-100">
          <h3 className="text-lg font-medium text-red-800">VIEW CANCELLED JOB LIST</h3>
          <p className="text-sm text-red-700">Record Listed.</p>
        </div>
        
        <div className="p-4">
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
              <Select value={jobNumberFilter} onValueChange={setJobNumberFilter}>
                <SelectTrigger className="w-full bg-blue-600 text-white">
                  <SelectValue placeholder="JOB NUMBER" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">ASCENDING</SelectItem>
                  <SelectItem value="desc">DESCENDING</SelectItem>
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
            </div>
            
            <div className="flex-grow">
              <div className="relative">
                <Input 
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            
            <Button 
              onClick={handlePrint}
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
              <h2 className="text-xl font-bold">CANCELLED JOBS REPORT</h2>
              <p>Date: {new Date().toLocaleDateString()}</p>
              {startDate && endDate && (
                <p>Period: {startDate} to {endDate}</p>
              )}
            </div>
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2 text-left border border-blue-700">Num</th>
                  <th className="p-2 text-left border border-blue-700">JOB NUMBER</th>
                  <th className="p-2 text-left border border-blue-700">JOB DATE</th>
                  <th className="p-2 text-left border border-blue-700">JOB TYPE</th>
                  <th className="p-2 text-left border border-blue-700">SECTOR</th>
                  <th className="p-2 text-left border border-blue-700">CUSTOMER</th>
                  <th className="p-2 text-left border border-blue-700">MOBILE NUMBER</th>
                  <th className="p-2 text-left border border-blue-700">INVOICE</th>
                  <th className="p-2 text-left border border-blue-700">REASON</th>
                  <th className="p-2 text-left border border-blue-700">CANCELLED BY</th>
                  <th className="p-2 text-left border border-blue-700">CANCEL DATE</th>
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
                      <td className="p-2 border border-gray-200">{job.sector}</td>
                      <td className="p-2 border border-gray-200">{job.customer}</td>
                      <td className="p-2 border border-gray-200">{job.mobileNumber}</td>
                      <td className="p-2 border border-gray-200">{job.invoiceNumber || "-"}</td>
                      <td className="p-2 border border-gray-200">{job.cancellationReason || "-"}</td>
                      <td className="p-2 border border-gray-200">{job.entryBy}</td>
                      <td className="p-2 border border-gray-200">{job.cancellationDate || job.date}</td>
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
                    <td colSpan={12} className="p-4 text-center">No cancelled jobs found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredJobs.length)} of {filteredJobs.length} entries
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

export default CancelledJobs;
