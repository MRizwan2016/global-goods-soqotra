import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Package, RefreshCw, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

interface CargoItem {
  id: string;
  invoice_number: string;
  customer_name: string;
  cargo_description: string | null;
  origin: string | null;
  destination: string | null;
  current_status: string;
  notes: string | null;
  created_at: string;
}

const statusOptions = [
  { value: "collected", label: "Collected" },
  { value: "loaded", label: "Loaded" },
  { value: "in_transit", label: "In Transit" },
  { value: "arrived", label: "Arrived" },
  { value: "clearance", label: "Clearance" },
  { value: "processing", label: "Processing" },
  { value: "delivered", label: "Delivered" },
];

const statusColors: Record<string, string> = {
  collected: "bg-amber-50 text-amber-700 border-amber-200",
  loaded: "bg-blue-50 text-blue-700 border-blue-200",
  in_transit: "bg-indigo-50 text-indigo-700 border-indigo-200",
  arrived: "bg-purple-50 text-purple-700 border-purple-200",
  clearance: "bg-orange-50 text-orange-700 border-orange-200",
  processing: "bg-cyan-50 text-cyan-700 border-cyan-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
};

const StaffDashboard = () => {
  const [shipments, setShipments] = useState<CargoItem[]>([]);
  const [filtered, setFiltered] = useState<CargoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editingCargo, setEditingCargo] = useState<CargoItem | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchShipments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cargo_tracking")
      .select("id, invoice_number, customer_name, cargo_description, origin, destination, current_status, notes, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setShipments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  useEffect(() => {
    let result = shipments;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (s) => s.invoice_number.toLowerCase().includes(term) || s.customer_name.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((s) => s.current_status === statusFilter);
    }
    setFiltered(result);
  }, [searchTerm, statusFilter, shipments]);

  const handleUpdateStatus = async () => {
    if (!editingCargo || !newStatus) return;
    setUpdating(true);

    // Build the update object with the new status and date field
    const statusDateMap: Record<string, string> = {
      collected: "collection_date",
      loaded: "loaded_date",
      in_transit: "in_transit_date",
      arrived: "arrival_date",
      clearance: "clearance_date",
      processing: "processing_date",
      delivered: "delivery_date",
    };

    const updateData: Record<string, unknown> = {
      current_status: newStatus,
      notes: newNotes || editingCargo.notes,
    };

    const dateField = statusDateMap[newStatus];
    if (dateField) {
      updateData[dateField] = new Date().toISOString();
    }

    const { error } = await supabase
      .from("cargo_tracking")
      .update(updateData)
      .eq("id", editingCargo.id);

    if (error) {
      toast.error("Failed to update status: " + error.message);
    } else {
      toast.success(`Status updated to "${statusOptions.find((s) => s.value === newStatus)?.label}" for ${editingCargo.invoice_number}`);
      setEditingCargo(null);
      fetchShipments();
    }
    setUpdating(false);
  };

  const openEdit = (cargo: CargoItem) => {
    setEditingCargo(cargo);
    setNewStatus(cargo.current_status);
    setNewNotes(cargo.notes || "");
  };

  return (
    <Layout title="Staff Dashboard">
      <PageBreadcrumb className="mb-4" />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-[#f0f3f8] border-b border-[#d6dce8]">
          <h3 className="text-lg font-medium text-[#1e2a3a]">Staff Dashboard — Cargo Status Management</h3>
        </div>

        <div className="p-4 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={fetchShipments} className="gap-1.5">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading shipments...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-10 w-10 mx-auto mb-2 opacity-40" />
              No shipments found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((cargo, idx) => (
                    <TableRow key={cargo.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell className="font-medium">{cargo.invoice_number}</TableCell>
                      <TableCell>{cargo.customer_name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{cargo.origin} → {cargo.destination}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[cargo.current_status] || ""}>
                          {statusOptions.find((s) => s.value === cargo.current_status)?.label || cargo.current_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => openEdit(cargo)}>
                          <Edit className="h-3.5 w-3.5" /> Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingCargo} onOpenChange={(open) => !open && setEditingCargo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Cargo Status</DialogTitle>
          </DialogHeader>
          {editingCargo && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded p-3 text-sm space-y-1">
                <p><strong>Invoice:</strong> {editingCargo.invoice_number}</p>
                <p><strong>Customer:</strong> {editingCargo.customer_name}</p>
                <p><strong>Current Status:</strong> {statusOptions.find((s) => s.value === editingCargo.current_status)?.label}</p>
              </div>
              <div className="space-y-2">
                <Label>New Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes (optional)</Label>
                <Textarea value={newNotes} onChange={(e) => setNewNotes(e.target.value)} placeholder="Add notes about this status change..." />
              </div>
              <Button onClick={handleUpdateStatus} disabled={updating} className="w-full bg-[#1a365d] hover:bg-[#2d4a7a]">
                {updating ? "Updating..." : "Update Status"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default StaffDashboard;
