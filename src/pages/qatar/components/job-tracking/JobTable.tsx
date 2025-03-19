
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Truck, 
  MapPin, 
  User, 
  PhoneCall,
  Calendar,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QatarJob } from "../../types/jobTypes";
import JobStatusBadge from "./JobStatusBadge";

interface JobTableProps {
  currentEntries: QatarJob[];
}

const JobTable = ({ currentEntries }: JobTableProps) => {
  const navigate = useNavigate();

  // View job details
  const handleViewJob = (jobId: string) => {
    navigate(`/qatar/job/${jobId}`);
  };

  return (
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
                <TableCell><JobStatusBadge status={job.status} /></TableCell>
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
  );
};

export default JobTable;
