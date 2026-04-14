
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Package, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContainerData } from "./types";

interface InvoiceRow {
  id: string;
  invoice_number: string;
  shipper_name: string | null;
  consignee_name: string | null;
  total_packages: number | null;
  total_volume: number | null;
  total_weight: number | null;
  warehouse: string | null;
  payment_status: string | null;
  net: number | null;
}

interface PackageLine {
  id: string;
  invoice_id: string;
  package_name: string | null;
  quantity: number | null;
  weight: number | null;
  cubic_metre: number | null;
  box_number: number | null;
  loading_status: string;
  container_running_number: string | null;
}

interface ContainerLoadingPanelProps {
  container: ContainerData;
  countryName: string;
  onBack: () => void;
  onLoadingComplete: () => void;
}

const ContainerLoadingPanel: React.FC<ContainerLoadingPanelProps> = ({
  container,
  countryName,
  onBack,
  onLoadingComplete,
}) => {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [invoicePackages, setInvoicePackages] = useState<PackageLine[]>([]);
  const [loadedPackages, setLoadedPackages] = useState<PackageLine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingPkgs, setLoadingPkgs] = useState(false);
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [container]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch invoices for this country that have packages not yet loaded OR already loaded to this container
      const { data: allInvoices, error: invErr } = await supabase
        .from("regional_invoices")
        .select("id, invoice_number, shipper_name, consignee_name, total_packages, total_volume, total_weight, warehouse, payment_status, net")
        .eq("country", countryName)
        .order("created_at", { ascending: false });

      if (invErr) throw invErr;
      setInvoices(allInvoices || []);

      // Fetch all packages already loaded in this container
      const { data: loaded, error: loadErr } = await supabase
        .from("regional_invoice_packages")
        .select("id, invoice_id, package_name, quantity, weight, cubic_metre, box_number, loading_status, container_running_number")
        .eq("container_running_number", container.runningNumber)
        .eq("loading_status", "LOADED");

      if (loadErr) throw loadErr;
      setLoadedPackages((loaded as PackageLine[]) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectInvoice = async (invoiceId: string) => {
    if (selectedInvoiceId === invoiceId) {
      setSelectedInvoiceId(null);
      setInvoicePackages([]);
      return;
    }
    setSelectedInvoiceId(invoiceId);
    setLoadingPkgs(true);
    try {
      const { data: pkgs, error } = await supabase
        .from("regional_invoice_packages")
        .select("id, invoice_id, package_name, quantity, weight, cubic_metre, box_number, loading_status, container_running_number")
        .eq("invoice_id", invoiceId)
        .order("box_number", { ascending: true });

      if (error) throw error;
      setInvoicePackages((pkgs as PackageLine[]) || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages");
    } finally {
      setLoadingPkgs(false);
    }
  };

  const handleLoadPackage = async (pkg: PackageLine) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("regional_invoice_packages")
        .update({
          loading_status: "LOADED",
          container_running_number: container.runningNumber,
          loaded_at: new Date().toISOString(),
          loaded_by: userData?.user?.id || null,
        })
        .eq("id", pkg.id);

      if (error) throw error;
      toast.success(`✓ ${pkg.package_name || "Package"} loaded`);

      // Also update the parent invoice container_running_number if not already set
      await supabase
        .from("regional_invoices")
        .update({
          container_running_number: container.runningNumber,
          loaded_at: new Date().toISOString(),
        })
        .eq("id", pkg.invoice_id)
        .is("container_running_number", null);

      // Refresh data
      await handleSelectInvoice(pkg.invoice_id);
      await fetchData();
    } catch (error: any) {
      console.error("Error loading package:", error);
      toast.error(`Failed to load package: ${error?.message || error}`);
    }
  };

  const handleUnloadPackage = async (pkg: PackageLine) => {
    try {
      const { error } = await supabase
        .from("regional_invoice_packages")
        .update({
          loading_status: "PENDING",
          container_running_number: null,
          loaded_at: null,
          loaded_by: null,
        })
        .eq("id", pkg.id);

      if (error) throw error;
      toast.success(`${pkg.package_name || "Package"} unloaded`);

      // Check if any packages from this invoice are still loaded
      const { data: remaining } = await supabase
        .from("regional_invoice_packages")
        .select("id")
        .eq("invoice_id", pkg.invoice_id)
        .eq("container_running_number", container.runningNumber)
        .eq("loading_status", "LOADED");

      if (!remaining || remaining.length === 0) {
        // No packages left, clear the invoice container assignment
        await supabase
          .from("regional_invoices")
          .update({ container_running_number: null, loaded_at: null })
          .eq("id", pkg.invoice_id);
      }

      if (selectedInvoiceId === pkg.invoice_id) {
        await handleSelectInvoice(pkg.invoice_id);
      }
      await fetchData();
    } catch (error: any) {
      console.error("Error unloading package:", error);
      toast.error(`Failed to unload package: ${error?.message || error}`);
    }
  };

  const handleMarkShortShipped = async (invoiceId: string) => {
    try {
      // Mark all PENDING packages of this invoice as SHORT-SHIPPED
      const { error } = await supabase
        .from("regional_invoice_packages")
        .update({ loading_status: "SHORT-SHIPPED" })
        .eq("invoice_id", invoiceId)
        .eq("loading_status", "PENDING");

      if (error) throw error;
      toast.success("Remaining packages marked as SHORT-SHIPPED");
      if (selectedInvoiceId === invoiceId) {
        await handleSelectInvoice(invoiceId);
      }
      await fetchData();
    } catch (error: any) {
      toast.error(`Failed to mark short-shipped: ${error?.message || error}`);
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      inv.invoice_number?.toLowerCase().includes(term) ||
      inv.shipper_name?.toLowerCase().includes(term) ||
      inv.consignee_name?.toLowerCase().includes(term)
    );
  });

  // Group loaded packages by invoice
  const loadedByInvoice: Record<string, PackageLine[]> = {};
  loadedPackages.forEach((pkg) => {
    if (!loadedByInvoice[pkg.invoice_id]) loadedByInvoice[pkg.invoice_id] = [];
    loadedByInvoice[pkg.invoice_id].push(pkg);
  });

  const loadedInvoiceIds = Object.keys(loadedByInvoice);
  const loadedInvoiceDetails = invoices.filter((i) => loadedInvoiceIds.includes(i.id));

  const totalLoadedVol = loadedPackages.reduce((s, p) => s + (p.cubic_metre || 0), 0);
  const totalLoadedWt = loadedPackages.reduce((s, p) => s + (p.weight || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-blue-700">
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h3 className="font-bold text-lg">Load Container: {container.containerNumber}</h3>
            <p className="text-blue-100 text-sm">
              Running #{container.runningNumber} | {container.containerType} | DIR: {container.direction}
            </p>
          </div>
        </div>
        <div className="text-right text-sm">
          <div>Loaded: {loadedPackages.length} packages</div>
          <div>Vol: {totalLoadedVol.toFixed(3)} CBM | Wt: {totalLoadedWt.toFixed(1)} kg</div>
        </div>
      </div>

      {/* Already loaded packages */}
      {loadedPackages.length > 0 && (
        <div className="p-4 border-b bg-green-50">
          <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
            <Package size={16} /> Loaded Packages ({loadedPackages.length})
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="border px-2 py-1.5 text-left">Invoice #</th>
                  <th className="border px-2 py-1.5 text-left">Package Name</th>
                  <th className="border px-2 py-1.5 text-center">Box #</th>
                  <th className="border px-2 py-1.5 text-center">Qty</th>
                  <th className="border px-2 py-1.5 text-right">Weight</th>
                  <th className="border px-2 py-1.5 text-right">Volume</th>
                  <th className="border px-2 py-1.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loadedInvoiceDetails.map((inv) => {
                  const pkgs = loadedByInvoice[inv.id] || [];
                  return pkgs.map((pkg, pi) => (
                    <tr key={pkg.id} className="hover:bg-green-100">
                      {pi === 0 && (
                        <td className="border px-2 py-1 font-medium" rowSpan={pkgs.length}>
                          {inv.invoice_number}
                        </td>
                      )}
                      <td className="border px-2 py-1">{pkg.package_name || "N/A"}</td>
                      <td className="border px-2 py-1 text-center">{pkg.box_number || "-"}</td>
                      <td className="border px-2 py-1 text-center">{pkg.quantity || 1}</td>
                      <td className="border px-2 py-1 text-right">{(pkg.weight || 0).toFixed(2)}</td>
                      <td className="border px-2 py-1 text-right">{(pkg.cubic_metre || 0).toFixed(3)}</td>
                      <td className="border px-2 py-1 text-center">
                        <Button size="sm" variant="destructive" className="h-6 text-xs px-2" onClick={() => handleUnloadPackage(pkg)}>
                          Unload
                        </Button>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoice selection for package-level loading */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-gray-800">Step 1: Select Invoice → Step 2: Click each package to load</h4>
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 h-8"
          />
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            <Loader2 className="animate-spin mx-auto mb-2" size={24} />
            Loading invoices...
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="sticky top-0">
                <tr className="bg-blue-500 text-white">
                  <th className="border px-2 py-1.5 text-center w-8"></th>
                  <th className="border px-2 py-1.5 text-left">Invoice #</th>
                  <th className="border px-2 py-1.5 text-left">Shipper</th>
                  <th className="border px-2 py-1.5 text-left">Consignee</th>
                  <th className="border px-2 py-1.5 text-left">Warehouse</th>
                  <th className="border px-2 py-1.5 text-center">Pkgs</th>
                  <th className="border px-2 py-1.5 text-right">Weight</th>
                  <th className="border px-2 py-1.5 text-right">Volume</th>
                  <th className="border px-2 py-1.5 text-left">Pay Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((inv, i) => (
                    <React.Fragment key={inv.id}>
                      <tr
                        className={`cursor-pointer ${selectedInvoiceId === inv.id ? "bg-blue-100 font-medium" : i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
                        onClick={() => handleSelectInvoice(inv.id)}
                      >
                        <td className="border px-2 py-1 text-center">
                          {selectedInvoiceId === inv.id ? (
                            <ChevronUp size={14} className="inline text-blue-600" />
                          ) : (
                            <ChevronDown size={14} className="inline text-gray-400" />
                          )}
                        </td>
                        <td className="border px-2 py-1">{inv.invoice_number}</td>
                        <td className="border px-2 py-1">{inv.shipper_name}</td>
                        <td className="border px-2 py-1">{inv.consignee_name}</td>
                        <td className="border px-2 py-1">{inv.warehouse}</td>
                        <td className="border px-2 py-1 text-center">{inv.total_packages || 0}</td>
                        <td className="border px-2 py-1 text-right">{(inv.total_weight || 0).toFixed(2)}</td>
                        <td className="border px-2 py-1 text-right">{(inv.total_volume || 0).toFixed(3)}</td>
                        <td className="border px-2 py-1">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${inv.payment_status === "PAID" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {inv.payment_status || "UNPAID"}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded package lines */}
                      {selectedInvoiceId === inv.id && (
                        <tr>
                          <td colSpan={9} className="border-0 p-0">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                              {loadingPkgs ? (
                                <div className="text-center py-3 text-gray-500">
                                  <Loader2 className="animate-spin inline mr-2" size={16} />
                                  Loading packages...
                                </div>
                              ) : invoicePackages.length === 0 ? (
                                <div className="text-center py-3 text-gray-500">No packages found for this invoice</div>
                              ) : (
                                <>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-blue-800 text-sm">
                                      Package Lines for {inv.invoice_number} ({invoicePackages.length} items)
                                    </span>
                                    {invoicePackages.some((p) => p.loading_status === "PENDING") && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-orange-600 border-orange-300 h-7 text-xs"
                                        onClick={() => handleMarkShortShipped(inv.id)}
                                      >
                                        Mark remaining as SHORT-SHIPPED
                                      </Button>
                                    )}
                                  </div>
                                  <table className="w-full border-collapse text-xs bg-white">
                                    <thead>
                                      <tr className="bg-gray-200">
                                        <th className="border px-2 py-1 text-center">Box #</th>
                                        <th className="border px-2 py-1 text-left">Package Name</th>
                                        <th className="border px-2 py-1 text-center">Qty</th>
                                        <th className="border px-2 py-1 text-right">Weight (kg)</th>
                                        <th className="border px-2 py-1 text-right">Volume (CBM)</th>
                                        <th className="border px-2 py-1 text-center">Status</th>
                                        <th className="border px-2 py-1 text-center w-24">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {invoicePackages.map((pkg) => {
                                        const isLoaded = pkg.loading_status === "LOADED";
                                        const isShortShipped = pkg.loading_status === "SHORT-SHIPPED";
                                        const isLoadedHere = isLoaded && pkg.container_running_number === container.runningNumber;
                                        const isLoadedElsewhere = isLoaded && pkg.container_running_number !== container.runningNumber;

                                        return (
                                          <tr key={pkg.id} className={isLoadedHere ? "bg-green-50" : isShortShipped ? "bg-orange-50" : isLoadedElsewhere ? "bg-yellow-50" : "bg-white"}>
                                            <td className="border px-2 py-1 text-center">{pkg.box_number || "-"}</td>
                                            <td className="border px-2 py-1 font-medium">{pkg.package_name || "N/A"}</td>
                                            <td className="border px-2 py-1 text-center">{pkg.quantity || 1}</td>
                                            <td className="border px-2 py-1 text-right">{(pkg.weight || 0).toFixed(2)}</td>
                                            <td className="border px-2 py-1 text-right">{(pkg.cubic_metre || 0).toFixed(3)}</td>
                                            <td className="border px-2 py-1 text-center">
                                              {isLoadedHere && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">LOADED</span>
                                              )}
                                              {isLoadedElsewhere && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700">
                                                  LOADED ({pkg.container_running_number})
                                                </span>
                                              )}
                                              {isShortShipped && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700">SHORT-SHIPPED</span>
                                              )}
                                              {pkg.loading_status === "PENDING" && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">PENDING</span>
                                              )}
                                            </td>
                                            <td className="border px-2 py-1 text-center">
                                              {pkg.loading_status === "PENDING" && (
                                                <Button
                                                  size="sm"
                                                  className="h-6 text-xs px-2 bg-green-600 hover:bg-green-700"
                                                  onClick={() => handleLoadPackage(pkg)}
                                                >
                                                  <Check size={12} className="mr-1" /> Load
                                                </Button>
                                              )}
                                              {isLoadedHere && (
                                                <Button
                                                  size="sm"
                                                  variant="destructive"
                                                  className="h-6 text-xs px-2"
                                                  onClick={() => handleUnloadPackage(pkg)}
                                                >
                                                  <X size={12} className="mr-1" /> Unload
                                                </Button>
                                              )}
                                              {isShortShipped && (
                                                <span className="text-[10px] text-orange-600">In Warehouse</span>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="border px-2 py-4 text-center text-gray-500">
                      No invoices found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContainerLoadingPanel;
