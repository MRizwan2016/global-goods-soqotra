
interface InvoiceFooterProps {
  gross: number | string;
  discount: number | string;
  net: number | string;
  paid: boolean;
}

const PrintInvoiceFooter = ({ gross, discount, net, paid }: InvoiceFooterProps) => {
  return (
    <div className="border-t border-black flex">
      <div className="w-2/3 p-2 text-xs border-r border-black">
        <p className="uppercase font-bold">In case of dispute over any charges on this invoice please email:</p>
        <p>accounts@soqotralogistics.com TO US WITHIN SEVEN DAYS FROM THE DATE OF INVOICE.</p>
        <p className="uppercase">Otherwise charges would be deemed as correct and payable to</p>
        <p className="uppercase">without further delay.</p>
        
        <div className="mt-4">
          <p>This invoice must be settled in full within seven days of the above date. Payment method /</p>
          <p>Bank transfer details please contact the office.</p>
          <p>If there is outstanding balance your goods will not be released from the destination port.</p>
          <p>Your goods are not insured through Soqotra, Soqotra accepts no liability whatsoever</p>
          <p>for any damages or loss incurred during shipping. Thank you for your business.</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 pt-4">
          <div className="text-center">
            <p className="border-b border-gray-300 pb-8 mb-1"></p>
            <p className="text-xs">Customer Signature</p>
          </div>
          <div className="text-center">
            <p className="border-b border-gray-300 pb-8 mb-1"></p>
            <p className="text-xs">Authorized Signatory</p>
          </div>
        </div>
      </div>
      
      <div className="w-1/3">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="border-b border-black p-1">Freight</td>
              <td className="border-b border-black p-1 text-right">{parseFloat(String(gross)).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border-b border-black p-1">Discount</td>
              <td className="border-b border-black p-1 text-right">({parseFloat(String(discount)).toFixed(2)})</td>
            </tr>
            <tr>
              <td className="border-b border-black p-1 font-bold">Total</td>
              <td className="border-b border-black p-1 text-right font-bold">{parseFloat(String(net)).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border-b border-black p-1 font-bold">Total Due</td>
              <td className="border-b border-black p-1 text-right font-bold">{parseFloat(String(net)).toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={2} className="h-28 border-b border-black p-1">
                <div className="h-full flex items-center justify-center">
                  <div className="border-2 border-red-600 p-2 w-32 text-center font-bold text-lg text-red-600">
                    {paid ? "PAID" : "UNPAID"}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintInvoiceFooter;
