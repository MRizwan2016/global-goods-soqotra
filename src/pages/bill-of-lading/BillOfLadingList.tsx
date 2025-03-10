
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
import { Button } from "@/components/ui/button";

// Mock data for Bill of Lading
const mockBLData = [
  { 
    id: "1", 
    blNumber: "BL001", 
    date: "2023-05-10", 
    shipper: "Ahmed Mohammad", 
    consignee: "Sri Lankan Cargo", 
    origin: "Doha", 
    destination: "Colombo",
    cargoType: "Personal Effects",
    vessel: "MSC Gülsün",
    status: "Shipped" 
  },
  { 
    id: "2", 
    blNumber: "BL002", 
    date: "2023-06-15", 
    shipper: "Ravi Kumar", 
    consignee: "Kenya Imports Ltd", 
    origin: "Dubai", 
    destination: "Nairobi",
    cargoType: "Household Goods",
    vessel: "Maersk Honam",
    status: "In Transit" 
  },
  { 
    id: "3", 
    blNumber: "BL003", 
    date: "2023-07-20", 
    shipper: "Soqotra Shipping", 
    consignee: "Abdul Trading LLC", 
    origin: "Colombo", 
    destination: "Dubai",
    cargoType: "Car",
    vessel: "CMA CGM Antoine",
    status: "Delivered" 
  },
  { 
    id: "4", 
    blNumber: "BL004", 
    date: "2023-08-01", 
    shipper: "Fahim Abdullah", 
    consignee: "Mogadishu Traders", 
    origin: "Jeddah", 
    destination: "Mogadishu",
    cargoType: "Truck",
    vessel: "COSCO Shipping Leo",
    status: "Shipped" 
  },
  { 
    id: "5", 
    blNumber: "BL005", 
    date: "2023-09-10", 
    shipper: "Dubai Exports LLC", 
    consignee: "Sudan Trading Co", 
    origin: "Dubai", 
    destination: "Port Sudan",
    cargoType: "Personal Effects",
    vessel: "ONE Apus",
    status: "In Transit" 
  },
];

const BillOfLadingList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;
  const [origin, setOrigin] = useState("ALL");
  const [destination, setDestination] = useState("ALL");
  const [cargoType, setCargoType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const filteredData = mockBLData.filter(
    (item) =>
      (searchText === "" || 
        item.blNumber.toLowerCase().includes(searchText.toLowerCase()) || 
        item.shipper.toLowerCase().includes(searchText.toLowerCase()) || 
        item.consignee.toLowerCase().includes(searchText.toLowerCase())) &&
      (origin === "ALL" || item.origin === origin) &&
      (destination === "ALL" || item.destination === destination) &&
      (cargoType === "ALL" || item.cargoType === cargoType) &&
      (status === "ALL" || item.status === status)
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <Layout title="Bill of Lading Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">Bill of Lading Records</h3>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 w-full">
            <select 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL ORIGINS</option>
              <option value="Doha">DOHA</option>
              <option value="Dubai">DUBAI</option>
              <option value="Colombo">COLOMBO</option>
              <option value="Jeddah">JEDDAH</option>
            </select>
            
            <select 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL DESTINATIONS</option>
              <option value="Colombo">COLOMBO</option>
              <option value="Nairobi">NAIROBI</option>
              <option value="Dubai">DUBAI</option>
              <option value="Mogadishu">MOGADISHU</option>
              <option value="Port Sudan">PORT SUDAN</option>
            </select>
            
            <select 
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL CARGO TYPES</option>
              <option value="Personal Effects">PERSONAL EFFECTS</option>
              <option value="Household Goods">HOUSEHOLD GOODS</option>
              <option value="Car">CAR</option>
              <option value="Truck">TRUCK</option>
            </select>
            
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="Shipped">SHIPPED</option>
              <option value="In Transit">IN TRANSIT</option>
              <option value="Delivered">DELIVERED</option>
            </select>
            
            <Link to="/data-entry/bill-of-lading/new" className="ml-auto">
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
                  <InvoiceTableHead className="w-28">BL Number</InvoiceTableHead>
                  <InvoiceTableHead className="w-28">Date</InvoiceTableHead>
                  <InvoiceTableHead>Shipper</InvoiceTableHead>
                  <InvoiceTableHead>Consignee</InvoiceTableHead>
                  <InvoiceTableHead>Origin</InvoiceTableHead>
                  <InvoiceTableHead>Destination</InvoiceTableHead>
                  <InvoiceTableHead>Cargo Type</InvoiceTableHead>
                  <InvoiceTableHead>Vessel</InvoiceTableHead>
                  <InvoiceTableHead>Status</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">Print</InvoiceTableHead>
                  <InvoiceTableHead className="w-16">Delete</InvoiceTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <InvoiceTableCell className="text-center">{indexOfFirstEntry + index + 1}</InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Link to={`/data-entry/bill-of-lading/edit/${item.id}`}>
                          <Edit size={16} className="text-blue-500 inline-block" />
                        </Link>
                      </InvoiceTableCell>
                      <InvoiceTableCell>{item.blNumber}</InvoiceTableCell>
                      <InvoiceTableCell>{item.date}</InvoiceTableCell>
                      <InvoiceTableCell>{item.shipper}</InvoiceTableCell>
                      <InvoiceTableCell>{item.consignee}</InvoiceTableCell>
                      <InvoiceTableCell>{item.origin}</InvoiceTableCell>
                      <InvoiceTableCell>{item.destination}</InvoiceTableCell>
                      <InvoiceTableCell>{item.cargoType}</InvoiceTableCell>
                      <InvoiceTableCell>{item.vessel}</InvoiceTableCell>
                      <InvoiceTableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                          item.status === "In Transit" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {item.status}
                        </span>
                      </InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Link to={`/data-entry/print-documents/bl/${item.id}`}>
                          <Printer size={16} className="text-green-500 inline-block cursor-pointer" />
                        </Link>
                      </InvoiceTableCell>
                      <InvoiceTableCell className="text-center">
                        <Trash size={16} className="text-red-500 inline-block cursor-pointer" />
                      </InvoiceTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <InvoiceTableCell colSpan={13} className="text-center py-4">
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

export default BillOfLadingList;
