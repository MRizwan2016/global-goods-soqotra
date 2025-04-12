
import React, { useState } from "react";
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
import { JobStorageService } from "./services/JobStorageService";
import { QatarJob } from "./types/jobTypes";

const CompletedJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL SECTORS");
  const [jobNumberFilter, setJobNumberFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [jobs, setJobs] = useState<QatarJob[]>(() => {
    const allJobs = JobStorageService.getAllJobs();
    return allJobs.filter(job => job.status === "COMPLETED");
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  
  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const jobNumberMatch = job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const customerMatch = job.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = job.mobileNumber.includes(searchTerm);
    
    const sectorMatch = sectorFilter === "ALL SECTORS" || job.sector === sectorFilter;
    
    return (jobNumberMatch || customerMatch || phoneMatch) && sectorMatch;
  });
  
  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);

  return (
    <Layout title="Completed Jobs">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-green-50 p-4 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">VIEW COMPLETED JOB LIST</h3>
          <p className="text-sm text-green-700">Record Listed.</p>
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
            
            <div className="flex-grow">
              <Input 
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
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
              <span className="text-sm">Search:</span>
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px]"
              />
            </div>
          </div>
          
          {/* Jobs Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2 text-left border border-blue-700">Num</th>
                  <th className="p-2 text-left border border-blue-700">JOB ID</th>
                  <th className="p-2 text-left border border-blue-700">JOB NUMBER</th>
                  <th className="p-2 text-left border border-blue-700">JOB DATE</th>
                  <th className="p-2 text-left border border-blue-700">JOB TYPE</th>
                  <th className="p-2 text-left border border-blue-700">SECTOR</th>
                  <th className="p-2 text-left border border-blue-700">CUSTOMER</th>
                  <th className="p-2 text-left border border-blue-700">MOBILE NUMBER</th>
                  <th className="p-2 text-left border border-blue-700">LAND NUM</th>
                  <th className="p-2 text-left border border-blue-700">POST CODE</th>
                  <th className="p-2 text-left border border-blue-700">INVOICE</th>
                  <th className="p-2 text-left border border-blue-700">ADVANCE</th>
                  <th className="p-2 text-left border border-blue-700">SCHED. NUM</th>
                  <th className="p-2 text-left border border-blue-700">SCHED. DATE</th>
                  <th className="p-2 text-left border border-blue-700">COMPLETE BY</th>
                  <th className="p-2 text-left border border-blue-700">DISPLAY</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((job, index) => (
                    <tr key={job.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-2 border border-gray-200">{indexOfFirstEntry + index + 1}</td>
                      <td className="p-2 border border-gray-200">{job.id}</td>
                      <td className="p-2 border border-gray-200">{job.jobNumber}</td>
                      <td className="p-2 border border-gray-200">{job.date}</td>
                      <td className="p-2 border border-gray-200">{job.jobType}</td>
                      <td className="p-2 border border-gray-200">{job.sector}</td>
                      <td className="p-2 border border-gray-200">{job.customer}</td>
                      <td className="p-2 border border-gray-200">{job.mobileNumber}</td>
                      <td className="p-2 border border-gray-200">{job.landNumber || "0"}</td>
                      <td className="p-2 border border-gray-200"></td>
                      <td className="p-2 border border-gray-200">{job.invoiceNumber || "0"}</td>
                      <td className="p-2 border border-gray-200">{job.advanceAmount || "0"}</td>
                      <td className="p-2 border border-gray-200">{job.sequenceNum || ""}</td>
                      <td className="p-2 border border-gray-200">{job.date}</td>
                      <td className="p-2 border border-gray-200">{job.entryBy}</td>
                      <td className="p-2 border border-gray-200">
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
                    <td colSpan={16} className="p-4 text-center">No completed jobs found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompletedJobs;
