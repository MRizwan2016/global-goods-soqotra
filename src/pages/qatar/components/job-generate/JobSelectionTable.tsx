
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { QatarJob } from "../../types/jobTypes";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Phone, Truck } from "lucide-react";

interface JobSelectionTableProps {
  jobs: QatarJob[];
  selectedJobs: QatarJob[];
  onToggleSelect: (job: QatarJob) => void;
  selectedVehicleNumber?: string | null;
}

const JobSelectionTable: React.FC<JobSelectionTableProps> = ({
  jobs,
  selectedJobs,
  onToggleSelect,
  selectedVehicleNumber
}) => {
  // Filter jobs based on selected vehicle number if provided
  const displayJobs = selectedVehicleNumber 
    ? jobs.filter(job => !job.vehicle || job.vehicle === selectedVehicleNumber)
    : jobs;

  const isSelected = (job: QatarJob) => {
    return selectedJobs.some(selectedJob => selectedJob.id === job.id);
  };

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="border rounded-md shadow-sm animate-fade-in">
      <div className="bg-blue-600 text-white p-4 font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck size={18} />
          <h2>JOB SELECTION ({displayJobs.length})</h2>
        </div>
        {selectedVehicleNumber && (
          <Badge className="bg-blue-700 text-white px-3 py-1 text-sm">
            VEHICLE #{selectedVehicleNumber}
          </Badge>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead className="w-12 text-center">
                <Checkbox 
                  checked={displayJobs.length > 0 && displayJobs.every(job => isSelected(job))}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      displayJobs.forEach(job => {
                        if (!isSelected(job)) {
                          onToggleSelect(job);
                        }
                      });
                    } else {
                      displayJobs.forEach(job => {
                        if (isSelected(job)) {
                          onToggleSelect(job);
                        }
                      });
                    }
                  }}
                />
              </TableHead>
              <TableHead>JOB #</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>DATE</span>
                </div>
              </TableHead>
              <TableHead>CUSTOMER</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  <span>MOBILE</span>
                </div>
              </TableHead>
              <TableHead>VEHICLE/NUMBER</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>LOCATION</span>
                </div>
              </TableHead>
              <TableHead>TYPE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayJobs.length > 0 ? (
              displayJobs.map((job, index) => (
                <TableRow 
                  key={job.id} 
                  className={`
                    ${isSelected(job) ? 'bg-blue-50' : 'hover:bg-gray-50'} 
                    cursor-pointer transition-colors
                  `}
                  onClick={() => onToggleSelect(job)}
                >
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={isSelected(job)}
                      onCheckedChange={() => onToggleSelect(job)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{job.jobNumber}</TableCell>
                  <TableCell>{formatDate(job.date)}</TableCell>
                  <TableCell>{job.customer}</TableCell>
                  <TableCell>{job.mobileNumber}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <Badge variant={selectedVehicleNumber === job.vehicle ? "default" : "outline"} className="w-fit">
                        {job.vehicle ? "VEHICLE" : "TRUCK"}
                      </Badge>
                      {job.vehicle && (
                        <span className="text-xs text-gray-600 mt-1">#{job.vehicle}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                      ${job.jobType === 'DELIVERY' ? 'bg-amber-50 text-amber-800 border-amber-200' : 
                       job.jobType === 'COLLECTION' ? 'bg-green-50 text-green-800 border-green-200' : 
                       'bg-blue-50 text-blue-800 border-blue-200'}
                    `}>
                      {job.jobType || 'DELIVERY'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  {selectedVehicleNumber ? (
                    <div className="flex flex-col items-center gap-2">
                      <p>No jobs assigned to vehicle #{selectedVehicleNumber} yet</p>
                      <p className="text-sm text-gray-400">Select jobs to assign to this vehicle</p>
                    </div>
                  ) : (
                    <p>No jobs available for selection</p>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobSelectionTable;
