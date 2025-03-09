
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow,
  BookingTableHead,
  BookingTableCell
} from "@/components/ui/table";
import { PenLine } from "lucide-react";

// Mock data for invoice books
const mockBookData = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  bookNumber: (722 + i).toString(),
  startPage: (13136051 + (i * 50)).toString(),
  endPage: (13136100 + (i * 50)).toString(),
  isIssued: false,
  isActivated: false,
}));

const InvoiceBookStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookData, setBookData] = useState(mockBookData);
  
  // Filter booking data based on search term
  const filteredData = bookData.filter(item => {
    if (!searchTerm) return true;
    return (
      item.bookNumber.includes(searchTerm) || 
      item.startPage.includes(searchTerm) || 
      item.endPage.includes(searchTerm)
    );
  });
  
  return (
    <Layout title="Invoice Book Stock">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">
            Manage Invoice Book Stock
          </h3>
          <p className="text-sm text-blue-600">Master Records</p>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
            
            <div className="flex gap-3">
              <Link to="/master/invoice-book/add">
                <Button className="bg-blue-500 hover:bg-blue-600 transition-colors hover:scale-105 transform duration-200">
                  Add New Book
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm">Search:</span>
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-40 h-9"
                />
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded overflow-hidden hover-scale transition-transform duration-300">
            <Table>
              <TableHeader>
                <TableRow>
                  <BookingTableHead>Num</BookingTableHead>
                  <BookingTableHead>BOOK NUMBER</BookingTableHead>
                  <BookingTableHead>START PAGE</BookingTableHead>
                  <BookingTableHead>END PAGE</BookingTableHead>
                  <BookingTableHead>STATUS</BookingTableHead>
                  <BookingTableHead>ACTIONS</BookingTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-blue-50/50 transition-colors">
                    <BookingTableCell className="text-center">{item.id}</BookingTableCell>
                    <BookingTableCell>{item.bookNumber}</BookingTableCell>
                    <BookingTableCell>{item.startPage}</BookingTableCell>
                    <BookingTableCell>{item.endPage}</BookingTableCell>
                    <BookingTableCell className="text-center">
                      {item.isActivated ? 
                        <span className="text-green-600 font-medium">Activated</span> : 
                        <span className="text-gray-600">Inactive</span>
                      }
                    </BookingTableCell>
                    <BookingTableCell className="text-center">
                      <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                        <PenLine size={16} className="inline text-blue-500" />
                      </Button>
                    </BookingTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">
              Showing 1 to {filteredData.length} of {filteredData.length} entries
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-blue-500 text-white">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceBookStock;
