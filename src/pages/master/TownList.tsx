
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

// Mock data for Qatar towns
const mockQatarTowns = [
  { id: 1, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "29 BRIDGE" },
  { id: 2, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "ABU FANTAS" },
  { id: 3, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "ABU NAKLA" },
  { id: 4, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "ABU HAMOOR" },
  { id: 5, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "ABU SAMRA" },
  { id: 6, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "ABU SIDRA" },
  { id: 7, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "AIN KHALITH" },
  { id: 8, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "AL - KHOUR" },
  { id: 9, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "AL ASIRI" },
  { id: 10, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "AL DHAKIRA" },
  { id: 11, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "AL GRAIN" },
  { id: 12, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "AL HITMI" },
  { id: 13, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "AL JABAR" },
  { id: 14, country: "Qatar", city: "DOHA", warehouse: "", sector: "", townName: "AL JASRAH" },
];

// Mock data for Kenya towns
const mockKenyaTowns = [
  // MOMBASA WAREHOUSE - NORTH COAST
  { id: 101, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "NORTH COAST", townName: "Bamburi" },
  { id: 102, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "NORTH COAST", townName: "Kilifi county" },
  { id: 103, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "NORTH COAST", townName: "Watamu" },
  { id: 104, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "NORTH COAST", townName: "Malindi county" },
  { id: 105, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "NORTH COAST", townName: "Lamu county" },
  
  // MOMBASA WAREHOUSE - SOUTH COAST
  { id: 106, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "SOUTH COAST", townName: "Mombasa city" },
  { id: 107, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "SOUTH COAST", townName: "Ukunda" },
  { id: 108, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "SOUTH COAST", townName: "Kisite" },
  { id: 109, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "SOUTH COAST", townName: "Kwale county" },
  { id: 110, country: "Kenya", city: "", warehouse: "MOMBASA WAREHOUSE", sector: "SOUTH COAST", townName: "Taita Taveta County" },
  
  // NAIROBI WAREHOUSE - NAIROBI NORTH
  { id: 111, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI NORTH", townName: "Githurai" },
  { id: 112, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI NORTH", townName: "Kasarani" },
  { id: 113, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI NORTH", townName: "Juja" },
  { id: 114, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI NORTH", townName: "Mangu" },
  { id: 115, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI NORTH", townName: "Gatundu" },
  { id: 116, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI NORTH", townName: "Thka Town" },
  
  // NAIROBI WAREHOUSE - NAIROBI WEST
  { id: 117, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI WEST", townName: "Kabete" },
  { id: 118, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI WEST", townName: "Wangige" },
  { id: 119, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI WEST", townName: "Uthiru" },
  { id: 120, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI WEST", townName: "Parklands" },
  { id: 121, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI WEST", townName: "Kinoo" },
  { id: 122, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI WEST", townName: "Kikuyu town" },
  
  // NAIROBI WAREHOUSE - NAIROBI SOUTH
  { id: 123, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI SOUTH", townName: "Kibera" },
  { id: 124, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI SOUTH", townName: "Ngong" },
  { id: 125, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI SOUTH", townName: "Kitengela" },
  { id: 126, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI SOUTH", townName: "Mlolongo" },
  { id: 127, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI SOUTH", townName: "Nyayo" },
  { id: 128, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI SOUTH", townName: "Madaraka" },
  { id: 129, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI SOUTH", townName: "South B" },
  { id: 130, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI SOUTH", townName: "Maharaja" },
  
  // NAIROBI WAREHOUSE - NAIROBI EAST
  { id: 131, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI EAST", townName: "Eastleigh" },
  { id: 132, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI EAST", townName: "Mathare" },
  { id: 133, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI EAST", townName: "Kariobangi" },
  { id: 134, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI EAST", townName: "Umoja" },
  { id: 135, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI EAST", townName: "Pandora" },
  { id: 136, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI EAST", townName: "Buruburu" },
  { id: 137, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI EAST", townName: "Maringo" },
  { id: 138, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "NAIROBI EAST", townName: "Shaurimoyo" },
  
  // NAIROBI WAREHOUSE - SOUTH EAST
  { id: 139, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "SOUTH EAST", townName: "Donholm" },
  { id: 140, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "SOUTH EAST", townName: "Pipeline" },
  { id: 141, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "SOUTH EAST", townName: "Utawala" },
  { id: 142, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "SOUTH EAST", townName: "Tassia" },
  { id: 143, country: "Kenya", city: "", warehouse: "NAIROBI WAREHOUSE", sector: "SOUTH EAST", townName: "Embakasi" },
];

// Combine all towns
const allTowns = [...mockQatarTowns, ...mockKenyaTowns];

const TownList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Qatar");
  const [selectedCity, setSelectedCity] = useState("DOHA");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  
  // Filter towns based on selected criteria and search term
  const filteredData = allTowns.filter(town => {
    // First filter by country
    if (town.country !== selectedCountry) return false;
    
    // If Qatar, filter by city
    if (town.country === "Qatar") {
      if (town.city !== selectedCity) return false;
    } 
    // If Kenya, filter by warehouse and sector
    else if (town.country === "Kenya") {
      if (selectedWarehouse && town.warehouse !== selectedWarehouse) return false;
      if (selectedSector && town.sector !== selectedSector) return false;
    }
    
    // Search term filter across all values
    if (!searchTerm) return true;
    
    return (
      town.townName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (town.sector && town.sector.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (town.warehouse && town.warehouse.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (town.city && town.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  // Available warehouses for Kenya
  const kenyaWarehouses = [
    "MOMBASA WAREHOUSE", 
    "NAIROBI WAREHOUSE"
  ];
  
  // Kenya sectors based on warehouse
  const kenyaSectors: Record<string, string[]> = {
    "MOMBASA WAREHOUSE": ["NORTH COAST", "SOUTH COAST"],
    "NAIROBI WAREHOUSE": ["NAIROBI NORTH", "NAIROBI WEST", "NAIROBI SOUTH", "NAIROBI EAST", "SOUTH EAST"]
  };
  
  // Qatar cities
  const qatarCities = ["DOHA", "AL RAYYAN", "AL WAKRAH"];
  
  // Handle country change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    if (country === "Qatar") {
      setSelectedCity("DOHA");
      setSelectedWarehouse("");
      setSelectedSector("");
    } else {
      setSelectedCity("");
      setSelectedWarehouse("");
      setSelectedSector("");
    }
  };
  
  // Handle warehouse change
  const handleWarehouseChange = (warehouse: string) => {
    setSelectedWarehouse(warehouse);
    setSelectedSector("");
  };
  
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
              <select 
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="border border-blue-500 bg-blue-500 text-white rounded-md px-3 py-2"
              >
                <option value="Qatar">Qatar</option>
                <option value="Kenya">Kenya</option>
              </select>
              
              {selectedCountry === "Qatar" ? (
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="border border-blue-500 bg-blue-500 text-white rounded-md px-3 py-2"
                >
                  {qatarCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              ) : (
                <>
                  <select 
                    value={selectedWarehouse}
                    onChange={(e) => handleWarehouseChange(e.target.value)}
                    className="border border-blue-500 bg-blue-500 text-white rounded-md px-3 py-2"
                  >
                    <option value="">All Warehouses</option>
                    {kenyaWarehouses.map(warehouse => (
                      <option key={warehouse} value={warehouse}>{warehouse}</option>
                    ))}
                  </select>
                  
                  {selectedWarehouse && (
                    <select 
                      value={selectedSector}
                      onChange={(e) => setSelectedSector(e.target.value)}
                      className="border border-blue-500 bg-blue-500 text-white rounded-md px-3 py-2"
                    >
                      <option value="">All Sectors</option>
                      {kenyaSectors[selectedWarehouse]?.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  )}
                </>
              )}
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
                  <BookingTableHead>COUNTRY</BookingTableHead>
                  {selectedCountry === "Qatar" ? (
                    <BookingTableHead>CITY</BookingTableHead>
                  ) : (
                    <>
                      <BookingTableHead>WAREHOUSE</BookingTableHead>
                      <BookingTableHead>SECTOR</BookingTableHead>
                    </>
                  )}
                  <BookingTableHead>TOWN NAME</BookingTableHead>
                  <BookingTableHead className="w-24">MODIFY</BookingTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((town, index) => (
                  <TableRow key={town.id} className="hover:bg-green-50/50 transition-colors">
                    <BookingTableCell className="text-center">{index + 1}</BookingTableCell>
                    <BookingTableCell>{town.country}</BookingTableCell>
                    {selectedCountry === "Qatar" ? (
                      <BookingTableCell>{town.city}</BookingTableCell>
                    ) : (
                      <>
                        <BookingTableCell>{town.warehouse}</BookingTableCell>
                        <BookingTableCell>{town.sector}</BookingTableCell>
                      </>
                    )}
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
