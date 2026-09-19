import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RoroShipment, RoroShipmentInput } from "../../types/roroTypes";

interface Props {
  open: boolean;
  shipment: RoroShipment | null;
  defaultSr?: number;
  onClose: () => void;
  onSave: (input: RoroShipmentInput) => Promise<void>;
}

const emptyForm: RoroShipmentInput = {
  sr: null,
  plate: "",
  consignee: "",
  passport: "",
  description: "",
  model: null,
  colour: "",
  chassis: "",
  cbm: 0,
  weight: 0,
  bl: "",
  vessel: "",
  loading_status: "",
  swb_issued: false,
  released: false,
  freight: 0,
  storage_charges: 0,
  amount_paid: 0,
  notes: "",
  sector: "LA GOULETTE",
};

const RoroEditDialog: React.FC<Props> = ({ open, shipment, defaultSr, onClose, onSave }) => {
  const [form, setForm] = useState<RoroShipmentInput>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (shipment) {
      const { id, created_at, updated_at, ...rest } = shipment;
      setForm(rest);
    } else {
      setForm({ ...emptyForm, sr: defaultSr ?? null });
    }
  }, [open, shipment, defaultSr]);

  const set = (key: keyof RoroShipmentInput, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  const total = Number(form.freight || 0) + Number(form.storage_charges || 0);
  const balance = total - Number(form.amount_paid || 0);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{shipment ? `Edit Vehicle — ${String(shipment.plate || "")}` : "Add Vehicle Shipment"}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>SR No.</Label>
            <Input type="number" value={String(form.sr ?? "")} onChange={(e) => set("sr", e.target.value ? Number(e.target.value) : null)} />
          </div>
          <div>
            <Label>Export Plate</Label>
            <Input value={String(form.plate ?? "")} onChange={(e) => set("plate", e.target.value)} />
          </div>
          <div>
            <Label>B/L Number</Label>
            <Input value={String(form.bl ?? "")} onChange={(e) => set("bl", e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <Label>Consignee</Label>
            <Input value={String(form.consignee ?? "")} onChange={(e) => set("consignee", e.target.value)} />
          </div>
          <div>
            <Label>Passport / ID</Label>
            <Input value={String(form.passport ?? "")} onChange={(e) => set("passport", e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <Label>Vehicle Description</Label>
            <Input value={String(form.description ?? "")} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div>
            <Label>Model Year</Label>
            <Input type="number" value={String(form.model ?? "")} onChange={(e) => set("model", e.target.value ? Number(e.target.value) : null)} />
          </div>

          <div>
            <Label>Colour</Label>
            <Input value={String(form.colour ?? "")} onChange={(e) => set("colour", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Chassis Number</Label>
            <Input value={String(form.chassis ?? "")} onChange={(e) => set("chassis", e.target.value)} />
          </div>

          <div>
            <Label>CBM</Label>
            <Input type="number" step="0.001" value={String(form.cbm ?? 0)} onChange={(e) => set("cbm", Number(e.target.value))} />
          </div>
          <div>
            <Label>Weight (KG)</Label>
            <Input type="number" value={String(form.weight ?? 0)} onChange={(e) => set("weight", Number(e.target.value))} />
          </div>
          <div>
            <Label>Vessel / Voyage</Label>
            <Input value={String(form.vessel ?? "")} onChange={(e) => set("vessel", e.target.value)} />
          </div>

          <div>
            <Label>Loading Status</Label>
            <Input value={String(form.loading_status ?? "")} onChange={(e) => set("loading_status", e.target.value)} placeholder="LOADED" />
          </div>
          <div>
            <Label>Freight (QAR)</Label>
            <Input type="number" value={String(form.freight ?? 0)} onChange={(e) => set("freight", Number(e.target.value))} />
          </div>
          <div>
            <Label>Storage (QAR)</Label>
            <Input type="number" value={String(form.storage_charges ?? 0)} onChange={(e) => set("storage_charges", Number(e.target.value))} />
          </div>

          <div>
            <Label>Amount Paid (QAR)</Label>
            <Input type="number" value={String(form.amount_paid ?? 0)} onChange={(e) => set("amount_paid", Number(e.target.value))} />
          </div>
          <div className="flex items-end gap-6 md:col-span-2">
            <div className="flex items-center gap-2">
              <Switch checked={!!form.swb_issued} onCheckedChange={(v) => set("swb_issued", v)} />
              <Label>SWB Issued</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={!!form.released} onCheckedChange={(v) => set("released", v)} />
              <Label>Released</Label>
            </div>
          </div>

          <div className="md:col-span-3">
            <Label>Notes</Label>
            <Textarea value={String(form.notes ?? "")} onChange={(e) => set("notes", e.target.value)} />
          </div>
        </div>

        <div className="rounded-md bg-muted p-3 text-sm flex gap-6">
          <span>Total: <strong>QAR {total.toLocaleString()}</strong></span>
          <span>Balance: <strong className={balance > 0 ? "text-destructive" : "text-primary"}>QAR {balance.toLocaleString()}</strong></span>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !String(form.consignee || "").trim()}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoroEditDialog;
