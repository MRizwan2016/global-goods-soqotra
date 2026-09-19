import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, FileText } from "lucide-react";
import { RoroShipment, roroBalance, roroTotal } from "../../types/roroTypes";

interface Props {
  open: boolean;
  shipment: RoroShipment | null;
  onClose: () => void;
}

const Row: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between border-b border-dashed py-1 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const RoroPreviewDialog: React.FC<Props> = ({ open, shipment, onClose }) => {
  if (!shipment) return null;
  const s = shipment;

  const handlePrint = () => {
    const el = document.getElementById("roro-preview-sheet");
    if (!el) return;
    const win = window.open("", "_blank", "width=900,height=1000");
    if (!win) return;
    win.document.write(`<html><head><title>RORO Shipment ${String(s.plate || "")}</title>
      <style>
        @page { size: A4; margin: 12mm; }
        body { font-family: Arial, Helvetica, sans-serif; color: #111; }
        .sheet { border: 2px solid #111; padding: 14px; }
        h1 { font-size: 16px; text-align: center; margin: 0 0 4px; }
        h2 { font-size: 12px; text-align: center; margin: 0 0 12px; font-weight: normal; }
        .row { display: flex; justify-content: space-between; border-bottom: 1px dashed #999; padding: 4px 0; font-size: 12px; }
        .row span:last-child { font-weight: bold; }
      </style></head><body>${el.innerHTML}</body></html>`);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Shipment Preview</DialogTitle>
        </DialogHeader>

        <div id="roro-preview-sheet">
          <div className="sheet border-2 border-foreground p-4 rounded-sm">
            <h1 className="text-center font-bold text-base">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION &amp; TRADING WLL</h1>
            <h2 className="text-center text-xs mb-4">RO-RO VEHICLE SHIPMENT — DOHA, QATAR TO LA GOULETTE, TUNISIA</h2>

            <Row label="SR No." value={String(s.sr ?? "-")} />
            <Row label="Export Plate" value={String(s.plate ?? "-")} />
            <Row label="Consignee" value={String(s.consignee ?? "-")} />
            <Row label="Passport / ID" value={String(s.passport ?? "-")} />
            <Row label="Vehicle" value={String(s.description ?? "-")} />
            <Row label="Model / Colour" value={`${String(s.model ?? "-")} / ${String(s.colour ?? "-")}`} />
            <Row label="Chassis Number" value={String(s.chassis ?? "-")} />
            <Row label="CBM / Weight" value={`${Number(s.cbm || 0).toFixed(3)} CBM / ${Number(s.weight || 0).toLocaleString()} KG`} />
            <Row label="B/L Number" value={String(s.bl ?? "-")} />
            <Row label="Vessel / Voyage" value={String(s.vessel ?? "-")} />
            <Row label="Loading Status" value={String(s.loading_status || "PENDING")} />
            <Row label="SWB Issued" value={s.swb_issued ? "YES" : "NO"} />
            <Row label="Released" value={s.released ? "YES" : "PENDING RELEASE"} />
            <Row label="Freight" value={`QAR ${Number(s.freight || 0).toLocaleString()}`} />
            <Row label="Storage Charges" value={`QAR ${Number(s.storage_charges || 0).toLocaleString()}`} />
            <Row label="Total" value={`QAR ${roroTotal(s).toLocaleString()}`} />
            <Row label="Amount Paid" value={`QAR ${Number(s.amount_paid || 0).toLocaleString()}`} />
            <Row label="Balance" value={`QAR ${roroBalance(s).toLocaleString()}`} />
            {s.notes && <Row label="Notes" value={String(s.notes)} />}
          </div>
        </div>

        <div className="flex gap-2 no-print">
          <Button onClick={handlePrint} variant="outline">
            <Printer className="h-4 w-4 mr-2" /> Print / Save as PDF (A4)
          </Button>
          {s.swb_doc_url && (
            <Button variant="outline" onClick={() => window.open(String(s.swb_doc_url), "_blank")}>
              <FileText className="h-4 w-4 mr-2" /> View SWB Document
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoroPreviewDialog;
