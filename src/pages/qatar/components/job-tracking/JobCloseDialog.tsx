
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { JobStorageService } from "../../services/JobStorageService";
import { toast } from "sonner";

interface JobCloseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobNumber: string;
  onSuccess: () => void;
}

const JobCloseDialog = ({ isOpen, onClose, jobId, jobNumber, onSuccess }: JobCloseDialogProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reason, setReason] = useState("");
  const [action, setAction] = useState<"COMPLETE" | "CANCEL">("COMPLETE");
  const [loading, setLoading] = useState(false);

  const handleComplete = () => {
    setLoading(true);
    
    try {
      const job = JobStorageService.getJobById(jobId);
      if (!job) {
        toast.error("Job not found!");
        onClose();
        return;
      }
      
      // Update job with completion details
      const updatedJob = {
        ...job,
        status: "COMPLETED",
        invoiceNumber: invoiceNumber || job.invoiceNumber,
        invoiceAmount: invoiceAmount ? parseFloat(invoiceAmount) : job.advanceAmount,
        completionDate: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        completionNotes: "Job completed successfully",
        lastUpdated: new Date().toISOString()
      };
      
      JobStorageService.updateJob(jobId, updatedJob);
      toast.success(`Job ${jobNumber} marked as completed`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error completing job:", error);
      toast.error("Failed to complete job");
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    setLoading(true);
    
    if (!reason.trim()) {
      toast.error("Please provide a reason for cancellation");
      setLoading(false);
      return;
    }
    
    try {
      const job = JobStorageService.getJobById(jobId);
      if (!job) {
        toast.error("Job not found!");
        onClose();
        return;
      }
      
      // Update job with cancellation details
      const updatedJob = {
        ...job,
        status: "CANCELLED",
        cancellationReason: reason,
        cancellationDate: format(new Date(), "yyyy-MM-dd"),
        lastUpdated: new Date().toISOString()
      };
      
      JobStorageService.updateJob(jobId, updatedJob);
      toast.success(`Job ${jobNumber} marked as cancelled`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error cancelling job:", error);
      toast.error("Failed to cancel job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {action === "COMPLETE" ? "Complete Job" : "Cancel Job"} - {jobNumber}
          </DialogTitle>
          <DialogDescription>
            {action === "COMPLETE" 
              ? "Update invoice details and mark this job as complete." 
              : "Provide a reason for cancelling this job."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Action selector */}
          <div className="flex gap-2">
            <Button 
              variant={action === "COMPLETE" ? "default" : "outline"}
              onClick={() => setAction("COMPLETE")} 
              className="flex-1"
            >
              Complete Job
            </Button>
            <Button 
              variant={action === "CANCEL" ? "default" : "outline"}
              onClick={() => setAction("CANCEL")} 
              className="flex-1"
            >
              Cancel Job
            </Button>
          </div>
          
          {action === "COMPLETE" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="Enter invoice number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="invoiceAmount">Invoice Amount</Label>
                  <Input
                    id="invoiceAmount"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    placeholder="Enter amount"
                    type="number"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Completion Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Cancellation</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide the reason"
              />
            </div>
          )}
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={action === "COMPLETE" ? handleComplete : handleCancel}
            disabled={loading}
            className={action === "COMPLETE" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          >
            {loading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>}
            {action === "COMPLETE" ? "Complete Job" : "Cancel Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobCloseDialog;
