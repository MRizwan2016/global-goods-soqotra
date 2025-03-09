
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

// Mock data for booking forms
const mockBookingData = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  bookNumber: (722 + i).toString(),
  startPage: (13136051 + (i * 50)).toString(),
  endPage: (13136100 + (i * 50)).toString(),
  isIssued: false,
  isActivated: false,
}));

const BookingFormStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingData, setBookingData] = useState(mockBookingData);
  
  // Filter booking data based on search term
  const filteredData = bookingData.filter(item => {
    if (!searchTerm) return true;
    return (
      item.bookNumber.includes(searchTerm) || 
      item.startPage.includes(searchTerm) || 
      item.endPage.includes(searchTerm)
    );
  });
  
  return (
    <Layout title="Booking Form Stock">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            View Booking Form Stock List
          </h3>
          <p className="text-sm text-green-600">Records Listed</p>
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
              <Link to="/data-entry/booking-form-stock/activate">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Activate Booking Form
                </Button>
              </Link>
              <Link to="/data-entry/booking-form-stock/issue">
                <Button className="bg-green-500 hover:bg-green-600">
                  Issue Booking Form
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
          
          <div className="border border-gray-200 rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <BookingTableHead>Num</BookingTableHead>
                  <BookingTableHead>BOOK NUMBER</BookingTableHead>
                  <BookingTableHead>START PAGE</BookingTableHead>
                  <BookingTableHead>END PAGE</BookingTableHead>
                  <BookingTableHead>ISSUE</BookingTableHead>
                  <BookingTableHead>ACTIVATE</BookingTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <BookingTableCell className="text-center">{item.id}</BookingTableCell>
                    <BookingTableCell>{item.bookNumber}</BookingTableCell>
                    <BookingTableCell>{item.startPage}</BookingTableCell>
                    <BookingTableCell>{item.endPage}</BookingTableCell>
                    <BookingTableCell className="text-center">
                      <PenLine size={16} className="inline text-blue-500" />
                    </BookingTableCell>
                    <BookingTableCell className="text-center">{item.bookNumber}</BookingTableCell>
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

export default BookingFormStock;
