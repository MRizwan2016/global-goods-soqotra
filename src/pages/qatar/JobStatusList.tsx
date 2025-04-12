
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

const JobStatusList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL SECTORS");
  const [vehicleFilter, setVehicleFilter] = useState("ALL VEHICLES");
  const [jobTypeFilter, setJobTypeFilter] = useState("ALL JOBS");
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
  
  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const jobNumberMatch = job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const customerMatch = job.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = job.mobileNumber.includes(searchTerm);
    
    const sectorMatch = sectorFilter === "ALL SECTORS" || job.sector === sectorFilter;
    const vehicleMatch = vehicleFilter === "ALL VEHICLES" || job.vehicle === vehicleFilter;
    const jobTypeMatch = jobTypeFilter === "ALL JOBS" || job.jobType === jobTypeFilter;
    
    // Date filtering
    let dateMatch = true;
    if (startDate && endDate) {
      const jobDate = new Date(job.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      dateMatch = jobDate >= start && jobDate <= end;
    }
    
    return (jobNumberMatch || customerMatch || phoneMatch) && 
           sectorMatch && vehicleMatch && jobTypeMatch && dateMatch;
  });
  
  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);

  return (
    <Layout title="Job Status List">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-blue-50 p-4 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">VIEW JOB STATUS LIST</h3>
          <p className="text-sm text-blue-700">Record Listed.</p>
        </div>
        
        <div className="p-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-[150px] bg-blue-600 text-white">
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
            
            <div>
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger className="w-[200px] bg-blue-600 text-white">
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
            
            <div>
              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger className="w-[150px] bg-blue-600 text-white">
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
            
            <div>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[150px]"
              />
            </div>
            
            <div>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[150px]"
              />
            </div>
            
            <div>
              <Select>
                <SelectTrigger className="w-[150px] bg-blue-600 text-white">
                  <SelectValue placeholder="JOB Num" />
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
                  <th className="p-2 text-left border border-blue-700">JOB Num</th>
                  <th className="p-2 text-left border border-blue-700">JOB DATE</th>
                  <th className="p-2 text-left border border-blue-700">JOB TYPE</th>
                  <th className="p-2 text-left border border-blue-700">SECTOR</th>
                  <th className="p-2 text-left border border-blue-700">CUSTOMER</th>
                  <th className="p-2 text-left border border-blue-700">MOBILE NUMBER</th>
                  <th className="p-2 text-left border border-blue-700">LAND Num</th>
                  <th className="p-2 text-left border border-blue-700">POST CODE</th>
                  <th className="p-2 text-left border border-blue-700">INVOICE</th>
                  <th className="p-2 text-left border border-blue-700">ADVANCE</th>
                  <th className="p-2 text-left border border-blue-700">SCHED. Num</th>
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
                      <td className="p-2 border border-gray-200">{job.entryBy || "/ 00/00/0000"}</td>
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
                    <td colSpan={16} className="p-4 text-center">No jobs found</td>
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

export default JobStatusList;
