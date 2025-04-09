
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

// Mock data for sales representatives
const mockSalesReps = [
  { id: 1, name: "ABDUL", employeeNumber: "255", operation: "UPB", status: "Y" },
  { id: 2, name: "ABDUL FAZEER ACHIMOHAMED", employeeNumber: "214", operation: "UPB", status: "Y" },
  { id: 3, name: "ABDUL QADER", employeeNumber: "2", operation: "ICG", status: "Y" },
  { id: 4, name: "ALEX", employeeNumber: "26", operation: "ICG", status: "N" },
  { id: 5, name: "ALI HUSSAIN", employeeNumber: "1245", operation: "UPB", status: "Y" },
  { id: 6, name: "Amila Udurawana", employeeNumber: "2", operation: "UPB", status: "N" },
  { id: 7, name: "ASHOKA", employeeNumber: "27", operation: "UPB", status: "Y" },
];

const SalesRepList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [salesReps, setSalesReps] = useState(mockSalesReps);
  
  // Filter sales reps based on search term
  const filteredData = salesReps.filter(rep => {
    if (!searchTerm) return true;
    return (
      rep.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rep.employeeNumber.includes(searchTerm) || 
      rep.operation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  return (
    <Layout title="Sales Representatives">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            View Sales Representative List
          </h3>
          <p className="text-sm text-green-600">Record Listed.</p>
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
              <Link to="/master/salesrep/new">
                <Button className="bg-blue-500 hover:bg-blue-600 transition-colors hover:scale-105 transform duration-200">
                  Add New
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
          
          <div className="border border-gray-200 rounded overflow-hidden hover:shadow-md transition-all duration-300">
            <Table>
              <TableHeader>
                <TableRow>
                  <BookingTableHead>Num</BookingTableHead>
                  <BookingTableHead>NAME</BookingTableHead>
                  <BookingTableHead>EMPLOYEE NUMBER</BookingTableHead>
                  <BookingTableHead>STATUS</BookingTableHead>
                  <BookingTableHead>OPERATION</BookingTableHead>
                  <BookingTableHead>MODIFY</BookingTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((rep) => (
                  <TableRow key={rep.id} className="hover:bg-green-50/50 transition-colors">
                    <BookingTableCell className="text-center">{rep.id}</BookingTableCell>
                    <BookingTableCell>{rep.name}</BookingTableCell>
                    <BookingTableCell>{rep.employeeNumber}</BookingTableCell>
                    <BookingTableCell className="text-center">{rep.status}</BookingTableCell>
                    <BookingTableCell>{rep.operation}</BookingTableCell>
                    <BookingTableCell className="text-center">
                      <Link to={`/master/salesrep/edit/${rep.id}`}>
                        <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                          <PenLine size={16} className="inline text-blue-500" />
                        </Button>
                      </Link>
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

export default SalesRepList;
