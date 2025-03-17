
import { useState } from "react";
import { Link } from "react-router-dom";
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
  Eye,
  Filter,
  Maximize2
} from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InvoiceDetailsView } from "@/components/reports/InvoiceDetailsView";

const CargoReportsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;
  const [branch, setBranch] = useState("ALL");
  const [sector, setSector] = useState("ALL");
  const [transport, setTransport] = useState("ALL");
  const [warehouses, setWarehouses] = useState("ALL");
  const [zones, setZones] = useState("ALL");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // For invoice details dialog
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Mock data transformed for cargo reports with transport property added
  const cargoData = mockInvoiceData.map(item => ({
    ...item,
    zone: ["Normal Rate", "Special Rate", "Corporate Rate"][Math.floor(Math.random() * 3)],
    warehouse: ["Galle", "Kurunegala", "Colombo", "Kandy"][Math.floor(Math.random() * 4)],
    entryBy: `alihq#${item.date.split('/').join('')}`,
    payStatus: ["Un-Settle", "Settled", "Partial"][Math.floor(Math.random() * 3)],
    due: item.paid ? 0 : item.net,
    transport: ["SEA", "AIR"][Math.floor(Math.random() * 2)], // Added transport property
    shipperMobile: `${Math.floor(10000000 + Math.random() * 90000000)}`,
    consigneeMobile: `${Math.floor(10000000 + Math.random() * 90000000)}`,
    passport: `N${Math.floor(1000000 + Math.random() * 9000000)}`
  }));

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsDetailsOpen(true);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const filteredData = cargoData.filter((item) => {
    // First apply dropdown filters
    if (branch !== "ALL" && item.branch !== branch) return false;
    if (sector !== "ALL" && item.sector !== sector) return false;
    if (transport !== "ALL" && item.transport !== transport) return false;
    if (warehouses !== "ALL" && item.warehouse !== warehouses) return false;
    if (zones !== "ALL" && item.zone !== zones) return false;
    if (invoiceNumber && item.invoiceNumber !== invoiceNumber) return false;

    // If no search text, return all items that passed the filters
    if (searchText === "") return true;

    const searchLower = searchText.toLowerCase();

    // Then apply text search based on selected field
    switch (searchField) {
      case "invoiceNumber":
        return item.invoiceNumber.toLowerCase().includes(searchLower);
      case "shipperName":
        return item.shipper1?.toLowerCase().includes(searchLower);
      case "shipperMobile":
        return item.shipperMobile?.toLowerCase().includes(searchLower);
      case "consigneeName":
        return item.consignee1?.toLowerCase().includes(searchLower);
      case "consigneeMobile":
        return item.consigneeMobile?.toLowerCase().includes(searchLower);
      case "all":
      default:
        return (
          item.id.toLowerCase().includes(searchLower) ||
          item.invoiceNumber.toLowerCase().includes(searchLower) ||
          item.customer.toLowerCase().includes(searchLower) ||
          item.shipper1?.toLowerCase().includes(searchLower) ||
          item.shipperMobile?.toLowerCase().includes(searchLower) ||
          item.consignee1?.toLowerCase().includes(searchLower) ||
          item.consigneeMobile?.toLowerCase().includes(searchLower) ||
          item.passport?.toLowerCase().includes(searchLower)
        );
    }
  });

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Apply fullscreen-specific styles
  const containerClasses = isFullScreen 
    ? "fixed inset-0 z-50 bg-white p-4 overflow-y-auto animate-fade-in" 
    : "bg-white rounded-lg shadow-sm border border-gray-200";

  const headerClasses = isFullScreen 
    ? "p-4 bg-[#F2FCE2] border-b border-green-100 flex justify-between items-center" 
    : "p-4 bg-green-50 border-b border-green-100";

  return (
    <Layout title="Cargo Reports">
      <div className={containerClasses}>
        <div className={headerClasses}>
          <h3 className="text-lg font-medium text-green-800">View Invoice Record Listed</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto flex items-center gap-1 text-blue-600 hover:bg-blue-50"
            onClick={toggleFullScreen}
          >
            <Maximize2 size={16} />
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}
          </Button>
        </div>
        
        <div className={`p-4 flex flex-col gap-4 ${isFullScreen ? 'animate-fade-in' : ''}`}>
          <div className="flex flex-wrap gap-2 w-full">
            <select 
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
            >
              <option value="ALL">ALL SECTORS</option>
              <option value="COLOMBO : C">COLOMBO : C</option>
              <option value="DOHA : D">DOHA : D</option>
            </select>
            
            <select 
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
            >
              <option value="ALL">ALL BRANCHES</option>
              <option value="MAIN">MAIN</option>
              <option value="DOHA">DOHA</option>
            </select>
            
            <select 
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
            >
              <option value="ALL">ALL</option>
              <option value="SEA">SEA</option>
              <option value="AIR">AIR</option>
            </select>
            
            <select 
              value={warehouses}
              onChange={(e) => setWarehouses(e.target.value)}
              className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
            >
              <option value="ALL">ALL</option>
              <option value="Galle">Galle</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
            </select>
            
            <select 
              value={zones}
              onChange={(e) => setZones(e.target.value)}
              className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
            >
              <option value="ALL">ALL</option>
              <option value="Normal Rate">Normal Rate</option>
              <option value="Special Rate">Special Rate</option>
              <option value="Corporate Rate">Corporate Rate</option>
            </select>
            
            <select 
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in min-w-[150px]"
            >
              <option value="">INVOICE NUMBER</option>
              {[...new Set(mockInvoiceData.map(i => i.invoiceNumber))].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            
            <div className="ml-auto">
              <input
                type="text"
                placeholder="BARCODE"
                className="border border-gray-300 rounded px-2 py-1 text-sm hover:border-blue-400 transition-colors focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm hover:border-blue-400 transition-colors">
                <option>50</option>
                <option>100</option>
                <option>200</option>
              </select>
              <span className="text-sm text-gray-500">entries</span>
            </div>
            
            <div className="flex grow items-center gap-2 ml-auto">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm hover:border-blue-400 transition-colors"
              >
                <option value="all">All Fields</option>
                <option value="invoiceNumber">Invoice Number</option>
                <option value="shipperName">Shipper Name</option>
                <option value="shipperMobile">Shipper Mobile</option>
                <option value="consigneeName">Consignee Name</option>
                <option value="consigneeMobile">Consignee Mobile</option>
              </select>
              
              <div className="relative grow">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-9 pr-3 py-1 h-8 text-sm w-full focus:ring-2 focus:ring-blue-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#33C3F0] hover:bg-[#1EA5E9]">
                  <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
                  <InvoiceTableHead className="w-28">INV. Num</InvoiceTableHead>
                  <InvoiceTableHead className="w-28">INV. DATE</InvoiceTableHead>
                  <InvoiceTableHead>CUSTOMER</InvoiceTableHead>
                  <InvoiceTableHead>SHIPPER</InvoiceTableHead>
                  <InvoiceTableHead>CONSIGNEE</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">SEA/AIR</InvoiceTableHead>
                  <InvoiceTableHead>ZONE</InvoiceTableHead>
                  <InvoiceTableHead>WAREHOUSE</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">VOL</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">WGHT</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">PKGS</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">GROSS</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">DISC</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">NET</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">PAID</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">DUE</InvoiceTableHead>
                  <InvoiceTableHead>ENTRYBY/DATE</InvoiceTableHead>
                  <InvoiceTableHead>PAY STATUS</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">DISPLAY</InvoiceTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-[#F2FCE2] transition-colors">
                      <InvoiceTableCell className="text-center">{indexOfFirstEntry + index + 1}</InvoiceTableCell>
                      <InvoiceTableCell>{item.invoiceNumber}</InvoiceTableCell>
                      <InvoiceTableCell>{item.date}</InvoiceTableCell>
                      <InvoiceTableCell>{item.customer}</InvoiceTableCell>
                      <InvoiceTableCell>{item.shipper1}</InvoiceTableCell>
                      <InvoiceTableCell>{item.consignee1}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.transport}</InvoiceTableCell>
                      <InvoiceTableCell>{item.zone}</InvoiceTableCell>
                      <InvoiceTableCell>{item.warehouse}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.volume}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.weight}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.packages}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.gross}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.discount}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.net}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.paid ? "0.00" : item.net}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.due}</InvoiceTableCell>
                      <InvoiceTableCell>{item.entryBy}</InvoiceTableCell>
                      <InvoiceTableCell>{item.payStatus}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Button 
                          variant="ghost" 
                          className="text-blue-500 p-0 h-auto hover:bg-blue-50 hover:scale-105 transition-transform"
                          onClick={() => handleViewInvoice(item)}
                        >
                          DISPLAY
                        </Button>
                      </InvoiceTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <InvoiceTableCell colSpan={20} className="text-center py-4">
                      No data available in table
                    </InvoiceTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredData.length > 0 ? indexOfFirstEntry + 1 : 0} to{" "}
              {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries
            </div>
            
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-[#33C3F0] hover:text-white hover:border-[#33C3F0] transition-colors"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-[#33C3F0] hover:text-white hover:border-[#33C3F0] transition-colors"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Display Invoice</DialogTitle>
          </DialogHeader>
          {selectedInvoice && <InvoiceDetailsView invoice={selectedInvoice} />}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CargoReportsPage;
