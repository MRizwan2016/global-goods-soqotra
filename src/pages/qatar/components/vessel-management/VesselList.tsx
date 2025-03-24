
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search, Ship } from "lucide-react";
import { mockVesselData } from './mockVesselData';

interface VesselListProps {
  onVesselSelect: (vesselId: string) => void;
}

const VesselList: React.FC<VesselListProps> = ({ onVesselSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  
  // Filter vessels based on search term and sector filter
  const filteredVessels = mockVesselData.filter(vessel => {
    const matchesSearch = 
      vessel.runningNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.voyage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = sectorFilter === "all" || vessel.sector === sectorFilter;
    
    return matchesSearch && matchesSector;
  });

  return (
    <Card className="shadow-md border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search vessels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="COLOMBO">Colombo</SelectItem>
                <SelectItem value="GALLE">Galle</SelectItem>
                <SelectItem value="KURUNEGALA">Kurunegala</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="text-white text-center w-16">Num</TableHead>
                <TableHead className="text-white">Running Number</TableHead>
                <TableHead className="text-white">Vessel Name</TableHead>
                <TableHead className="text-white">Voyage</TableHead>
                <TableHead className="text-white">P.O.L</TableHead>
                <TableHead className="text-white">P.O.D</TableHead>
                <TableHead className="text-white">DIR/MIX</TableHead>
                <TableHead className="text-white">E.T.D</TableHead>
                <TableHead className="text-white">E.T.A</TableHead>
                <TableHead className="text-white">Load Date</TableHead>
                <TableHead className="text-white text-center w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVessels.length > 0 ? (
                filteredVessels.map((vessel, index) => (
                  <TableRow key={vessel.id} className="hover:bg-gray-50">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{vessel.runningNumber}</TableCell>
                    <TableCell>{vessel.vesselName}</TableCell>
                    <TableCell>{vessel.voyage}</TableCell>
                    <TableCell>{vessel.portOfLoading}</TableCell>
                    <TableCell>{vessel.portOfDischarge}</TableCell>
                    <TableCell>{vessel.direction === "MIX" ? "M" : "D"}</TableCell>
                    <TableCell>{vessel.etd}</TableCell>
                    <TableCell>{vessel.eta}</TableCell>
                    <TableCell>{vessel.loadDate || "-"}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onVesselSelect(vessel.id)}
                        className="hover:bg-blue-100 text-blue-600"
                      >
                        <Eye size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center">
                      <Ship size={48} className="text-gray-300 mb-2" />
                      <p>No vessels found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {filteredVessels.length} of {mockVesselData.length} vessels
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VesselList;
