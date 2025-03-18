
import { toast } from "sonner";
import { FormState, PackageItem } from "../types/invoiceForm";

export const useInvoiceSubmit = () => {
  const handleSave = (formState: FormState, packageItems: PackageItem[]) => {
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      return;
    }
    
    console.log("Saving invoice:", { ...formState, packageItems });
    toast.success("Invoice saved successfully");
    
    window.location.href = "/data-entry/invoicing";
  };

  return { handleSave };
};
