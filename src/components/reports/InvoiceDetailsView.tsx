
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFullScreen } from './invoice-details/useFullScreen';
import { toast } from 'sonner';
import InvoiceDetailsHeader from './invoice-details/InvoiceDetailsHeader';
import InvoiceFinancialDetails from './invoice-details/InvoiceFinancialDetails';
import ShippingDetails from './invoice-details/ShippingDetails';
import PackageDetailsTable from './invoice-details/PackageDetailsTable';
import PaymentDetailsTable from './invoice-details/PaymentDetailsTable';
import CargoDetailsTable from './invoice-details/CargoDetailsTable';
import ShippingTrackingInfo from './invoice-details/ShippingTrackingInfo';
import ActionButtons from './invoice-details/ActionButtons';
import { mockInvoiceData } from '@/data/mockData';
import { supabase } from '@/integrations/supabase/client';

export const InvoiceDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isFullScreen, toggleFullScreen, exitFullScreen } = useFullScreen();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        // Search across all localStorage invoice keys
        let foundInvoice = null;
        const invoiceKeys = [
          'invoices', 'sriLankaInvoices', 'eritreaInvoices', 'qatarInvoices',
          'sudanInvoices', 'kenyaInvoices', 'algeriaInvoices', 'tunisiaInvoices',
          'generatedInvoices'
        ];
        
        for (const key of invoiceKeys) {
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const parsed = JSON.parse(stored);
              const found = parsed.find((inv: any) => inv.id === id || inv.invoiceNumber === id);
              if (found) {
                foundInvoice = found;
                break;
              }
            }
          } catch (e) {
            console.error(`Error reading ${key}:`, e);
          }
        }
        
        // If not found in localStorage, check mock data
        if (!foundInvoice) {
          foundInvoice = mockInvoiceData.find(inv => inv.id === id);
        }
        
        if (foundInvoice) {
          console.log("Found invoice:", foundInvoice);
          setInvoice(foundInvoice);
          
          // Look for payment information for this invoice
          fetchPaymentInfo(foundInvoice.invoiceNumber);
        } else {
          toast.error("Invoice not found");
          setTimeout(() => navigate("/reports/cargo"), 1000);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        toast.error("Error loading invoice data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInvoiceData();
    }
  }, [id, navigate]);
  
  // Function to fetch payment information
  const fetchPaymentInfo = (invoiceNumber: string) => {
    try {
      const payments = localStorage.getItem('payments');
      if (payments) {
        const parsedPayments = JSON.parse(payments);
        // Find payment for this specific invoice
        const payment = parsedPayments.find((p: any) => p.invoiceNumber === invoiceNumber);
        
        if (payment) {
          console.log("Found payment for invoice:", payment);
          setPaymentInfo(payment);
        }
      }
    } catch (error) {
      console.error("Error fetching payment info:", error);
    }
  };

  const handleBack = () => {
    if (isFullScreen) {
      exitFullScreen();
    }
    navigate("/reports/cargo");
  };

  const containerClasses = isFullScreen 
    ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto animate-fade-in" 
    : "invoice-details-container space-y-6";

  // Show loading state while fetching invoice
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  // Show error state if invoice not found
  if (!invoice) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Invoice Not Found</h2>
        <p className="text-gray-600 mb-4">The requested invoice could not be loaded.</p>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/reports/cargo')}
        >
          Return to Cargo Reports
        </button>
      </div>
    );
  }

  // Safely check if packageDetails exists and has items
  const hasPackageDetails = invoice.packageDetails && Array.isArray(invoice.packageDetails) && invoice.packageDetails.length > 0;
  
  // Check if cargo is loaded by looking for container info in package details
  const isCargoLoaded = hasPackageDetails && 
    invoice.packageDetails.some((pkg: any) => pkg.containerNo && pkg.vesselName);
  
  // Get shipping info from the first loaded package
  const loadedPackage = hasPackageDetails ? 
    invoice.packageDetails.find((pkg: any) => pkg.containerNo && pkg.vesselName) : null;
  
  const containerNo = loadedPackage?.containerNo;
  const vesselName = loadedPackage?.vesselName;
  const voyage = loadedPackage?.voyage;
  const eta = loadedPackage?.eta;

  return (
    <div className={containerClasses}>
      <InvoiceDetailsHeader 
        isFullScreen={isFullScreen} 
        toggleFullScreen={toggleFullScreen} 
      />
      
      <ShippingTrackingInfo 
        containerNo={containerNo}
        vesselName={vesselName}
        voyage={voyage}
        eta={eta}
        isLoaded={isCargoLoaded || false}
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
        paymentInfo={paymentInfo}
        invoice={invoice}
        currency={invoice.currency || "QAR"}
      />

      {/* Only show cargo details tables if no payment info exists */}
      {!paymentInfo && (
        <>
          <CargoDetailsTable 
            type="hold" 
            isFullScreen={isFullScreen} 
            invoice={invoice}
          />

          <CargoDetailsTable 
            type="clear" 
            isFullScreen={isFullScreen} 
          />
        </>
      )}

      <ActionButtons 
        handleBack={handleBack} 
        isFullScreen={isFullScreen}
        invoiceId={id} 
      />
    </div>
  );
};
