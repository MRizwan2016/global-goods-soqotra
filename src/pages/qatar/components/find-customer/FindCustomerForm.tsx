
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Plus } from "lucide-react";
import LocationSelector from "./LocationSelector";
import { qatarTowns } from "../../data/mockLocations";

const FindCustomerForm: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [customerResults, setCustomerResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would fetch data from an API
    // For now, just show a mock result
    setCustomerResults([
      {
        id: "1",
        name: "Qatar Airways",
        mobileNumber: "+974 5555 1234",
        town: selectedTown || "Doha",
        location: selectedLocation || "West Bay",
        sector: "BNK",
        branch: "Main Office"
      },
      {
        id: "2",
        name: "Al Jazeera Media",
        mobileNumber: "+974 5555 5678",
        town: selectedTown || "Al Rayyan",
        location: selectedLocation || "Education City",
        sector: "MED",
        branch: "News Department"
      }
    ]);
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gray-50 pb-2">
          <CardTitle className="text-md">SEARCH FILTERS</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">CUSTOMER NAME:</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Label htmlFor="mobileNumber">MOBILE NUMBER:</Label>
                <Input
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter mobile number"
                />
              </div>
              
              <div>
                <LocationSelector 
                  selectedTown={selectedTown}
                  setSelectedTown={setSelectedTown}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
              >
                <Search size={16} />
                SEARCH
              </Button>
              <Button 
                type="reset" 
                variant="outline" 
                onClick={() => {
                  setCustomerName("");
                  setMobileNumber("");
                  setSelectedTown("");
                  setSelectedLocation("");
                  setShowResults(false);
                }}
              >
                CLEAR
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {showResults && (
        <Card>
          <CardHeader className="bg-gray-50 pb-2">
            <CardTitle className="text-md">SEARCH RESULTS</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="border border-gray-200 rounded-md overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800">NAME</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800">MOBILE</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800">TOWN</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800">LOCATION</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800">SECTOR</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800">BRANCH</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerResults.map((customer, index) => (
                    <tr key={customer.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{customer.mobileNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{customer.town}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{customer.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{customer.sector}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{customer.branch}</td>
                      <td className="px-6 py-4 text-sm">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-600 flex items-center gap-1"
                        >
                          <MapPin size={14} />
                          DETAILS
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FindCustomerForm;
