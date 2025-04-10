
import { useState, useEffect } from "react";
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
import { toast } from "sonner";

interface SalesRep {
  id: string;
  name: string;
  employeeNumber: string;
  operation: string;
  available: string;
}

const SalesRepList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [salesReps, setSalesReps] = useState<SalesRep[]>([]);
  
  // Load sales reps on component mount
  useEffect(() => {
    try {
      const loadedSalesReps = JSON.parse(localStorage.getItem('salesReps') || '[]');
      setSalesReps(loadedSalesReps);
    } catch (error) {
      console.error("Failed to load sales reps:", error);
      toast.error("Failed to load sales representatives data");
    }
  }, []);
  
  // Filter sales reps based on search term
  const filteredData = salesReps.filter(rep => {
    if (!searchTerm) return true;
    return (
      rep.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rep.employeeNumber?.includes(searchTerm) || 
      rep.operation?.toLowerCase().includes(searchTerm.toLowerCase())
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
                {filteredData.length > 0 ? (
                  filteredData.map((rep, index) => (
                    <TableRow key={rep.id} className="hover:bg-green-50/50 transition-colors">
                      <BookingTableCell className="text-center">{index + 1}</BookingTableCell>
                      <BookingTableCell>{rep.name}</BookingTableCell>
                      <BookingTableCell>{rep.employeeNumber}</BookingTableCell>
                      <BookingTableCell className="text-center">{rep.available}</BookingTableCell>
                      <BookingTableCell>{rep.operation}</BookingTableCell>
                      <BookingTableCell className="text-center">
                        <Link to={`/master/salesrep/edit/${rep.id}`}>
                          <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                            <PenLine size={16} className="inline text-blue-500" />
                          </Button>
                        </Link>
                      </BookingTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <BookingTableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No sales representatives found. Add a new one to get started.
                    </BookingTableCell>
                  </TableRow>
                )}
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
