
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Loader2, CheckCircle2, Download, Edit, Save, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import { ContainerData, VesselData } from "./types";

interface ManifestInvoice {
  id: string;
  invoice_number: string;
  shipper_name: string | null;
  consignee_name: string | null;
  consignee_address: string | null;
  consignee_city: string | null;
  consignee_mobile: string | null;
  total_packages: number | null;
  total_volume: number | null;
  total_weight: number | null;
  net: number | null;
  payment_status: string | null;
  warehouse: string | null;
  description: string | null;
}

interface PackageRow {
  id: string;
  invoice_id: string;
  package_name: string | null;
  quantity: number | null;
  weight: number | null;
  cubic_metre: number | null;
  loading_status: string;
}

interface SeaCargoManifestProps {
  container: ContainerData;
  vessel: VesselData | null;
  countryName: string;
  onBack: () => void;
}

const VOLUME_CATEGORIES = [
  { label: "0.001 > 0.5", min: 0.001, max: 0.5 },
  { label: "0.500 > 1", min: 0.5, max: 1 },
  { label: "1.000 > 2", min: 1, max: 2 },
  { label: "2.000 > 100", min: 2, max: 100 },
];

const SeaCargoManifest: React.FC<SeaCargoManifestProps> = ({
  container,
  vessel,
  countryName,
  onBack,
}) => {
  const [invoices, setInvoices] = useState<ManifestInvoice[]>([]);
  const [packages, setPackages] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDate, setConfirmDate] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchManifestData();
    checkAdminRole();
  }, [container]);

  const checkAdminRole = async () => {
    setAuthLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user?.id) return;
      const { data } = await supabase.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });
      setIsAdmin(data === true);
    } catch {
      setIsAdmin(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchManifestData = async () => {
    setLoading(true);
    try {
      const { data: loadedPkgs, error: pkgErr } = await supabase
        .from("regional_invoice_packages")
        .select("id, invoice_id, package_name, quantity, weight, cubic_metre, loading_status")
        .eq("container_running_number", container.runningNumber)
        .eq("loading_status", "LOADED");

      if (pkgErr) throw pkgErr;
      setPackages((loadedPkgs as PackageRow[]) || []);

      const invoiceIds = [...new Set((loadedPkgs || []).map((p) => p.invoice_id))];

      if (invoiceIds.length > 0) {
        const { data: invData, error: invErr } = await supabase
          .from("regional_invoices")
          .select("id, invoice_number, shipper_name, consignee_name, consignee_address, consignee_city, consignee_mobile, total_packages, total_volume, total_weight, net, payment_status, warehouse, description")
          .in("id", invoiceIds)
          .order("invoice_number", { ascending: true });

        if (invErr) throw invErr;
        setInvoices(invData || []);
      } else {
        setInvoices([]);
      }

      // Load saved confirm date from localStorage
      const savedConfirm = localStorage.getItem(`manifest_confirm_${container.runningNumber}`);
      if (savedConfirm) setConfirmDate(savedConfirm);
    } catch (error) {
      console.error("Error fetching manifest data:", error);
      toast.error("Failed to load manifest data");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminRemovePackage = async (pkgId: string) => {
    if (!window.confirm("Remove this package from the manifest? It will revert to PENDING status.")) return;
    try {
      const { error } = await supabase
        .from("regional_invoice_packages")
        .update({
          loading_status: "PENDING",
          container_running_number: null,
          loaded_at: null,
          loaded_by: null,
        })
        .eq("id", pkgId);

      if (error) throw error;
      toast.success("Package removed from manifest, status reverted to PENDING");
      await fetchManifestData();
    } catch (error: any) {
      toast.error(`Failed to remove package: ${error?.message || error}`);
    }
  };

  const zones = ["Colombo", "Galle", "Kurunegala"];
  const getZoneData = () => {
    return zones.map((zone) => {
      const zoneInvoices = invoices.filter((i) =>
        i.warehouse?.toLowerCase().includes(zone.toLowerCase())
      );
      const cats = VOLUME_CATEGORIES.map((cat) => {
        const zoneInvIds = zoneInvoices.map((inv) => inv.id);
        const zonePkgs = packages.filter((p) => zoneInvIds.includes(p.invoice_id));
        const catPkgs = zonePkgs.filter((p) => {
          const vol = p.cubic_metre || 0;
          return vol >= cat.min && vol < cat.max;
        });
        const pkgs = catPkgs.length;
        const vol = catPkgs.reduce((s, p) => s + (p.cubic_metre || 0), 0);
        return { pkgs, vol };
      });
      const zoneInvIds = zoneInvoices.map((inv) => inv.id);
      const zonePkgs = packages.filter((p) => zoneInvIds.includes(p.invoice_id));
      const totalPkgs = zonePkgs.length;
      const totalVol = zonePkgs.reduce((s, p) => s + (p.cubic_metre || 0), 0);
      return { zone, cats, totalPkgs, totalVol };
    });
  };

  const getItemSummary = () => {
    const itemMap: Record<string, { qty: number; vol: number }> = {};
    packages.forEach((pkg) => {
      const name = (pkg.package_name || "UNKNOWN ITEM").toUpperCase();
      if (!itemMap[name]) itemMap[name] = { qty: 0, vol: 0 };
      itemMap[name].qty += pkg.quantity || 1;
      itemMap[name].vol += pkg.cubic_metre || 0;
    });
    return Object.entries(itemMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, data], i) => ({ num: i + 1, name, ...data }));
  };

  // Warehouse/Zone summary
  const getWarehouseZoneSummary = () => {
    const zoneMap: Record<string, { qty: number; vol: number }> = {};
    invoices.forEach((inv) => {
      const zone = inv.warehouse?.replace(/\s*UPB\s*WAREHOUSE/i, "").trim() || "Unknown";
      const invPkgs = packages.filter((p) => p.invoice_id === inv.id);
      if (!zoneMap[zone]) zoneMap[zone] = { qty: 0, vol: 0 };
      zoneMap[zone].qty += invPkgs.length;
      zoneMap[zone].vol += invPkgs.reduce((s, p) => s + (p.cubic_metre || 0), 0);
    });
    return Object.entries(zoneMap).map(([zone, data], i) => ({ num: i + 1, zone, ...data }));
  };

  const totalPackages = packages.length;
  const totalVolume = packages.reduce((s, p) => s + (p.cubic_metre || 0), 0);
  const totalWeight = packages.reduce((s, p) => s + (p.weight || 0), 0);

  const handleSaveManifest = async () => {
    setSaving(true);
    try {
      // Save manifest data to localStorage
      const manifestData = {
        containerRunningNumber: String(container.runningNumber),
        confirmDate,
        totalPackages,
        totalVolume,
        totalWeight,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(`manifest_data_${container.runningNumber}`, JSON.stringify(manifestData));
      if (confirmDate) {
        localStorage.setItem(`manifest_confirm_${container.runningNumber}`, confirmDate);
      }

      // Ensure all invoices have container_running_number as string
      const invoiceIds = [...new Set(packages.map((p) => p.invoice_id))];
      if (invoiceIds.length > 0) {
        const { error: invErr } = await supabase
          .from("regional_invoices")
          .update({
            container_running_number: String(container.runningNumber),
            loaded_at: new Date().toISOString(),
          })
          .in("id", invoiceIds);

        if (invErr) {
          console.error("Supabase save error (invoices):", invErr);
          toast.error(`Failed to sync invoices: ${invErr.message}`);
          return;
        }
      }

      toast.success("Manifest saved successfully");
    } catch (error: any) {
      console.error("Save manifest error:", error);
      toast.error(`Failed to save manifest: ${error?.message || error}`);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmManifest = () => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit", month: "2-digit", year: "numeric",
    });
    setConfirmDate(today);
    localStorage.setItem(`manifest_confirm_${container.runningNumber}`, today);
    toast.success("Manifest confirmed for Customs on " + today);
  };

  const handleReconfirmManifest = () => {
    if (!window.confirm("Are you sure you want to re-confirm the manifest with today's date?")) return;
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit", month: "2-digit", year: "numeric",
    });
    setConfirmDate(today);
    localStorage.setItem(`manifest_confirm_${container.runningNumber}`, today);
    toast.success("Manifest re-confirmed on " + today);
  };

  const handleDeleteManifest = async () => {
    if (!window.confirm("Are you sure you want to DELETE this manifest? All loaded packages will be unloaded.")) return;
    try {
      // Revert all packages to PENDING
      const { error } = await supabase
        .from("regional_invoice_packages")
        .update({
          loading_status: "PENDING",
          container_running_number: null,
          loaded_at: null,
          loaded_by: null,
        })
        .eq("container_running_number", container.runningNumber)
        .eq("loading_status", "LOADED");

      if (error) throw error;

      localStorage.removeItem(`manifest_confirm_${container.runningNumber}`);
      localStorage.removeItem(`manifest_data_${container.runningNumber}`);
      toast.success("Manifest deleted. All packages reverted to PENDING.");
      onBack();
    } catch (error: any) {
      toast.error(`Failed to delete manifest: ${error?.message || error}`);
    }
  };

  const handlePrint = () => {
    const style = document.createElement("style");
    style.id = "manifest-print-style";
    style.textContent = `
      @media print {
        @page { size: A4 landscape; margin: 1cm; }
        body * { visibility: hidden; }
        #manifest-print-area, #manifest-print-area * { visibility: visible; }
        #manifest-print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          margin: 0 auto;
          padding: 0;
          font-size: 8.5pt;
        }
        #manifest-print-area table {
          width: 100% !important;
          table-layout: fixed;
          border-collapse: collapse;
        }
        #manifest-print-area table th,
        #manifest-print-area table td {
          padding: 2px 3px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        #manifest-print-area table tr {
          page-break-inside: avoid;
        }
        #manifest-print-area .bg-blue-600,
        #manifest-print-area .bg-blue-100,
        #manifest-print-area .bg-green-100,
        #manifest-print-area .bg-gray-100,
        #manifest-print-area .bg-gray-50 {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => {
      document.getElementById("manifest-print-style")?.remove();
    }, 500);
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    toast.info("Generating A4 Landscape PDF...");
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgRatio = canvas.width / canvas.height;
      let w = pdfW - 16;
      let h = w / imgRatio;
      if (h > pdfH - 16) {
        h = pdfH - 16;
        w = h * imgRatio;
      }
      const containerNum = container.containerNumber || container.runningNumber;
      pdf.addImage(imgData, "PNG", 8, 8, w, h);
      pdf.save(`Sea_Cargo_Manifest_${containerNum}_${new Date().toISOString().slice(0, 10)}.pdf`);
      toast.success("PDF downloaded successfully");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF");
    }
  };

  if (loading || authLoading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="animate-spin mx-auto mb-2" size={32} />
        <p className="text-gray-500">Loading manifest data...</p>
      </div>
    );
  }

  const isConfirmed = !!confirmDate;
  const zoneData = getZoneData();
  const itemSummary = getItemSummary();
  const warehouseZoneSummary = getWarehouseZoneSummary();
  const totalZone = {
    cats: VOLUME_CATEGORIES.map((_, ci) => ({
      pkgs: zoneData.reduce((s, z) => s + z.cats[ci].pkgs, 0),
      vol: zoneData.reduce((s, z) => s + z.cats[ci].vol, 0),
    })),
    totalPkgs: zoneData.reduce((s, z) => s + z.totalPkgs, 0),
    totalVol: zoneData.reduce((s, z) => s + z.totalVol, 0),
  };

  const unsettledInvoices = invoices.filter(
    (inv) => inv.payment_status !== "PAID" && inv.payment_status !== "Fully Paid"
  );

  // D2D invoices (door to door)
  const d2dInvoices = invoices.filter((inv) => {
    const desc = inv.description?.toLowerCase() || "";
    return desc.includes("d2d") || desc.includes("door");
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Action buttons */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50 flex-wrap gap-2">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} /> Go Back
        </Button>
        <div className="flex gap-2 flex-wrap">
          {/* SAVE button - visible to all before confirm, admin only after */}
          {(!isConfirmed || isAdmin) && (
            <Button
              onClick={handleSaveManifest}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <Save size={16} /> {saving ? "Saving..." : "Save Manifest"}
            </Button>
          )}

          {/* Admin-only edit button */}
          {isAdmin && isConfirmed && (
            <Button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 ${editMode ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"}`}
            >
              <Edit size={16} /> {editMode ? "Exit Edit Mode" : "Edit Confirmed Manifest"}
            </Button>
          )}

          {/* Confirm / Reconfirm */}
          {!isConfirmed ? (
            // Before confirm: admin and staff can confirm
            <Button onClick={handleConfirmManifest} className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
              <CheckCircle2 size={16} /> Confirm Manifest
            </Button>
          ) : (
            <>
              <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded font-medium text-sm border border-green-300">
                <CheckCircle2 size={16} /> Confirmed: {confirmDate}
              </span>
              {/* Admin only: Reconfirm */}
              {isAdmin && (
                <Button onClick={handleReconfirmManifest} className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
                  <CheckCircle2 size={16} /> Re-Confirm
                </Button>
              )}
            </>
          )}

          {/* Print - always visible for everyone */}
          <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Printer size={16} /> Print
          </Button>

          {/* Print D2D - hidden for staff after confirm */}
          {(!isConfirmed || isAdmin) && (
            <Button onClick={handlePrint} className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
              <Printer size={16} /> Print D2D
            </Button>
          )}

          {/* Print D2D Bulk BLs - hidden for staff after confirm */}
          {(!isConfirmed || isAdmin) && (
            <Button onClick={handlePrint} className="bg-teal-700 hover:bg-teal-800 flex items-center gap-2">
              <Printer size={16} /> Print D2D Bulk BLs
            </Button>
          )}

          {/* Download PDF - hidden for staff after confirm */}
          {(!isConfirmed || isAdmin) && (
            <Button onClick={handleDownloadPDF} className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
              <Download size={16} /> Download PDF
            </Button>
          )}

          {/* Delete - admin only */}
          {isAdmin && (
            <Button onClick={handleDeleteManifest} variant="destructive" className="flex items-center gap-2">
              <Trash2 size={16} /> Delete Manifest
            </Button>
          )}
        </div>
      </div>

      <div id="manifest-print-area" ref={printRef} className="p-4">
        {/* Header with title and QR code */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-green-700 font-bold text-lg">Manifest Sea Cargo</h2>
          <div className="flex flex-col items-center">
            <QRCodeSVG
              value={`https://soqotralog.com/manifest/${container.containerNumber || container.runningNumber}`}
              size={80}
              level="M"
            />
            <span className="text-[8px] text-gray-500 mt-0.5">Scan to verify</span>
          </div>
        </div>

        {/* Vessel Details */}
        <div className="border border-gray-300 mb-4">
          <div className="bg-blue-600 text-white text-center font-bold py-1.5 text-sm">VESSEL DETAILS</div>
          <div className="grid grid-cols-2 text-sm">
            <div className="border-r border-b border-gray-300">
              <div className="grid grid-cols-[140px_1fr]">
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">SECTOR:</div>
                <div className="border-b border-gray-200 px-2 py-1">{vessel?.sector || container.sector}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">RUNNING NUMBER:</div>
                <div className="border-b border-gray-200 px-2 py-1">{vessel?.runningNumber || "-"}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">VESSEL NAME:</div>
                <div className="border-b border-gray-200 px-2 py-1">{vessel?.vesselName || "-"}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">VOYAGE:</div>
                <div className="border-b border-gray-200 px-2 py-1">{vessel?.voyage || "-"}</div>
                <div className="border-r border-gray-200 px-2 py-1 font-medium">DATE CONFIRM:</div>
                <div className={`px-2 py-1 ${confirmDate ? "text-green-700 font-bold" : ""}`}>{confirmDate || vessel?.loadDate || "-"}</div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-[140px_1fr]">
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">P.O.L:</div>
                <div className="border-b border-gray-200 px-2 py-1">{vessel?.portOfLoading || "HAMAD SEA PORT"}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">P.O.D:</div>
                <div className="border-b border-gray-200 px-2 py-1">{vessel?.portOfDischarge || "COLOMBO"}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">DIRECT/ MIX:</div>
                <div className="border-b border-gray-200 px-2 py-1">{vessel?.direction || container.direction}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">E.T.D:</div>
                <div className="border-b border-gray-200 px-2 py-1">{vessel?.etd || container.etd}</div>
                <div className="border-r border-gray-200 px-2 py-1 font-medium">E.T.A:</div>
                <div className="px-2 py-1">{vessel?.eta || container.eta}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Container Details */}
        <div className="border border-gray-300 mb-4">
          <div className="bg-blue-600 text-white text-center font-bold py-1.5 text-sm">
            {container.runningNumber} CONTAINER DETAILS:- {container.containerNumber}
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="border-r border-gray-300">
              <div className="grid grid-cols-[160px_1fr]">
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">RUNNING NUMBER:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.runningNumber}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">PACKAGES:</div>
                <div className="border-b border-gray-200 px-2 py-1">{totalPackages}</div>
                <div className="border-r border-gray-200 px-2 py-1 font-medium">VOLUME:</div>
                <div className="px-2 py-1">{totalVolume.toFixed(3)}</div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-[160px_1fr]">
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">SEAL NUMBER:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.sealNumber}</div>
                <div className="border-b border-r border-gray-200 px-2 py-1 font-medium">CONTAINER TYPE:</div>
                <div className="border-b border-gray-200 px-2 py-1">{container.containerType}</div>
                <div className="border-r border-gray-200 px-2 py-1 font-medium">CONTAINER WEIGHT:</div>
                <div className="px-2 py-1">{totalWeight.toFixed(0)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Volume Breakdown */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1 bg-gray-100 font-bold" rowSpan={2}>Zone</th>
                {VOLUME_CATEGORIES.map((cat) => (
                  <th key={cat.label} className="border border-gray-300 px-1 py-1 bg-blue-100 text-blue-800 font-bold text-center" colSpan={3}>
                    {cat.label}
                  </th>
                ))}
                <th className="border border-gray-300 px-1 py-1 bg-green-100 text-green-800 font-bold text-center" colSpan={3}>Total</th>
              </tr>
              <tr>
                {[...VOLUME_CATEGORIES, { label: "Total" }].map((cat) => (
                  <React.Fragment key={`hdr-${cat.label}`}>
                    <th className="border border-gray-300 px-1 py-1 bg-gray-50 text-center font-medium">Pkgs</th>
                    <th className="border border-gray-300 px-1 py-1 bg-gray-50 text-center font-medium">Vol</th>
                    <th className="border border-gray-300 px-1 py-1 bg-gray-50 text-center font-medium">%</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {zoneData.map((z) => (
                <tr key={z.zone}>
                  <td className="border border-gray-300 px-2 py-1 font-medium bg-gray-50">{z.zone}</td>
                  {z.cats.map((cat, ci) => (
                    <React.Fragment key={ci}>
                      <td className="border border-gray-300 px-1 py-1 text-center">{cat.pkgs}</td>
                      <td className="border border-gray-300 px-1 py-1 text-center">{cat.vol.toFixed(3)}</td>
                      <td className="border border-gray-300 px-1 py-1 text-center">
                        {totalZone.totalVol > 0 ? ((cat.vol / totalZone.totalVol) * 100).toFixed(1) : "0.0"}
                      </td>
                    </React.Fragment>
                  ))}
                  <td className="border border-gray-300 px-1 py-1 text-center font-medium">{z.totalPkgs}</td>
                  <td className="border border-gray-300 px-1 py-1 text-center font-medium">{z.totalVol.toFixed(3)}</td>
                  <td className="border border-gray-300 px-1 py-1 text-center font-medium">
                    {totalZone.totalVol > 0 ? ((z.totalVol / totalZone.totalVol) * 100).toFixed(1) : "0.0"}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-100">
                <td className="border border-gray-300 px-2 py-1">Total :</td>
                {totalZone.cats.map((cat, ci) => (
                  <React.Fragment key={ci}>
                    <td className="border border-gray-300 px-1 py-1 text-center">{cat.pkgs}</td>
                    <td className="border border-gray-300 px-1 py-1 text-center">{cat.vol.toFixed(3)}</td>
                    <td className="border border-gray-300 px-1 py-1 text-center">
                      {totalZone.totalVol > 0 ? ((cat.vol / totalZone.totalVol) * 100).toFixed(1) : "0.0"}
                    </td>
                  </React.Fragment>
                ))}
                <td className="border border-gray-300 px-1 py-1 text-center">{totalZone.totalPkgs}</td>
                <td className="border border-gray-300 px-1 py-1 text-center">{totalZone.totalVol.toFixed(3)}</td>
                <td className="border border-gray-300 px-1 py-1 text-center">100.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cargo List */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border px-2 py-1.5 text-left">Num</th>
                <th className="border px-2 py-1.5 text-left">INVOICE</th>
                <th className="border px-2 py-1.5 text-left">W/H</th>
                <th className="border px-2 py-1.5 text-left">SHIPPER</th>
                <th className="border px-2 py-1.5 text-left">PPT.No</th>
                <th className="border px-2 py-1.5 text-left">CONSIGNEE</th>
                <th className="border px-2 py-1.5 text-left">PKG</th>
                <th className="border px-2 py-1.5 text-right">WGHT</th>
                <th className="border px-2 py-1.5 text-right">VOL</th>
                <th className="border px-2 py-1.5 text-left">LNO</th>
                <th className="border px-2 py-1.5 text-left">P/F</th>
                <th className="border px-2 py-1.5 text-left">CRNO</th>
                <th className="border px-2 py-1.5 text-left">PAY</th>
                {editMode && <th className="border px-2 py-1.5 text-center">Action</th>}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const invPkgs = packages.filter((p) => p.invoice_id === inv.id);
                const warehouseCode = inv.warehouse?.charAt(0)?.toUpperCase() || "";
                return (
                  <tr key={inv.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1">{i + 1}</td>
                    <td className="border px-2 py-1 font-medium">{inv.invoice_number}</td>
                    <td className="border px-2 py-1">{warehouseCode}</td>
                    <td className="border px-2 py-1 text-[11px]">
                      <div className="font-medium">{inv.shipper_name}</div>
                    </td>
                    <td className="border px-2 py-1"></td>
                    <td className="border px-2 py-1 text-[11px]">
                      <div className="font-medium">{inv.consignee_name}</div>
                      <div className="text-gray-500">{inv.consignee_address}</div>
                      <div className="text-gray-500">{inv.consignee_city}</div>
                    </td>
                    <td className="border px-2 py-1 text-[11px]">
                      {invPkgs.map((p) => (
                        <div key={p.id}>{p.package_name || "UNKNOWN ITEM"}</div>
                      ))}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {invPkgs.map((p) => (
                        <div key={p.id}>{(p.weight || 0).toFixed(2)}</div>
                      ))}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {invPkgs.map((p) => (
                        <div key={p.id}>{(p.cubic_metre || 0).toFixed(3)}</div>
                      ))}
                    </td>
                    <td className="border px-2 py-1 text-[11px]">
                      {invPkgs.map((p, pi) => (
                        <div key={p.id}>{pi + 1}/{invPkgs.length}</div>
                      ))}
                    </td>
                    <td className="border px-2 py-1">
                      {invPkgs.length === (inv.total_packages || 0) ? "Full" : "Partial"}
                    </td>
                    <td className="border px-2 py-1">{container.runningNumber}</td>
                    <td className="border px-2 py-1 text-[11px]">
                      {inv.payment_status === "PAID" || inv.payment_status === "Fully Paid" ? "Fully Paid" : ""}
                    </td>
                    {editMode && (
                      <td className="border px-2 py-1 text-center">
                        {invPkgs.map((p) => (
                          <div key={p.id} className="mb-1">
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-5 text-[10px] px-1"
                              onClick={() => handleAdminRemovePackage(p.id)}
                            >
                              <X size={10} className="mr-0.5" /> {p.package_name?.substring(0, 8)}
                            </Button>
                          </div>
                        ))}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold text-xs">
                <td className="border px-2 py-1" colSpan={6}>Total :</td>
                <td className="border px-2 py-1">{packages.length}</td>
                <td className="border px-2 py-1 text-right">{totalWeight.toFixed(2)}</td>
                <td className="border px-2 py-1 text-right">{totalVolume.toFixed(3)}</td>
                <td className="border px-2 py-1" colSpan={editMode ? 5 : 4}></td>
              </tr>
            </tfoot>
          </table>
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
                <td className="border px-2 py-1 text-right font-bold" colSpan={2}>TOTAL:</td>
                <td className="border px-2 py-1 text-right">
                  {itemSummary.reduce((s, i) => s + i.qty, 0)}
                </td>
                <td className="border px-2 py-1 text-right">
                  {itemSummary.reduce((s, i) => s + i.vol, 0).toFixed(3)}
                </td>
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
                <td className="border px-2 py-1 text-right font-bold" colSpan={2}>TOTAL:</td>
                <td className="border px-2 py-1 text-right">
                  {warehouseZoneSummary.reduce((s, i) => s + i.qty, 0)}
                </td>
                <td className="border px-2 py-1 text-right">
                  {warehouseZoneSummary.reduce((s, i) => s + i.vol, 0).toFixed(3)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Unsettled Invoices */}
        {unsettledInvoices.length > 0 && (
          <div className="mb-4">
            <table className="w-full max-w-3xl mx-auto border-collapse text-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border px-2 py-1.5 text-center" colSpan={7}>UNSETTLED INVOICES</th>
                </tr>
                <tr className="bg-blue-500 text-white">
                  <th className="border px-2 py-1.5 text-center">Num</th>
                  <th className="border px-2 py-1.5 text-center">GY</th>
                  <th className="border px-2 py-1.5 text-left">SHIPPER</th>
                  <th className="border px-2 py-1.5 text-left">CONSIGNEE</th>
                  <th className="border px-2 py-1.5 text-right">NET</th>
                  <th className="border px-2 py-1.5 text-right">PAID</th>
                  <th className="border px-2 py-1.5 text-right">DUE</th>
                </tr>
              </thead>
              <tbody>
                {unsettledInvoices.map((inv, i) => (
                  <tr key={inv.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1 text-center">{i + 1}</td>
                    <td className="border px-2 py-1 text-center">{inv.invoice_number}</td>
                    <td className="border px-2 py-1">{inv.shipper_name}</td>
                    <td className="border px-2 py-1">{inv.consignee_name}</td>
                    <td className="border px-2 py-1 text-right">{(inv.net || 0).toFixed(0)}</td>
                    <td className="border px-2 py-1 text-right">0</td>
                    <td className="border px-2 py-1 text-right">{(inv.net || 0).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* D2D List */}
        <div className="mb-4">
          <table className="w-full max-w-3xl mx-auto border-collapse text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border px-2 py-1.5 text-center" colSpan={4}>D2D LIST</th>
              </tr>
              <tr className="bg-blue-500 text-white">
                <th className="border px-2 py-1.5 text-center">Num</th>
                <th className="border px-2 py-1.5 text-center">GY</th>
                <th className="border px-2 py-1.5 text-left">NAME</th>
                <th className="border px-2 py-1.5 text-left">MASTER</th>
              </tr>
            </thead>
            <tbody>
              {d2dInvoices.length > 0 ? d2dInvoices.map((inv, i) => (
                <tr key={inv.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-2 py-1 text-center">{i + 1}</td>
                  <td className="border px-2 py-1 text-center">{inv.invoice_number}</td>
                  <td className="border px-2 py-1">{inv.consignee_name}</td>
                  <td className="border px-2 py-1">{inv.shipper_name}</td>
                </tr>
              )) : (
                <tr>
                  <td className="border px-2 py-1 text-center text-gray-400" colSpan={4}>No D2D records</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeaCargoManifest;
