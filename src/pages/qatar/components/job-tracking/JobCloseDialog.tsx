
import { useState, useEffect, useMemo } from "react";
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

const MAX_INVOICES_PER_BOOK = 800;
const INVOICE_RENDER_LIMIT = 250;

const buildInvoiceRange = (startPage: string, endPage: string, limit: number): string[] => {
  const start = String(startPage || "").trim();
  const end = String(endPage || "").trim();

  const startMatch = start.match(/^(.*?)(\d+)$/);
  const endMatch = end.match(/^(.*?)(\d+)$/);

  if (!startMatch || !endMatch) return [];

  const [, startPrefix, startNumberRaw] = startMatch;
  const [, endPrefix, endNumberRaw] = endMatch;
  if (startPrefix !== endPrefix) return [];

  const startNumber = Number(startNumberRaw);
  const endNumber = Number(endNumberRaw);

  if (!Number.isFinite(startNumber) || !Number.isFinite(endNumber) || endNumber < startNumber) {
    return [];
  }

  const width = Math.max(startNumberRaw.length, endNumberRaw.length);
  const maxInvoices = Math.min(limit, endNumber - startNumber + 1);
  const generatedInvoices: string[] = [];

  for (let index = 0; index < maxInvoices; index++) {
    const currentNumber = startNumber + index;
    generatedInvoices.push(`${startPrefix}${String(currentNumber).padStart(width, "0")}`);
  }

  return generatedInvoices;
};

const JobCloseDialog = ({ isOpen, onClose, jobId, jobNumber, onSuccess }: JobCloseDialogProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [availableInvoices, setAvailableInvoices] = useState<InvoiceDetails[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("all");
  const [availableBooks, setAvailableBooks] = useState<{ bookNumber: string; assignedTo?: string; country?: string }[]>([]);
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reason, setReason] = useState("");
  const [action, setAction] = useState<"COMPLETE" | "CANCEL">("COMPLETE");
  const [loading, setLoading] = useState(false);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  useEffect(() => {
    if (selectedBook === "all") {
      setAvailableInvoices([]);
    }
    setInvoiceNumber("");
    setInvoiceSearch("");
  }, [selectedBook]);

  const filteredInvoices = useMemo(() => {
    const query = invoiceSearch.trim().toLowerCase();
    const source = query
      ? availableInvoices.filter((inv) => String(inv.invoiceNumber).toLowerCase().includes(query))
      : availableInvoices;

    return source.slice(0, INVOICE_RENDER_LIMIT);
  }, [availableInvoices, invoiceSearch]);

  // Load available books (metadata only - no pages)
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksMap = new Map<string, {bookNumber: string; assignedTo?: string; country?: string}>();
        
        // Fetch book metadata from Supabase (without processing all pages)
        try {
          const { data: dbBooks, error } = await supabase
            .from('manage_invoice_book_stock')
            .select('book_number, assigned_to_sales_rep, assigned_to_driver, country, assigned_date, status')
            .in('status', ['assigned', 'available', 'active']);
          
          if (!error && dbBooks) {
            dbBooks.forEach((book) => {
              const bookLabel = `#${book.book_number}`;
              booksMap.set(bookLabel, {
                bookNumber: bookLabel,
                assignedTo: book.assigned_to_sales_rep || undefined,
                country: book.country
              });
            });
          }
        } catch (dbError) {
          console.error("Error querying invoice_books:", dbError);
        }
        
        if (booksMap.size === 0) {
          const parseLocalBooks = (key: string) => {
            try {
              const raw = localStorage.getItem(key);
              const parsed = raw ? JSON.parse(raw) : [];
              return Array.isArray(parsed) ? parsed : [];
            } catch {
              return [];
            }
          };

          const localBooks = [
            ...parseLocalBooks("active-books"),
            ...parseLocalBooks("books"),
            ...parseLocalBooks("activeInvoiceBooks"),
            ...parseLocalBooks("invoiceBooks")
          ];

          localBooks.forEach((book: any) => {
            if (!book?.isActivated && !book?.is_active) return;
            const bookRef = String(book.bookId || book.book_number || book.bookNumber || book.id || "").trim();
            if (!bookRef) return;

            const bookLabel = `#${bookRef}`;
            if (!booksMap.has(bookLabel)) {
              booksMap.set(bookLabel, {
                bookNumber: bookLabel,
                assignedTo: book.assignedTo || book.assigned_to_sales_rep,
                country: book.destination || book.country
              });
            }
          });
        }

        setAvailableBooks(Array.from(booksMap.values()));
      } catch (error) {
        console.error("Error loading books:", error);
      }
    };

    if (isOpen) {
      loadBooks();
      setSelectedBook("all");
      setAvailableInvoices([]);
      setInvoiceNumber("");
      setInvoiceSearch("");
    }
  }, [isOpen]);

  // Load pages only for the selected book
  useEffect(() => {
    if (!isOpen || selectedBook === "all") return;

    const loadPagesForBook = async () => {
      setLoadingInvoices(true);
      setAvailableInvoices([]);

      try {
        const rawUsedInvoices = JSON.parse(localStorage.getItem("used-invoices") || "[]");
        const usedInvoices = new Set(
          Array.isArray(rawUsedInvoices)
            ? rawUsedInvoices.map((invoice) => String(invoice).trim())
            : []
        );

        const invoiceList: InvoiceDetails[] = [];
        const seenInvoices = new Set<string>();
        const bookNum = selectedBook.replace("#", "");

        const appendInvoice = (invoice: InvoiceDetails): boolean => {
          if (invoiceList.length >= MAX_INVOICES_PER_BOOK) return false;

          const invoiceValue = String(invoice.invoiceNumber).trim();
          if (!invoiceValue || usedInvoices.has(invoiceValue) || seenInvoices.has(invoiceValue)) {
            return true;
          }

          seenInvoices.add(invoiceValue);
          invoiceList.push({ ...invoice, invoiceNumber: invoiceValue });
          return invoiceList.length < MAX_INVOICES_PER_BOOK;
        };

        let foundDbBook = false;

        try {
          const { data: dbBook, error } = await supabase
            .from("invoice_books")
            .select("book_number, assigned_to_sales_rep, assigned_to_driver, assigned_date, start_page, end_page")
            .eq("book_number", bookNum)
            .maybeSingle();

          if (!error && dbBook) {
            foundDbBook = true;

            const generatedPages = buildInvoiceRange(
              String(dbBook.start_page || ""),
              String(dbBook.end_page || ""),
              MAX_INVOICES_PER_BOOK
            );

            for (const page of generatedPages) {
              const shouldContinue = appendInvoice({
                invoiceNumber: page,
                bookNumber: selectedBook,
                assignedTo: dbBook.assigned_to_sales_rep || undefined,
                driverName: dbBook.assigned_to_driver || undefined,
                amount: undefined,
                date: dbBook.assigned_date
                  ? new Date(dbBook.assigned_date).toISOString().split("T")[0]
                  : undefined
              });
              if (!shouldContinue) break;
            }
          }
        } catch (dbError) {
          console.error("Error querying invoice book pages:", dbError);
        }

        if (!foundDbBook || invoiceList.length === 0) {
          const parseLocalBooks = (key: string) => {
            try {
              const raw = localStorage.getItem(key);
              const parsed = raw ? JSON.parse(raw) : [];
              return Array.isArray(parsed) ? parsed : [];
            } catch {
              return [];
            }
          };

          const localBooks = [
            ...parseLocalBooks("active-books"),
            ...parseLocalBooks("books"),
            ...parseLocalBooks("activeInvoiceBooks"),
            ...parseLocalBooks("invoiceBooks")
          ];

          for (const book of localBooks) {
            const bookRef = String(book.bookId || book.book_number || book.bookNumber || book.id || "").trim();
            if (`#${bookRef}` !== selectedBook) continue;

            const assignedTo = book.assignedTo || book.assigned_to_sales_rep || undefined;
            const driverName = book.driverName || book.assigned_to_driver || undefined;

            if (book.pageRangeStart && book.pageRangeEnd) {
              const generatedPages = buildInvoiceRange(
                String(book.pageRangeStart),
                String(book.pageRangeEnd),
                MAX_INVOICES_PER_BOOK
              );

              for (const invoiceNo of generatedPages) {
                const shouldContinue = appendInvoice({
                  invoiceNumber: invoiceNo,
                  bookNumber: selectedBook,
                  assignedTo,
                  driverName,
                  amount: book.defaultAmount || undefined,
                  date: book.activationDate || undefined
                });
                if (!shouldContinue) break;
              }
            }

            if (Array.isArray(book.availablePages) && invoiceList.length < MAX_INVOICES_PER_BOOK) {
              for (const invoiceNo of book.availablePages) {
                const shouldContinue = appendInvoice({
                  invoiceNumber: String(invoiceNo),
                  bookNumber: selectedBook,
                  assignedTo,
                  driverName,
                  amount: book.defaultAmount || undefined,
                  date: book.activationDate || undefined
                });
                if (!shouldContinue) break;
              }
            }

            if (invoiceList.length >= MAX_INVOICES_PER_BOOK) break;
          }
        }

        if (invoiceList.length === MAX_INVOICES_PER_BOOK) {
          toast.info(`Showing first ${MAX_INVOICES_PER_BOOK} invoices for performance.`);
        }

        setAvailableInvoices(invoiceList);
      } catch (error) {
        console.error("Error loading pages for book:", error);
      } finally {
        setLoadingInvoices(false);
      }
    };

    loadPagesForBook();
  }, [isOpen, selectedBook]);

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
                    <SelectItem value="all">-- Select a Book --</SelectItem>
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
                  <Input
                    id="invoiceNumber"
                    value={invoiceSearch}
                    onChange={(e) => setInvoiceSearch(e.target.value)}
                    placeholder="Filter invoice list"
                  />
                  <Select
                    value={invoiceNumber}
                    onValueChange={(value) => {
                      setInvoiceNumber(value);
                      const selectedInvoice = availableInvoices.find((inv) => inv.invoiceNumber === value);
                      if (selectedInvoice?.amount) {
                        setInvoiceAmount(selectedInvoice.amount.toString());
                      }
                    }}
                    disabled={selectedBook === "all" || loadingInvoices}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={loadingInvoices ? "Loading invoices..." : "Select Invoice..."} />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-60 overflow-y-auto z-[100]">
                      {loadingInvoices ? (
                        <div className="p-3 text-muted-foreground text-center text-sm">Loading invoices...</div>
                      ) : filteredInvoices.length > 0 ? (
                        filteredInvoices.map((invoice) => (
                          <SelectItem
                            key={invoice.invoiceNumber}
                            value={invoice.invoiceNumber}
                            className="flex flex-col items-start space-y-1 p-3"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                              <div className="flex flex-col flex-1 min-w-0">
                                <div className="font-medium text-sm">{invoice.invoiceNumber}</div>
                                <div className="text-xs text-muted-foreground space-y-0.5">
                                  <div>Book: {invoice.bookNumber}</div>
                                  {invoice.assignedTo && <div>Rep: {invoice.assignedTo}</div>}
                                  {invoice.driverName && <div>Driver: {invoice.driverName}</div>}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-3 text-muted-foreground text-center text-sm">No invoices available</div>
                      )}
                    </SelectContent>
                  </Select>
                  {availableInvoices.length > INVOICE_RENDER_LIMIT && (
                    <p className="text-xs text-muted-foreground">
                      Showing first {INVOICE_RENDER_LIMIT} invoices. Use filter to narrow results.
                    </p>
                  )}
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
