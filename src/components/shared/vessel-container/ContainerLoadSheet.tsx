
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Printer, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContainerData } from "./types";

interface PackageRow {
  id: string;
  invoice_id: string;
  invoice_number: string;
  box_number: number | null;
  package_name: string | null;
  quantity: number | null;
  weight: number | null;
  cubic_metre: number | null;
  consignee_name: string | null;
  shipper_name: string | null;
  warehouse: string | null;
  sector: string | null;
  pre_paid: string | null;
}

interface ContainerLoadSheetProps {
  container: ContainerData;
  onBack: () => void;
}

const ContainerLoadSheet: React.FC<ContainerLoadSheetProps> = ({ container, onBack }) => {
  const [allRows, setAllRows] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  // Load saved confirm date
  const savedConfirm = localStorage.getItem(`manifest_confirm_${container.runningNumber}`);

  useEffect(() => {
    fetchData();
  }, [container]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Get all loaded packages for this container
      const { data: pkgs, error: pkgErr } = await supabase
        .from("regional_invoice_packages")
        .select("id, invoice_id, box_number, package_name, quantity, weight, cubic_metre")
        .eq("container_running_number", container.runningNumber)
        .eq("loading_status", "LOADED")
        .order("invoice_id", { ascending: true })
        .order("box_number", { ascending: true });

      if (pkgErr) throw pkgErr;

      // Get invoice details
      const invoiceIds = [...new Set((pkgs || []).map((p) => p.invoice_id))];
      let invoiceMap: Record<string, { invoice_number: string; consignee_name: string | null; shipper_name: string | null; warehouse: string | null; sector: string | null; pre_paid: string | null }> = {};

      if (invoiceIds.length > 0) {
        const { data: invData, error: invErr } = await supabase
          .from("regional_invoices")
          .select("id, invoice_number, consignee_name, shipper_name, warehouse, sector, pre_paid")
          .in("id", invoiceIds);

        if (invErr) throw invErr;
        (invData || []).forEach((inv) => {
          invoiceMap[inv.id] = {
            invoice_number: inv.invoice_number,
            consignee_name: inv.consignee_name,
            shipper_name: inv.shipper_name,
            warehouse: inv.warehouse,
            sector: inv.sector,
            pre_paid: inv.pre_paid,
          };
        });
      }

      // Combine data
      const rows: PackageRow[] = (pkgs || []).map((p) => {
        const inv = invoiceMap[p.invoice_id] || {};
        return {
          ...p,
          invoice_number: inv.invoice_number || "",
          consignee_name: inv.consignee_name || null,
          shipper_name: inv.shipper_name || null,
          warehouse: inv.warehouse || null,
          sector: inv.sector || null,
          pre_paid: inv.pre_paid || null,
        };
      });

      setAllRows(rows);
    } catch (error) {
      console.error("Error fetching load sheet:", error);
      toast.error("Failed to load container data");
    } finally {
      setLoading(false);
    }
  };

  const filteredRows = searchTerm
    ? allRows.filter((r) => {
        const term = searchTerm.toLowerCase();
        return (
          r.invoice_number.toLowerCase().includes(term) ||
          r.package_name?.toLowerCase().includes(term) ||
          r.consignee_name?.toLowerCase().includes(term) ||
          r.shipper_name?.toLowerCase().includes(term)
        );
      })
    : allRows;

  const totalPages = Math.ceil(filteredRows.length / entriesPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPackages = allRows.length;
  const totalVolume = allRows.reduce((s, r) => s + (r.cubic_metre || 0), 0);
  const totalWeight = allRows.reduce((s, r) => s + (r.weight || 0), 0);

  // Item list summary
  const getItemSummary = () => {
    const itemMap: Record<string, { qty: number; vol: number }> = {};
    allRows.forEach((r) => {
      const name = (r.package_name || "UNKNOWN").toUpperCase();
      if (!itemMap[name]) itemMap[name] = { qty: 0, vol: 0 };
      itemMap[name].qty += r.quantity || 1;
      itemMap[name].vol += r.cubic_metre || 0;
    });
    return Object.entries(itemMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, data], i) => ({ num: i + 1, name, ...data }));
  };

  // Warehouse/Zone summary
  const getWarehouseZoneSummary = () => {
    const zoneMap: Record<string, { qty: number; vol: number }> = {};
    allRows.forEach((r) => {
      const zone = r.warehouse?.replace(/\s*UPB\s*WAREHOUSE/i, "").trim() || "Unknown";
      if (!zoneMap[zone]) zoneMap[zone] = { qty: 0, vol: 0 };
      zoneMap[zone].qty += 1;
      zoneMap[zone].vol += r.cubic_metre || 0;
    });
    return Object.entries(zoneMap).map(([zone, data], i) => ({ num: i + 1, zone, ...data }));
  };

  // Line number per invoice
  const getLineNumber = (row: PackageRow) => {
    const sameInvoice = allRows.filter((r) => r.invoice_id === row.invoice_id);
    const idx = sameInvoice.findIndex((r) => r.id === row.id);
    return idx + 1;
  };

  const handlePrint = () => {
    const style = document.createElement("style");
    style.id = "loadsheet-print-style";
    style.textContent = `
      @media print {
        @page { size: A4 landscape; margin: 8mm; }
        body * { visibility: hidden; }
        #loadsheet-print-area, #loadsheet-print-area * { visibility: visible; }
        #loadsheet-print-area { position: absolute; left: 0; top: 0; width: 100%; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => {
      document.getElementById("loadsheet-print-style")?.remove();
    }, 500);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="animate-spin mx-auto mb-2" size={32} />
        <p className="text-gray-500">Loading container data...</p>
      </div>
    );
  }

  const itemSummary = getItemSummary();
  const warehouseZoneSummary = getWarehouseZoneSummary();

  // Unsettled invoices
  const invoiceIds = [...new Set(allRows.map((r) => r.invoice_id))];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-green-100 border-b border-green-300 px-4 py-2">
        <h3 className="text-green-800 font-bold">Container Loading</h3>
      </div>

      <div id="loadsheet-print-area" ref={printRef} className="p-4">
        {/* Container Details Header */}
        <div className="border border-gray-300 mb-4">
          <div className="bg-blue-600 text-white text-center font-bold py-1.5 text-sm">CONTAINER DETAILS</div>
          <div className="grid grid-cols-2 text-sm">
            <div className="border-r border-gray-300">
              <div className="grid grid-cols-[160px_1fr]">
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">SECTOR:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.sector || container.direction}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">RUNNING NUMBER:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.runningNumber}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">CONTAINER NUMBER:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.containerNumber}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">DATE CONFIRMED:</div>
                <div className="border-b border-gray-200 px-2 py-1">{savedConfirm || "-"}</div>
                <div className="border-r border-gray-200 px-2 py-1 font-medium">TOTAL VOLUME:</div>
                <div className="px-2 py-1">{totalVolume.toFixed(3)}</div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-[160px_1fr]">
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">SEAL NUMBER:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.sealNumber}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">TYPE:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.containerType}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">DIRECT/ MIX:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.direction}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">WEIGHT:</div>
                <div className="border-b border-gray-200 px-2 py-1">{totalWeight.toFixed(0)}</div>
                <div className="border-r border-gray-200 px-2 py-1 font-medium">TOTAL PACKAGES:</div>
                <div className="px-2 py-1">{totalPackages}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Show</span>
            <Select value={String(entriesPerPage)} onValueChange={(v) => { setEntriesPerPage(Number(v)); setCurrentPage(1); }}>
              <SelectTrigger className="w-[70px] h-8 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Search:</span>
            <Input
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-[200px] h-8"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Package Table */}
        <div className="overflow-x-auto mb-2">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border px-2 py-1.5 text-center">Num</th>
                <th className="border px-2 py-1.5 text-center">INVOICE</th>
                <th className="border px-2 py-1.5 text-center">L. Num</th>
                <th className="border px-2 py-1.5 text-center">BARCODE</th>
                <th className="border px-2 py-1.5 text-left">PACKAGE</th>
                <th className="border px-2 py-1.5 text-right">VOLUME</th>
                <th className="border px-2 py-1.5 text-left">CONSIGNEE</th>
                <th className="border px-2 py-1.5 text-left">SHIPPER</th>
                <th className="border px-2 py-1.5 text-center">W/H</th>
                <th className="border px-2 py-1.5 text-center">CAT.ZONE</th>
                <th className="border px-2 py-1.5 text-center">BARCODE</th>
                <th className="border px-2 py-1.5 text-center">PRE/P</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row, i) => {
                const globalIdx = (currentPage - 1) * entriesPerPage + i + 1;
                const warehouseCode = row.warehouse?.charAt(0)?.toUpperCase() || "";
                return (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1 text-center">{globalIdx}</td>
                    <td className="border px-2 py-1 text-center font-medium">{row.invoice_number}</td>
                    <td className="border px-2 py-1 text-center">{getLineNumber(row)}</td>
                    <td className="border px-2 py-1 text-center"></td>
                    <td className="border px-2 py-1">{row.package_name || "UNKNOWN"}</td>
                    <td className="border px-2 py-1 text-right">{(row.cubic_metre || 0).toFixed(3)}</td>
                    <td className="border px-2 py-1">{row.consignee_name}</td>
                    <td className="border px-2 py-1">{row.shipper_name}</td>
                    <td className="border px-2 py-1 text-center">{warehouseCode}</td>
                    <td className="border px-2 py-1 text-center">Normal Rate</td>
                    <td className="border px-2 py-1 text-center"></td>
                    <td className="border px-2 py-1 text-center">{row.pre_paid === "Yes" ? "Y" : "N"}</td>
                  </tr>
                );
              })}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={12} className="border px-4 py-8 text-center text-gray-500">No packages loaded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm mb-4">
          <span>Showing {filteredRows.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0} to {Math.min(currentPage * entriesPerPage, filteredRows.length)} of {filteredRows.length} entries</span>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((pg) => (
                <Button
                  key={pg}
                  variant={pg === currentPage ? "default" : "outline"}
                  size="sm"
                  className="h-7 w-7 text-xs p-0"
                  onClick={() => setCurrentPage(pg)}
                >
                  {pg}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Item List Summary */}
        <div className="mb-4">
          <table className="w-full max-w-2xl mx-auto border-collapse text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border px-2 py-1.5 text-center" colSpan={4}>ITEM LIST</th>
              </tr>
              <tr className="bg-blue-500 text-white">
                <th className="border px-2 py-1.5 text-center">Num</th>
                <th className="border px-2 py-1.5 text-left">ITEM NAME</th>
                <th className="border px-2 py-1.5 text-right">QUANTITY</th>
                <th className="border px-2 py-1.5 text-right">VOLUME</th>
              </tr>
            </thead>
            <tbody>
              {itemSummary.map((item) => (
                <tr key={item.num} className={item.num % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border px-2 py-1 text-center">{item.num}</td>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1 text-right">{item.qty}</td>
                  <td className="border px-2 py-1 text-right">{item.vol.toFixed(3)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-100">
                <td className="border px-2 py-1 text-right" colSpan={2}>TOTAL:</td>
                <td className="border px-2 py-1 text-right">{itemSummary.reduce((s, i) => s + i.qty, 0)}</td>
                <td className="border px-2 py-1 text-right">{itemSummary.reduce((s, i) => s + i.vol, 0).toFixed(3)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Warehouse/Zone Summary */}
        <div className="mb-4">
          <table className="w-full max-w-2xl mx-auto border-collapse text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border px-2 py-1.5 text-center" colSpan={4}>SUMMARY OF WAREHOUSE/ ZONE WISE PACKAGES & VOLUME</th>
              </tr>
              <tr className="bg-blue-500 text-white">
                <th className="border px-2 py-1.5 text-center">Num</th>
                <th className="border px-2 py-1.5 text-left">WAREHOUSE/ ZONE</th>
                <th className="border px-2 py-1.5 text-right">QUANTITY</th>
                <th className="border px-2 py-1.5 text-right">VOLUME</th>
              </tr>
            </thead>
            <tbody>
              {warehouseZoneSummary.map((item) => (
                <tr key={item.num} className={item.num % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border px-2 py-1 text-center">{item.num}</td>
                  <td className="border px-2 py-1">{item.zone}</td>
                  <td className="border px-2 py-1 text-right">{item.qty}</td>
                  <td className="border px-2 py-1 text-right">{item.vol.toFixed(3)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-100">
                <td className="border px-2 py-1 text-right" colSpan={2}>TOTAL:</td>
                <td className="border px-2 py-1 text-right">{warehouseZoneSummary.reduce((s, i) => s + i.qty, 0)}</td>
                <td className="border px-2 py-1 text-right">{warehouseZoneSummary.reduce((s, i) => s + i.vol, 0).toFixed(3)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="flex items-center justify-center gap-3 p-4 border-t">
        <Button variant="default" onClick={onBack} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <ArrowLeft size={16} /> Go Back
        </Button>
        <Button onClick={handlePrint} className="bg-blue-800 hover:bg-blue-900 flex items-center gap-2">
          <Printer size={16} /> Print
        </Button>
      </div>
    </div>
  );
};

export default ContainerLoadSheet;
