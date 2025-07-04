import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Printer } from "lucide-react";
import { toast } from "sonner";
import { ScheduleService, Schedule, ScheduleJob } from "@/services/ScheduleService";

const DisplaySchedule: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [jobs, setJobs] = useState<ScheduleJob[]>([]);
  const [loading, setLoading] = useState(true);

  // Get schedule from navigation state or fetch from API
  const scheduleFromState = location.state?.schedule as Schedule;

  useEffect(() => {
    if (scheduleFromState) {
      setSchedule(scheduleFromState);
      loadScheduleJobs();
    } else if (scheduleId) {
      loadScheduleData();
    }
  }, [scheduleId, scheduleFromState]);

  const loadScheduleData = async () => {
    if (!scheduleId) return;
    
    setLoading(true);
    try {
      const result = await ScheduleService.getScheduleWithJobs(scheduleId);
      
      if (result.success && result.schedule) {
        setSchedule(result.schedule);
        setJobs(result.jobs || []);
      } else {
        toast.error(result.error || "Failed to load schedule");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error loading schedule:", error);
      toast.error("Failed to load schedule");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const loadScheduleJobs = async () => {
    if (!scheduleId) return;
    
    try {
      const result = await ScheduleService.getScheduleWithJobs(scheduleId);
      
      if (result.success) {
        setJobs(result.jobs || []);
      } else {
        toast.error("Failed to load schedule jobs");
      }
    } catch (error) {
      console.error("Error loading schedule jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const countryPath = getCountryPath();
    navigate(`${countryPath}/schedules/print/${scheduleId}`, { 
      state: { schedule, jobs } 
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getCountryPath = () => {
    const path = location.pathname;
    if (path.includes('sri-lanka')) return '/sri-lanka';
    if (path.includes('kenya')) return '/kenya';
    if (path.includes('philippines')) return '/philippines';
    return '';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getJobDisplayData = (jobData: any, index: number) => {
    return {
      jobNumber: jobData.jobNumber || jobData.id || `Job-${index + 1}`,
      customerName: jobData.customerName || jobData.shipper1 || 'N/A',
      location: jobData.city || jobData.shipperCity || 'N/A',
      packageCount: jobData.packages?.length || jobData.packageCount || 0,
      totalAmount: jobData.totalAmount || jobData.grandTotal || 0,
      status: jobData.status || 'SCHEDULED'
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading schedule details...</div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Schedule not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Schedule Details</h1>
        </div>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="h-4 w-4 mr-2" />
          Print Schedule
        </Button>
      </div>

      {/* Schedule Information */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Schedule Number</label>
              <p className="text-lg font-semibold">{schedule.schedule_number}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Schedule Date</label>
              <p className="text-lg">{formatDate(schedule.schedule_date)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Vehicle</label>
              <p className="text-lg">{schedule.vehicle}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Sales Representative</label>
              <p className="text-lg">{schedule.sales_rep || "Not Assigned"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Driver</label>
              <p className="text-lg">{schedule.driver || "Not Assigned"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Helper</label>
              <p className="text-lg">{schedule.helper || "Not Assigned"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Total Jobs</label>
              <p className="text-lg font-semibold text-blue-600">{schedule.total_jobs}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <p className="text-lg">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  schedule.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {schedule.status}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Country</label>
              <p className="text-lg capitalize">{schedule.country.replace('-', ' ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Jobs ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No jobs assigned to this schedule.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job #</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Packages</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job, index) => {
                  const jobData = getJobDisplayData(job.job_data, index);
                  return (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{jobData.jobNumber}</TableCell>
                      <TableCell>{jobData.customerName}</TableCell>
                      <TableCell>{jobData.location}</TableCell>
                      <TableCell>{jobData.packageCount}</TableCell>
                      <TableCell>
                        {jobData.totalAmount > 0 ? `$${jobData.totalAmount.toFixed(2)}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          jobData.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          jobData.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {jobData.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplaySchedule;