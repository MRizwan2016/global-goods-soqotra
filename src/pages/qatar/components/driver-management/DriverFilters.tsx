
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Grid } from "@/components/ui/grid";

const DriverFilters: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchText, setSearchText] = useState("");
  
  return (
    <div className="bg-gray-50 p-4 border border-gray-200 rounded-md">
      <Grid className="grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger id="status" className="bg-blue-600 text-white">
              <SelectValue placeholder="ALL STATUS" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">ALL STATUS</SelectItem>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
              <SelectItem value="ON_LEAVE">ON LEAVE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-start-3">
          <div className="flex items-center">
            <span className="mr-2 whitespace-nowrap">Search:</span>
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-gray-300"
              placeholder="Driver name, code..."
            />
          </div>
        </div>
        
        <div className="md:col-span-3 flex items-center gap-2">
          <span>Show</span>
          <Select defaultValue="50">
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
      </Grid>
    </div>
  );
};

export default DriverFilters;
