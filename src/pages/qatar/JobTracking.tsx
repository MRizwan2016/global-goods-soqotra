
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockJobs } from "./data/mockJobData";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Search, 
  Truck, 
  MapPin, 
  User, 
  PhoneCall,
  Calendar,
  Edit,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QatarJob } from "./types/jobTypes";

const JobTracking = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const entriesPerPage = 10;

  // Filter jobs based on search text and selected filters
  const filteredJobs = mockJobs.filter((job) => {
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

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredJobs.slice(indexOfFirstEntry, indexOfLastEntry);

  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING':
        return <Badge className="bg-yellow-500">PENDING</Badge>;
      case 'IN_PROGRESS':
        return <Badge className="bg-orange-500">IN PROGRESS</Badge>;
      case 'SCHEDULED':
        return <Badge className="bg-blue-500">SCHEDULED</Badge>;
      case 'COMPLETED':
        return <Badge className="bg-green-500">COMPLETED</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-red-500">CANCELLED</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  // View job details
  const handleViewJob = (jobId: string) => {
    navigate(`/qatar/job/${jobId}`);
  };

  return (
    <Layout title="Qatar Job Tracking">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-blue-800">QATAR CARGO COLLECTION & DELIVERY MANAGEMENT</h3>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Truck size={14} />
              MANAGE VEHICLES
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <User size={14} />
              MANAGE DRIVERS
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
              onClick={() => navigate("/qatar/job/new")}
            >
              <Plus size={14} />
              ADD NEW JOB
            </Button>
          </div>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-500" />
              <span className="text-sm text-gray-500">FILTERS:</span>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ALL STATUSES</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                <SelectItem value="SCHEDULED">SCHEDULED</SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-8 w-40">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ALL TYPES</SelectItem>
                <SelectItem value="COLLECTION">COLLECTION</SelectItem>
                <SelectItem value="DELIVERY">DELIVERY</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative ml-auto">
              <Input
                type="text"
                placeholder="SEARCH JOBS..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9 pr-3 py-1 h-8 border border-gray-300 rounded text-sm w-60"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>
          
          {/* Job Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead className="w-24">JOB #</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>CUSTOMER</TableHead>
                  <TableHead>CONTACT</TableHead>
                  <TableHead>LOCATION</TableHead>
                  <TableHead className="w-28">DATE</TableHead>
                  <TableHead className="w-24">VEHICLE</TableHead>
                  <TableHead className="w-28">STATUS</TableHead>
                  <TableHead className="w-20 text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((job) => (
                    <TableRow key={job.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{job.jobNumber}</TableCell>
                      <TableCell>{job.jobType}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User size={14} className="mr-1 text-gray-500" />
                          {job.customer === "--" ? "Unnamed" : job.customer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <PhoneCall size={14} className="mr-1 text-gray-500" />
                          {job.mobileNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1 text-gray-500" />
                          {job.town}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-500" />
                          {job.date}
                        </div>
                      </TableCell>
                      <TableCell>{job.vehicle}</TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleViewJob(job.id)}
                        >
                          <Edit size={12} className="mr-1" />
                          EDIT
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                      NO JOB RECORDS FOUND
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-500">
              SHOWING {filteredJobs.length > 0 ? indexOfFirstEntry + 1 : 0} TO {Math.min(indexOfLastEntry, filteredJobs.length)} OF {filteredJobs.length} ENTRIES
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="h-8 w-8 p-0"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobTracking;
