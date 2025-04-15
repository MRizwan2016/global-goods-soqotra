
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, Printer } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sectorFilter: string;
  setSectorFilter: (value: string) => void;
  jobNumberFilter: string;
  setJobNumberFilter: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  sectors: string[];
  handlePrint: () => Promise<void>;
  vehicleFilter?: string;
  setVehicleFilter?: (value: string) => void;
  jobTypeFilter?: string;
  setJobTypeFilter?: (value: string) => void;
  additionalFilters?: React.ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  sectorFilter,
  setSectorFilter,
  jobNumberFilter,
  setJobNumberFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sectors,
  handlePrint,
  vehicleFilter,
  setVehicleFilter,
  jobTypeFilter,
  setJobTypeFilter,
  additionalFilters
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="relative">
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Sectors" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {setVehicleFilter && (
        <div className="relative">
          <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Vehicles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL VEHICLES">ALL VEHICLES</SelectItem>
              <SelectItem value="Car">Car</SelectItem>
              <SelectItem value="Van">Van</SelectItem>
              <SelectItem value="Truck">Truck</SelectItem>
              <SelectItem value="Lorry">Lorry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {setJobTypeFilter && (
        <div className="relative">
          <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL JOBS">ALL JOBS</SelectItem>
              <SelectItem value="COLLECTION">COLLECTION</SelectItem>
              <SelectItem value="DELIVERY">DELIVERY</SelectItem>
              <SelectItem value="PACKING">PACKING</SelectItem>
              <SelectItem value="UNPACKING">UNPACKING</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="relative">
        <Select value={jobNumberFilter} onValueChange={setJobNumberFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Job Number" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Job Numbers</SelectItem>
            {/* Job number options would be populated here */}
          </SelectContent>
        </Select>
      </div>

      <div className="relative col-span-1 md:col-span-2 lg:col-span-1">
        <div className="flex">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-r-none"
          />
          <Button className="rounded-l-none" variant="default">
            <Search size={16} />
          </Button>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
        </div>
        <Button variant="outline" onClick={handlePrint}>
          <Printer size={16} className="mr-2" /> Print
        </Button>
      </div>
      
      {additionalFilters && (
        <div className="col-span-1 md:col-span-2 lg:col-span-5 flex flex-wrap gap-2">
          {additionalFilters}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
