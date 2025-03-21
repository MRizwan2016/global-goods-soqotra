
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockContainers } from "../../data/mockContainers";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Search, Ship, ArrowUpDown, FileImport } from "lucide-react";
import { QatarContainer } from "../../types/containerTypes";

interface ContainerListProps {
  onContainerSelect: (containerId: string) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({ onContainerSelect }) => {
  const [containers, setContainers] = useState<QatarContainer[]>(mockContainers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("50");
  
  const filteredContainers = containers.filter(container => {
    const matchesSearchTerm = 
      container.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.runningNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.sealNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || container.status === statusFilter;
    const matchesSector = sectorFilter === "all" || container.sector === sectorFilter;
    
    return matchesSearchTerm && matchesStatus && matchesSector;
  });

  return (
    <Card className="shadow-md border-gray-200">
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <Ship className="mr-2 text-soqotra-blue" size={22} />
            View Container List
            <span className="ml-2 text-sm font-normal text-gray-600">
              {filteredContainers.length} Record(s) Listed
            </span>
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-between mb-4">
            <div className="flex gap-4">
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-44 bg-blue-500 text-white">
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="COLOMBO">COLOMBO : C</SelectItem>
                  <SelectItem value="DUBAI">DUBAI : D</SelectItem>
                  <SelectItem value="KUWAIT">KUWAIT : K</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-44 bg-blue-500 text-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="NEW">NEW</SelectItem>
                  <SelectItem value="LOADED">LOADED</SelectItem>
                  <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <FileImport size={18} />
                Import
              </Button>
            </div>
            
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Add New
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="50" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span>entries</span>
            </div>
            
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input 
                className="pl-10 pr-4 py-2" 
                placeholder="Search containers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="font-bold text-blue-800 text-center">NUM</TableHead>
                <TableHead className="font-bold text-blue-800">
                  <div className="flex items-center gap-1">
                    RUNNING NUMBER <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-blue-800">
                  <div className="flex items-center gap-1">
                    CONTAINER NUMBER <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-blue-800">
                  <div className="flex items-center gap-1">
                    SEAL NUMBER <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-blue-800">
                  <div className="flex items-center gap-1">
                    CONTAINER TYPE <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-blue-800">DIR/MIX</TableHead>
                <TableHead className="font-bold text-blue-800">
                  <div className="flex items-center gap-1">
                    E.T.D <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-blue-800">
                  <div className="flex items-center gap-1">
                    E.T.A <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-blue-800">
                  <div className="flex items-center gap-1">
                    LOAD DATE <ArrowUpDown size={16} />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-blue-800 text-center">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContainers.map((container, index) => (
                <TableRow 
                  key={container.id} 
                  className={index % 2 === 0 ? "bg-white hover:bg-blue-50 transition-colors" : "bg-gray-50 hover:bg-blue-50 transition-colors"}
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{container.runningNumber}</TableCell>
                  <TableCell>{container.containerNumber}</TableCell>
                  <TableCell>{container.sealNumber}</TableCell>
                  <TableCell>{container.containerType}</TableCell>
                  <TableCell>{container.direction}</TableCell>
                  <TableCell>{container.etd}</TableCell>
                  <TableCell>{container.eta}</TableCell>
                  <TableCell>{container.loadDate}</TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 p-1 h-auto"
                      onClick={() => onContainerSelect(container.id)}
                    >
                      <Edit2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-3 bg-white border-t border-gray-200 flex justify-between items-center">
          <div>Showing 1 to {Math.min(filteredContainers.length, parseInt(entriesPerPage))} of {filteredContainers.length} entries</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled className="text-sm">Previous</Button>
            <Button variant="default" size="sm" className="bg-blue-600 text-white text-sm">1</Button>
            <Button variant="outline" size="sm" disabled className="text-sm">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerList;
