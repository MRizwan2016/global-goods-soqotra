
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { mockInvoiceData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Printer, FileText, ArrowLeft, Eye } from "lucide-react";
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
  const [mode, setMode] = useState<"invoice" | "bl" | "certificate">("invoice");
  
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
  }, [isAuthenticated, navigate]);
  
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
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleBack = () => {
    if (id) {
      navigate(`/data-entry/invoicing/edit/${id}`);
    } else {
      navigate("/data-entry/invoicing");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Toolbar - hidden when printing */}
      <div className="bg-white shadow-md p-3 sticky top-0 z-10 print:hidden flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBack} 
            className="flex items-center gap-1 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-gray-700">Invoice #{invoice.invoiceNumber}</h1>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMode("invoice")}
            className={`flex items-center gap-1 ${mode === "invoice" ? "bg-blue-50 border-blue-300" : ""}`}
          >
            <Eye className="h-4 w-4" />
            Invoice Preview
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMode("bl")}
            className={`flex items-center gap-1 ${mode === "bl" ? "bg-blue-50 border-blue-300" : ""}`}
          >
            <FileText className="h-4 w-4" />
            House BL
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMode("certificate")}
            className={`flex items-center gap-1 ${mode === "certificate" ? "bg-blue-50 border-blue-300" : ""}`}
          >
            <FileText className="h-4 w-4" />
            Certificate
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handlePrint}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
          >
            <Printer className="h-4 w-4" />
            Print {mode === "invoice" ? "Invoice" : mode === "bl" ? "House BL" : "Certificate"}
          </Button>
        </div>
      </div>
      
      {/* Invoice Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center">
        <div 
          ref={printRef} 
          className="w-full max-w-[210mm] mx-auto bg-white text-black text-sm shadow-lg print:shadow-none"
          style={{ minHeight: '297mm' }}
        >
          {mode === "invoice" && (
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
          )}
          
          {mode === "bl" && (
            <div className="border border-black p-6">
              <h2 className="text-center text-2xl font-bold mb-4">HOUSE BILL OF LADING</h2>
              <div className="text-right mb-6">
                <p className="font-bold">BL Number: {invoice.invoiceNumber}-BL</p>
                <p>Date: {invoice.date}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border p-3">
                  <h3 className="font-bold mb-2">SHIPPER</h3>
                  <p>{invoice.shipper1}</p>
                  <p>{invoice.shipper2 || ""}</p>
                  <p>THUMAMA, DOHA</p>
                </div>
                <div className="border p-3">
                  <h3 className="font-bold mb-2">CONSIGNEE</h3>
                  <p>{invoice.consignee1}</p>
                  <p>PASSPORT NO: {invoice.consigneeIdNumber || "N/A"}</p>
                </div>
              </div>
              
              <div className="border p-3 mb-6">
                <h3 className="font-bold mb-2">NOTIFY PARTY</h3>
                <p>Same as Consignee</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border p-3">
                  <h3 className="font-bold mb-2">PORT OF LOADING</h3>
                  <p>DOHA, QATAR</p>
                </div>
                <div className="border p-3">
                  <h3 className="font-bold mb-2">PORT OF DISCHARGE</h3>
                  <p>{invoice.warehouse || "COLOMBO"}, SRI LANKA</p>
                </div>
              </div>
              
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr>
                    <th className="border p-2">MARKS & NUMBERS</th>
                    <th className="border p-2">DESCRIPTION OF GOODS</th>
                    <th className="border p-2">WEIGHT (KG)</th>
                    <th className="border p-2">VOLUME (CBM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">AS ADDRESSED</td>
                    <td className="border p-2">
                      {packageDetails.map((pkg: any, index: number) => (
                        <div key={index}>
                          {pkg.name} {index < packageDetails.length - 1 ? ", " : ""}
                        </div>
                      ))}
                      SAID TO CONTAIN USED PERSONAL EFFECTS
                    </td>
                    <td className="border p-2 text-center">{totalWeight}</td>
                    <td className="border p-2 text-center">{totalVolume}</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border p-3">
                  <h3 className="font-bold mb-2">FREIGHT DETAILS</h3>
                  <p>FREIGHT {invoice.paid ? "PREPAID" : "COLLECT"}</p>
                </div>
                <div className="border p-3">
                  <h3 className="font-bold mb-2">DECLARATION</h3>
                  <p>SHIPPER'S LOAD, COUNT & SEAL</p>
                </div>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">FOR THE CARRIER</p>
                  <div className="h-16"></div>
                  <p>AUTHORIZED SIGNATURE</p>
                </div>
                <div>
                  <p className="font-bold">DATE OF ISSUE</p>
                  <p>{invoice.date}</p>
                </div>
              </div>
            </div>
          )}
          
          {mode === "certificate" && (
            <div className="border border-black p-6">
              <h2 className="text-center text-2xl font-bold mb-6">CERTIFICATE OF SHIPMENT</h2>
              
              <div className="mb-6">
                <p className="mb-2">This is to certify that the following consignment has been shipped:</p>
                <p className="mb-2">
                  <span className="font-bold">Invoice Number:</span> {invoice.invoiceNumber}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Date:</span> {invoice.date}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border p-3">
                  <h3 className="font-bold mb-2">SHIPPER</h3>
                  <p>{invoice.shipper1}</p>
                  <p>{invoice.shipper2 || ""}</p>
                  <p>DOHA, QATAR</p>
                </div>
                <div className="border p-3">
                  <h3 className="font-bold mb-2">CONSIGNEE</h3>
                  <p>{invoice.consignee1}</p>
                  <p>ID: {invoice.consigneeIdNumber || "N/A"}</p>
                  <p>{invoice.warehouse || "COLOMBO"}, SRI LANKA</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">DESCRIPTION OF GOODS</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left">Description</th>
                      <th className="border p-2 text-center">Quantity</th>
                      <th className="border p-2 text-center">Weight (KG)</th>
                      <th className="border p-2 text-center">Volume (CBM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageDetails.map((pkg: any, index: number) => (
                      <tr key={index}>
                        <td className="border p-2">{pkg.name}</td>
                        <td className="border p-2 text-center">1</td>
                        <td className="border p-2 text-center">{pkg.weight || "22.5"}</td>
                        <td className="border p-2 text-center">{pkg.volume}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="border p-2 font-bold">TOTAL</td>
                      <td className="border p-2 text-center font-bold">{packageDetails.length}</td>
                      <td className="border p-2 text-center font-bold">{totalWeight}</td>
                      <td className="border p-2 text-center font-bold">{totalVolume}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mb-6">
                <p className="mb-2">
                  <span className="font-bold">Vessel/Shipment:</span> ALMARAAM LOGISTICS SERVICE
                </p>
                <p className="mb-2">
                  <span className="font-bold">Port of Loading:</span> DOHA, QATAR
                </p>
                <p className="mb-2">
                  <span className="font-bold">Port of Discharge:</span> {invoice.warehouse || "COLOMBO"}, SRI LANKA
                </p>
              </div>
              
              <div className="mt-12">
                <p className="mb-2 font-bold">ALMARAAM LOGISTICS SERVICES & TRADING W.L.L</p>
                <div className="h-16"></div>
                <p>Authorized Signature & Stamp</p>
              </div>
            </div>
          )}
        </div>
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
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default InvoicePrint;
