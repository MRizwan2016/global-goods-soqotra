
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, X, Loader2 } from "lucide-react";
import { useInvoiceSearch, Invoice } from "@/hooks/use-invoice-search";

interface InvoiceSearchProps {
  onInvoiceSelect: (invoice: Invoice) => void;
}

const InvoiceSearch = ({ onInvoiceSelect }: InvoiceSearchProps) => {
  const {
    searchPrefix,
    setSearchPrefix,
    searchResults,
    loading,
    searchInvoiceByPrefix,
    selectInvoice
  } = useInvoiceSearch();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchPrefix.length >= 2) {
      searchInvoiceByPrefix(searchPrefix);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchPrefix]);

  useEffect(() => {
    setIsDropdownOpen(searchResults.length > 0);
  }, [searchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInvoiceSelect = (invoice: Invoice) => {
    selectInvoice(invoice);
    onInvoiceSelect(invoice);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter first 4 letters of invoice number"
            value={searchPrefix}
            onChange={(e) => setSearchPrefix(e.target.value)}
            className="pl-10"
            maxLength={4}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </div>
          {searchPrefix && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setSearchPrefix("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button 
          onClick={() => searchInvoiceByPrefix(searchPrefix)}
          disabled={searchPrefix.length < 2 || loading}
        >
          Search
        </Button>
      </div>
      
      {isDropdownOpen && (
        <Card className="absolute z-50 mt-1 w-full max-h-60 overflow-auto shadow-lg">
          <div className="p-2">
            {searchResults.length === 0 ? (
              <div className="text-center py-2 text-sm text-gray-500">
                No invoices found
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {searchResults.map((invoice) => (
                  <li 
                    key={invoice.id}
                    className="py-2 px-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleInvoiceSelect(invoice)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{invoice.invoiceNumber}</span>
                      <span className="text-sm text-gray-500">{invoice.date}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {invoice.customer} - {invoice.country}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">{invoice.consignee1}</span>
                      <span className="text-sm font-semibold">{invoice.net}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default InvoiceSearch;
