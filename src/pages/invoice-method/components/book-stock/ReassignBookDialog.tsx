import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Book } from "../../booking-form-stock/types";

// Fire-and-forget sync to external project
async function syncToExternal(action: string, table: string, record?: any, matchColumn?: string, matchValue?: string) {
  try {
    await supabase.functions.invoke("sync-external", {
      body: { action, table, record, match_column: matchColumn, match_value: matchValue },
    });
  } catch (err) {
    console.warn("External sync failed (non-blocking):", err);
  }
}
import { ArrowRightLeft } from "lucide-react";

interface ReassignBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | null;
  onReassigned: () => void;
}

interface SalesRep {
  id: string;
  name: string;
  country: string;
}

const ReassignBookDialog: React.FC<ReassignBookDialogProps> = ({
  open,
  onOpenChange,
  book,
  onReassigned,
}) => {
  const [salesReps, setSalesReps] = useState<SalesRep[]>([]);
  const [selectedRepId, setSelectedRepId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchSalesReps();
      setSelectedRepId("");
      setReason("");
    }
  }, [open]);

  const fetchSalesReps = async () => {
    const { data, error } = await supabase
      .from("sales_representatives")
      .select("id, name, country")
      .eq("is_active", true)
      .order("name");

    if (!error && data) {
      // Filter out the currently assigned rep
      setSalesReps(data.filter((rep) => rep.name !== book?.assignedTo));
    }
  };

  const handleReassign = async () => {
    if (!book || !selectedRepId) return;

    const newRep = salesReps.find((r) => r.id === selectedRepId);
    if (!newRep) return;

    setLoading(true);
    try {
      // Update in Supabase
      const { error } = await supabase
        .from("manage_invoice_book_stock")
        .update({
          assigned_to_sales_rep: newRep.name,
          assigned_date: new Date().toISOString(),
        })
        .eq("book_number", book.bookNumber);

      if (error) throw error;

      // Also update localStorage for backward compatibility
      const storedBooks = JSON.parse(localStorage.getItem("invoiceBooks") || "[]");
      const updatedBooks = storedBooks.map((b: any) =>
        b.bookNumber === book.bookNumber
          ? { ...b, assignedTo: newRep.name, assignedDate: new Date().toISOString() }
          : b
      );
      localStorage.setItem("invoiceBooks", JSON.stringify(updatedBooks));

      toast.success("Book Reassigned", {
        description: `Book #${book.bookNumber} reassigned from ${book.assignedTo} to ${newRep.name}`,
      });

      onOpenChange(false);
      onReassigned();
    } catch (err) {
      console.error("Reassignment error:", err);
      toast.error("Failed to reassign book");
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            Reassign Book #{book.bookNumber}
          </DialogTitle>
          <DialogDescription>
            Transfer this book from the current sales representative to another.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-md bg-muted p-3 text-sm">
            <p className="font-medium text-foreground">Currently assigned to:</p>
            <p className="text-muted-foreground">{book.assignedTo || "Unassigned"}</p>
          </div>

          <div className="space-y-2">
            <Label>New Sales Representative</Label>
            <Select value={selectedRepId} onValueChange={setSelectedRepId}>
              <SelectTrigger>
                <SelectValue placeholder="Select new sales representative" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                {salesReps.map((rep) => (
                  <SelectItem key={rep.id} value={rep.id}>
                    {rep.name} ({rep.country})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reason (optional)</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for reassignment..."
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReassign} disabled={!selectedRepId || loading}>
            {loading ? "Reassigning..." : "Reassign Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReassignBookDialog;
