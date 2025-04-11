
import { useState } from "react";
import { AlertTriangle, CheckCircle2, LockKeyhole, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { JobStorageService } from "../../services/JobStorageService";

interface JobCloseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobNumber: string;
  onSuccess: () => void;
}

const JobCloseDialog = ({ isOpen, onClose, jobId, jobNumber, onSuccess }: JobCloseDialogProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setInvoiceNumber("");
    setError("");
    onClose();
  };

  const handleSubmit = () => {
    // Validate invoice number
    if (!invoiceNumber.trim()) {
      setError("Invoice number is required to close this job");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Process job closing
    setTimeout(() => {
      try {
        // Update job status and add invoice number
        JobStorageService.updateJob(jobId, {
          status: "COMPLETED",
          invoiceNumber: invoiceNumber.trim(),
          completedDate: new Date().toISOString(),
        });

        setIsSubmitting(false);
        toast.success(`Job ${jobNumber} has been closed successfully`, {
          description: `Invoice Number: ${invoiceNumber}`,
        });
        onSuccess();
        handleClose();
      } catch (err) {
        setIsSubmitting(false);
        setError("Failed to close the job. Please try again.");
        toast.error("Failed to close the job");
      }
    }, 800); // Simulate API call
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold flex items-center justify-center gap-2">
            <LockKeyhole className="h-5 w-5 text-blue-500 animate-pulse" />
            CLOSE JOB #{jobNumber}
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter invoice number to complete and close this job.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2 text-sm animate-fade-in">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="invoiceNumber" className="text-sm font-medium">
              INVOICE NUMBER <span className="text-red-500">*</span>
            </Label>
            <Input
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="ENTER INVOICE NUMBER"
              className="bg-blue-50 border-blue-200 focus:border-blue-400 uppercase"
              autoComplete="off"
              autoFocus
            />
          </div>

          <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm flex items-start gap-2 animate-fade-in">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              This action cannot be undone. The job status will be changed to COMPLETED and an
              invoice will be linked to this job.
            </span>
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1 sm:flex-none"
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover-scale transition-all duration-300 uppercase tracking-wide"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                PROCESSING
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                CLOSE JOB
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobCloseDialog;
