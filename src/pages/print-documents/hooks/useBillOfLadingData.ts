
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data/mockData";

export const useBillOfLadingData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blType = queryParams.get('type') === 'house' ? 'house' : 'master';
  
  const [loading, setLoading] = useState(true);
  const [blData, setBlData] = useState<any>(null);

  useEffect(() => {
    // In a real app, fetch the BL data from an API
    const fetchBillOfLading = async () => {
      try {
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
          toast.error("Invoice not found");
          setLoading(false);
          return;
        }
        
        // Format data for BL
        const houseBillOfLading = {
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
          description: getPackageDescription(invoiceData),
          weight: invoiceData.weight || "0",
          volume: invoiceData.volume || "0",
          packages: invoiceData.packages || "1",
          freightPrepaid: invoiceData.paid === true,
          vessel: "MV SOQOTRA QUEEN / XXXX",
          finalDestination: invoiceData.finalDestination || invoiceData.warehouse || "COLOMBO, SRI LANKA",
          dateOfIssue: invoiceData.date || new Date().toISOString().split('T')[0]
        };

        setBlData(houseBillOfLading);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bill of Lading:", error);
        toast.error("Failed to load Bill of Lading data");
        setLoading(false);
      }
    };

    fetchBillOfLading();
  }, [id, blType]);

  const getPackageDescription = (invoice: any) => {
    let description = "SAID TO CONTAIN PERSONAL EFFECTS";
    
    // Get package details if available
    const packageDetails = invoice.packageDetails || invoice.packageItems || [];
    if (packageDetails && packageDetails.length > 0) {
      const packageNames = packageDetails.map((p: any) => p.name || "PACKAGE").join(", ");
      description = `${packageNames}\nSAID TO CONTAIN PERSONAL EFFECTS`;
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
    handlePrint,
    handleBack
  };
};
