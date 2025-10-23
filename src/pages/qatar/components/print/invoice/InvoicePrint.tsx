import React from "react";
import { QatarJob } from "../../../types/jobTypes";
import InvoiceQRCode from "./InvoiceQRCode";
import { formatCurrency } from "../../../utils/formatters";

interface InvoicePrintProps {
  job: QatarJob;
}

const InvoicePrint: React.FC<InvoicePrintProps> = ({ job }) => {
  const currentDate = new Date().toLocaleDateString();
  
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header with QR Code */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">SOQOTRA LOGISTICS SERVICES</h1>
            <h2 className="text-lg text-gray-600">TRANSPORTATION & TRADING WLL</h2>
            <div className="text-sm text-gray-600 mt-2">
              <p>P.O. OFFICE NO. 3, 1ST FLOOR, BUILDING NO. 53</p>
              <p>ZONE NO. 55, AZIZIA COMMERCIAL STREET</p>
              <p>DOHA - QATAR</p>
              <p>TEL: 4441 9187 | EMAIL: ops@soqotralogistics.com</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">COLLECTION & DELIVERY INVOICE</h3>
          </div>
        </div>
        
        {/* QR Code */}
        <div className="ml-4">
          <InvoiceQRCode 
            jobNumber={job.jobNumber}
            customer={job.customer}
            invoiceNumber={job.invoiceNumber}
          />
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Customer Information</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Customer:</strong> {job.customer}</p>
            <p><strong>Mobile:</strong> {job.mobileNumber}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>City:</strong> {job.city}</p>
            {job.sector && <p><strong>Sector:</strong> {job.sector}</p>}
            {job.branch && <p><strong>Branch:</strong> {job.branch}</p>}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Job Information</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Job Number:</strong> {job.jobNumber}</p>
            <p><strong>Invoice Number:</strong> {job.invoiceNumber || 'N/A'}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Date:</strong> {job.date} {job.time} {job.amPm}</p>
            <p><strong>Vehicle:</strong> {job.vehicle || 'TBD'}</p>
            <p><strong>Status:</strong> {job.status}</p>
          </div>
        </div>
      </div>

      {/* Package Details */}
      {job.packageDetails && (
        <div className="mb-8">
          <h4 className="font-semibold text-gray-800 mb-3">Package Details</h4>
          <div className="bg-gray-50 p-4 rounded border text-sm">
            {job.packageDetails}
          </div>
        </div>
      )}

      {/* Items Table */}
      {job.items && job.items.length > 0 && (
        <div className="mb-8">
          <h4 className="font-semibold text-gray-800 mb-3">Items</h4>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left">Box #</th>
                <th className="border border-gray-300 p-2 text-left">Item Name</th>
                <th className="border border-gray-300 p-2 text-center">Quantity</th>
                <th className="border border-gray-300 p-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {job.items.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="border border-gray-300 p-2">{item.boxNumber || index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.name || item.itemName}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                  <td className="border border-gray-300 p-2 text-right">
                    {formatCurrency(item.sellPrice || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Financial Summary */}
      <div className="mb-8">
        <div className="flex justify-end">
          <div className="w-64">
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span>{formatCurrency(job.advanceAmount || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remarks */}
      {job.remarks && (
        <div className="mb-8">
          <h4 className="font-semibold text-gray-800 mb-3">Remarks</h4>
          <div className="bg-gray-50 p-4 rounded border text-sm">
            {job.remarks}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t pt-4 mt-8 text-sm text-gray-600">
        <div className="flex justify-between">
          <p>Generated on: {currentDate}</p>
          <p>Powered by Soqotra Logistics Management System</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrint;