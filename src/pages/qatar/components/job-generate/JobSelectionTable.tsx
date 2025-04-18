
import React from "react";
import { QatarJob } from "../../types/jobTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Calendar } from "lucide-react";

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
  // Filter to show only pending jobs that aren't already assigned
  const availableJobs = jobs.filter(job => 
    job.status === 'PENDING' && 
    !job.isAssigned
  );

  if (availableJobs.length === 0) {
    return (
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No pending jobs available for scheduling.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4">
        <CardTitle className="text-lg font-bold flex items-center">
          <Truck size={20} className="mr-2" />
          Job Selection ({availableJobs.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead className="w-10"></TableHead>
                <TableHead>Job #</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Date
                  </div>
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Town</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableJobs.map((job, index) => {
                const isSelected = selectedJobs.some((j) => j.id === job.id);
                return (
                  <TableRow 
                    key={job.id}
                    className={`${isSelected ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
                    onClick={() => onToggleSelect(job)}
                  >
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Checkbox 
                        checked={isSelected} 
                        onCheckedChange={() => onToggleSelect(job)}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{job.jobNumber}</TableCell>
                    <TableCell>{job.date}</TableCell>
                    <TableCell>{job.customer}</TableCell>
                    <TableCell>{job.mobileNumber}</TableCell>
                    <TableCell>{job.town}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>
                      <Badge className={job.jobType === "COLLECTION" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}>
                        {job.jobType}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.sector}</TableCell>
                    <TableCell>
                      {job.city && (
                        <Badge variant="outline" className="bg-gray-50">
                          {job.city}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSelectionTable;
