import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScheduleService } from "@/services/ScheduleService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, MessageCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    if (scheduleId) loadScheduleData();
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

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = async () => {
    if (!printRef.current || !schedule) return;
    try {
      toast.info("Generating PDF...");
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], `Schedule-${schedule.schedule_number}.pdf`, { type: 'application/pdf' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: `Schedule ${schedule.schedule_number}`, files: [file] });
      } else {
        // Fallback: download + open WhatsApp with text
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url; a.download = file.name; a.click();
        URL.revokeObjectURL(url);

        const msg = `📋 *SCHEDULE: ${schedule.schedule_number}*\n📅 ${new Date(schedule.schedule_date).toLocaleDateString()}\n🚛 Vehicle: ${schedule.vehicle}\n📦 Jobs: ${schedule.total_jobs}\n\nPDF downloaded. Please attach and send.`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
      }
    } catch (err) {
      console.error('Share error:', err);
      toast.error("Failed to share");
    }
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  const generateQRCodeData = () => {
    if (!schedule) return "";
    return `${window.location.origin}/schedules/display/${schedule.id}`;
  };

  const isSudan = schedule?.country?.toLowerCase().includes('sudan');
  const companyName = isSudan ? 'SOQOTRA LOGISTICS SERVICES' : 'SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL';
  const headerColor = isSudan ? '#991b1b' : '#3b82f6';

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-lg">Loading schedule...</div></div>;
  if (!schedule) return <div className="flex items-center justify-center h-64"><div className="text-lg">Schedule not found</div></div>;

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          @page { size: A4 landscape; margin: 10mm; }
          body { margin: 0 !important; padding: 0 !important; background: white !important; }
          .print-page { width: 100% !important; max-width: none !important; padding: 0 !important; margin: 0 !important; }
          table { width: 100% !important; border-collapse: collapse !important; font-size: 10px !important; }
          th, td { border: 1px solid #000 !important; padding: 4px 6px !important; }
          svg { display: block !important; visibility: visible !important; }
        }
      `}</style>

      <div className="no-print p-4 bg-white shadow-md mb-4 sticky top-0 z-10 flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="text-xl font-bold">Schedule - {schedule.schedule_number}</div>
        <div className="flex gap-2">
          <Button onClick={handleShareWhatsApp} variant="outline" className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50">
            <MessageCircle className="h-4 w-4" /> Share PDF
          </Button>
          <Button onClick={handlePrint} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
            <Printer className="h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      <div ref={printRef} className="print-page bg-white p-6 mx-auto" style={{ maxWidth: '1100px' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold" style={{ color: headerColor }}>{companyName}</h1>
            <p className="text-xs text-gray-500 mt-1">{schedule.country?.toUpperCase()} — COLLECTION & DELIVERY SCHEDULE</p>
          </div>
          <div className="flex flex-col items-center">
            <QRCodeSVG value={generateQRCodeData()} size={80} level="M" includeMargin />
            <p className="text-[9px] text-gray-500 mt-0.5">Scan to verify</p>
          </div>
        </div>

        {/* Schedule Info Bar */}
        <div className="border rounded p-3 mb-4 grid grid-cols-5 gap-2 text-sm" style={{ borderColor: headerColor }}>
          <div><span className="font-semibold">Schedule #:</span> {schedule.schedule_number}</div>
          <div><span className="font-semibold">Date:</span> {formatDate(schedule.schedule_date)}</div>
          <div><span className="font-semibold">Vehicle:</span> {schedule.vehicle}</div>
          <div><span className="font-semibold">Driver:</span> {schedule.driver || '—'}</div>
          <div><span className="font-semibold">Sales Rep:</span> {schedule.sales_rep || '—'}</div>
        </div>

        {/* Jobs Table - Landscape optimized */}
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr style={{ backgroundColor: headerColor, color: 'white' }}>
              <th className="border border-black p-1.5 text-left w-8">SL#</th>
              <th className="border border-black p-1.5 text-left">JOB #</th>
              <th className="border border-black p-1.5 text-left">SHIPPER</th>
              <th className="border border-black p-1.5 text-left">CONSIGNEE</th>
              <th className="border border-black p-1.5 text-left">CITY</th>
              <th className="border border-black p-1.5 text-center w-12">PKGS</th>
              <th className="border border-black p-1.5 text-center w-16">WEIGHT</th>
              <th className="border border-black p-1.5 text-left">TYPE</th>
              <th className="border border-black p-1.5 text-left" style={{ minWidth: '100px' }}>SIGNATURE</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? jobs.map((job, index) => {
              const d = job.job_data;
              return (
                <tr key={job.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-black p-1.5">{index + 1}</td>
                  <td className="border border-black p-1.5 font-medium">{d.jobNumber || d.job_number || '—'}</td>
                  <td className="border border-black p-1.5">{d.shipperName || d.customer || '—'}</td>
                  <td className="border border-black p-1.5">{d.consigneeName || d.customer || '—'}</td>
                  <td className="border border-black p-1.5">{d.city || d.toAddress || '—'}</td>
                  <td className="border border-black p-1.5 text-center">{d.packages || d.items?.length || 0}</td>
                  <td className="border border-black p-1.5 text-center">{d.totalWeight || '—'}</td>
                  <td className="border border-black p-1.5">{d.serviceType || d.type || '—'}</td>
                  <td className="border border-black p-1.5" style={{ height: '30px' }}></td>
                </tr>
              );
            }) : (
              <tr><td colSpan={9} className="border border-black p-4 text-center">No jobs in this schedule</td></tr>
            )}
          </tbody>
        </table>

        {/* Summary + Signatures */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
          <div className="border border-black p-3">
            <h3 className="font-bold mb-1">Summary</h3>
            <p>Total Jobs: {jobs.length} | Vehicle: {schedule.vehicle} | Date: {formatDate(schedule.schedule_date)}</p>
          </div>
          <div className="border border-black p-3">
            <h3 className="font-bold mb-1">Authorised Signatures</h3>
            <div className="flex justify-between mt-2">
              <div className="text-center flex-1"><div className="border-b border-gray-400 mb-1" style={{ height: '20px' }}></div><span>Sales Rep</span></div>
              <div className="text-center flex-1"><div className="border-b border-gray-400 mb-1" style={{ height: '20px' }}></div><span>Driver</span></div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-center text-[9px] text-gray-400">
          Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()} — Scan QR code for digital verification
        </div>
      </div>
    </div>
  );
};

export default PrintSchedule;
