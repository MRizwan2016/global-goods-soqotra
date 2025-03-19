
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { QatarJob } from "../../types/jobTypes";
import JobStatusBadge from "../job-tracking/JobStatusBadge";

interface JobSelectionTableProps {
  jobs: QatarJob[];
  selectedJobs: QatarJob[];
  onToggleSelect: (job: QatarJob) => void;
}

const JobSelectionTable: React.FC<JobSelectionTableProps> = ({
  jobs,
  selectedJobs,
  onToggleSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJobType, setFilterJobType] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm === "" ||
      job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterJobType === null || job.jobType === filterJobType;

    return matchesSearch && matchesType;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const isSelected = (job: QatarJob) => {
    return selectedJobs.some((selectedJob) => selectedJob.id === job.id);
  };

  return (
    <Card>
      <CardHeader className="bg-blue-600 text-white py-2 px-4">
        <CardTitle className="text-md">SELECT JOBS</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Search jobs by number or customer..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterJobType(null)}
              className={`px-3 py-1.5 rounded text-sm ${
                filterJobType === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilterJobType("COLLECTION")}
              className={`px-3 py-1.5 rounded text-sm ${
                filterJobType === "COLLECTION"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              COLLECTIONS
            </button>
            <button
              onClick={() => setFilterJobType("DELIVERY")}
              className={`px-3 py-1.5 rounded text-sm ${
                filterJobType === "DELIVERY"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              DELIVERIES
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left w-12"></th>
                <th className="border p-2 text-left">JOB #</th>
                <th className="border p-2 text-left">DATE</th>
                <th className="border p-2 text-left">TYPE</th>
                <th className="border p-2 text-left">CUSTOMER</th>
                <th className="border p-2 text-left">MOBILE</th>
                <th className="border p-2 text-left">LOCATION</th>
                <th className="border p-2 text-left">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="border p-4 text-center text-gray-500">
                    No jobs found matching your search criteria
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr 
                    key={job.id} 
                    className={`border-b hover:bg-gray-50 ${isSelected(job) ? 'bg-blue-50' : ''}`}
                    onClick={() => onToggleSelect(job)}
                  >
                    <td className="border p-2 text-center">
                      <Checkbox
                        checked={isSelected(job)}
                        onCheckedChange={() => onToggleSelect(job)}
                      />
                    </td>
                    <td className="border p-2">{job.jobNumber}</td>
                    <td className="border p-2">{job.date}</td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium text-white ${
                          job.jobType === "COLLECTION"
                            ? "bg-blue-600"
                            : "bg-green-600"
                        }`}
                      >
                        {job.jobType}
                      </span>
                    </td>
                    <td className="border p-2">{job.customer}</td>
                    <td className="border p-2">{job.mobileNumber}</td>
                    <td className="border p-2">{job.location}, {job.town}</td>
                    <td className="border p-2">
                      <JobStatusBadge status={job.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSelectionTable;
