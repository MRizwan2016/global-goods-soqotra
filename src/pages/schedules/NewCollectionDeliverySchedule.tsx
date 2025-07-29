import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { toast } from "sonner";
import { ScheduleService, Schedule, ScheduleJob } from "@/services/ScheduleService";

const NewCollectionDeliverySchedule: React.FC = () => {
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

  const getJobDisplayData = (jobData: any, index: number) => {
    return {
      jobNumber: jobData.jobNumber || `QJB-033812-14${33 + index}`,
      customerName: jobData.customerName || jobData.shipper1 || 'N/A',
      location: jobData.city || jobData.shipperCity || 'N/A',
      packageDetails: jobData.packages?.map((pkg: any) => pkg.type).join(', ') || 'CARTON BOX',
      phone: jobData.phone || jobData.shipperMobile || 'N/A',
      type: index % 2 === 0 ? 'COLLECTION' : 'DELIVERY'
    };
  };

  const calculateSummary = () => {
    const deliveries = jobs.filter((_, index) => index % 2 === 1).length;
    const collections = jobs.filter((_, index) => index % 2 === 0).length;
    const totalJobs = jobs.length;
    
    return { deliveries, collections, totalJobs };
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

  const summary = calculateSummary();
  const country = schedule.country.toUpperCase().replace('-', ' ');

  return (
    <div className="min-h-screen bg-white">
      {/* Print Controls - Hidden during print */}
      <div className="no-print flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Collection & Delivery Schedule</h1>
        </div>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Printable Content */}
      <div ref={printRef} className="p-8 print:p-4">
        {/* Header */}
        <div className="border-2 border-black">
          {/* Top row with logo and title */}
          <div className="flex items-start p-4">
            <div className="w-32 mr-4">
              <img 
                src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" 
                alt="Soqotra Logo" 
                className="w-full h-auto"
              />
            </div>
            <div className="flex-1 text-center">
              <div className="flex justify-between items-start">
                <div></div>
                <div>
                  <h1 className="text-lg font-bold mb-2">
                    {country === 'SAUDI ARABIA' 
                      ? "SOQOTRA SOLUTIONS WLL" 
                      : "SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL"}
                  </h1>
                  <h2 className="text-base font-semibold">COLLECTION / DELIVERY JOB SHEET</h2>
                </div>
                <div className="text-right">
                  <div className="border border-gray-400 px-2 py-1 mb-2">
                    <span className="text-sm font-bold">PAGE</span>
                    <span className="ml-8">1</span>
                  </div>
                  <div className="bg-gray-300 border border-gray-400 px-2 py-1">
                    <span className="text-sm">QR CODE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule details row */}
          <div className="border-t-2 border-black p-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm">(SCHEDULE NO: {schedule.schedule_number})</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold">{country}</span>
              </div>
            </div>
          </div>

          {/* Vehicle and driver info */}
          <div className="border-t border-black p-3">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-bold">{schedule.vehicle || '41067'}</span>
              </div>
              <div>
                <span>PRINTED TIME: _____ PRINTED BY _____ VEHICLE: {schedule.vehicle || '41067'}</span>
              </div>
              <div>
                <span>DRIVER: {schedule.driver || 'MR. LAHIRU'}</span>
              </div>
              <div>
                <span>SALES REP: {schedule.sales_rep || 'MR. LAHIRU'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="mt-4">
          {jobs.slice(0, 2).map((job, index) => {
            const jobData = getJobDisplayData(job.job_data, index);
            return (
              <div key={job.id} className="border border-black mb-2">
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div><span className="font-bold">{index + 1}</span> <span className="font-bold">JOB #</span> {jobData.jobNumber} ({jobData.type})</div>
                          <div><span className="font-bold">{jobData.customerName}</span></div>
                          <div><span className="font-bold">{jobData.location}</span></div>
                          <div><span className="font-bold">PHONE NUMBER</span> {jobData.phone}</div>
                        </div>
                        <div>
                          <div><span className="font-bold">PACKAGE DETAILS</span></div>
                          <div>{jobData.packageDetails}</div>
                          {index === 0 && <div>WOODEN BOX - 1 METER</div>}
                          {index === 1 && <div>CARPET ROLL</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary sections */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {/* Job Summary */}
          <div className="border border-black">
            <div className="bg-gray-200 p-2 border-b border-black">
              <h3 className="font-bold text-sm">JOB SUMMARY</h3>
            </div>
            <div className="p-2 text-sm">
              <div className="flex justify-between border-b py-1">
                <span>NUMBER OF DELIVERIES</span>
                <span>{summary.deliveries}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span>NUMBER OF COLLECTIONS</span>
                <span>{summary.collections}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>TOTAL JOBS</span>
                <span>{summary.totalJobs}</span>
              </div>
            </div>
          </div>

          {/* Item Summary */}
          <div className="border border-black">
            <div className="bg-gray-200 p-2 border-b border-black">
              <h3 className="font-bold text-sm">ITEM SUMMARY</h3>
              <div className="text-right"><span className="font-bold">QTY</span></div>
            </div>
            <div className="p-2 text-sm">
              <div className="flex justify-between border-b py-1">
                <span>CARTON BOX</span>
                <span>2</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span>WOODEN BOX - 1 METER</span>
                <span>1</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span>CARPET ROLL</span>
                <span>1</span>
              </div>
              <div className="flex justify-between py-1">
                <span>TELEVISION</span>
                <span>1</span>
              </div>
            </div>
            <div className="border-t border-black p-2 text-sm">
              <div className="flex justify-between">
                <span><strong>TOTAL VOLUME METER/CBM</strong></span>
                <span><strong>1.50</strong></span>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="border border-black">
            <div className="bg-gray-200 p-2 border-b border-black">
              <h3 className="font-bold text-sm">FINANCIAL SUMMARY</h3>
            </div>
            <div className="p-2 text-sm">
              <div className="flex justify-between border-b py-1">
                <span>TOTAL DELIVERY</span>
                <span>QAR -</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span>TOTAL COLLECTIONS</span>
                <span>QAR 650.00</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span>TOTAL AMOUNT RECEIVED</span>
                <span>QAR 450.00</span>
              </div>
              <div className="flex justify-between py-1">
                <span>BALANCE TO PAY</span>
                <span>QAR 200.00</span>
              </div>
            </div>
          </div>
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
            
            .print-p-4 {
              padding: 1rem !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default NewCollectionDeliverySchedule;