
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
      window.open(`/data-entry/invoicing/print/${invoiceId}`, '_blank');
    } else {
      toast.info("Invoice ID not available for printing");
    }
  };
  
  const handlePrintCertificate = () => {
    if (invoiceId) {
      window.open(`/data-entry/invoicing/print/${invoiceId}?mode=certificate`, '_blank');
    } else {
      toast.info("Invoice ID not available for printing");
    }
  };
  
  const handlePrintHBL = () => {
    if (invoiceId) {
      window.open(`/data-entry/invoicing/print/${invoiceId}?mode=bl`, '_blank');
    } else {
      toast.info("Invoice ID not available for printing");
    }
  };
  
  return (
    <div className={`mt-6 flex justify-center space-x-4 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <Button 
        className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-transform"
        onClick={handlePrintInvoice}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      
      <Button 
        className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-transform"
        onClick={handlePrintCertificate}
      >
        <FileText className="mr-2 h-4 w-4" />
        Print Certificate
      </Button>
      
      <Button 
        className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-transform"
        onClick={handlePrintHBL}
      >
        <FileText className="mr-2 h-4 w-4" />
        Print HBL
      </Button>
      
      <Button 
        className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-transform"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
};

export default ActionButtons;
