
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";
import { FilterState } from "../hooks/useInvoiceFilters";

interface SearchFiltersProps {
  filters: FilterState;
  onUpdateFilter: (field: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  filters, 
  onUpdateFilter, 
  onResetFilters,
  onApplyFilters 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters();
  };

  const isFiltersActive = filters.searchQuery || filters.dateFrom || filters.dateTo;

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search by invoice #" 
              className="pl-8"
              value={filters.searchQuery}
              onChange={(e) => onUpdateFilter('searchQuery', e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="date-from" className="w-20">From:</Label>
            <Input 
              id="date-from" 
              type="date" 
              value={filters.dateFrom}
              onChange={(e) => onUpdateFilter('dateFrom', e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="date-to" className="w-20">To:</Label>
            <Input 
              id="date-to" 
              type="date" 
              value={filters.dateTo}
              onChange={(e) => onUpdateFilter('dateTo', e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              type="submit" 
              variant="outline" 
              className="flex items-center gap-2 flex-1"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            {isFiltersActive && (
              <Button 
                type="button"
                variant="outline" 
                onClick={onResetFilters}
                className="flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default SearchFilters;
