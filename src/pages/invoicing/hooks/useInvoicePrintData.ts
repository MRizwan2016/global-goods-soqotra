
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { mockInvoiceData } from "@/data/mockData";

export const useInvoicePrintData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Parse the mode from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialMode = (queryParams.get('mode') as "invoice" | "bl" | "certificate") || "invoice";
  const [mode, setMode] = useState<"invoice" | "bl" | "certificate">(initialMode);
  
  // First try to get from localStorage for real data
  const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  const storedInvoice = storedInvoices.find((inv: any) => inv.id === id);
  
  // Fall back to mock data if not found in localStorage
  const mockInvoice = mockInvoiceData.find(inv => inv.id === id);
  
  // Use stored invoice if available, otherwise use mock
  const invoice = storedInvoice || mockInvoice;
  
  // Calculate totals from package details
  const packageDetails = invoice?.packageDetails || invoice?.packageItems || [];
  const totalVolume = packageDetails.reduce((sum: number, pkg: any) => {
    return sum + parseFloat(pkg.volume || '0');
  }, 0).toFixed(3);
  
  const totalWeight = (parseFloat(invoice?.weight) || 397.8).toFixed(2);
  
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleBack = () => {
    if (id) {
      navigate(`/data-entry/invoicing/edit/${id}`);
    } else {
      navigate("/data-entry/invoicing");
    }
  };
  
  return {
    invoice,
    packageDetails,
    totalVolume,
    totalWeight,
    mode,
    setMode,
    isAuthenticated,
    handlePrint,
    handleBack,
  };
};
