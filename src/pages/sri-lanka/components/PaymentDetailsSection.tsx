import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, DollarSign } from 'lucide-react';

interface PaymentDetailsSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const PaymentDetailsSection: React.FC<PaymentDetailsSectionProps> = ({
  formData,
  handleInputChange,
  handleSelectChange
}) => {
  const PAYMENT_METHODS = ['CASH', 'CARD', 'BANK TRANSFER', 'CHEQUE'];
  const PAYMENT_STATUS = ['PAID', 'UNPAID', 'PARTIAL'];

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <DollarSign className="mr-2 h-5 w-5 text-green-600" />
        Payment & Additional Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Status <span className="text-red-500">*</span>
          </label>
          <Select value={formData.paymentStatus || ''} onValueChange={(value) => handleSelectChange('paymentStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_STATUS.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <Select value={formData.paymentMethod || ''} onValueChange={(value) => handleSelectChange('paymentMethod', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map(method => (
                <SelectItem key={method} value={method}>{method}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount (QAR)
          </label>
          <Input
            type="number"
            name="discount"
            value={formData.discount || ''}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        {/* Packing Charges */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Packing Charges (QAR)
          </label>
          <Input
            type="number"
            name="packingCharges"
            value={formData.packingCharges || ''}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        {/* Transportation Fee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transportation Fee (QAR)
          </label>
          <Input
            type="number"
            name="transportationFee"
            value={formData.transportationFee || ''}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        {/* Receipt Number (for paid invoices) */}
        {formData.paymentStatus === 'PAID' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receipt Number
            </label>
            <Input
              type="text"
              name="receiptNumber"
              value={formData.receiptNumber || ''}
              onChange={handleInputChange}
              placeholder="Enter receipt number"
            />
          </div>
        )}

        {/* Payment Date (for paid invoices) */}
        {(formData.paymentStatus === 'PAID' || formData.paymentStatus === 'PARTIAL') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date
            </label>
            <Input
              type="date"
              name="paymentDate"
              value={formData.paymentDate || ''}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>

      {/* Payment Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          Payment Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Freight Charge:</span>
            <div className="font-medium">QAR {(() => {
              const rate = parseFloat(formData.rate || '0');
              const volume = parseFloat(formData.volume || '0');
              return (volume * rate).toFixed(2);
            })()}</div>
            <div className="text-xs text-gray-400">{formData.volume || '0'} CBM × QAR {formData.rate || '0'}</div>
          </div>
          <div>
            <span className="text-gray-600">Documentation:</span>
            <div className="font-medium">QAR {formData.documentsFee || '0'}</div>
          </div>
          <div>
            <span className="text-gray-600">Subtotal:</span>
            <div className="font-medium">QAR {(() => {
              const rate = parseFloat(formData.rate || '0');
              const volume = parseFloat(formData.volume || '0');
              const freightCharge = volume * rate;
              const docFee = parseFloat(formData.documentsFee || '0');
              const discount = parseFloat(formData.discount || '0');
              const packing = parseFloat(formData.packingCharges || '0');
              const transport = parseFloat(formData.transportationFee || '0');
              return (freightCharge + docFee - discount + packing + transport).toFixed(2);
            })()}</div>
          </div>
          <div className="border-l pl-4">
            <span className="text-gray-600">Total Amount:</span>
            <div className="font-bold text-lg text-green-600">QAR {(() => {
              const rate = parseFloat(formData.rate || '0');
              const volume = parseFloat(formData.volume || '0');
              const freightCharge = volume * rate;
              const docFee = parseFloat(formData.documentsFee || '0');
              const discount = parseFloat(formData.discount || '0');
              const packing = parseFloat(formData.packingCharges || '0');
              const transport = parseFloat(formData.transportationFee || '0');
              return (freightCharge + docFee - discount + packing + transport).toFixed(2);
            })()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsSection;