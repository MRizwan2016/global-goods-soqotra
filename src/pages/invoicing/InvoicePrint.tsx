
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { mockInvoiceData } from "@/data/mockData";
import PrintInvoiceHeader from "./components/PrintInvoiceHeader";
import PrintShipperConsignee from "./components/PrintShipperConsignee";
import PrintDestinationInfo from "./components/PrintDestinationInfo";
import PrintCargoTable from "./components/PrintCargoTable";
import PrintInvoiceFooter from "./components/PrintInvoiceFooter";

const InvoicePrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  
  // First try to get from localStorage for real data
  const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  const storedInvoice = storedInvoices.find((inv: any) => inv.id === id);
  
  // Fall back to mock data if not found in localStorage
  const mockInvoice = mockInvoiceData.find(inv => inv.id === id);
  
  // Use stored invoice if available, otherwise use mock
  const invoice = storedInvoice || mockInvoice;
  
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate("/admin/login", { replace: true });
      return;
    }
    
    if (invoice) {
      // Trigger print dialog on component mount
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [invoice, isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  if (!invoice) {
    return <div className="p-8 text-center">Invoice not found</div>;
  }

  // Calculate totals from package details
  const packageDetails = invoice.packageDetails || invoice.packageItems || [];
  const totalVolume = packageDetails.reduce((sum: number, pkg: any) => {
    return sum + parseFloat(pkg.volume || '0');
  }, 0).toFixed(3);
  
  const totalWeight = (parseFloat(invoice.weight) || 397.8).toFixed(2);
  
  return (
    <div 
      ref={printRef} 
      className="p-4 max-w-[210mm] mx-auto bg-white text-black text-sm"
      style={{ minHeight: '297mm' }}
    >
      {/* Main Invoice Container */}
      <div className="border border-black">
        {/* Header Section */}
        <PrintInvoiceHeader 
          invoiceNumber={invoice.invoiceNumber}
          date={invoice.date}
          net={invoice.net}
        />
        
        {/* Shipper/Consignee Section */}
        <PrintShipperConsignee 
          shipper1={invoice.shipper1 || ""}
          shipper2={invoice.shipper2 || ""}
          consignee1={invoice.consignee1 || ""}
          consigneeIdNumber={invoice.consigneeIdNumber || ""}
        />
        
        {/* Destination Info Section */}
        <PrintDestinationInfo 
          warehouse={invoice.warehouse || ""}
        />
        
        {/* Cargo Table Section */}
        <PrintCargoTable 
          packages={packageDetails}
          totalWeight={totalWeight}
          totalVolume={totalVolume}
        />
        
        {/* Footer Section */}
        <PrintInvoiceFooter 
          gross={invoice.gross}
          discount={invoice.discount}
          net={invoice.net}
          paid={invoice.paid}
        />
      </div>
      
      {/* Print Styles - will only apply when printing */}
      <style type="text/css" media="print">
        {`
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default InvoicePrint;
