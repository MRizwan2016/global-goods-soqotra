
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";

const SearchFilters = () => {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search by invoice #" 
            className="pl-8"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="date-from" className="w-20">From:</Label>
          <Input 
            id="date-from" 
            type="date" 
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="date-to" className="w-20">To:</Label>
          <Input 
            id="date-to" 
            type="date" 
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </Card>
  );
};

export default SearchFilters;
