
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

// Mock data for towns
const mockTowns = [
  { id: 1, city: "DOHA", townName: "29 BRIDGE" },
  { id: 2, city: "DOHA", townName: "ABU FANTAS" },
  { id: 3, city: "DOHA", townName: "ABU NAKLA" },
  { id: 4, city: "DOHA", townName: "ABU HAMOOR" },
  { id: 5, city: "DOHA", townName: "ABU SAMRA" },
  { id: 6, city: "DOHA", townName: "ABU SIDRA" },
  { id: 7, city: "DOHA", townName: "AIN KHALITH" },
  { id: 8, city: "DOHA", townName: "AL - KHOUR" },
  { id: 9, city: "DOHA", townName: "AL ASIRI" },
  { id: 10, city: "DOHA", townName: "AL DHAKIRA" },
  { id: 11, city: "DOHA", townName: "AL GRAIN" },
  { id: 12, city: "DOHA", townName: "AL HITMI" },
  { id: 13, city: "DOHA", townName: "AL JABAR" },
  { id: 14, city: "DOHA", townName: "AL JASRAH" },
];

const TownList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [towns] = useState(mockTowns);
  const [selectedCity, setSelectedCity] = useState("DOHA");
  
  // Filter towns based on search term
  const filteredData = towns.filter(town => {
    if (!searchTerm) return town.city === selectedCity;
    return (
      town.city === selectedCity && (
        town.townName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        town.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });
  
  return (
    <Layout title="Towns">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            View Town List
          </h3>
          <p className="text-sm text-green-600">Record Listed.</p>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="border border-blue-500 bg-blue-500 text-white rounded-md px-3 py-2"
                >
                  <option value="DOHA">DOHA : 171</option>
                  <option value="AL RAYYAN">AL RAYYAN : 84</option>
                  <option value="AL WAKRAH">AL WAKRAH : 32</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link to="/master/town/add">
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
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">Show</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
            <span className="text-sm">entries</span>
          </div>
          
          <div className="border border-gray-200 rounded overflow-hidden hover:shadow-md transition-all duration-300">
            <Table>
              <TableHeader>
                <TableRow>
                  <BookingTableHead className="w-16">Num</BookingTableHead>
                  <BookingTableHead>CITY NAME</BookingTableHead>
                  <BookingTableHead>TOWN NAME</BookingTableHead>
                  <BookingTableHead className="w-24">MODIFY</BookingTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((town) => (
                  <TableRow key={town.id} className="hover:bg-green-50/50 transition-colors">
                    <BookingTableCell className="text-center">{town.id}</BookingTableCell>
                    <BookingTableCell>{town.city}</BookingTableCell>
                    <BookingTableCell>{town.townName}</BookingTableCell>
                    <BookingTableCell className="text-center">
                      <Link to={`/master/town/edit/${town.id}`}>
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

export default TownList;
