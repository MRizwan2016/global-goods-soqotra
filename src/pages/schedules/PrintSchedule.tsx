import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScheduleService } from "@/pages/qatar/services/ScheduleService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
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

const PrintSchedule: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
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
    if (printRef.current) {
      printRef.current.style.display = "block";
      printRef.current.style.visibility = "visible";
      
      // Ensure QR code and all content is visible
      const qrElements = printRef.current.querySelectorAll('svg, canvas, .qrcode');
      qrElements.forEach(element => {
        (element as HTMLElement).style.display = 'block';
        (element as HTMLElement).style.visibility = 'visible';
      });
    }
    
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Generate QR code data
  const generateQRCodeData = () => {
    if (!schedule) return "";
    const baseUrl = window.location.origin;
    return `${baseUrl}/schedules/display/${schedule.id}?schedule=${schedule.schedule_number}&date=${schedule.schedule_date}&vehicle=${schedule.vehicle}&verified=true`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading schedule...</div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Schedule not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Styles */}
      <style>
        {`
          @media print {
            .print\\:hidden { display: none !important; }
            .print-container { 
              margin: 0 !important; 
              padding: 0 !important;
              background: white !important;
            }
            body { 
              margin: 0 !important; 
              padding: 0 !important;
              background: white !important;
              font-size: 12px !important;
            }
            .print-content {
              margin: 0 !important;
              padding: 20px !important;
              background: white !important;
              width: 100% !important;
              max-width: none !important;
            }
            table { 
              width: 100% !important; 
              border-collapse: collapse !important;
              margin: 0 !important;
            }
            th, td { 
              border: 1px solid #000 !important; 
              padding: 8px !important;
              font-size: 11px !important;
            }
            .qr-code {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
            svg, canvas, .qrcode {
              max-width: 100px !important;
              max-height: 100px !important;
              width: 100px !important;
              height: 100px !important;
              display: block !important;
              visibility: visible !important;
            }
          }
        `}
      </style>

      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden p-4 bg-white shadow-md mb-4 sticky top-0 z-10 flex items-center justify-between">
        <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="text-xl font-bold">Print Schedule - {schedule.schedule_number}</div>
        <Button onClick={handlePrint} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>

      {/* Print Content */}
      <div ref={printRef} className="print-content bg-white p-8">
        {/* Header with Company Info and QR Code */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">QATAR CARGO COLLECTION & DELIVERY</h1>
            <div className="text-sm text-gray-600">
              <p>P.O. Box: 22550, Doha - Qatar</p>
              <p>Tel: +974 4460 4470 | Mobile: +974 5554 4470</p>
              <p>Email: info@qatarcargo.com</p>
            </div>
          </div>
          
          {/* QR Code */}
          <div className="qr-code flex flex-col items-center">
            <QRCodeSVG 
              value={generateQRCodeData()}
              size={100}
              level="M"
              includeMargin={true}
              className="border border-gray-300"
            />
            <p className="text-xs text-gray-600 mt-1 text-center">Scan for Details</p>
          </div>
        </div>

        {/* Schedule Header */}
        <div className="border-2 border-blue-500 p-4 mb-6">
          <h2 className="text-xl font-bold text-center mb-4">JOB SCHEDULE</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Schedule Number:</strong> {schedule.schedule_number}</p>
              <p><strong>Date:</strong> {formatDate(schedule.schedule_date)}</p>
              <p><strong>Vehicle:</strong> {schedule.vehicle}</p>
            </div>
            <div>
              <p><strong>Sales Representative:</strong> {schedule.sales_rep}</p>
              {schedule.driver && <p><strong>Driver:</strong> {schedule.driver}</p>}
              {schedule.helper && <p><strong>Helper:</strong> {schedule.helper}</p>}
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="mb-6">
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-black p-2 text-left">SL#</th>
                <th className="border border-black p-2 text-left">Job Number</th>
                <th className="border border-black p-2 text-left">Customer</th>
                <th className="border border-black p-2 text-left">From Address</th>
                <th className="border border-black p-2 text-left">To Address</th>
                <th className="border border-black p-2 text-left">Service Type</th>
                <th className="border border-black p-2 text-left">Items</th>
                <th className="border border-black p-2 text-left">Signature</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job, index) => {
                  const jobData = job.job_data;
                  const itemsCount = jobData.items ? jobData.items.length : 0;
                  return (
                    <tr key={job.id}>
                      <td className="border border-black p-2">{index + 1}</td>
                      <td className="border border-black p-2">{jobData.jobNumber || `JOB-${index + 1}`}</td>
                      <td className="border border-black p-2">{jobData.customer || 'N/A'}</td>
                      <td className="border border-black p-2 text-xs">{jobData.fromAddress || 'N/A'}</td>
                      <td className="border border-black p-2 text-xs">{jobData.toAddress || 'N/A'}</td>
                      <td className="border border-black p-2">{jobData.serviceType || 'N/A'}</td>
                      <td className="border border-black p-2 text-center">{itemsCount}</td>
                      <td className="border border-black p-2" style={{ minWidth: '100px', height: '40px' }}></td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="border border-black p-4 text-center">No jobs found in this schedule</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="border border-black p-4">
            <h3 className="font-bold mb-2">Schedule Summary</h3>
            <p>Total Jobs: {jobs.length}</p>
            <p>Vehicle: {schedule.vehicle}</p>
            <p>Date: {formatDate(schedule.schedule_date)}</p>
          </div>
          
          <div className="border border-black p-4">
            <h3 className="font-bold mb-2">Team Signatures</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm">Sales Rep: {schedule.sales_rep}</p>
                <div className="border-b border-gray-400 mt-2" style={{ height: '30px' }}></div>
              </div>
              {schedule.driver && (
                <div>
                  <p className="text-sm">Driver: {schedule.driver}</p>
                  <div className="border-b border-gray-400 mt-2" style={{ height: '30px' }}></div>
                </div>
              )}
              {schedule.helper && (
                <div>
                  <p className="text-sm">Helper: {schedule.helper}</p>
                  <div className="border-b border-gray-400 mt-2" style={{ height: '30px' }}></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>This is a computer-generated schedule. For verification, scan the QR code above.</p>
          <p>Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PrintSchedule;