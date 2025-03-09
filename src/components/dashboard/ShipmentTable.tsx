
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface ShipmentData {
  id: string;
  invoiceNumber: string;
  agent: string;
  transport: string;
  freightBy: string;
  warehouse: string;
  packages: number;
  dateCleared: string;
  receipt: string;
  timeIn: string;
  timeOut: string;
}

interface ShipmentTableProps {
  data: ShipmentData[];
  title: string;
}

const ShipmentTable = ({ data, title }: ShipmentTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const filteredData = data.filter(
    (item) =>
      item.id.toLowerCase().includes(searchText.toLowerCase()) ||
      item.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      item.agent.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm my-4">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="text-sm text-gray-500">entries</span>
        </div>
        
        <div className="relative">
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
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-soqotra-blue text-white">
            <TableRow>
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">Inv. Num</TableHead>
              <TableHead className="text-white">Agent</TableHead>
              <TableHead className="text-white">Transport</TableHead>
              <TableHead className="text-white">Freight By</TableHead>
              <TableHead className="text-white">Warehouse</TableHead>
              <TableHead className="text-white">Packages</TableHead>
              <TableHead className="text-white">Date Cleared</TableHead>
              <TableHead className="text-white">Receipt</TableHead>
              <TableHead className="text-white">Time In</TableHead>
              <TableHead className="text-white">Time Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEntries.length > 0 ? (
              currentEntries.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.invoiceNumber}</TableCell>
                  <TableCell>{item.agent}</TableCell>
                  <TableCell>{item.transport}</TableCell>
                  <TableCell>{item.freightBy}</TableCell>
                  <TableCell>{item.warehouse}</TableCell>
                  <TableCell>{item.packages}</TableCell>
                  <TableCell>{item.dateCleared}</TableCell>
                  <TableCell>{item.receipt}</TableCell>
                  <TableCell>{item.timeIn}</TableCell>
                  <TableCell>{item.timeOut}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-4">
                  No data available in table
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 flex justify-between items-center border-t border-gray-200">
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
  );
};

export default ShipmentTable;
