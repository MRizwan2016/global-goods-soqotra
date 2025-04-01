
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data/mockData";
import { mockBLData } from "@/pages/bill-of-lading/components/mockData";
import { transformBLRecord, transformInvoiceToHBL } from "../utils/blDataTransformers";
import { BillOfLadingData } from "../types/billOfLadingTypes";

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
    const fetchBillOfLading = async () => {
      try {
        if (!id) {
          setError("No Bill of Lading ID provided");
          setLoading(false);
          toast.error("No Bill of Lading ID provided");
          return;
        }

        // First try to find a BL record
        let blRecord = mockBLData.find(bl => bl.id === id);
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
