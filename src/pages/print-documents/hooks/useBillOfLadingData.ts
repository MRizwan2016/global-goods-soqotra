
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data/mockData";
import { mockBLData } from "@/pages/bill-of-lading/components/mockData";

// Define a more comprehensive type for the Bill of Lading data
interface BillOfLadingData {
  id: string;
  blNumber: string;
  date: string;
  shipper: string;
  shipperAddress?: string;
  shipperPhone?: string;
  consignee: string;
  consigneeAddress?: string;
  consigneeIdNumber?: string;
  notifyParty?: string;
  notifyPartyAddress?: string;
  portOfLoading?: string;
  portOfDischarge?: string;
  marks?: string;
  description?: string;
  weight?: string;
  volume?: string;
  packages?: string;
  freightPrepaid?: boolean;
  vessel?: string;
  finalDestination?: string;
  dateOfIssue?: string;
  cargoType?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  chassisNumber?: string;
  specialInstructions?: string;
  voyage?: string;
  [key: string]: any; // Allow any additional fields
}

export const useBillOfLadingData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blType = queryParams.get('type') === 'house' ? 'house' : 'master';
  const isPreview = location.pathname.includes('bl-preview');
  
  const [loading, setLoading] = useState(true);
  const [blData, setBlData] = useState<BillOfLadingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch the BL data from an API
    const fetchBillOfLading = async () => {
      try {
        if (!id) {
          setError("No Bill of Lading ID provided");
          setLoading(false);
          toast.error("No Bill of Lading ID provided");
          return;
        }

        // First, check in the mockBLData (for direct BL records)
        let blRecord = mockBLData.find(bl => bl.id === id);
        if (blRecord) {
          // Extract vehicle details if this is a car shipment
          const vehicleDetails = blRecord.cargoType === "Car" || blRecord.cargoType === "Truck" 
            ? extractVehicleDetails(blRecord.goodsDescription || "") 
            : {};

          setBlData({
            id,
            blNumber: blRecord.blNumber,
            date: blRecord.date,
            shipper: blRecord.shipper,
            shipperAddress: blRecord.shipperAddress || "DOHA, QATAR",
            shipperPhone: "+974 XXXX XXXX",
            consignee: blRecord.consignee,
            consigneeAddress: blRecord.consigneeAddress || "N/A",
            consigneeIdNumber: "N/A",
            notifyParty: blRecord.notifyParty || "SAME AS CONSIGNEE",
            notifyPartyAddress: blRecord.notifyPartyAddress || "",
            portOfLoading: blRecord.loadingPort || "DOHA, QATAR",
            portOfDischarge: blRecord.dischargePort || "COLOMBO, SRI LANKA",
            marks: blRecord.marksAndNumbers || "AS ADDRESSED",
            description: blRecord.goodsDescription || "SAID TO CONTAIN PERSONAL EFFECTS",
            weight: blRecord.grossWeight || "0",
            volume: blRecord.measurement || "0",
            packages: blRecord.packages || "1",
            freightPrepaid: blRecord.freightCharges === "Prepaid",
            vessel: blRecord.vessel || "MV SOQOTRA QUEEN / XXXX",
            finalDestination: blRecord.destination || "COLOMBO, SRI LANKA",
            dateOfIssue: blRecord.dateOfIssue || blRecord.date,
            cargoType: blRecord.cargoType,
            vehicleMake: blRecord.vehicleMake || vehicleDetails.make,
            vehicleModel: blRecord.vehicleModel || vehicleDetails.model,
            vehicleYear: blRecord.vehicleYear || vehicleDetails.year,
            vehicleColor: blRecord.vehicleColor || vehicleDetails.color,
            chassisNumber: blRecord.chassisNumber || vehicleDetails.chassis
          });
          setLoading(false);
          return;
        }
        
        // If not found in mockBLData, check for invoice data
        let invoiceData = null;
        
        // First try to get data from localStorage
        const storedInvoices = localStorage.getItem('invoices');
        if (storedInvoices) {
          const parsedInvoices = JSON.parse(storedInvoices);
          invoiceData = parsedInvoices.find((inv: any) => inv.id === id);
        }
        
        // If not found in localStorage, check mock data
        if (!invoiceData) {
          invoiceData = mockInvoiceData.find(inv => inv.id === id);
        }
        
        if (!invoiceData) {
          setError("Bill of Lading not found");
          toast.error("Bill of Lading not found");
          setLoading(false);
          return;
        }
        
        // Extract vehicle details if this relates to a car
        const packageDetails = getPackageDescription(invoiceData);
        const vehicleDetails = invoiceData.cargoType === "Car" || 
                              (invoiceData.packageDetails && invoiceData.packageDetails.some((p: any) => 
                                p.name && p.name.toLowerCase().includes("car")))
          ? extractVehicleDetails(packageDetails) 
          : {};
        
        // Format data for BL
        const houseBillOfLading: BillOfLadingData = {
          id,
          blNumber: `BL-${invoiceData.invoiceNumber || id}`,
          date: invoiceData.date || new Date().toISOString().split('T')[0],
          shipper: invoiceData.shipper1 || "SOQOTRA SHIPPING & LOGISTICS",
          shipperAddress: invoiceData.shipperAddress || "DOHA, QATAR",
          shipperPhone: invoiceData.shipperPhone || "+974 XXXX XXXX",
          consignee: invoiceData.consignee1 || "N/A",
          consigneeAddress: invoiceData.consigneeAddress || "N/A",
          consigneeIdNumber: invoiceData.consigneeIdNumber || invoiceData.nic || "N/A",
          notifyParty: invoiceData.notifyParty || "SAME AS CONSIGNEE",
          notifyPartyAddress: invoiceData.notifyPartyAddress || "",
          portOfLoading: "DOHA, QATAR",
          portOfDischarge: invoiceData.warehouse || "COLOMBO, SRI LANKA",
          marks: "AS ADDRESSED",
          description: packageDetails,
          weight: invoiceData.weight || "0",
          volume: invoiceData.volume || "0",
          packages: invoiceData.packages || "1",
          freightPrepaid: invoiceData.paid === true,
          vessel: "MV SOQOTRA QUEEN / XXXX",
          finalDestination: invoiceData.finalDestination || invoiceData.warehouse || "COLOMBO, SRI LANKA",
          dateOfIssue: invoiceData.date || new Date().toISOString().split('T')[0],
          cargoType: invoiceData.cargoType || "Personal Effects",
          vehicleMake: vehicleDetails.make,
          vehicleModel: vehicleDetails.model,
          vehicleYear: vehicleDetails.year,
          vehicleColor: vehicleDetails.color,
          chassisNumber: vehicleDetails.chassis
        };

        setBlData(houseBillOfLading);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bill of Lading:", error);
        setError("Failed to load Bill of Lading data");
        toast.error("Failed to load Bill of Lading data");
        setLoading(false);
      }
    };

    fetchBillOfLading();
  }, [id, blType]);

  const extractVehicleDetails = (description: string) => {
    const details: any = {
      make: "",
      model: "",
      year: "",
      color: "",
      chassis: ""
    };
    
    if (!description) return details;
    
    // Try to extract vehicle details from the description
    const makeMatch = description.match(/make:?\s*([^,\n]+)/i);
    if (makeMatch && makeMatch[1]) details.make = makeMatch[1].trim();
    
    const modelMatch = description.match(/model:?\s*([^,\n]+)/i);
    if (modelMatch && modelMatch[1]) details.model = modelMatch[1].trim();
    
    const yearMatch = description.match(/year:?\s*([^,\n]+)/i);
    if (yearMatch && yearMatch[1]) details.year = yearMatch[1].trim();
    
    const colorMatch = description.match(/color:?\s*([^,\n]+)/i);
    if (colorMatch && colorMatch[1]) details.color = colorMatch[1].trim();
    
    const chassisMatch = description.match(/chassis:?\s*([^,\n]+)/i) || 
                          description.match(/vin:?\s*([^,\n]+)/i);
    if (chassisMatch && chassisMatch[1]) details.chassis = chassisMatch[1].trim();
    
    return details;
  };

  const getPackageDescription = (invoice: any) => {
    let description = "SAID TO CONTAIN PERSONAL EFFECTS";
    
    // Get package details if available
    const packageDetails = invoice.packageDetails || invoice.packageItems || [];
    if (packageDetails && packageDetails.length > 0) {
      const packageNames = packageDetails.map((p: any) => p.name || "PACKAGE").join(", ");
      description = `${packageNames}\nSAID TO CONTAIN PERSONAL EFFECTS`;
      
      // If any package is a car, add vehicle details
      const carPackage = packageDetails.find((p: any) => 
        p.name && (p.name.toLowerCase().includes("car") || p.name.toLowerCase().includes("vehicle")));
      
      if (carPackage) {
        description += "\n\nVEHICLE DETAILS:";
        if (carPackage.description) {
          description += `\n${carPackage.description}`;
        }
      }
    }
    
    return description;
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (error) {
      console.error("Error during print:", error);
      toast.error("Print operation failed");
    }
  };

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback navigation to a safe route
      navigate("/data-entry/invoicing");
    }
  };

  return {
    loading,
    blData,
    blType,
    error,
    isPreview,
    handlePrint,
    handleBack
  };
};
