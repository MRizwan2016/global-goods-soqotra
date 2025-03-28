
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { containerVariants, itemVariants } from "../utils/animationVariants";

interface InvoiceFormFieldsProps {
  formState: {
    invoiceNumber: string;
    bookingForm: string;
    shipper: string;
    consignee: string;
    warehouse: string;
    shipmentType: string;
    remarks: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InvoiceFormFields: React.FC<InvoiceFormFieldsProps> = ({
  formState,
  handleInputChange,
}) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">INVOICE NUMBER:</label>
          <Input
            name="invoiceNumber"
            value={formState.invoiceNumber}
            onChange={handleInputChange}
            readOnly
            className="bg-gray-50 border-gray-200 font-medium"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">BOOKING FORM:</label>
          <Input
            name="bookingForm"
            value={formState.bookingForm}
            onChange={handleInputChange}
            readOnly
            className="bg-gray-50 border-gray-200"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">SHIPPER:</label>
          <Input
            name="shipper"
            value={formState.shipper}
            onChange={handleInputChange}
            readOnly
            className="bg-gray-50 border-gray-200"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">CONSIGNEE:</label>
          <Input
            name="consignee"
            value={formState.consignee}
            onChange={handleInputChange}
            readOnly
            className="bg-gray-50 border-gray-200"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">WAREHOUSE:</label>
          <Input
            name="warehouse"
            value={formState.warehouse}
            onChange={handleInputChange}
            readOnly
            className="bg-gray-50 border-gray-200"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">SHIPMENT TYPE:</label>
          <Input
            name="shipmentType"
            value={formState.shipmentType}
            onChange={handleInputChange}
            readOnly
            className="bg-gray-50 border-gray-200"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1 text-gray-700">REMARKS:</label>
          <Textarea
            name="remarks"
            value={formState.remarks}
            onChange={handleInputChange}
            className="min-h-[80px] border-gray-200 focus-visible:ring-indigo-400"
            placeholder="Add any payment remarks here..."
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InvoiceFormFields;
