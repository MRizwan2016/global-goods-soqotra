import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { QatarJob } from "../../types/jobTypes";
import InvoicePrint from "../print/invoice/InvoicePrint";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InvoicePrintButtonProps {
  job: QatarJob;
  disabled?: boolean;
}

const InvoicePrintButton: React.FC<InvoicePrintButtonProps> = ({ job, disabled = false }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice-${job.jobNumber}</title>
              <style>
                @page {
                  size: A4;
                  margin: 15mm;
                }
                @media print {
                  body { -webkit-print-color-adjust: exact; }
                  .no-print { display: none; }
                }
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              </style>
            </head>
            <body>
              ${printRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const handlePrintClick = () => {
    setIsPreviewOpen(true);
    // Small delay to ensure the content is rendered before printing
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  return (
    <>
      <Button
        type="button"
        onClick={handlePrintClick}
        disabled={disabled}
        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
      >
        <Printer size={16} />
        Print Invoice
      </Button>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Invoice Preview - {job.jobNumber}</DialogTitle>
          </DialogHeader>
          <div ref={printRef}>
            <InvoicePrint job={job} />
          </div>
          <div className="flex justify-end gap-2 mt-4 no-print">
            <Button onClick={() => setIsPreviewOpen(false)} variant="outline">
              Close
            </Button>
            <Button onClick={handlePrint} className="bg-green-600 hover:bg-green-700">
              <Printer size={16} className="mr-2" />
              Print
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvoicePrintButton;