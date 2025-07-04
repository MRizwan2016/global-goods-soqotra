import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { toast } from "sonner";
import { ScheduleService, Schedule, ScheduleJob } from "@/services/ScheduleService";

const PrintSchedule: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [jobs, setJobs] = useState<ScheduleJob[]>([]);
  const [loading, setLoading] = useState(true);

  // Get data from navigation state or fetch from API
  const scheduleFromState = location.state?.schedule as Schedule;
  const jobsFromState = location.state?.jobs as ScheduleJob[];

  useEffect(() => {
    if (scheduleFromState) {
      setSchedule(scheduleFromState);
      if (jobsFromState) {
        setJobs(jobsFromState);
        setLoading(false);
      } else {
        loadScheduleJobs();
      }
    } else if (scheduleId) {
      loadScheduleData();
    }
  }, [scheduleId, scheduleFromState, jobsFromState]);

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
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
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
      address: jobData.address || jobData.collectionAddress || 'N/A',
      phone: jobData.phone || jobData.shipperMobile || 'N/A'
    };
  };

  const calculateTotals = () => {
    const totalJobs = jobs.length;
    const totalPackages = jobs.reduce((sum, job) => {
      const jobData = getJobDisplayData(job.job_data, 0);
      return sum + jobData.packageCount;
    }, 0);
    const totalAmount = jobs.reduce((sum, job) => {
      const jobData = getJobDisplayData(job.job_data, 0);
      return sum + jobData.totalAmount;
    }, 0);

    return { totalJobs, totalPackages, totalAmount };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading schedule for printing...</div>
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

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-white">
      {/* Print Controls - Hidden during print */}
      <div className="no-print flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Print Schedule</h1>
        </div>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Printable Content */}
      <div ref={printRef} className="p-8 print:p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">DELIVERY SCHEDULE</h1>
          <h2 className="text-lg text-gray-600">Personal Effects Cargo System</h2>
          <p className="text-sm text-gray-500 mt-1">
            Country: {schedule.country.replace('-', ' ').toUpperCase()}
          </p>
        </div>

        {/* Schedule Information */}
        <div className="border border-gray-300 mb-6">
          <div className="bg-gray-100 p-3 border-b">
            <h3 className="font-bold text-lg">SCHEDULE INFORMATION</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Schedule Number:</strong> {schedule.schedule_number}
              </div>
              <div>
                <strong>Schedule Date:</strong> {formatDate(schedule.schedule_date)}
              </div>
              <div>
                <strong>Vehicle:</strong> {schedule.vehicle}
              </div>
              <div>
                <strong>Driver:</strong> {schedule.driver || "Not Assigned"}
              </div>
              <div>
                <strong>Sales Rep:</strong> {schedule.sales_rep || "Not Assigned"}
              </div>
              <div>
                <strong>Helper:</strong> {schedule.helper || "Not Assigned"}
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="border border-gray-300 mb-6">
          <div className="bg-gray-100 p-3 border-b">
            <h3 className="font-bold text-lg">JOB DETAILS ({jobs.length} Jobs)</h3>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left font-semibold">No.</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Job #</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Customer</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Location</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Address</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Phone</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Packages</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => {
                const jobData = getJobDisplayData(job.job_data, index);
                return (
                  <tr key={job.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2 font-medium">{jobData.jobNumber}</td>
                    <td className="border border-gray-300 p-2">{jobData.customerName}</td>
                    <td className="border border-gray-300 p-2">{jobData.location}</td>
                    <td className="border border-gray-300 p-2 text-xs">{jobData.address}</td>
                    <td className="border border-gray-300 p-2 text-xs">{jobData.phone}</td>
                    <td className="border border-gray-300 p-2 text-center">{jobData.packageCount}</td>
                    <td className="border border-gray-300 p-2 text-right">
                      {jobData.totalAmount > 0 ? `$${jobData.totalAmount.toFixed(2)}` : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="border border-gray-300 mb-6">
          <div className="bg-gray-100 p-3 border-b">
            <h3 className="font-bold text-lg">SUMMARY</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-2xl font-bold text-blue-600">{totals.totalJobs}</div>
                <div className="text-sm text-gray-600">Total Jobs</div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="text-2xl font-bold text-green-600">{totals.totalPackages}</div>
                <div className="text-sm text-gray-600">Total Packages</div>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <div className="text-2xl font-bold text-purple-600">
                  ${totals.totalAmount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Amount</div>
              </div>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-16">
              <strong>Driver Signature</strong>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-16">
              <strong>Supervisor Signature</strong>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Generated on: {new Date().toLocaleString()}</p>
          <p>Personal Effects Cargo Management System</p>
        </div>
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .no-print {
              display: none !important;
            }
            
            body {
              margin: 0;
              padding: 0;
            }
            
            table {
              page-break-inside: auto;
            }
            
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            
            thead {
              display: table-header-group;
            }
            
            tfoot {
              display: table-footer-group;
            }
            
            .print-p-4 {
              padding: 1rem !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default PrintSchedule;