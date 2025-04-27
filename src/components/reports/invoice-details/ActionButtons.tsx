
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Printer, FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ActionButtonsProps {
  handleBack: () => void;
  isFullScreen?: boolean;
  invoiceId?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  handleBack, 
  isFullScreen = false,
  invoiceId
}) => {
  const navigate = useNavigate();
  
  const handlePrintInvoice = () => {
    if (invoiceId) {
      // Use navigate instead of window.open to handle routing within the application
      // Open in a new tab with the correct path
      window.open(`/data-entry/print-documents/invoice-print/${invoiceId}`, '_blank');
    } else {
      toast.info("Invoice ID not available for printing");
    }
  };
  
  const handlePrintCertificate = () => {
    if (invoiceId) {
      window.open(`/data-entry/print-documents/invoice-print/${invoiceId}?mode=certificate`, '_blank');
    } else {
      toast.info("Invoice ID not available for printing");
    }
  };
  
  const handlePrintHBL = () => {
    if (invoiceId) {
      window.open(`/data-entry/print-documents/bl-print/${invoiceId}`, '_blank');
      console.log("Print HBL triggered for invoice:", invoiceId);
    } else {
      toast.info("Invoice ID not available for printing");
    }
  };
  
  return (
    <div className={`mt-6 flex justify-center space-x-4 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <Button 
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        onClick={handlePrintInvoice}
        disabled={!invoiceId}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      
      <Button 
        className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        onClick={handlePrintCertificate}
        disabled={!invoiceId}
      >
        <FileText className="mr-2 h-4 w-4" />
        Print Certificate
      </Button>
      
      <Button 
        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        onClick={handlePrintHBL}
        disabled={!invoiceId}
      >
        <FileText className="mr-2 h-4 w-4" />
        Print HBL
      </Button>
      
      <Button 
        className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
};

export default ActionButtons;
