
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
  Eye
} from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

const CargoReportsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;
  const [branch, setBranch] = useState("ALL");
  const [sector, setSector] = useState("ALL");
  const [transport, setTransport] = useState("ALL");
  const [warehouses, setWarehouses] = useState("ALL");
  const [zones, setZones] = useState("ALL");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  // Mock data transformed for cargo reports with transport property added
  const cargoData = mockInvoiceData.map(item => ({
    ...item,
    zone: ["Normal Rate", "Special Rate", "Corporate Rate"][Math.floor(Math.random() * 3)],
    warehouse: ["Galle", "Kurunegala", "Colombo", "Kandy"][Math.floor(Math.random() * 4)],
    entryBy: `alihq#${item.date.split('/').join('')}`,
    payStatus: ["Un-Settle", "Settled", "Partial"][Math.floor(Math.random() * 3)],
    due: item.paid ? 0 : item.net,
    transport: ["SEA", "AIR"][Math.floor(Math.random() * 2)] // Added transport property
  }));

  const filteredData = cargoData.filter(
    (item) =>
      (searchText === "" || 
        item.id.toLowerCase().includes(searchText.toLowerCase()) || 
        item.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) || 
        item.customer.toLowerCase().includes(searchText.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <Layout title="Cargo Reports">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">View Invoice Record Listed</h3>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 w-full">
            <select 
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL SECTORS</option>
              <option value="COLOMBO : C">COLOMBO : C</option>
              <option value="DOHA : D">DOHA : D</option>
            </select>
            
            <select 
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL BRANCHES</option>
              <option value="MAIN">MAIN</option>
              <option value="DOHA">DOHA</option>
            </select>
            
            <select 
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL</option>
              <option value="SEA">SEA</option>
              <option value="AIR">AIR</option>
            </select>
            
            <select 
              value={warehouses}
              onChange={(e) => setWarehouses(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
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
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL</option>
              <option value="Normal Rate">Normal Rate</option>
              <option value="Special Rate">Special Rate</option>
              <option value="Corporate Rate">Corporate Rate</option>
            </select>
            
            <select 
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm min-w-[150px]"
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
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>50</option>
                <option>100</option>
                <option>200</option>
              </select>
              <span className="text-sm text-gray-500">entries</span>
            </div>
            
            <div className="relative ml-auto">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9 pr-3 py-1 border border-gray-300 rounded text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>
          
          <div className="overflow-x-auto border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
                  <InvoiceTableHead className="w-28">INV. Num</InvoiceTableHead>
                  <InvoiceTableHead className="w-28">INV. DATE</InvoiceTableHead>
                  <InvoiceTableHead>CUSTOMER</InvoiceTableHead>
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
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <InvoiceTableCell className="text-center">{indexOfFirstEntry + index + 1}</InvoiceTableCell>
                      <InvoiceTableCell>{item.invoiceNumber}</InvoiceTableCell>
                      <InvoiceTableCell>{item.date}</InvoiceTableCell>
                      <InvoiceTableCell>{item.customer}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.transport || "S"}</InvoiceTableCell>
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
                        <Button variant="link" className="text-blue-500 p-0 h-auto">
                          DISPLAY
                        </Button>
                      </InvoiceTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <InvoiceTableCell colSpan={18} className="text-center py-4">
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
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CargoReportsPage;
