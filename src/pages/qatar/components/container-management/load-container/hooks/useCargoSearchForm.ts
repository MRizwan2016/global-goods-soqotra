
import { useState, useEffect } from "react";
import { ContainerCargo } from "../../../../types/containerTypes";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { PackageOpen } from "lucide-react";

interface UseCargoSearchFormProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
  existingCargo: ContainerCargo[];
}

export const useCargoSearchForm = ({ containerId, onAddCargo, existingCargo }: UseCargoSearchFormProps) => {
  // Form state
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [lineNumber, setLineNumber] = useState<string>("");
  const [packageName, setPackageName] = useState<string>("");
  const [volume, setVolume] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [shipper, setShipper] = useState<string>("");
  const [consignee, setConsignee] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  const [d2d, setD2d] = useState<boolean>(false);
  const [warehouse, setWarehouse] = useState<string>("");
  
  // Suggestions state
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  // Enhanced invoice selection handler
  const handleSelectInvoice = (invoice: any) => {
    console.log("Selected invoice:", invoice);
    
    setInvoiceNumber(invoice.invoiceNumber);
    setShipper(invoice.shipper || invoice.shipper1 || "");
    setConsignee(invoice.consignee || invoice.consignee1 || "");
    setPackageName(invoice.packageName || "Box");
    setVolume(invoice.volume || 0);
    setWeight(invoice.weight || 0);
    setQuantity(invoice.packages || 1);
    setD2d(invoice.d2d || invoice.doorToDoor || false);
    setWarehouse(invoice.warehouse || "");
    
    toast.success(`Invoice ${invoice.invoiceNumber} details loaded`, {
      description: `Shipper: ${invoice.shipper || invoice.shipper1}, Consignee: ${invoice.consignee || invoice.consignee1}`,
    });
  };

  // Enhanced barcode handler
  useEffect(() => {
    const handleBarcodeScan = (e: KeyboardEvent) => {
      if (e.key === "Enter" && barcode) {
        // Search for invoice with matching barcode or package number
        const storedInvoices = localStorage.getItem('invoices');
        const generatedInvoices = localStorage.getItem('generatedInvoices');
        let allInvoices = [];

        try {
          if (storedInvoices) {
            allInvoices = [...JSON.parse(storedInvoices)];
          }
          if (generatedInvoices) {
            allInvoices = [...allInvoices, ...JSON.parse(generatedInvoices)];
          }

          const matchingInvoice = allInvoices.find((inv: any) => 
            inv.invoiceNumber === barcode || 
            inv.packages?.toString() === barcode
          );

          if (matchingInvoice) {
            handleSelectInvoice(matchingInvoice);
            setBarcode("");
          } else {
            toast.warning("No matching invoice found for barcode", {
              description: "Please check the barcode and try again",
            });
          }
        } catch (error) {
          console.error("Error processing barcode:", error);
        }
      }
    };

    window.addEventListener('keydown', handleBarcodeScan);
    return () => window.removeEventListener('keydown', handleBarcodeScan);
  }, [barcode]);

  // Handle form submission to add cargo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invoiceNumber) {
      toast.error("Invoice number is required", {
        icon: <PackageOpen className="h-5 w-5 text-red-500" />
      });
      return;
    }
    
    const newCargo: ContainerCargo = {
      id: uuidv4(),
      containerId,
      invoiceNumber,
      lineNumber,
      packageName: packageName || "Package",
      volume: Number(volume) || 0,
      weight: Number(weight) || 0,
      quantity: Number(quantity) || 1,
      shipper,
      consignee,
      description,
      barcode,
      d2d,
      wh: warehouse
    };
    
    onAddCargo(newCargo);
    
    // Reset form fields after adding
    setLineNumber("");
    setBarcode("");
  };

  return {
    // Form state
    invoiceNumber,
    lineNumber,
    packageName,
    volume,
    weight,
    quantity,
    shipper,
    consignee,
    barcode,
    d2d,
    warehouse,
    showSuggestions,
    
    // Setters
    setInvoiceNumber,
    setLineNumber,
    setPackageName,
    setVolume,
    setWeight,
    setQuantity,
    setShipper,
    setConsignee,
    setBarcode,
    setD2d,
    setWarehouse,
    setShowSuggestions,
    
    // Handlers
    handleSelectInvoice,
    handleSubmit
  };
};

export default useCargoSearchForm;
