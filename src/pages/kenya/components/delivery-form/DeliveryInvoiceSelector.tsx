
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface DeliveryInvoiceSelectorProps {
  invoiceNumber: string;
  onInvoiceSelect: (invoiceNumber: string) => void;
}

const DeliveryInvoiceSelector: React.FC<DeliveryInvoiceSelectorProps> = ({
  invoiceNumber,
  onInvoiceSelect,
}) => {
  const [searchText, setSearchText] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [availableInvoices, setAvailableInvoices] = React.useState<any[]>([]);

  React.useEffect(() => {
    loadAvailableInvoices();
  }, []);

  const loadAvailableInvoices = () => {
    // Get active invoice books from localStorage
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    
    // Get used invoice numbers to filter them out
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const usedInvoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
    
    let invoiceList: string[] = [];
    
    if (activeBooks.length > 0) {
      activeBooks.forEach((book: any) => {
        if (book.availablePages) {
          const availableFromBook = book.availablePages.filter(
            (invoiceNo: string) => !usedInvoiceNumbers.includes(invoiceNo)
          );
          invoiceList = [...invoiceList, ...availableFromBook];
        }
      });
    } else if (storedBooks.length > 0) {
      storedBooks.forEach((book: any) => {
        if (book.isActivated && book.availablePages) {
          const availableFromBook = book.availablePages.filter(
            (invoiceNo: string) => !usedInvoiceNumbers.includes(invoiceNo)
          );
          invoiceList = [...invoiceList, ...availableFromBook];
        }
      });
    }

    setAvailableInvoices(invoiceList);
  };

  const handleSearch = () => {
    if (searchText.length < 3) {
      toast.error("Please enter at least 3 characters");
      return;
    }

    const filtered = availableInvoices.filter(inv => 
      inv.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filtered.length > 0) {
      setAvailableInvoices(filtered);
    } else {
      toast.error("No matching invoices found");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Select value={invoiceNumber} onValueChange={onInvoiceSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select invoice number" />
          </SelectTrigger>
          <SelectContent>
            {availableInvoices.map((inv) => (
              <SelectItem key={inv} value={inv}>
                {inv}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          onClick={() => setShowSearch(!showSearch)}
        >
          Manual Search
        </Button>
      </div>

      {showSearch && (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Enter at least 3 characters..."
              className="pl-9"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryInvoiceSelector;
