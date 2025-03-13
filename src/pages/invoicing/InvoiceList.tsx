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
  Edit, 
  Trash, 
  Eye, 
  Plus,
  Printer
} from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const InvoiceList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;
  const [branch, setBranch] = useState("ALL");
  const [sector, setSector] = useState("ALL");
  const [transport, setTransport] = useState("ALL");
  const [door, setDoor] = useState("ALL");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const handlePrintInvoice = (invoiceId: string) => {
    window.open(`/data-entry/invoicing/print/${invoiceId}`, '_blank');
  };

  const filteredData = mockInvoiceData.filter(
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
    <Layout title="Invoice Management">
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
              <option value="ALL">ALL TRANSPORT</option>
              <option value="SEA">SEA</option>
              <option value="AIR">AIR</option>
              <option value="LAND">LAND</option>
            </select>
            
            <select 
              value={door}
              onChange={(e) => setDoor(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL D2D</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
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
            
            <Link to="/data-entry/invoicing/new" className="ml-auto">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Add New
              </Button>
            </Link>
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
                <TableRow className="bg-soqotra-blue hover:bg-soqotra-blue">
                  <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Modify</InvoiceTableHead>
                  <InvoiceTableHead className="w-28">Inv. Date</InvoiceTableHead>
                  <InvoiceTableHead>Customer</InvoiceTableHead>
                  <InvoiceTableHead>Shipper</InvoiceTableHead>
                  <InvoiceTableHead>Consignee</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">S/A</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">W/H</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">D2D</InvoiceTableHead>
                  <InvoiceTableHead className="w-28">NIC</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Vol</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Weight</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">Pkgs</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Gross</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Disc</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Net</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">Paid</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Sta Chg</InvoiceTableHead>
                  <InvoiceTableHead className="w-20">Offer Disc</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">Delete</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">View</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">Print</InvoiceTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <InvoiceTableCell className="text-center">{indexOfFirstEntry + index + 1}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Link to={`/data-entry/invoicing/edit/${item.id}`}>
                          <Edit size={16} className="text-blue-500 inline-block" />
                        </Link>
                      </InvoiceTableCell>
                      <InvoiceTableCell>{item.date}</InvoiceTableCell>
                      <InvoiceTableCell>{item.customer}</InvoiceTableCell>
                      <InvoiceTableCell>{item.shipper1}</InvoiceTableCell>
                      <InvoiceTableCell>{item.consignee1}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.salesAgent}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.warehouse}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.doorToDoor ? "Yes" : "No"}</InvoiceTableCell>
                      <InvoiceTableCell>{item.nic}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.volume}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.weight}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.packages}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.gross}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.discount}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.net}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">{item.paid ? "Yes" : "No"}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.statusCharge}</InvoiceTableCell>
                      <InvoiceTableCell className="text-right">{item.offerDiscount}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Trash size={16} className="text-red-500 inline-block cursor-pointer" />
                      </InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Eye size={16} className="text-green-500 inline-block cursor-pointer" />
                      </InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Printer 
                          size={16} 
                          className="text-blue-500 inline-block cursor-pointer" 
                          onClick={() => handlePrintInvoice(item.id)}
                        />
                      </InvoiceTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <InvoiceTableCell colSpan={22} className="text-center py-4">
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

export default InvoiceList;
