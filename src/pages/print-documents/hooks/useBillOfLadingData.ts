
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data/mockData";
import { transformBLRecord, transformInvoiceToHBL } from "../utils/blDataTransformers";
import { BillOfLadingData } from "../types/billOfLadingTypes";
import { getBillOfLadingById, saveBillOfLading } from "@/pages/bill-of-lading/services/BillOfLadingService";

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
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const fetchBillOfLading = async () => {
      try {
        if (!id) {
          setError("No Bill of Lading ID provided");
          setLoading(false);
          toast.error("No Bill of Lading ID provided");
          return;
        }

        // First try to find a BL record using our updated service
        let blRecord = getBillOfLadingById(id);
        if (blRecord) {
          setBlData(transformBLRecord(blRecord));
          setLoading(false);
          return;
        }
        
        // If no BL record found, try to find an invoice
        let invoiceData = null;
        
        // Check localStorage first
        const storedInvoices = localStorage.getItem('invoices');
        if (storedInvoices) {
          const parsedInvoices = JSON.parse(storedInvoices);
          invoiceData = parsedInvoices.find((inv: any) => inv.id === id);
        }
        
        // If not in localStorage, check mock data
        if (!invoiceData) {
          invoiceData = mockInvoiceData.find(inv => inv.id === id);
        }
        
        // If still no data found, show error
        if (!invoiceData) {
          setError("Bill of Lading not found");
          toast.error("Bill of Lading not found");
          setLoading(false);
          return;
        }
        
        // Transform invoice data to house bill of lading format
        setBlData(transformInvoiceToHBL(invoiceData, id));
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

  // Save changes to the Bill of Lading
  const handleSave = () => {
    if (!blData || !id) {
      toast.error("No Bill of Lading data to save");
      return;
    }
    
    try {
      // Convert BillOfLadingData to the format expected by saveBillOfLading
      const blToSave = {
        id,
        blNumber: blData.blNumber,
        date: blData.date,
        shipper: blData.shipper,
        shipperAddress: blData.shipperAddress,
        consignee: blData.consignee,
        consigneeAddress: blData.consigneeAddress,
        notifyParty: blData.notifyParty,
        notifyPartyAddress: blData.notifyPartyAddress,
        deliveryAgent: blData.deliveryAgent,
        origin: blData.portOfLoading.split(',')[0].trim() || "Doha",
        destination: blData.finalDestination.split(',')[0].trim() || "Colombo",
        cargoType: blData.cargoType || "Personal Effects",
        vessel: blData.vessel,
        loadingPort: blData.portOfLoading,
        dischargePort: blData.portOfDischarge,
        grossWeight: blData.weight,
        measurement: blData.volume,
        packages: blData.packages,
        goodsDescription: blData.description,
        containerNo: blData.containerNo,
        sealNo: blData.sealNo,
        status: "Shipped",
        freightCharges: blData.freightPrepaid ? "Prepaid" : "Collect",
        dateOfIssue: blData.dateOfIssue,
        vehicleMake: blData.vehicleMake,
        vehicleModel: blData.vehicleModel,
        vehicleYear: blData.vehicleYear,
        vehicleColor: blData.vehicleColor,
        chassisNumber: blData.chassisNumber,
        specialInstructions: blData.specialInstructions
      };
      
      saveBillOfLading(blToSave);
      toast.success("Bill of Lading saved successfully");
      setIsEdited(false);
      
      // Navigate to the BL list after saving
      navigate("/data-entry/bill-of-lading");
    } catch (error) {
      console.error("Error saving Bill of Lading:", error);
      toast.error("Failed to save Bill of Lading");
    }
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
      if (isEdited) {
        if (window.confirm("You have unsaved changes. Do you want to save before leaving?")) {
          handleSave();
          return;
        }
      }
      navigate(-1);
    } catch (error) {
      console.error("Navigation error:", error);
      navigate("/data-entry/invoicing");
    }
  };

  // Update BL Data fields
  const handleBLDataChange = (fieldName: string, value: string) => {
    if (blData) {
      setBlData({
        ...blData,
        [fieldName]: value
      });
      setIsEdited(true);
    }
  };

  return {
    loading,
    blData,
    blType,
    error,
    isPreview,
    isEdited,
    handlePrint,
    handleBack,
    handleSave,
    handleBLDataChange
  };
};
