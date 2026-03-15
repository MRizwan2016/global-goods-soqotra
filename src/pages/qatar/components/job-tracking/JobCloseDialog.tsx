
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
import { supabase } from "@/integrations/supabase/client";

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
  const [allInvoices, setAllInvoices] = useState<InvoiceDetails[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("all");
  const [availableBooks, setAvailableBooks] = useState<{bookNumber: string; assignedTo?: string; country?: string}[]>([]);
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reason, setReason] = useState("");
  const [action, setAction] = useState<"COMPLETE" | "CANCEL">("COMPLETE");
  const [loading, setLoading] = useState(false);

  // Filter invoices when book selection changes - only load pages for selected book
  useEffect(() => {
    if (selectedBook === "all") {
      // Don't show all invoices at once - require book selection first
      setAvailableInvoices([]);
    } else {
      setAvailableInvoices(allInvoices.filter(inv => inv.bookNumber === selectedBook));
    }
    setInvoiceNumber("");
  }, [selectedBook, allInvoices]);

  // Load available invoices from ALL assigned books
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const usedInvoices = JSON.parse(localStorage.getItem('used-invoices') || '[]');
        
        let invoiceList: InvoiceDetails[] = [];
        const booksMap = new Map<string, {bookNumber: string; assignedTo?: string; country?: string}>();
        
        // ---- 1. Fetch ALL assigned/available books from Supabase ----
        try {
          const { data: dbBooks, error } = await supabase
            .from('invoice_books')
            .select('*')
            .in('status', ['assigned', 'available', 'active']);
          
          if (!error && dbBooks && dbBooks.length > 0) {
            dbBooks.forEach((book) => {
              const bookLabel = `#${book.book_number}`;
              booksMap.set(bookLabel, {
                bookNumber: bookLabel,
                assignedTo: book.assigned_to_sales_rep || undefined,
                country: book.country
              });
              
              const pages = Array.isArray(book.available_pages) 
                ? book.available_pages as (string | number)[]
                : [];
              
              pages.forEach((page) => {
                const pageStr = String(page);
                if (!usedInvoices.includes(pageStr)) {
                  invoiceList.push({
                    invoiceNumber: pageStr,
                    bookNumber: bookLabel,
                    assignedTo: book.assigned_to_sales_rep || undefined,
                    driverName: book.assigned_to_driver || undefined,
                    amount: undefined,
                    date: book.assigned_date ? new Date(book.assigned_date).toISOString().split('T')[0] : undefined
                  });
                }
              });
            });
          }
          
          if (error) {
            console.error("Error fetching invoice books from DB:", error);
          }
        } catch (dbError) {
          console.error("Error querying invoice_books:", dbError);
        }
        
        // ---- 2. Also load from localStorage (existing logic) ----
        const job = JobStorageService.getJobById(jobId);
        const jobDestination = job?.destination || '';
        
        const activeBooks = JSON.parse(localStorage.getItem('active-books') || '[]');
        const storedBooks = JSON.parse(localStorage.getItem('books') || '[]');
        
        const processLocalBooks = (books: any[]) => {
          books.forEach((book: any) => {
            if (book.isActivated) {
              const bookLabel = `#${book.bookId || book.id}`;
              if (!booksMap.has(bookLabel)) {
                booksMap.set(bookLabel, {
                  bookNumber: bookLabel,
                  assignedTo: book.assignedTo,
                  country: book.destination || book.country
                });
              }
              
              if (book.pageRangeStart && book.pageRangeEnd) {
                const startPage = parseInt(book.pageRangeStart);
                const endPage = parseInt(book.pageRangeEnd);
                for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
                  const inv = `GY ${pageNum}`;
                  if (!usedInvoices.includes(inv)) {
                    invoiceList.push({
                      invoiceNumber: inv,
                      bookNumber: bookLabel,
                      assignedTo: book.assignedTo || undefined,
                      driverName: book.driverName || undefined,
                      amount: book.defaultAmount || undefined,
                      date: book.activationDate || undefined
                    });
                  }
                }
              } else if (book.availablePages && Array.isArray(book.availablePages)) {
                book.availablePages
                  .filter((invoiceNo: string) => !usedInvoices.includes(invoiceNo))
                  .forEach((invoiceNo: string) => {
                    invoiceList.push({
                      invoiceNumber: invoiceNo,
                      bookNumber: bookLabel,
                      assignedTo: book.assignedTo || undefined,
                      driverName: book.driverName || undefined,
                      amount: book.defaultAmount || undefined,
                      date: book.activationDate || undefined
                    });
                  });
              }
            }
          });
        };
        
        processLocalBooks(activeBooks);
        processLocalBooks(storedBooks);
        
        // Remove duplicates by invoiceNumber
        const uniqueMap = new Map<string, InvoiceDetails>();
        invoiceList.forEach(inv => {
          if (!uniqueMap.has(inv.invoiceNumber)) {
            uniqueMap.set(inv.invoiceNumber, inv);
          }
        });
        invoiceList = Array.from(uniqueMap.values());
        
        console.log("Available invoices for job completion:", invoiceList);
        console.log("Available books:", Array.from(booksMap.values()));
        
        setAllInvoices(invoiceList);
        setAvailableInvoices(invoiceList);
        setAvailableBooks(Array.from(booksMap.values()));
      } catch (error) {
        console.error("Error loading available invoices:", error);
        setAllInvoices([]);
        setAvailableInvoices([]);
      }
    };

    if (isOpen) {
      loadInvoices();
      setSelectedBook("all");
    }
  }, [isOpen, jobId]);

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
              {/* Book filter */}
              <div className="space-y-2">
                <Label>Select Book</Label>
                <Select value={selectedBook} onValueChange={setSelectedBook}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Books" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60 overflow-y-auto z-[100]">
                    <SelectItem value="all">All Books ({allInvoices.length} pages)</SelectItem>
                    {availableBooks.map((book) => (
                      <SelectItem key={book.bookNumber} value={book.bookNumber}>
                        {book.bookNumber} - {book.country || ''} {book.assignedTo ? `(${book.assignedTo})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Select value={invoiceNumber} onValueChange={(value) => {
                    setInvoiceNumber(value);
                    const selectedInvoice = availableInvoices.find(inv => inv.invoiceNumber === value);
                    if (selectedInvoice && selectedInvoice.amount) {
                      setInvoiceAmount(selectedInvoice.amount.toString());
                    }
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Invoice..." />
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
                              <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                              <div className="flex flex-col flex-1 min-w-0">
                                <div className="font-medium text-sm">
                                  {invoice.invoiceNumber}
                                </div>
                                <div className="text-xs text-muted-foreground space-y-0.5">
                                  <div>Book: {invoice.bookNumber}</div>
                                  {invoice.assignedTo && (
                                    <div>Rep: {invoice.assignedTo}</div>
                                  )}
                                  {invoice.driverName && (
                                    <div>Driver: {invoice.driverName}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-3 text-muted-foreground text-center text-sm">
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
