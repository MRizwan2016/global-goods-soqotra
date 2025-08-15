import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Book } from "../../booking-form-stock/types";

interface PageSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | null;
  action: "cancel" | "delete";
  onConfirm: (pageNumbers: string[], reason: string) => void;
}

export const PageSelectionDialog: React.FC<PageSelectionDialogProps> = ({
  open,
  onOpenChange,
  book,
  action,
  onConfirm
}) => {
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [reason, setReason] = useState("");

  if (!book) return null;

  const allPages = book.available || [];
  const isCancel = action === "cancel";
  const actionText = isCancel ? "Cancel" : "Delete";
  const actionColor = isCancel ? "orange" : "red";

  const handlePageToggle = (pageNumber: string) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageNumber)) {
      newSelected.delete(pageNumber);
    } else {
      newSelected.add(pageNumber);
    }
    setSelectedPages(newSelected);
    setSelectAll(newSelected.size === allPages.length);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPages(new Set(allPages));
    } else {
      setSelectedPages(new Set());
    }
    setSelectAll(checked);
  };

  const handleConfirm = () => {
    if (selectedPages.size === 0) return;
    onConfirm(Array.from(selectedPages), reason);
    setSelectedPages(new Set());
    setSelectAll(false);
    setReason("");
  };

  const handleClose = () => {
    setSelectedPages(new Set());
    setSelectAll(false);
    setReason("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className={`text-${actionColor}-700`}>
            {actionText} Pages from Book #{book.bookNumber}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="text-sm text-gray-600">
            <p><strong>Book Range:</strong> {book.startPage} - {book.endPage}</p>
            <p><strong>Available Pages:</strong> {allPages.length} pages</p>
            <p><strong>Assigned To:</strong> {book.assignedTo || 'Not Assigned'}</p>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="select-all"
                checked={selectAll}
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="select-all" className="font-medium">
                Select All Pages ({allPages.length} pages)
              </Label>
            </div>

            <div className="max-h-60 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-8 gap-2">
                {allPages.map((pageNumber) => (
                  <div key={pageNumber} className="flex items-center space-x-2">
                    <Checkbox
                      id={`page-${pageNumber}`}
                      checked={selectedPages.has(pageNumber)}
                      onCheckedChange={() => handlePageToggle(pageNumber)}
                    />
                    <Label 
                      htmlFor={`page-${pageNumber}`} 
                      className="text-xs font-mono cursor-pointer"
                    >
                      {pageNumber}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Selected: {selectedPages.size} of {allPages.length} pages
            </p>
          </div>

          <div>
            <Label htmlFor="reason">Reason for {action}</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={`Enter reason for ${action}ing these pages...`}
              className="mt-1"
              rows={3}
            />
          </div>

          {selectedPages.size > 0 && (
            <div className={`p-3 rounded-lg bg-${actionColor}-50 border border-${actionColor}-200`}>
              <p className={`text-sm text-${actionColor}-700 font-medium`}>
                Warning: You are about to {action} {selectedPages.size} page(s) from this book.
                {action === "delete" && " This action can be undone from the history."}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="destructive"
            onClick={handleConfirm}
            disabled={selectedPages.size === 0}
            className={`bg-${actionColor}-600 hover:bg-${actionColor}-700`}
          >
            {actionText} {selectedPages.size} Page(s)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};