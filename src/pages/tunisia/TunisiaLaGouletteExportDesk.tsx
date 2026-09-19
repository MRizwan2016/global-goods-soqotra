import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import CountryBackButton from "@/components/ui/country-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Pencil, Trash2, Eye, Upload, FileText, FileDown, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { TunisiaRoroService } from "./services/TunisiaRoroService";
import { RoroShipment, RoroShipmentInput, roroBalance, roroTotal } from "./types/roroTypes";
import RoroEditDialog from "./components/roro/RoroEditDialog";
import RoroPreviewDialog from "./components/roro/RoroPreviewDialog";

type FilterKey =
  | "all" | "released" | "pending" | "swb-issued" | "swb-pending" | "balance" | "doc-missing";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All shipments" },
  { key: "released", label: "Released" },
  { key: "pending", label: "Pending release" },
  { key: "swb-issued", label: "SWB issued" },
  { key: "swb-pending", label: "SWB pending" },
  { key: "balance", label: "Balance outstanding" },
  { key: "doc-missing", label: "SWB doc missing" },
];

const safeStr = (v: unknown) => (v === null || v === undefined ? "" : String(v));

const TunisiaLaGouletteExportDesk: React.FC = () => {
  const [rows, setRows] = useState<RoroShipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [vesselFilter, setVesselFilter] = useState("all");

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<RoroShipment | null>(null);
  const [nextSr, setNextSr] = useState<number | undefined>(undefined);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewing, setPreviewing] = useState<RoroShipment | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<RoroShipment | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const uploadTarget = useRef<RoroShipment | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setRows(await TunisiaRoroService.list());
    } catch (e) {
      console.error(e);
      toast.error("Could not load the shipment list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const vessels = useMemo(
    () => Array.from(new Set(rows.map((r) => safeStr(r.vessel)).filter(Boolean))).sort(),
    [rows]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (vesselFilter !== "all" && safeStr(r.vessel) !== vesselFilter) return false;

      const bal = roroBalance(r);
      if (filter === "released" && !r.released) return false;
      if (filter === "pending" && r.released) return false;
      if (filter === "swb-issued" && !r.swb_issued) return false;
      if (filter === "swb-pending" && r.swb_issued) return false;
      if (filter === "balance" && bal <= 0) return false;
      if (filter === "doc-missing" && (r.swb_doc_name || r.swb_doc_url)) return false;

      if (!term) return true;
      return [r.plate, r.consignee, r.description, r.chassis, r.bl, r.vessel, r.passport]
        .some((v) => safeStr(v).toLowerCase().includes(term));
    });
  }, [rows, search, filter, vesselFilter]);

  const stats = useMemo(() => {
    const released = rows.filter((r) => r.released).length;
    const swb = rows.filter((r) => r.swb_issued).length;
    const docs = rows.filter((r) => r.swb_doc_name || r.swb_doc_url).length;
    const fullyPaid = rows.filter((r) => roroBalance(r) <= 0).length;
    const outstanding = rows.reduce((sum, r) => sum + Math.max(0, roroBalance(r)), 0);
    return { total: rows.length, released, pending: rows.length - released, swb, docs, fullyPaid, outstanding };
  }, [rows]);

  const openAdd = async () => {
    try { setNextSr(await TunisiaRoroService.nextSr()); } catch { setNextSr(undefined); }
    setEditing(null);
    setEditOpen(true);
  };

  const handleSave = async (input: RoroShipmentInput) => {
    try {
      if (editing) {
        await TunisiaRoroService.update(editing.id, input);
        toast.success("Shipment updated.");
      } else {
        await TunisiaRoroService.create(input);
        toast.success("Shipment added.");
      }
      setEditOpen(false);
      setEditing(null);
      await load();
    } catch (e) {
      console.error(e);
      toast.error("Could not save the shipment.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await TunisiaRoroService.remove(deleteTarget.id);
      toast.success("Shipment deleted.");
      setDeleteTarget(null);
      await load();
    } catch (e) {
      console.error(e);
      toast.error("Could not delete. Only administrators can remove records.");
    }
  };

  const triggerUpload = (row: RoroShipment) => {
    uploadTarget.current = row;
    uploadRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const row = uploadTarget.current;
    e.target.value = "";
    if (!file || !row) return;
    try {
      await TunisiaRoroService.uploadSwbDocument(row, file);
      toast.success("SWB document uploaded.");
      await load();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    }
  };

  const exportCsv = () => {
    const head = ["SR", "PLATE", "CONSIGNEE", "PASSPORT", "VEHICLE", "MODEL", "COLOUR", "CHASSIS", "CBM", "WEIGHT", "BL", "VESSEL", "STATUS", "SWB", "RELEASED", "FREIGHT", "STORAGE", "TOTAL", "PAID", "BALANCE"];
    const lines = filtered.map((r) => [
      r.sr, r.plate, r.consignee, r.passport, r.description, r.model, r.colour, r.chassis,
      r.cbm, r.weight, r.bl, r.vessel, r.loading_status || "PENDING",
      r.swb_issued ? "ISSUED" : "PENDING", r.released ? "RELEASED" : "PENDING",
      r.freight, r.storage_charges, roroTotal(r), r.amount_paid, roroBalance(r),
    ].map((v) => `"${safeStr(v).replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([[head.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `la-goulette-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    { label: "Vehicles on manifest", value: stats.total, tone: "text-primary" },
    { label: "Released", value: stats.released, tone: "text-green-600" },
    { label: "Pending release", value: stats.pending, tone: "text-amber-600" },
    { label: "SWB issued", value: stats.swb, tone: "text-blue-600" },
    { label: "SWB docs uploaded", value: `${stats.docs}/${stats.total}`, tone: "text-indigo-600" },
    { label: "Fully paid", value: stats.fullyPaid, tone: "text-green-600" },
    { label: "Outstanding balance", value: `QAR ${stats.outstanding.toLocaleString()}`, tone: "text-destructive" },
  ];

  return (
    <Layout title="La Goulette Export Desk">
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <CountryBackButton />
          <h1 className="text-2xl md:text-3xl font-bold mt-3">LA GOULETTE EXPORT DESK</h1>
          <p className="text-muted-foreground text-sm">
            Doha, Qatar → La Goulette, Tunisia · RO-RO vehicle shipments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4 mr-2" /> Refresh</Button>
          <Button variant="outline" onClick={exportCsv}><FileDown className="h-4 w-4 mr-2" /> Export</Button>
          <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" /> Add Vehicle</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {statCards.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className={`text-xl font-bold ${c.tone}`}>{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-4">
        <CardContent className="p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search plate, consignee, chassis, B/L, vessel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as FilterKey)}>
            <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {FILTERS.map((f) => <SelectItem key={f.key} value={f.key}>{f.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={vesselFilter} onValueChange={setVesselFilter}>
            <SelectTrigger className="w-[260px]"><SelectValue placeholder="All vessels" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All vessels</SelectItem>
              {vessels.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">{filtered.length} shown</span>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted">
              <tr className="text-left">
                {["SR", "PLATE", "CONSIGNEE", "VEHICLE", "CHASSIS #", "B/L NO.", "VESSEL/VOYAGE", "SWB/DOCUMENT", "STATUS", "FREIGHT", "STORAGE", "TOTAL", "PAID", "BALANCE", "ACTIONS"].map((h) => (
                  <th key={h} className="px-3 py-2 whitespace-nowrap font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={15} className="px-3 py-8 text-center text-muted-foreground">Loading shipments...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={15} className="px-3 py-8 text-center text-muted-foreground">No shipments match this view.</td></tr>
              ) : filtered.map((r) => {
                const bal = roroBalance(r);
                return (
                  <tr key={r.id} className="border-t hover:bg-muted/50">
                    <td className="px-3 py-2">{safeStr(r.sr)}</td>
                    <td className="px-3 py-2 font-semibold">{safeStr(r.plate)}</td>
                    <td className="px-3 py-2 max-w-[220px] truncate" title={safeStr(r.consignee)}>{safeStr(r.consignee)}</td>
                    <td className="px-3 py-2 max-w-[200px] truncate" title={safeStr(r.description)}>
                      {safeStr(r.description)}
                      <div className="text-muted-foreground">{safeStr(r.colour)} · {Number(r.cbm || 0).toFixed(2)} CBM</div>
                    </td>
                    <td className="px-3 py-2 font-mono">{safeStr(r.chassis)}</td>
                    <td className="px-3 py-2">{safeStr(r.bl)}</td>
                    <td className="px-3 py-2 max-w-[180px] truncate" title={safeStr(r.vessel)}>{safeStr(r.vessel)}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col gap-1">
                        <Badge variant={r.swb_issued ? "default" : "secondary"} className="w-fit">
                          {r.swb_issued ? "SWB ISSUED" : "SWB PENDING"}
                        </Badge>
                        {r.swb_doc_url ? (
                          <button className="text-primary underline text-left" onClick={() => window.open(safeStr(r.swb_doc_url), "_blank")}>
                            <FileText className="h-3 w-3 inline mr-1" />View doc
                          </button>
                        ) : r.swb_doc_name ? (
                          <span className="text-muted-foreground truncate max-w-[150px]" title={safeStr(r.swb_doc_name)}>{safeStr(r.swb_doc_name)}</span>
                        ) : (
                          <span className="text-muted-foreground">No document</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <Badge variant={r.released ? "default" : "destructive"}>
                        {r.released ? "RELEASED" : "PENDING"}
                      </Badge>
                      {r.loading_status ? <div className="text-muted-foreground mt-1">{safeStr(r.loading_status)}</div> : null}
                    </td>
                    <td className="px-3 py-2">{Number(r.freight || 0).toLocaleString()}</td>
                    <td className="px-3 py-2">{Number(r.storage_charges || 0).toLocaleString()}</td>
                    <td className="px-3 py-2 font-semibold">{roroTotal(r).toLocaleString()}</td>
                    <td className="px-3 py-2 text-green-700">{Number(r.amount_paid || 0).toLocaleString()}</td>
                    <td className={`px-3 py-2 font-semibold ${bal > 0 ? "text-destructive" : "text-green-700"}`}>{bal.toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" title="Preview" onClick={() => { setPreviewing(r); setPreviewOpen(true); }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" title="Edit" onClick={() => { setEditing(r); setEditOpen(true); }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" title="Upload SWB document" onClick={() => triggerUpload(r)}>
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" title="Delete" onClick={() => setDeleteTarget(r)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <input ref={uploadRef} type="file" accept="application/pdf,image/*" className="hidden" onChange={handleUpload} />

      <RoroEditDialog
        key={editing?.id || "new"}
        open={editOpen}
        shipment={editing}
        defaultSr={nextSr}
        onClose={() => { setEditOpen(false); setEditing(null); }}
        onSave={handleSave}
      />

      <RoroPreviewDialog
        open={previewOpen}
        shipment={previewing}
        onClose={() => { setPreviewOpen(false); setPreviewing(null); }}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this shipment?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Plate ${safeStr(deleteTarget?.plate)} — ${safeStr(deleteTarget?.consignee)}. This cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default TunisiaLaGouletteExportDesk;
