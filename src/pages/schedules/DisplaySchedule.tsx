import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScheduleService } from "@/services/ScheduleService";
import { ArrowLeft, Printer, Calendar, Truck, User, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface Schedule {
  id: string;
  schedule_number: string;
  schedule_date: string;
  vehicle: string;
  sales_rep: string;
  driver?: string;
  helper?: string;
  total_jobs: number;
  status: string;
  country: string;
}

interface ScheduleJob {
  id: string;
  job_data: any;
}

const DisplaySchedule: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [jobs, setJobs] = useState<ScheduleJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (scheduleId) {
      loadScheduleData();
    }
  }, [scheduleId]);

  const loadScheduleData = async () => {
    try {
      setLoading(true);
      const result = await ScheduleService.getScheduleWithJobs(scheduleId!);
      if (result.success && result.schedule && result.jobs) {
        setSchedule(result.schedule);
        setJobs(result.jobs);
      } else {
        toast.error(result.error || "Failed to load schedule");
        navigate("/schedules");
      }
    } catch (error) {
      console.error("Error loading schedule:", error);
      toast.error("Failed to load schedule");
      navigate("/schedules");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/schedules");
  };

  const handlePrint = () => {
    navigate(`/schedules/print/${scheduleId}`);
  };

  const handleWhatsApp = () => {
    if (!schedule) return;
    const jobLines = jobs.map((job, i) => {
      const d = job.job_data;
      return `${i + 1}. ${d.jobNumber || `JOB-${i + 1}`} - ${d.customer || 'N/A'} (${d.status || 'SCHEDULED'})`;
    }).join('\n');

    const message = [
      `📋 *SCHEDULE: ${schedule.schedule_number}*`,
      `📅 Date: ${new Date(schedule.schedule_date).toLocaleDateString()}`,
      `🚛 Vehicle: ${schedule.vehicle}`,
      schedule.sales_rep ? `👤 Sales Rep: ${schedule.sales_rep}` : '',
      schedule.driver ? `🚗 Driver: ${schedule.driver}` : '',
      `🌍 Country: ${schedule.country}`,
      `📦 Total Jobs: ${schedule.total_jobs}`,
      ``,
      `*Jobs:*`,
      jobLines,
      ``,
      `— Soqotra Logistics`
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Layout title="Display Schedule">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading schedule...</div>
        </div>
      </Layout>
    );
  }

  if (!schedule) {
    return (
      <Layout title="Display Schedule">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Schedule not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Display Schedule">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Schedules
          </Button>
          <div className="flex items-center gap-2">
            <Button onClick={handleWhatsApp} variant="outline" className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button onClick={handlePrint} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
              <Printer className="h-4 w-4" />
              Print Schedule
            </Button>
          </div>
        </div>

        {/* Schedule Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Details - {schedule.schedule_number}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Schedule Information</h3>
                <div className="space-y-1">
                  <p><span className="font-medium">Schedule Number:</span> {schedule.schedule_number}</p>
                  <p><span className="font-medium">Date:</span> {formatDate(schedule.schedule_date)}</p>
                  <p><span className="font-medium">Status:</span> {schedule.status}</p>
                  <p><span className="font-medium">Total Jobs:</span> {schedule.total_jobs}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Vehicle & Team</h3>
                <div className="space-y-1">
                  <p><span className="font-medium">Vehicle:</span> {schedule.vehicle}</p>
                  <p><span className="font-medium">Sales Rep:</span> {schedule.sales_rep}</p>
                  {schedule.driver && <p><span className="font-medium">Driver:</span> {schedule.driver}</p>}
                  {schedule.helper && <p><span className="font-medium">Helper:</span> {schedule.helper}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Country</h3>
                <div className="space-y-1">
                  <p><span className="font-medium">Country:</span> {schedule.country}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Jobs in this Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {jobs.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-500">
                      <TableHead className="text-white font-bold">Job #</TableHead>
                      <TableHead className="text-white font-bold">Customer</TableHead>
                      <TableHead className="text-white font-bold">From Address</TableHead>
                      <TableHead className="text-white font-bold">To Address</TableHead>
                      <TableHead className="text-white font-bold">Service Type</TableHead>
                      <TableHead className="text-white font-bold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job, index) => {
                      const jobData = job.job_data;
                      return (
                        <TableRow key={job.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <TableCell className="font-medium">{jobData.jobNumber || `JOB-${index + 1}`}</TableCell>
                          <TableCell>{jobData.customer || 'N/A'}</TableCell>
                          <TableCell>{jobData.fromAddress || 'N/A'}</TableCell>
                          <TableCell>{jobData.toAddress || 'N/A'}</TableCell>
                          <TableCell>{jobData.serviceType || 'N/A'}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              jobData.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                              jobData.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {jobData.status || 'SCHEDULED'}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No jobs found in this schedule.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DisplaySchedule;