
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Loader2, Package } from "lucide-react";
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
  net: number | null;
  payment_status: string | null;
  warehouse: string | null;
  description: string | null;
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
  const [loadedInvoices, setLoadedInvoices] = useState<InvoiceRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, [container]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      // Fetch unloaded invoices for this country
      const { data: unloaded, error: err1 } = await supabase
        .from("regional_invoices")
        .select("id, invoice_number, shipper_name, consignee_name, total_packages, total_volume, total_weight, net, payment_status, warehouse, description")
        .eq("country", countryName)
        .is("container_running_number", null)
        .order("created_at", { ascending: false });

      if (err1) throw err1;
      setInvoices(unloaded || []);

      // Fetch already loaded invoices for this container
      const { data: loaded, error: err2 } = await supabase
        .from("regional_invoices")
        .select("id, invoice_number, shipper_name, consignee_name, total_packages, total_volume, total_weight, net, payment_status, warehouse, description")
        .eq("country", countryName)
        .eq("container_running_number", container.runningNumber)
        .order("created_at", { ascending: false });

      if (err2) throw err2;
      setLoadedInvoices(loaded || []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredInvoices.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredInvoices.map((i) => i.id)));
    }
  };

  const handleConfirmLoading = async () => {
    if (selectedIds.size === 0) {
      toast.error("Please select at least one invoice");
      return;
    }
    setConfirming(true);
    try {
      const { error } = await supabase
        .from("regional_invoices")
        .update({
          container_running_number: container.runningNumber,
          loaded_at: new Date().toISOString(),
        })
        .in("id", Array.from(selectedIds));

      if (error) throw error;
      toast.success(`${selectedIds.size} invoice(s) loaded into container ${container.containerNumber}`);
      setSelectedIds(new Set());
      await fetchInvoices();
      onLoadingComplete();
    } catch (error) {
      console.error("Error loading invoices:", error);
      toast.error("Failed to load invoices into container");
    } finally {
      setConfirming(false);
    }
  };

  const handleUnload = async (invoiceId: string) => {
    try {
      const { error } = await supabase
        .from("regional_invoices")
        .update({ container_running_number: null, loaded_at: null })
        .eq("id", invoiceId);
      if (error) throw error;
      toast.success("Invoice unloaded from container");
      await fetchInvoices();
    } catch (error) {
      toast.error("Failed to unload invoice");
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      inv.invoice_number?.toLowerCase().includes(term) ||
      inv.shipper_name?.toLowerCase().includes(term) ||
      inv.consignee_name?.toLowerCase().includes(term) ||
      inv.warehouse?.toLowerCase().includes(term)
    );
  });

  const totalSelectedVolume = filteredInvoices
    .filter((i) => selectedIds.has(i.id))
    .reduce((sum, i) => sum + (i.total_volume || 0), 0);
  const totalSelectedWeight = filteredInvoices
    .filter((i) => selectedIds.has(i.id))
    .reduce((sum, i) => sum + (i.total_weight || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
          <div>Loaded: {loadedInvoices.length} invoices</div>
          <div>Vol: {loadedInvoices.reduce((s, i) => s + (i.total_volume || 0), 0).toFixed(3)} CBM</div>
        </div>
      </div>

      {/* Already loaded invoices */}
      {loadedInvoices.length > 0 && (
        <div className="p-4 border-b bg-green-50">
          <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
            <Package size={16} /> Loaded Invoices ({loadedInvoices.length})
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="border px-2 py-1.5 text-left">Invoice #</th>
                  <th className="border px-2 py-1.5 text-left">Shipper</th>
                  <th className="border px-2 py-1.5 text-left">Consignee</th>
                  <th className="border px-2 py-1.5 text-left">Warehouse</th>
                  <th className="border px-2 py-1.5 text-right">Weight</th>
                  <th className="border px-2 py-1.5 text-right">Volume</th>
                  <th className="border px-2 py-1.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loadedInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-green-100">
                    <td className="border px-2 py-1">{inv.invoice_number}</td>
                    <td className="border px-2 py-1">{inv.shipper_name}</td>
                    <td className="border px-2 py-1">{inv.consignee_name}</td>
                    <td className="border px-2 py-1">{inv.warehouse}</td>
                    <td className="border px-2 py-1 text-right">{(inv.total_weight || 0).toFixed(2)}</td>
                    <td className="border px-2 py-1 text-right">{(inv.total_volume || 0).toFixed(3)}</td>
                    <td className="border px-2 py-1 text-center">
                      <Button size="sm" variant="destructive" className="h-6 text-xs px-2" onClick={() => handleUnload(inv.id)}>
                        Unload
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available invoices */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-gray-800">Available Invoices ({filteredInvoices.length})</h4>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 h-8"
            />
            {selectedIds.size > 0 && (
              <div className="text-sm text-blue-600">
                Selected: {selectedIds.size} | Vol: {totalSelectedVolume.toFixed(3)} | Wt: {totalSelectedWeight.toFixed(1)}
              </div>
            )}
            <Button
              onClick={handleConfirmLoading}
              disabled={selectedIds.size === 0 || confirming}
              className="bg-green-600 hover:bg-green-700"
            >
              {confirming ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              Confirm Loading ({selectedIds.size})
            </Button>
          </div>
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
                  <th className="border px-2 py-1.5 text-center w-8">
                    <Checkbox
                      checked={selectedIds.size === filteredInvoices.length && filteredInvoices.length > 0}
                      onCheckedChange={toggleAll}
                      className="border-white"
                    />
                  </th>
                  <th className="border px-2 py-1.5 text-left">Invoice #</th>
                  <th className="border px-2 py-1.5 text-left">Shipper</th>
                  <th className="border px-2 py-1.5 text-left">Consignee</th>
                  <th className="border px-2 py-1.5 text-left">Warehouse</th>
                  <th className="border px-2 py-1.5 text-left">PKG</th>
                  <th className="border px-2 py-1.5 text-right">Weight</th>
                  <th className="border px-2 py-1.5 text-right">Volume</th>
                  <th className="border px-2 py-1.5 text-right">Net (QAR)</th>
                  <th className="border px-2 py-1.5 text-left">Pay Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((inv, i) => (
                    <tr
                      key={inv.id}
                      className={`cursor-pointer ${selectedIds.has(inv.id) ? "bg-blue-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-100`}
                      onClick={() => toggleSelect(inv.id)}
                    >
                      <td className="border px-2 py-1 text-center">
                        <Checkbox checked={selectedIds.has(inv.id)} onCheckedChange={() => toggleSelect(inv.id)} />
                      </td>
                      <td className="border px-2 py-1 font-medium">{inv.invoice_number}</td>
                      <td className="border px-2 py-1">{inv.shipper_name}</td>
                      <td className="border px-2 py-1">{inv.consignee_name}</td>
                      <td className="border px-2 py-1">{inv.warehouse}</td>
                      <td className="border px-2 py-1">{inv.description}</td>
                      <td className="border px-2 py-1 text-right">{(inv.total_weight || 0).toFixed(2)}</td>
                      <td className="border px-2 py-1 text-right">{(inv.total_volume || 0).toFixed(3)}</td>
                      <td className="border px-2 py-1 text-right">{(inv.net || 0).toFixed(2)}</td>
                      <td className="border px-2 py-1">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${inv.payment_status === "PAID" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {inv.payment_status || "UNPAID"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="border px-2 py-4 text-center text-gray-500">
                      No available invoices found
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
