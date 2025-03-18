
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFullScreen } from './invoice-details/useFullScreen';
import InvoiceDetailsHeader from './invoice-details/InvoiceDetailsHeader';
import InvoiceFinancialDetails from './invoice-details/InvoiceFinancialDetails';
import ShippingDetails from './invoice-details/ShippingDetails';
import PackageDetailsTable from './invoice-details/PackageDetailsTable';
import PaymentDetailsTable from './invoice-details/PaymentDetailsTable';
import CargoDetailsTable from './invoice-details/CargoDetailsTable';
import ActionButtons from './invoice-details/ActionButtons';

interface InvoiceDetailsViewProps {
  invoice: any;
  onClose?: () => void;
}

export const InvoiceDetailsView: React.FC<InvoiceDetailsViewProps> = ({ invoice, onClose }) => {
  const navigate = useNavigate();
  const { isFullScreen, toggleFullScreen, exitFullScreen } = useFullScreen();

  const handleBack = () => {
    if (isFullScreen) {
      exitFullScreen();
    }
    if (onClose) {
      onClose();
    } else {
      navigate("/reports/cargo");
    }
  };

  const containerClasses = isFullScreen 
    ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto animate-fade-in" 
    : "invoice-details-container space-y-6";

  return (
    <div className={containerClasses}>
      <InvoiceDetailsHeader 
        isFullScreen={isFullScreen} 
        toggleFullScreen={toggleFullScreen} 
      />
      
      <InvoiceFinancialDetails 
        invoice={invoice} 
        isFullScreen={isFullScreen} 
      />

      <ShippingDetails 
        invoice={invoice} 
        isFullScreen={isFullScreen} 
      />

      <PackageDetailsTable 
        invoice={invoice} 
        isFullScreen={isFullScreen} 
      />

      <PaymentDetailsTable 
        isFullScreen={isFullScreen} 
      />

      <CargoDetailsTable 
        type="hold" 
        isFullScreen={isFullScreen} 
      />

      <CargoDetailsTable 
        type="clear" 
        isFullScreen={isFullScreen} 
      />

      <ActionButtons 
        handleBack={handleBack} 
        isFullScreen={isFullScreen} 
      />
    </div>
  );
};
