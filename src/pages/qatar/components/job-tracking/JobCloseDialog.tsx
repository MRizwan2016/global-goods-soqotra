
import { useState, useEffect } from "react";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { JobStorageService } from "../../services/JobStorageService";
import { toast } from "sonner";
import { JobNumberService } from "@/services/JobNumberService";

interface JobCloseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobNumber: string;
  onSuccess: () => void;
}

interface InvoiceDetails {
  invoiceNumber: string;
  bookNumber: string;
  assignedTo?: string;
  driverName?: string;
  amount?: number;
  date?: string;
}

const JobCloseDialog = ({ isOpen, onClose, jobId, jobNumber, onSuccess }: JobCloseDialogProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [availableInvoices, setAvailableInvoices] = useState<InvoiceDetails[]>([]);
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reason, setReason] = useState("");
  const [action, setAction] = useState<"COMPLETE" | "CANCEL">("COMPLETE");
  const [loading, setLoading] = useState(false);

  // Load available invoices from localStorage with detailed information
  useEffect(() => {
    const loadInvoices = () => {
      try {
        // Get the job to determine its destination
        const job = JobStorageService.getJobById(jobId);
        const jobDestination = job?.destination || '';
        
        // Load available invoices from assigned books
        const activeBooks = JSON.parse(localStorage.getItem('active-books') || '[]');
        const storedBooks = JSON.parse(localStorage.getItem('books') || '[]');
        const usedInvoices = JSON.parse(localStorage.getItem('used-invoices') || '[]');
        
        let invoiceList: InvoiceDetails[] = [];
        
        // Helper function to check if book is assigned to destination
        const isBookAssignedToDestination = (book: any, destination: string) => {
          // Check if book has specific destination assignment
          if (book.destination) {
            return book.destination.toUpperCase() === destination.toUpperCase();
          }
          
          // Check if book country matches destination
          if (book.country) {
            return book.country.toUpperCase() === destination.toUpperCase();
          }
          
          return false;
        };
        
        // Process active books first - filter by destination assignment
        if (activeBooks.length > 0) {
          activeBooks.forEach((book: any) => {
            if (book.isActivated && isBookAssignedToDestination(book, jobDestination)) {
              // Generate invoice numbers from the book's page range
              if (book.pageRangeStart && book.pageRangeEnd) {
                const startPage = parseInt(book.pageRangeStart);
                const endPage = parseInt(book.pageRangeEnd);
                
                for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
                  const invoiceNumber = `GY ${pageNum}`;
                  
                  // Only add if not already used
                  if (!usedInvoices.includes(invoiceNumber)) {
                    invoiceList.push({
                      invoiceNumber: invoiceNumber,
                      bookNumber: `#${book.bookId || book.id}`,
                      assignedTo: book.assignedTo || `${jobDestination} Sales Rep`,
                      driverName: book.driverName || `${jobDestination} Driver`,
                      amount: book.defaultAmount || 500,
                      date: book.activationDate || new Date().toISOString().split('T')[0]
                    });
                  }
                }
              }
              // Fallback to availablePages if page range not defined
              else if (book.availablePages && Array.isArray(book.availablePages)) {
                const availableFromBook = book.availablePages
                  .filter((invoiceNo: string) => !usedInvoices.includes(invoiceNo))
                  .map((invoiceNo: string) => ({
                    invoiceNumber: invoiceNo,
                    bookNumber: `#${book.bookId || book.id}`,
                    assignedTo: book.assignedTo || `${jobDestination} Sales Rep`,
                    driverName: book.driverName || `${jobDestination} Driver`,
                    amount: book.defaultAmount || 500,
                    date: book.activationDate || new Date().toISOString().split('T')[0]
                  }));
                
                invoiceList = [...invoiceList, ...availableFromBook];
              }
            }
          });
        }
        
        // If no active books for destination, try stored books
        if (invoiceList.length === 0 && storedBooks.length > 0) {
          storedBooks.forEach((book: any) => {
            if (book.isActivated && isBookAssignedToDestination(book, jobDestination)) {
              // Generate invoice numbers from the book's page range
              if (book.pageRangeStart && book.pageRangeEnd) {
                const startPage = parseInt(book.pageRangeStart);
                const endPage = parseInt(book.pageRangeEnd);
                
                for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
                  const invoiceNumber = `GY ${pageNum}`;
                  
                  // Only add if not already used
                  if (!usedInvoices.includes(invoiceNumber)) {
                    invoiceList.push({
                      invoiceNumber: invoiceNumber,
                      bookNumber: `#${book.bookId || book.id}`,
                      assignedTo: book.assignedTo || `${jobDestination} Sales Rep`,
                      driverName: book.driverName || `${jobDestination} Driver`,
                      amount: book.defaultAmount || 500,
                      date: book.activationDate || new Date().toISOString().split('T')[0]
                    });
                  }
                }
              }
              // Fallback to availablePages if page range not defined
              else if (book.availablePages && Array.isArray(book.availablePages)) {
                const availableFromBook = book.availablePages
                  .filter((invoiceNo: string) => !usedInvoices.includes(invoiceNo))
                  .map((invoiceNo: string) => ({
                    invoiceNumber: invoiceNo,
                    bookNumber: `#${book.bookId || book.id}`,
                    assignedTo: book.assignedTo || `${jobDestination} Sales Rep`,
                    driverName: book.driverName || `${jobDestination} Driver`,
                    amount: book.defaultAmount || 500,
                    date: book.activationDate || new Date().toISOString().split('T')[0]
                  }));
                
                invoiceList = [...invoiceList, ...availableFromBook];
              }
            }
          });
        }
        
        // If still no invoices, create destination-specific demo invoices
        if (invoiceList.length === 0) {
          const usedInvoices = JSON.parse(localStorage.getItem('used-invoices') || '[]');
          
          // Create destination-specific book assignments
          const getDestinationBookPrefix = (destination: string) => {
            const prefixMap: { [key: string]: string } = {
              'SUDAN': '00BOOK-SD',
              'ERITREA': '00BOOK-ER', 
              'SOMALIA': '00BOOK-SO',
              'ETHIOPIA': '00BOOK-ET',
              'SRI LANKA': '00BOOK-LK',
              'PHILIPPINES': '00BOOK-PH',
              'TUNISIA': '00BOOK-TN',
              'SAUDI ARABIA': '00BOOK-SA',
              'SYRIA': '00BOOK-SY',
              'KENYA': '00BOOK-KE',
              'UGANDA': '00BOOK-UG',
              'MOZAMBIQUE': '00BOOK-MZ'
            };
            return prefixMap[destination.toUpperCase()] || '00BOOK-GEN';
          };

          const bookPrefix = getDestinationBookPrefix(jobDestination);
          
          for (let i = 100000; i <= 100050; i++) {
            const invoiceNumber = i.toString();
            const bookNumber = `${bookPrefix}-${Math.floor((i - 100000) / 10) + 1}`;
            
            // Only add if not already used
            if (!usedInvoices.includes(invoiceNumber)) {
              invoiceList.push({
                invoiceNumber: invoiceNumber,
                bookNumber: bookNumber,
                assignedTo: `${jobDestination} Sales Rep`,
                driverName: `${jobDestination} Driver`,
                amount: 500,
                date: new Date().toISOString().split('T')[0]
              });
            }
          }
        }
        
        console.log("Available invoices for job completion:", invoiceList);
        setAvailableInvoices(invoiceList);
      } catch (error) {
        console.error("Error loading available invoices:", error);
        // Fallback to basic demo invoices
        setAvailableInvoices([
          { invoiceNumber: "010001", bookNumber: "B001", assignedTo: "Sales Rep", driverName: "Driver", amount: 500, date: new Date().toISOString().split('T')[0] }
        ]);
      }
    };

    if (isOpen) {
      loadInvoices();
    }
  }, [isOpen]);

  const handleComplete = () => {
    setLoading(true);
    
    if (!invoiceNumber) {
      toast.error("Please select an invoice number");
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
      
      // Update job with completion details
      const updatedJob = {
        ...job,
        status: "COMPLETED",
        invoiceNumber: invoiceNumber,
        invoiceAmount: invoiceAmount ? parseFloat(invoiceAmount) : job.advanceAmount,
        completionDate: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        completionNotes: "Job completed successfully",
        lastUpdated: new Date().toISOString()
      };
      
      // Link job number with invoice number
      JobNumberService.linkJobToInvoice(job.jobNumber, invoiceNumber);

      // Also update invoice with this job number
      try {
        const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        const matchingInvoiceIndex = invoices.findIndex((inv: any) => inv.invoiceNumber === invoiceNumber);
        
        if (matchingInvoiceIndex >= 0) {
          invoices[matchingInvoiceIndex].jobNumber = job.jobNumber;
          localStorage.setItem('invoices', JSON.stringify(invoices));
        }
      } catch (error) {
        console.error("Error updating invoice with job number:", error);
      }
      
      JobStorageService.updateJob(jobId, updatedJob);
      
      // Mark invoice as used to prevent reuse
      const usedInvoices = JSON.parse(localStorage.getItem('used-invoices') || '[]');
      if (!usedInvoices.includes(invoiceNumber)) {
        usedInvoices.push(invoiceNumber);
        localStorage.setItem('used-invoices', JSON.stringify(usedInvoices));
      }
      
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
                  <Select value={invoiceNumber} onValueChange={(value) => {
                    setInvoiceNumber(value);
                    // Auto-fill amount when invoice is selected
                    const selectedInvoice = availableInvoices.find(inv => inv.invoiceNumber === value);
                    if (selectedInvoice && selectedInvoice.amount) {
                      setInvoiceAmount(selectedInvoice.amount.toString());
                    }
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Invoice Number" />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-60 overflow-y-auto z-[100]">
                      {availableInvoices.length > 0 ? (
                        availableInvoices.map((invoice) => (
                          <SelectItem 
                            key={invoice.invoiceNumber} 
                            value={invoice.invoiceNumber}
                            className="flex flex-col items-start space-y-1 p-3"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                              <div className="flex flex-col flex-1 min-w-0">
                                <div className="font-medium text-sm">
                                  {invoice.invoiceNumber}
                                </div>
                                <div className="text-xs text-gray-500 space-y-0.5">
                                  <div>Book: {invoice.bookNumber}</div>
                                  {invoice.assignedTo && (
                                    <div>Rep: {invoice.assignedTo}</div>
                                  )}
                                  {invoice.driverName && (
                                    <div>Driver: {invoice.driverName}</div>
                                  )}
                                  {invoice.amount && (
                                    <div>Amount: QAR {invoice.amount}</div>
                                  )}
                                  {invoice.date && (
                                    <div>Date: {invoice.date}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500 text-center text-sm">
                          No invoices available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
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
            disabled={loading || (action === "COMPLETE" && !invoiceNumber)}
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
