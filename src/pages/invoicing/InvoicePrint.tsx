
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { mockInvoiceData } from "@/data/mockData";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const InvoicePrint = () => {
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);
  
  const invoice = mockInvoiceData.find(inv => inv.id === id);
  
  useEffect(() => {
    if (invoice) {
      // Trigger print dialog on component mount
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [invoice]);
  
  if (!invoice) {
    return <div className="p-8 text-center">Invoice not found</div>;
  }
  
  return (
    <div 
      ref={printRef} 
      className="p-6 max-w-[210mm] mx-auto bg-white"
      style={{ minHeight: '297mm' }}
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-8 border-b pb-4">
        <h1 className="text-xl font-bold">SOQOTRA LOGISTICS</h1>
        <p className="text-gray-600">P.O. Box 31628, Doha, Qatar</p>
        <p className="text-gray-600">Tel: +974 4416 7891 | Email: info@soqotralogistics.com</p>
        <h2 className="text-lg font-semibold mt-4">INVOICE</h2>
      </div>
      
      {/* Invoice Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p><span className="font-semibold">Invoice No:</span> {invoice.invoiceNumber}</p>
          <p><span className="font-semibold">Date:</span> {invoice.date}</p>
          <p><span className="font-semibold">Branch:</span> {invoice.branch}</p>
          <p><span className="font-semibold">Sector:</span> {invoice.sector}</p>
          <p><span className="font-semibold">Warehouse:</span> {invoice.warehouse}</p>
        </div>
        <div>
          <p><span className="font-semibold">Transport:</span> {invoice.freightBy}</p>
          <p><span className="font-semibold">Door to Door:</span> {invoice.doorToDoor ? "Yes" : "No"}</p>
          <p><span className="font-semibold">Sales Agent:</span> {invoice.salesAgent}</p>
          <p><span className="font-semibold">Driver:</span> {invoice.driver}</p>
        </div>
      </div>
      
      {/* Shipper & Consignee Information */}
      <div className="grid grid-cols-2 gap-4 mb-6 border p-3 rounded">
        <div>
          <h3 className="font-semibold text-sm mb-2 bg-gray-100 p-1">SHIPPER:</h3>
          <p>{invoice.shipper1}</p>
          {invoice.shipper2 && <p>{invoice.shipper2}</p>}
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-2 bg-gray-100 p-1">CONSIGNEE:</h3>
          <p>{invoice.consignee1}</p>
          {invoice.consignee2 && <p>{invoice.consignee2}</p>}
          <p className="mt-2">{invoice.address}</p>
        </div>
      </div>
      
      {/* Package Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-2 bg-gray-100 p-1">PACKAGE DETAILS:</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-xs text-center">Item</TableHead>
                <TableHead className="text-xs text-center">Description</TableHead>
                <TableHead className="text-xs text-center">Dimensions (cm)</TableHead>
                <TableHead className="text-xs text-center">Volume (m³)</TableHead>
                <TableHead className="text-xs text-center">Weight (kg)</TableHead>
                <TableHead className="text-xs text-center">Box No</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.packageDetails.map((pkg, index) => (
                <TableRow key={pkg.id}>
                  <TableCell className="text-xs text-center">{index + 1}</TableCell>
                  <TableCell className="text-xs">{pkg.name}</TableCell>
                  <TableCell className="text-xs text-center">{pkg.length} x {pkg.width} x {pkg.height}</TableCell>
                  <TableCell className="text-xs text-center">{pkg.volume}</TableCell>
                  <TableCell className="text-xs text-center">{pkg.weight}</TableCell>
                  <TableCell className="text-xs text-center">{pkg.boxNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Payment Details */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-sm mb-2 bg-gray-100 p-1">SHIPMENT SUMMARY:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="font-medium">Total Volume:</p>
            <p>{invoice.volume} m³</p>
            <p className="font-medium">Total Weight:</p>
            <p>{invoice.weight} kg</p>
            <p className="font-medium">Total Packages:</p>
            <p>{invoice.packages}</p>
          </div>
          
          {invoice.remarks && (
            <div className="mt-4">
              <p className="font-medium text-sm">Remarks:</p>
              <p className="text-sm">{invoice.remarks}</p>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-semibold text-sm mb-2 bg-gray-100 p-1">PAYMENT DETAILS:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="font-medium">Gross Amount:</p>
            <p className="text-right">{invoice.gross}</p>
            <p className="font-medium">Discount:</p>
            <p className="text-right">{invoice.discount}</p>
            <div className="col-span-2 border-t my-1"></div>
            <p className="font-medium">Net Amount:</p>
            <p className="text-right font-bold">{invoice.net}</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-4 border-t">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-semibold mb-10">Customer Signature:</p>
            <div className="border-t border-black w-40"></div>
          </div>
          <div>
            <p className="font-semibold mb-10">For Soqotra Logistics:</p>
            <div className="border-t border-black w-40"></div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>Thank you for your business!</p>
          <p>This invoice was generated electronically and is valid without a signature.</p>
        </div>
      </div>
      
      {/* Print Styles - will only apply when printing */}
      <style type="text/css" media="print">
        {`
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        `}
      </style>
    </div>
  );
};

export default InvoicePrint;
