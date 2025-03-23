
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus, Search, ArrowUpDown } from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UnsettledInvoice {
  id: string;
  invoiceNumber: string | null;
  gy: string;
  shipper: string;
  consignee: string;
  net: number;
  paid: number;
  due: number;
}

const InvoiceAssignment: React.FC = () => {
  const [unsettledInvoices, setUnsettledInvoices] = useState<UnsettledInvoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState("GY 13136051");
  
  useEffect(() => {
    // Generate mock unsettled invoices based on mockInvoiceData
    const mockUnsettled: UnsettledInvoice[] = mockInvoiceData
      .filter(invoice => !invoice.paid && invoice.invoiceNumber === "")
      .map(invoice => ({
        id: uuidv4(),
        invoiceNumber: null,
        gy: `GY-${Math.floor(1000000 + Math.random() * 9000000)}`,
        shipper: invoice.shipper1 || "Unknown",
        consignee: invoice.consignee1 || "Unknown",
        net: invoice.net || 0,
        paid: invoice.paid ? invoice.net : 0,
        due: invoice.paid ? 0 : invoice.net || 0
      }));
    
    setUnsettledInvoices(mockUnsettled);
  }, []);

  const filteredInvoices = unsettledInvoices.filter(invoice => 
    invoice.shipper.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.consignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (invoice.invoiceNumber && invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    invoice.gy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const generateNextInvoiceNumber = (current: string) => {
    const prefix = current.split(" ")[0];
    const number = parseInt(current.split(" ")[1]);
    return `${prefix} ${(number + 1).toString().padStart(8, '0')}`;
  };

  const handleAssignInvoiceNumber = (id: string) => {
    setUnsettledInvoices(prevInvoices => {
      return prevInvoices.map(invoice => {
        if (invoice.id === id) {
          const newInvoice = { ...invoice, invoiceNumber: nextInvoiceNumber };
          setNextInvoiceNumber(generateNextInvoiceNumber(nextInvoiceNumber));
          return newInvoice;
        }
        return invoice;
      });
    });
    toast.success(`Invoice number ${nextInvoiceNumber} assigned`);
  };

  const handleAssignAllInvoices = () => {
    let currentInvoiceNumber = nextInvoiceNumber;
    
    setUnsettledInvoices(prevInvoices => {
      return prevInvoices.map(invoice => {
        if (!invoice.invoiceNumber) {
          const newInvoice = { ...invoice, invoiceNumber: currentInvoiceNumber };
          currentInvoiceNumber = generateNextInvoiceNumber(currentInvoiceNumber);
          return newInvoice;
        }
        return invoice;
      });
    });
    
    setNextInvoiceNumber(currentInvoiceNumber);
    toast.success("All missing invoices have been assigned numbers");
  };

  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Batch Invoice Assignment</h2>
        <p className="text-gray-600 mb-6">
          Assign invoice numbers to unsettled invoices. Invoice numbers will be automatically 
          generated starting from {nextInvoiceNumber}.
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleAssignAllInvoices}
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Assign All Missing Invoice Numbers
          </Button>
        </div>
        
        <Table>
          <TableHeader className="bg-blue-50">
            <TableRow>
              <TableHead className="font-bold text-blue-800 text-center">Num</TableHead>
              <TableHead className="font-bold text-blue-800 text-center">
                <div className="flex items-center justify-center">
                  Invoice Number
                  <ArrowUpDown size={16} className="ml-1" />
                </div>
              </TableHead>
              <TableHead className="font-bold text-blue-800 text-center">GY</TableHead>
              <TableHead className="font-bold text-blue-800">SHIPPER</TableHead>
              <TableHead className="font-bold text-blue-800">CONSIGNEE</TableHead>
              <TableHead className="font-bold text-blue-800 text-right">NET</TableHead>
              <TableHead className="font-bold text-blue-800 text-right">PAID</TableHead>
              <TableHead className="font-bold text-blue-800 text-right">DUE</TableHead>
              <TableHead className="font-bold text-blue-800 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice, index) => (
              <TableRow key={invoice.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center font-medium">
                  {invoice.invoiceNumber || "-"}
                </TableCell>
                <TableCell className="text-center">{invoice.gy}</TableCell>
                <TableCell>{invoice.shipper}</TableCell>
                <TableCell>{invoice.consignee}</TableCell>
                <TableCell className="text-right">${invoice.net.toFixed(2)}</TableCell>
                <TableCell className="text-right">${invoice.paid.toFixed(2)}</TableCell>
                <TableCell className="text-right">${invoice.due.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  {!invoice.invoiceNumber && (
                    <Button 
                      variant="outline" 
                      className="h-8 text-xs border-blue-500 text-blue-500 hover:bg-blue-50"
                      onClick={() => handleAssignInvoiceNumber(invoice.id)}
                    >
                      Assign Number
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                  No unsettled invoices found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceAssignment;
