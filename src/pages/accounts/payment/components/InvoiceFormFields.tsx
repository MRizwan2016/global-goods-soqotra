
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { FormState } from "../types";
import { fadeInVariants } from "../utils/animationVariants";

interface InvoiceFormFieldsProps {
  formState: FormState;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InvoiceFormFields: React.FC<InvoiceFormFieldsProps> = ({
  formState,
  handleInputChange,
}) => {
  const isReadOnly = !handleInputChange;
  
  return (
    <motion.div 
      variants={fadeInVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
    >
      <div>
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Invoice Number:
        </label>
        <Input
          name="invoiceNumber"
          value={formState.invoiceNumber}
          onChange={handleInputChange}
          readOnly={isReadOnly || true} // Always read-only since it's selected from dropdown
          className={isReadOnly ? "bg-gray-50" : ""}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Booking Form:
        </label>
        <Input
          name="bookingForm"
          value={formState.bookingForm || ''}
          onChange={handleInputChange}
          readOnly={isReadOnly || true} // Make read-only to match screenshot
          className={isReadOnly ? "bg-gray-50" : ""}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Shipper:
        </label>
        <Input
          name="shipper"
          value={formState.shipper || ''}
          onChange={handleInputChange}
          readOnly={isReadOnly || true} // Make read-only to match screenshot
          className={isReadOnly ? "bg-gray-50" : ""}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Consignee:
        </label>
        <Input
          name="consignee"
          value={formState.consignee || ''}
          onChange={handleInputChange}
          readOnly={isReadOnly || true} // Make read-only to match screenshot
          className={isReadOnly ? "bg-gray-50" : ""}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Warehouse:
        </label>
        <Input
          name="warehouse"
          value={formState.warehouse || ''}
          onChange={handleInputChange}
          readOnly={isReadOnly || true} // Make read-only to match screenshot
          className={isReadOnly ? "bg-gray-50" : ""}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Shipment Type:
        </label>
        <Input
          name="shipmentType"
          value={formState.shipmentType || ''}
          onChange={handleInputChange}
          readOnly={isReadOnly || true} // Make read-only to match screenshot
          className={isReadOnly ? "bg-gray-50" : ""}
        />
      </div>
    </motion.div>
  );
};

export default InvoiceFormFields;
