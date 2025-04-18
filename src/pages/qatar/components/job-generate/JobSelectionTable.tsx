
import React from "react";
import { QatarJob } from "../../types/jobTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Calendar, MapPin } from "lucide-react";

interface JobSelectionTableProps {
  jobs: QatarJob[];
  selectedJobs: QatarJob[];
  onToggleSelect: (job: QatarJob) => void;
  selectedVehicleNumber?: string;
}

// Vehicle type to number mapping
const vehicleNumberMap: { [key: string]: string } = {
  "CAR": "41070",
  "TRUCK": "41067",
  "VAN": "41073",
  "PICKUP": "514005",
  "LORRY": "119927",
  "HIACE": "74827"
};

// Reverse mapping from vehicle number to type
const vehicleTypeMap: { [key: string]: string } = Object.entries(vehicleNumberMap).reduce(
  (acc, [type, number]) => ({ ...acc, [number]: type }), {}
);

const JobSelectionTable: React.FC<JobSelectionTableProps> = ({
  jobs,
  selectedJobs,
  onToggleSelect,
  selectedVehicleNumber,
}) => {
  // Filter jobs based on status and vehicle matching
  const availableJobs = jobs.filter(job => {
    const isAvailable = job.status === 'PENDING' && job.isAssigned !== true;
    
    // If a vehicle number is selected, filter jobs by matching vehicle type
    if (selectedVehicleNumber && isAvailable) {
      const expectedVehicleType = vehicleTypeMap[selectedVehicleNumber];
      if (expectedVehicleType) {
        return job.vehicle?.toUpperCase() === expectedVehicleType;
      }
    }
    
    return isAvailable;
  });

  // Function to get vehicle number based on vehicle type
  const getVehicleNumber = (vehicleType: string) => {
    return vehicleNumberMap[vehicleType.toUpperCase()] || vehicleType;
  };

  if (availableJobs.length === 0) {
    return (
      <Card className="border-0 shadow-md animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4">
          <CardTitle className="text-lg font-bold flex items-center">
            <Truck size={20} className="mr-2" />
            Job Selection (0)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">
            {selectedVehicleNumber 
              ? `No pending jobs available for vehicle #${selectedVehicleNumber}. Try selecting a different vehicle.`
              : "No pending jobs available for scheduling. Try creating new jobs or changing filter settings."
            }
          </p>
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
          {selectedVehicleNumber && (
            <Badge className="ml-2 bg-blue-700">
              Vehicle #{selectedVehicleNumber}
            </Badge>
          )}
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
                <TableHead className="min-w-[140px]">Vehicle/Number</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    Location
                  </div>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableJobs.map((job, index) => {
                const isSelected = selectedJobs.some((j) => j.id === job.id);
                const vehicleNumber = getVehicleNumber(job.vehicle || '');
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
                    <TableCell>
                      {job.vehicle ? (
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            {job.vehicle}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200 text-xs">
                            #{vehicleNumber}
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>{job.location || "N/A"}</TableCell>
                    <TableCell>
                      <Badge className={job.jobType === "COLLECTION" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}>
                        {job.jobType}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.sector || "N/A"}</TableCell>
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
