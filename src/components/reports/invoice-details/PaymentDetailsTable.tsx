
import React from 'react';

interface PaymentDetailsTableProps {
  isFullScreen?: boolean;
  paymentInfo?: any;
  invoice?: any;
  currency?: string;
}

const PaymentDetailsTable: React.FC<PaymentDetailsTableProps> = ({ 
  isFullScreen = false,
  paymentInfo,
  invoice,
  currency = "QAR"
}) => {
  // Enhanced payment data gathering to match ADD PAYMENT section exactly
  const invoiceNumber = paymentInfo?.invoiceNumber || invoice?.invoiceNumber || "";
  const customerName = paymentInfo?.customerName || invoice?.consignee1 || invoice?.consignee || "";
  const bookingForm = paymentInfo?.bookingForm || invoice?.bookingForm || invoice?.bookNumber || invoice?.awbNumber || "";
  const shipper = paymentInfo?.shipper || invoice?.shipper1 || invoice?.shipper || "";
  const consignee = paymentInfo?.consignee || invoice?.consignee1 || invoice?.consignee || "";
  const warehouse = paymentInfo?.warehouse || invoice?.warehouse || invoice?.destination || "";
  const shipmentType = paymentInfo?.shipmentType || invoice?.freightType || invoice?.shipmentType || invoice?.serviceType || "";
  const remarks = paymentInfo?.remarks || "";
  
  // Financial details matching ADD PAYMENT calculations
  const grossAmount = paymentInfo?.grossAmount || invoice?.gross || invoice?.grossAmount || invoice?.amount || 0;
  const discount = paymentInfo?.discount || invoice?.discount || 0;
  const netAmount = paymentInfo?.netAmount || invoice?.net || invoice?.netAmount || (grossAmount - discount) || 0;
  const totalPaid = paymentInfo?.totalPaid || invoice?.totalPaid || 0;
  const balanceToPay = netAmount - totalPaid;
  const amountPaid = paymentInfo?.amountPaid || (balanceToPay > 0 ? balanceToPay : netAmount) || 0;
  
  // Payment details
  const paymentDate = paymentInfo?.paymentCollectDate || paymentInfo?.paymentDate || invoice?.paymentDate || "";
  const receivableAccount = paymentInfo?.receivableAccount || "CASH PAYMENT";
  const country = paymentInfo?.country || invoice?.country || "Qatar";
  const paymentCurrency = paymentInfo?.currency || invoice?.currency || currency;
  
  // Receipt and reconciliation
  const receiptNumber = paymentInfo?.receiptNumber || invoice?.receiptNumber || "";
  const reconDate = paymentInfo?.reconciliationDate || "";
  const reconNumber = paymentInfo?.reconciliationNumber || "";

  // Determine if invoice has been paid
  const isPaid = Boolean(paymentDate && amountPaid > 0);

  // Fallback for UI: show "-" if blank or null
  const showOrDash = (val: any) => (val && val !== "Not available" && val !== "" ? val : "-");

  return (
    <div className={`mt-6 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      {/* UPB Payment Receivable Section - Matches ADD PAYMENT exactly */}
      <div className="bg-green-600 text-white p-2 font-semibold text-center">
        UPB: PAYMENT RECEIVABLE
      </div>
      
      {/* Invoice Details Section */}
      <div className="bg-gray-50 p-4 border-l border-r border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div><strong>Invoice Number:</strong> {showOrDash(invoiceNumber)}</div>
          <div><strong>Customer Name:</strong> {showOrDash(customerName)}</div>
          <div><strong>Booking Form:</strong> {showOrDash(bookingForm)}</div>
          <div><strong>Shipper:</strong> {showOrDash(shipper)}</div>
          <div><strong>Consignee:</strong> {showOrDash(consignee)}</div>
          <div><strong>Warehouse:</strong> {showOrDash(warehouse)}</div>
          <div><strong>Shipment Type:</strong> {showOrDash(shipmentType)}</div>
          <div><strong>Country:</strong> {showOrDash(country)}</div>
          {remarks && <div className="md:col-span-2"><strong>Remarks:</strong> {remarks}</div>}
        </div>
      </div>

      {/* Financial Details Section */}
      <div className="bg-blue-50 p-4 border-l border-r border-gray-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><strong>Gross Amount:</strong> {grossAmount.toFixed(2)} {paymentCurrency}</div>
          <div><strong>Discount:</strong> {discount.toFixed(2)} {paymentCurrency}</div>
          <div><strong>Net Amount:</strong> {netAmount.toFixed(2)} {paymentCurrency}</div>
          <div><strong>Total Paid:</strong> {totalPaid.toFixed(2)} {paymentCurrency}</div>
          <div><strong>Balance to Pay:</strong> {balanceToPay.toFixed(2)} {paymentCurrency}</div>
          <div><strong>Amount Paid:</strong> {amountPaid.toFixed(2)} {paymentCurrency}</div>
          <div><strong>Payment Date:</strong> {showOrDash(paymentDate)}</div>
          <div><strong>Receivable Account:</strong> {showOrDash(receivableAccount)}</div>
        </div>
      </div>

      {/* Payment Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2 text-center">NUM</th>
              <th className="border border-gray-300 p-2 text-center">PAID NUM</th>
              <th className="border border-gray-300 p-2 text-center">PAID DATE</th>
              <th className="border border-gray-300 p-2 text-center">PAID AMOUNT</th>
              <th className="border border-gray-300 p-2 text-center">RECON. DATE</th>
              <th className="border border-gray-300 p-2 text-center">RECON. NUM</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">1</td>
              <td className="border border-gray-300 p-2 text-center">{showOrDash(receiptNumber)}</td>
              <td className="border border-gray-300 p-2 text-center">{showOrDash(paymentDate)}</td>
              <td className="border border-gray-300 p-2 text-center">
                {isPaid 
                  ? `${amountPaid.toFixed(2)} ${paymentCurrency}`
                  : `0.00 ${paymentCurrency}`
                }
              </td>
              <td className="border border-gray-300 p-2 text-center">{showOrDash(reconDate)}</td>
              <td className="border border-gray-300 p-2 text-center">{showOrDash(reconNumber)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Cargo Hold Details - shown when no payment made */}
      {!isPaid && grossAmount > 0 && (
        <div className="mt-4">
          <div className="bg-green-600 text-white p-2 font-semibold text-center">
            CARGO HOLD DETAILS
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 p-2 text-center">NUM</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD NO</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD DATE</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD AMOUNT</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT DATE</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT AMOUNT</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT BY</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT RATE</th>
                  <th className="border border-gray-300 p-2 text-center">SELLING RATE</th>
                  <th className="border border-gray-300 p-2 text-center">VESSEL RNO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center">1</td>
                  <td className="border border-gray-300 p-2 text-center">{showOrDash(bookingForm)}</td>
                  <td className="border border-gray-300 p-2 text-center">{showOrDash(invoice?.date)}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {grossAmount > 0 ? `${grossAmount.toFixed(2)} ${paymentCurrency}` : `0.00 ${paymentCurrency}`}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">{showOrDash(invoice?.vesselRno)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsTable;
