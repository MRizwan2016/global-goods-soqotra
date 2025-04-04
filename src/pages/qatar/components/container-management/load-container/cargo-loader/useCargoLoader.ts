
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { ContainerCargo } from "../../../../types/containerTypes";
import useBarcodeScanner from "../../../../hooks/useBarcodeScanner";

interface UseCargoLoaderProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
}

export const useCargoLoader = ({ containerId, onAddCargo }: UseCargoLoaderProps) => {
  const [cargoForm, setCargoForm] = useState({
    invoiceNumber: "",
    lineNumber: "",
    barcode: "",
    packageName: "",
    volume: "",
    weight: "",
    shipper: "",
    consignee: "",
    wh: "WH001",
    d2d: false,
    quantity: "1"
  });

  const [invoiceList, setInvoiceList] = useState<any[]>([]);
  
  useEffect(() => {
    try {
      const savedInvoices = localStorage.getItem('invoices');
      const generatedInvoices = localStorage.getItem('generatedInvoices');
      
      let allInvoices = [];
      
      if (savedInvoices) {
        const parsedInvoices = JSON.parse(savedInvoices);
        allInvoices = [...parsedInvoices];
      }
      
      if (generatedInvoices) {
        const parsedGeneratedInvoices = JSON.parse(generatedInvoices);
        allInvoices = [...allInvoices, ...parsedGeneratedInvoices];
      }
      
      setInvoiceList(allInvoices);
      console.log(`Loaded ${allInvoices.length} invoices for barcode lookup`);
    } catch (error) {
      console.error("Error loading invoices for barcode lookup:", error);
    }
  }, []);

  const handleInvoiceBarcodeDetected = (invoiceNumber: string) => {
    const invoice = invoiceList.find(inv => 
      inv.invoiceNumber === invoiceNumber || 
      inv.invoiceNumber === `GY${invoiceNumber}` ||
      inv.invoiceNumber === `${invoiceNumber}`
    );
    
    if (invoice) {
      setCargoForm(prev => ({
        ...prev,
        invoiceNumber: invoice.invoiceNumber,
        shipper: invoice.shipper || invoice.shipper1 || "",
        consignee: invoice.consignee || invoice.consignee1 || "",
        packageName: invoice.packageName || "Box",
        volume: invoice.volume?.toString() || "0",
        weight: invoice.weight?.toString() || "0",
        d2d: invoice.d2d || invoice.doorToDoor || false,
        wh: invoice.warehouse || prev.wh
      }));
      
      toast.success(`Invoice ${invoice.invoiceNumber} loaded`, {
        description: `${invoice.shipper || invoice.shipper1} → ${invoice.consignee || invoice.consignee1}`
      });
    } else {
      setCargoForm(prev => ({
        ...prev,
        invoiceNumber
      }));
      
      toast.warning(`Invoice ${invoiceNumber} not found in system`, {
        description: "Only invoice number has been set"
      });
    }
  };
  
  const handlePackageBarcodeDetected = (barcode: string) => {
    setCargoForm(prev => ({
      ...prev,
      barcode
    }));
    
    toast.info(`Package barcode scanned: ${barcode}`);
  };

  const { scanning, toggleScanning } = useBarcodeScanner({
    onBarcodeDetected: handlePackageBarcodeDetected,
    onInvoiceBarcodeDetected: handleInvoiceBarcodeDetected,
    enabled: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCargoForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAddCargo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cargoForm.invoiceNumber || !cargoForm.packageName || !cargoForm.volume || !cargoForm.weight) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newCargo: ContainerCargo = {
      id: uuidv4(),
      containerId: containerId,
      invoiceNumber: cargoForm.invoiceNumber,
      lineNumber: cargoForm.lineNumber || `LN${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: cargoForm.barcode || `BC${Math.floor(100000000 + Math.random() * 900000000)}`,
      packageName: cargoForm.packageName,
      volume: parseFloat(cargoForm.volume) || 0,
      weight: parseFloat(cargoForm.weight) || 0,
      shipper: cargoForm.shipper,
      consignee: cargoForm.consignee,
      wh: cargoForm.wh,
      d2d: cargoForm.d2d,
      quantity: parseInt(cargoForm.quantity) || 1
    };
    
    onAddCargo(newCargo);
    
    setCargoForm(prev => ({
      ...prev,
      barcode: "",
      lineNumber: ""
    }));
    
    toast.success("Cargo added successfully");
  };

  const findInvoiceByNumber = () => {
    if (!cargoForm.invoiceNumber) {
      toast.warning("Enter an invoice number to search");
      return;
    }

    const invoice = invoiceList.find(inv => 
      inv.invoiceNumber === cargoForm.invoiceNumber || 
      inv.invoiceNumber === `GY${cargoForm.invoiceNumber}` ||
      inv.invoiceNumber === `${cargoForm.invoiceNumber}`
    );
    
    if (invoice) {
      setCargoForm(prev => ({
        ...prev,
        shipper: invoice.shipper || invoice.shipper1 || "",
        consignee: invoice.consignee || invoice.consignee1 || "",
        packageName: invoice.packageName || "Box",
        volume: invoice.volume?.toString() || "0",
        weight: invoice.weight?.toString() || "0",
        d2d: invoice.d2d || invoice.doorToDoor || false,
        wh: invoice.warehouse || prev.wh
      }));
      
      toast.success(`Invoice ${invoice.invoiceNumber} found`);
    } else {
      toast.error("Invoice not found in system");
    }
  };

  return {
    cargoForm,
    handleChange,
    handleAddCargo,
    findInvoiceByNumber,
    handleInvoiceBarcodeDetected,
    handlePackageBarcodeDetected,
    scanning,
    toggleScanning,
    invoiceList
  };
};
