
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Eye } from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  consignee1: string;
  shipper1: string;
  net: number;
  paid: boolean;
  [key: string]: any;
}

const InvoiceSearchPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.warning("Please enter an invoice number or other search terms");
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = mockInvoiceData.filter(invoice => 
      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.consignee1.toLowerCase().includes(query) ||
      invoice.shipper1?.toLowerCase().includes(query)
    );
    
    setFilteredInvoices(results);
    setHasSearched(true);
    
    if (results.length === 0) {
      toast.info("No matching invoices found");
    } else {
      toast.success(`Found ${results.length} matching invoice(s)`);
    }
  };

  const handleViewInvoice = (invoiceId: string) => {
    // Navigate to the invoice print view
    navigate(`/data-entry/print-documents/invoice-preview/${invoiceId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(amount);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="text-lg font-medium text-green-800 flex items-center">
          <FileText className="mr-2 h-5 w-5 text-green-600" />
          Invoice Search
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by invoice #, shipper, or consignee"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Search Invoices
            </Button>
          </div>
        </form>

        {hasSearched && (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Shipper</TableHead>
                  <TableHead>Consignee</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                      No matching invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.shipper1 || '-'}</TableCell>
                      <TableCell>{invoice.consignee1}</TableCell>
                      <TableCell className="text-right">{formatCurrency(invoice.net)}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.paid 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {invoice.paid ? "Paid" : "Unpaid"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-blue-600"
                          onClick={() => handleViewInvoice(invoice.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvoiceSearchPanel;
