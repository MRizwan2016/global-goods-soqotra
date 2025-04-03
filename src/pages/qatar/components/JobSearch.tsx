
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockSectors } from "../data/mockJobData";

interface JobSearchProps {
  onSearch: (data: { sector: string, mobileNumber: string, customerName: string }) => void;
}

const JobSearch = ({ onSearch }: JobSearchProps) => {
  const [sector, setSector] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  
  const handleSearch = () => {
    onSearch({
      sector,
      mobileNumber,
      customerName
    });
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="bg-blue-600 text-white py-2 px-4 rounded-t-md">
        <CardTitle className="text-lg uppercase">FIND CUSTOMER</CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">SECTOR:</label>
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger>
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent>
              {mockSectors.map(sector => (
                <SelectItem key={sector.id} value={sector.code || "no-code-available"}>
                  {sector.name} - {sector.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">MOBILE NUMBER:</label>
          <Input 
            type="text" 
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">CUSTOMER NAME:</label>
          <Input 
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
          />
        </div>
        
        <div className="flex items-end">
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 w-full">
            <Search size={16} className="mr-2" />
            FIND
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSearch;
