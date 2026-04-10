
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { mockInvoiceData } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useInvoicePrintData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const queryParams = new URLSearchParams(location.search);
  const initialMode = (queryParams.get('mode') as "invoice" | "bl" | "certificate") || "invoice";
  const [mode, setMode] = useState<"invoice" | "bl" | "certificate">(initialMode);
  
  const [invoice, setInvoice] = useState<any>(null);
  
  useEffect(() => {
    if (!id) {
      setError("No invoice ID provided");
      toast.error("No invoice ID provided");
      setTimeout(() => navigate("/data-entry/invoicing", { replace: true }), 2000);
      return;
    }
    
    const loadInvoice = async () => {
      try {
        // Try localStorage first
        const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        let foundInvoice = storedInvoices.find((inv: any) => inv.id === id || inv.invoiceNumber === id);
        
        // Try other localStorage keys
        if (!foundInvoice) {
          const keys = ['sriLankaInvoices', 'sudanInvoices', 'kenyaInvoices', 'generatedInvoices'];
          for (const key of keys) {
            try {
              const stored = localStorage.getItem(key);
              if (stored) {
                const parsed = JSON.parse(stored);
                const found = parsed.find((inv: any) => inv.id === id || inv.invoiceNumber === id);
                if (found) { foundInvoice = found; break; }
              }
            } catch (e) { /* skip */ }
          }
        }
        
        // Fall back to mock data
        if (!foundInvoice) {
          foundInvoice = mockInvoiceData.find(inv => inv.id === id);
        }
        
        // Fall back to database
        if (!foundInvoice) {
          const { data: dbInvoice } = await supabase
            .from('regional_invoices')
            .select('*')
            .or(`id.eq.${id},invoice_number.eq.${id}`)
            .maybeSingle();
          
          if (dbInvoice) {
            const { data: dbPackages } = await supabase
              .from('regional_invoice_packages')
              .select('*')
              .eq('invoice_id', dbInvoice.id)
              .order('box_number', { ascending: true });

            const packageDetails = (dbPackages || []).map((pkg: any) => ({
              id: pkg.id,
              name: pkg.package_name || '-',
              length: pkg.length,
              width: pkg.width,
              height: pkg.height,
              volume: pkg.cubic_metre || pkg.volume,
              weight: pkg.weight,
              price: pkg.price,
              quantity: pkg.quantity || 1,
              boxNumber: pkg.box_number,
            }));

            foundInvoice = {
              id: dbInvoice.id,
              invoiceNumber: dbInvoice.invoice_number,
              date: dbInvoice.invoice_date || dbInvoice.created_at?.split('T')[0],
              shipper1: dbInvoice.shipper_name,
              shipper2: '',
              consignee1: dbInvoice.consignee_name,
              consignee2: '',
              consigneeIdNumber: dbInvoice.consignee_id_number,
              country: dbInvoice.country,
              gross: dbInvoice.gross,
              discount: dbInvoice.discount,
              net: dbInvoice.net,
              warehouse: dbInvoice.warehouse,
              bookNumber: dbInvoice.book_number,
              jobNumber: dbInvoice.job_number,
              shipperMobile: dbInvoice.shipper_mobile,
              shipperAddress: dbInvoice.shipper_address,
              consigneeMobile: dbInvoice.consignee_mobile,
              consigneeAddress: dbInvoice.consignee_address,
              freight: dbInvoice.freight,
              description: dbInvoice.description,
              destination: dbInvoice.destination,
              totalPackages: dbPackages?.length || dbInvoice.total_packages,
              totalWeight: dbInvoice.total_weight,
              totalVolume: dbInvoice.total_volume,
              serviceType: dbInvoice.service_type,
              salesRepresentative: dbInvoice.sales_representative,
              packageDetails: packageDetails,
            };
          }
        }
        
        if (foundInvoice) {
          setInvoice(foundInvoice);
        } else {
          setError("Invoice not found with ID: " + id);
          toast.error("Invoice not found.");
          setTimeout(() => navigate("/data-entry/invoicing", { replace: true }), 2000);
        }
      } catch (err) {
        setError("Error loading invoice: " + err);
        toast.error("Error loading invoice data");
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [id, navigate]);
  
  const packageDetails = invoice?.packageDetails || invoice?.packageItems || [];
  const totalVolume = packageDetails.reduce((sum: number, pkg: any) => {
    return sum + parseFloat(pkg.volume || '0');
  }, 0).toFixed(3);
  
  const totalWeight = invoice ? (parseFloat(invoice.totalWeight || invoice.weight || '0')).toFixed(2) : "0.00";
  
  useEffect(() => {
    if (location.pathname.includes('/print-documents/')) return;
    if (!isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, navigate, location]);
  
  const handlePrint = () => { window.print(); };
  
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
    loading,
    handlePrint,
    handleBack,
    error
  };
};
