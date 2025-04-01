import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  InvoiceTableHead,
  InvoiceTableCell 
} from "@/components/ui/table";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Printer, 
  FileText,
  Ship
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data for Invoices
const mockInvoiceData = [
  { id: "1", invoiceNumber: "INV001", date: "2023-05-10", customer: "Ahmed Mohammad", amount: "1,200.00" },
  { id: "2", invoiceNumber: "INV002", date: "2023-06-15", customer: "Ravi Kumar", amount: "850.50" },
  { id: "3", invoiceNumber: "INV003", date: "2023-07-20", customer: "Soqotra Shipping", amount: "2,500.00" },
  { id: "4", invoiceNumber: "INV004", date: "2023-08-01", customer: "Fahim Abdullah", amount: "720.00" },
];

// Mock data for Bill of Lading
const mockBLData = [
  { id: "1", blNumber: "BL001", date: "2023-05-10", shipper: "Ahmed Mohammad", consignee: "Sri Lankan Cargo" },
  { id: "2", blNumber: "BL002", date: "2023-06-15", shipper: "Ravi Kumar", consignee: "Kenya Imports Ltd" },
  { id: "3", blNumber: "BL003", date: "2023-07-20", shipper: "Soqotra Shipping", consignee: "Abdul Trading LLC" },
  { id: "4", blNumber: "BL004", date: "2023-08-01", shipper: "Fahim Abdullah", consignee: "Mogadishu Traders" },
];

const PrintDocuments = () => {
  const navigate = useNavigate();
  const [searchInvoice, setSearchInvoice] = useState("");
  const [searchBL, setSearchBL] = useState("");
  const [currentInvoicePage, setCurrentInvoicePage] = useState(1);
  const [currentBLPage, setCurrentBLPage] = useState(1);
  const entriesPerPage = 10;
  
  const filteredInvoices = mockInvoiceData.filter(
    (item) =>
      searchInvoice === "" || 
      item.invoiceNumber.toLowerCase().includes(searchInvoice.toLowerCase()) || 
      item.customer.toLowerCase().includes(searchInvoice.toLowerCase())
  );
  
  const filteredBL = mockBLData.filter(
    (item) =>
      searchBL === "" || 
      item.blNumber.toLowerCase().includes(searchBL.toLowerCase()) || 
      item.shipper.toLowerCase().includes(searchBL.toLowerCase()) || 
      item.consignee.toLowerCase().includes(searchBL.toLowerCase())
  );
  
  const totalInvoicePages = Math.ceil(filteredInvoices.length / entriesPerPage);
  const invoiceIndexOfLastEntry = currentInvoicePage * entriesPerPage;
  const invoiceIndexOfFirstEntry = invoiceIndexOfLastEntry - entriesPerPage;
  const currentInvoices = filteredInvoices.slice(invoiceIndexOfFirstEntry, invoiceIndexOfLastEntry);
  
  const totalBLPages = Math.ceil(filteredBL.length / entriesPerPage);
  const blIndexOfLastEntry = currentBLPage * entriesPerPage;
  const blIndexOfFirstEntry = blIndexOfLastEntry - entriesPerPage;
  const currentBL = filteredBL.slice(blIndexOfFirstEntry, blIndexOfLastEntry);
  
  const handlePrintInvoice = (id: string) => {
    console.log("Printing invoice ID:", id);
    window.open(`/data-entry/print-documents/invoice-print/${id}`, "_blank");
    toast.success("Opening invoice for printing");
  };
  
  const handlePrintBL = (id: string) => {
    console.log("Printing BL ID:", id);
    window.open(`/data-entry/print-documents/bl-print/${id}`, "_blank");
    toast.success("Opening bill of lading for printing");
  };
  
  return (
    <Layout title="Print Documents">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">Print Invoices and Bills of Lading</h3>
        </div>
        
        <div className="p-4">
          <Tabs defaultValue="invoices" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="invoices" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <FileText className="mr-2 h-4 w-4" />
                Invoices
              </TabsTrigger>
              <TabsTrigger value="bl" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                <Ship className="mr-2 h-4 w-4" />
                Bills of Lading
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="invoices" className="mt-0">
              <div className="mb-4 relative">
                <Input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchInvoice}
                  onChange={(e) => setSearchInvoice(e.target.value)}
                  className="pl-9 border border-gray-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              
              <div className="overflow-x-auto border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-600 hover:bg-blue-600">
                      <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
                      <InvoiceTableHead>Invoice Number</InvoiceTableHead>
                      <InvoiceTableHead>Date</InvoiceTableHead>
                      <InvoiceTableHead>Customer</InvoiceTableHead>
                      <InvoiceTableHead>Amount</InvoiceTableHead>
                      <InvoiceTableHead className="w-20">Print</InvoiceTableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentInvoices.length > 0 ? (
                      currentInvoices.map((item, index) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                          <InvoiceTableCell className="text-center">{invoiceIndexOfFirstEntry + index + 1}</InvoiceTableCell>
                          <InvoiceTableCell>{item.invoiceNumber}</InvoiceTableCell>
                          <InvoiceTableCell>{item.date}</InvoiceTableCell>
                          <InvoiceTableCell>{item.customer}</InvoiceTableCell>
                          <InvoiceTableCell>{item.amount}</InvoiceTableCell>
                          <InvoiceTableCell className="text-center">
                            <Button 
                              onClick={() => handlePrintInvoice(item.id)}
                              variant="outline"
                              size="sm"
                              className="px-2 h-8"
                            >
                              <Printer size={16} className="text-blue-500" />
                            </Button>
                          </InvoiceTableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <InvoiceTableCell colSpan={6} className="text-center py-4">
                          No invoices found
                        </InvoiceTableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Showing {filteredInvoices.length > 0 ? invoiceIndexOfFirstEntry + 1 : 0} to{" "}
                  {Math.min(invoiceIndexOfLastEntry, filteredInvoices.length)} of {filteredInvoices.length} entries
                </div>
                
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                    onClick={() => setCurrentInvoicePage(Math.max(1, currentInvoicePage - 1))}
                    disabled={currentInvoicePage === 1}
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                    onClick={() => setCurrentInvoicePage(Math.min(totalInvoicePages, currentInvoicePage + 1))}
                    disabled={currentInvoicePage === totalInvoicePages || totalInvoicePages === 0}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bl" className="mt-0">
              <div className="mb-4 relative">
                <Input
                  type="text"
                  placeholder="Search bills of lading..."
                  value={searchBL}
                  onChange={(e) => setSearchBL(e.target.value)}
                  className="pl-9 border border-gray-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              
              <div className="overflow-x-auto border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-600 hover:bg-indigo-600">
                      <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
                      <InvoiceTableHead>BL Number</InvoiceTableHead>
                      <InvoiceTableHead>Date</InvoiceTableHead>
                      <InvoiceTableHead>Shipper</InvoiceTableHead>
                      <InvoiceTableHead>Consignee</InvoiceTableHead>
                      <InvoiceTableHead className="w-20">Print</InvoiceTableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentBL.length > 0 ? (
                      currentBL.map((item, index) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                          <InvoiceTableCell className="text-center">{blIndexOfFirstEntry + index + 1}</InvoiceTableCell>
                          <InvoiceTableCell>{item.blNumber}</InvoiceTableCell>
                          <InvoiceTableCell>{item.date}</InvoiceTableCell>
                          <InvoiceTableCell>{item.shipper}</InvoiceTableCell>
                          <InvoiceTableCell>{item.consignee}</InvoiceTableCell>
                          <InvoiceTableCell className="text-center">
                            <Button 
                              onClick={() => handlePrintBL(item.id)}
                              variant="outline"
                              size="sm"
                              className="px-2 h-8"
                            >
                              <Printer size={16} className="text-indigo-500" />
                            </Button>
                          </InvoiceTableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <InvoiceTableCell colSpan={6} className="text-center py-4">
                          No bills of lading found
                        </InvoiceTableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Showing {filteredBL.length > 0 ? blIndexOfFirstEntry + 1 : 0} to{" "}
                  {Math.min(blIndexOfLastEntry, filteredBL.length)} of {filteredBL.length} entries
                </div>
                
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                    onClick={() => setCurrentBLPage(Math.max(1, currentBLPage - 1))}
                    disabled={currentBLPage === 1}
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                    onClick={() => setCurrentBLPage(Math.min(totalBLPages, currentBLPage + 1))}
                    disabled={currentBLPage === totalBLPages || totalBLPages === 0}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PrintDocuments;
