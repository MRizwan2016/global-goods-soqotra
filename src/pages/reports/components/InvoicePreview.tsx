
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Box, Ship, Calendar, Truck, Info, Receipt, FileText } from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { toast } from "sonner";
import PrintStyles from "@/pages/invoicing/components/print/PrintStyles";
import PaymentDetailsTable from "@/components/reports/invoice-details/PaymentDetailsTable";

const InvoicePreview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  useEffect(() => {
    const fetchInvoiceData = () => {
      try {
        // First try to get from localStorage for real data
        const storedInvoices = localStorage.getItem('invoices');
        let foundInvoice = null;
        
        if (storedInvoices) {
          const parsedInvoices = JSON.parse(storedInvoices);
          foundInvoice = parsedInvoices.find((inv: any) => inv.id === id);
        }
        
        // If not found in localStorage, check mock data
        if (!foundInvoice) {
          foundInvoice = mockInvoiceData.find(inv => inv.id === id);
        }
        
        if (foundInvoice) {
          setInvoice(foundInvoice);
          
          // Check if there's payment information
          const storedPayments = localStorage.getItem('payments');
          if (storedPayments) {
            const parsedPayments = JSON.parse(storedPayments);
            const invoicePayment = parsedPayments.find((payment: any) => 
              payment.invoiceId === id || payment.invoiceNumber === foundInvoice.invoiceNumber
            );
            
            if (invoicePayment) {
              console.log("Found payment info:", invoicePayment);
              setPaymentInfo(invoicePayment);
            }
          }
        } else {
          toast.error("Invoice not found");
          setTimeout(() => navigate("/reports/cargo"), 2000);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        toast.error("Error loading invoice data");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, [id, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate("/reports/cargo");
  };
  
  const handlePrintInvoice = () => {
    if (id) {
      navigate(`/data-entry/print-documents/invoice-print/${id}`);
    }
  };
  
  const handlePrintHBL = () => {
    if (id) {
      navigate(`/data-entry/print-documents/bl-print/${id}`);
    }
  };
  
  const handlePrintCertificate = () => {
    if (id) {
      navigate(`/data-entry/print-documents/invoice-print/${id}?mode=certificate`);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
          <div className="h-60 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Invoice Not Found</h2>
              <p className="text-gray-600 mb-4">The requested invoice could not be found.</p>
              <Button onClick={handleBack}>Return to Invoice Search</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalPackages = invoice.packageDetails 
    ? invoice.packageDetails.reduce((sum: number, pkg: any) => sum + parseInt(pkg.quantity || 1), 0) 
    : (invoice.packages || 1);
  
  const totalVolume = invoice.volume || 
    (invoice.packageDetails 
      ? invoice.packageDetails.reduce((sum: number, pkg: any) => sum + parseFloat(pkg.volume || 0), 0).toFixed(3)
      : "0.000");
  
  const totalWeight = invoice.weight || "0.00";

  return (
    <div className="p-4">
      <PrintStyles />
      
      {/* Header with actions - hidden when printing */}
      <div className="print:hidden flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reports
        </Button>
        
        <h1 className="text-xl font-bold">Invoice #{invoice.invoiceNumber}</h1>
        
        <div className="flex gap-2">
          <Button 
            onClick={handlePrintInvoice}
            variant="outline"
            className="flex items-center gap-1"
          >
            <Receipt className="h-4 w-4" />
            Print Invoice
          </Button>
          <Button 
            onClick={handlePrintCertificate}
            variant="outline"
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Print Certificate
          </Button>
          <Button 
            onClick={handlePrintHBL}
            variant="outline"
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Print HBL
          </Button>
          <Button 
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
          >
            <Printer className="h-4 w-4" />
            Print Preview
          </Button>
        </div>
      </div>
      
      {/* Invoice Details Cards */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg font-medium text-blue-800 flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-600" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Invoice Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Number:</span>
                    <span className="font-medium">{invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{invoice.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={invoice.paid ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                      {invoice.paid ? "PAID" : "UNPAID"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Shipping Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Container No:</span>
                    <span>{invoice.containerNo || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vessel/Voyage:</span>
                    <span>{invoice.vessel || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mode:</span>
                    <span>{invoice.transportType || invoice.freightBy || "Sea Cargo"}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Delivery Type</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span>{invoice.doorToDoor ? "Door to Door" : "UPB Clearance"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination:</span>
                    <span>{invoice.sector || invoice.country || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Port of Loading:</span>
                    <span>{invoice.portOfLoading || "Doha, Qatar"}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Shipping Dates */}
        <Card>
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg font-medium text-blue-800 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-600" />
              Shipping Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm text-gray-500 mb-1">Loading Date</h4>
                <p className="font-semibold">{invoice.loadDate || invoice.date || "Not specified"}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm text-gray-500 mb-1">Sailing Date</h4>
                <p className="font-semibold">{invoice.sailingDate || "Not specified"}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm text-gray-500 mb-1">Arrival Date</h4>
                <p className="font-semibold">{invoice.arrivalDate || "Not specified"}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm text-gray-500 mb-1">Delivery Date</h4>
                <p className="font-semibold">{invoice.deliveryDate || "Not specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Shipper & Consignee */}
        <Card>
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg font-medium text-blue-800 flex items-center">
              <Truck className="mr-2 h-5 w-5 text-blue-600" />
              Parties Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2 mb-3">Shipper</h3>
                <p className="mb-1 font-medium">{invoice.shipper1 || ""}</p>
                {invoice.shipper2 && <p className="mb-1">{invoice.shipper2}</p>}
                <p className="mb-1">{invoice.shipperCity || "Doha"}, {invoice.shipperCountry || "Qatar"}</p>
                {invoice.shipperMobile && <p className="text-sm mt-2">Mobile: {invoice.shipperMobile}</p>}
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2 mb-3">Consignee</h3>
                <p className="mb-1 font-medium">{invoice.consignee1 || ""}</p>
                {invoice.consignee2 && <p className="mb-1">{invoice.consignee2}</p>}
                <p className="mb-1">{invoice.address || ""}</p>
                <p className="mb-1">{invoice.consigneeCity || ""}, {invoice.country || "Sri Lanka"}</p>
                {invoice.consigneeMobile && <p className="text-sm mt-2">Mobile: {invoice.consigneeMobile}</p>}
                {invoice.consigneeIdNumber && <p className="text-sm">ID/Passport: {invoice.consigneeIdNumber}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Cargo Details */}
        <Card>
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg font-medium text-blue-800 flex items-center">
              <Box className="mr-2 h-5 w-5 text-blue-600" />
              Cargo Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Package Type</th>
                    <th className="border p-2 text-left">Quantity</th>
                    <th className="border p-2 text-left">Dimensions (L×W×H)</th>
                    <th className="border p-2 text-left">Weight (kg)</th>
                    <th className="border p-2 text-left">Volume (m³)</th>
                    <th className="border p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.packageDetails && invoice.packageDetails.length > 0 ? (
                    invoice.packageDetails.map((pkg: any, index: number) => (
                      <tr key={pkg.id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border p-2">{pkg.name || "Carton Box"}</td>
                        <td className="border p-2">{pkg.quantity || 1}</td>
                        <td className="border p-2">{pkg.length || 0}×{pkg.width || 0}×{pkg.height || 0} cm</td>
                        <td className="border p-2">{parseFloat(pkg.weight || 0).toFixed(2)}</td>
                        <td className="border p-2">{parseFloat(pkg.volume || 0).toFixed(3)}</td>
                        <td className="border p-2">{pkg.description || "General Cargo"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border p-2">Carton Box</td>
                      <td className="border p-2">{totalPackages}</td>
                      <td className="border p-2">-</td>
                      <td className="border p-2">{totalWeight}</td>
                      <td className="border p-2">{totalVolume}</td>
                      <td className="border p-2">General Cargo</td>
                    </tr>
                  )}
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan={2} className="border p-2">Total:</td>
                    <td className="border p-2">{totalPackages} package(s)</td>
                    <td className="border p-2">{totalWeight} kg</td>
                    <td className="border p-2">{totalVolume} m³</td>
                    <td className="border p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center">
                <Ship className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <h4 className="text-sm text-gray-500">Transport Method</h4>
                  <p className="font-semibold">{invoice.transportType || invoice.freightBy || "Sea Cargo"}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center">
                <Box className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <h4 className="text-sm text-gray-500">Service Type</h4>
                  <p className="font-semibold">{invoice.doorToDoor ? "Door to Door" : "UPB Clearance"}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <h4 className="text-sm text-gray-500">Additional Notes</h4>
                  <p className="font-semibold">{invoice.remarks || "No special instructions"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Information */}
        <Card>
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg font-medium text-blue-800">
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <h3 className="font-semibold text-gray-700 mb-3">Payment Details</h3>
                <div className="border rounded p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Payment Method:</p>
                      <p className="font-medium">{invoice.paymentMethod || paymentInfo?.paymentMethod || "Cash"}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Payment Status:</p>
                      <p className={invoice.paid ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                        {invoice.paid ? "PAID" : "UNPAID"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Payment Date:</p>
                      <p className="font-medium">{paymentInfo?.paymentDate || invoice.paymentDate || "Not available"}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Receipt Number:</p>
                      <p className="font-medium">{paymentInfo?.receiptNumber || invoice.receiptNumber || "Not available"}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Amount Summary</h3>
                <div className="border rounded">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Gross Amount:</td>
                        <td className="p-2 text-right">{invoice.gross?.toFixed(2) || 0.00} QAR</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Discount:</td>
                        <td className="p-2 text-right">({invoice.discount?.toFixed(2) || 0.00}) QAR</td>
                      </tr>
                      <tr className="border-b bg-gray-50 font-semibold">
                        <td className="p-2">Net Amount:</td>
                        <td className="p-2 text-right">{invoice.net?.toFixed(2) || 0.00} QAR</td>
                      </tr>
                      <tr className="font-bold text-lg">
                        <td className="p-2 pt-3">{invoice.paid ? "Paid Amount:" : "Amount Due:"}</td>
                        <td className="p-2 pt-3 text-right">{invoice.net?.toFixed(2) || 0.00} QAR</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Payment Details Table */}
            {(invoice.paid || paymentInfo) && (
              <PaymentDetailsTable 
                paymentInfo={paymentInfo} 
                invoice={invoice}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoicePreview;
