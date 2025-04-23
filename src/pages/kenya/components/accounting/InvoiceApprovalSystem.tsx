
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, X, Search, Printer } from 'lucide-react';
import { toast } from 'sonner';

interface Invoice {
  id: string;
  invoiceNumber: string;
  consignee: string;
  date: string;
  amount: number;
  packages: number;
  isPaid: boolean;
  isApproved: boolean;
}

const InvoiceApprovalSystem = () => {
  // Mock invoice data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'GY-KE-23001',
      consignee: 'Kenya Importers Ltd',
      date: '2025-04-15',
      amount: 3500,
      packages: 12,
      isPaid: true,
      isApproved: false
    },
    {
      id: '2',
      invoiceNumber: 'GY-KE-23002',
      consignee: 'Nairobi Traders Co.',
      date: '2025-04-16',
      amount: 2800,
      packages: 8,
      isPaid: true,
      isApproved: true
    },
    {
      id: '3',
      invoiceNumber: 'GY-KE-23003',
      consignee: 'Mombasa Shipping Services',
      date: '2025-04-17',
      amount: 4200,
      packages: 15,
      isPaid: false,
      isApproved: false
    },
    {
      id: '4',
      invoiceNumber: 'GY-KE-23004',
      consignee: 'East Africa Logistics',
      date: '2025-04-18',
      amount: 1900,
      packages: 5,
      isPaid: true,
      isApproved: false
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPaid, setFilterPaid] = useState<boolean | null>(null);
  
  // Filter invoices based on search and paid status
  const filteredInvoices = invoices.filter(invoice => 
    (invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
     invoice.consignee.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterPaid === null || invoice.isPaid === filterPaid)
  );
  
  // Approve or reject an invoice
  const handleApproval = (invoiceId: string, approve: boolean) => {
    setInvoices(invoices.map(invoice => {
      if (invoice.id === invoiceId) {
        const updated = { ...invoice, isApproved: approve };
        
        if (approve) {
          toast.success(`Invoice ${invoice.invoiceNumber} approved for loading`);
        } else {
          toast.error(`Invoice ${invoice.invoiceNumber} rejected for loading`);
        }
        
        return updated;
      }
      return invoice;
    }));
  };
  
  // Mark an invoice as paid/unpaid
  const handlePaymentToggle = (invoiceId: string) => {
    setInvoices(invoices.map(invoice => {
      if (invoice.id === invoiceId) {
        const updated = { ...invoice, isPaid: !invoice.isPaid };
        
        if (updated.isPaid) {
          toast.success(`Invoice ${invoice.invoiceNumber} marked as paid`);
        } else {
          toast.info(`Invoice ${invoice.invoiceNumber} marked as unpaid`);
        }
        
        return updated;
      }
      return invoice;
    }));
  };
  
  // Generate PDF with all paid invoices
  const printPaidInvoices = () => {
    toast.success("Generating PDF for paid invoices");
    // In a real app, this would generate a PDF
  };
  
  // Generate PDF with all unpaid invoices
  const printUnpaidInvoices = () => {
    toast.success("Generating PDF for unpaid invoices");
    // In a real app, this would generate a PDF
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50">
        <div className="flex flex-wrap justify-between items-center">
          <CardTitle>Kenya Invoice Payment & Approval System</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={printPaidInvoices}
              className="flex items-center gap-1 bg-white"
            >
              <Printer size={16} />
              Print Paid
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={printUnpaidInvoices}
              className="flex items-center gap-1 bg-white"
            >
              <Printer size={16} />
              Print Unpaid
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-2 items-center">
          <div className="flex gap-2">
            <Button 
              variant={filterPaid === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterPaid(null)}
            >
              All
            </Button>
            <Button 
              variant={filterPaid === true ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterPaid(true)}
              className={filterPaid === true ? "bg-green-500 hover:bg-green-600" : ""}
            >
              Paid
            </Button>
            <Button 
              variant={filterPaid === false ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterPaid(false)}
              className={filterPaid === false ? "bg-red-500 hover:bg-red-600" : ""}
            >
              Unpaid
            </Button>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[120px]">Invoice #</TableHead>
                <TableHead>Consignee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount (KES)</TableHead>
                <TableHead className="text-center">Packages</TableHead>
                <TableHead className="text-center">Payment Status</TableHead>
                <TableHead className="text-center">Loading Approval</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map(invoice => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.consignee}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-center">{invoice.packages}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={invoice.isPaid ? "bg-green-500" : "bg-red-500"}
                        onClick={() => handlePaymentToggle(invoice.id)}
                      >
                        {invoice.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={
                          invoice.isApproved 
                            ? "bg-green-500" 
                            : "bg-gray-400"
                        }
                      >
                        {invoice.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-50 border-green-200 hover:bg-green-100 text-green-600 h-8 w-8 p-0"
                          onClick={() => handleApproval(invoice.id, true)}
                          disabled={!invoice.isPaid || invoice.isApproved}
                          title="Approve for loading"
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-50 border-red-200 hover:bg-red-100 text-red-600 h-8 w-8 p-0"
                          onClick={() => handleApproval(invoice.id, false)}
                          disabled={!invoice.isPaid}
                          title="Reject"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    No invoices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          {filteredInvoices.length} invoices found • 
          {invoices.filter(i => i.isPaid).length} paid • 
          {invoices.filter(i => i.isApproved).length} approved
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceApprovalSystem;
