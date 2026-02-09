
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, MapPin, Phone, User } from "lucide-react";
import { QatarJob } from "../../types/jobTypes";
import { Badge } from "@/components/ui/badge";

interface JobListingProps {
  jobs: QatarJob[];
}

const JobListing = ({ jobs }: JobListingProps) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'PENDING': 'bg-amber-100 text-amber-800 hover:bg-amber-100',
      'IN_PROGRESS': 'bg-[#3b5998]/10 text-[#3b5998] hover:bg-[#3b5998]/10',
      'SCHEDULED': 'bg-[#3b5998]/20 text-[#1e2a3a] hover:bg-[#3b5998]/20',
      'COMPLETED': 'bg-green-100 text-green-800 hover:bg-green-100',
      'CANCELLED': 'bg-red-100 text-red-800 hover:bg-red-100',
    };
    return <Badge className={styles[status] || 'bg-gray-100 text-gray-700'}>{status.replace('_', ' ')}</Badge>;
  };
  
  const handleViewJob = (jobId: string) => {
    navigate(`/qatar/job/${jobId}`);
  };
  
  return (
    <Card className="shadow-sm hover:shadow transition-shadow mb-6 border border-gray-200">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-[#1e2a3a]">RECENT JOBS</CardTitle>
            <CardDescription>VIEW AND MANAGE RECENT COLLECTION & DELIVERY JOBS</CardDescription>
          </div>
          <Button variant="outline" onClick={() => navigate('/qatar/jobs')} className="border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5">
            VIEW ALL JOBS
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#3b5998] text-white">
                <th className="text-left p-2">JOB #</th>
                <th className="text-left p-2">TYPE</th>
                <th className="text-left p-2">SECTOR</th>
                <th className="text-left p-2">CUSTOMER</th>
                <th className="text-left p-2">LOCATION</th>
                <th className="text-left p-2">DATE</th>
                <th className="text-left p-2">VEHICLE</th>
                <th className="text-left p-2">STATUS</th>
                <th className="text-right p-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{job.jobNumber}</td>
                  <td className="p-2">{job.jobType}</td>
                  <td className="p-2">{job.sector}</td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <User size={14} className="mr-1 text-gray-500" />
                      {job.customer === "--" ? "Unnamed" : job.customer}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone size={12} className="mr-1" />
                      {job.mobileNumber}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1 text-gray-500" />
                      {job.town}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-500" />
                      {job.date}
                    </div>
                  </td>
                  <td className="p-2">{job.vehicle}</td>
                  <td className="p-2">{getStatusBadge(job.status)}</td>
                  <td className="p-2 text-right">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 px-2 text-xs border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5"
                      onClick={() => handleViewJob(job.id)}
                    >
                      <Edit size={12} className="mr-1" />
                      EDIT
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListing;
