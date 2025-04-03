
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, X, Ship, ArrowUpDown } from "lucide-react";
import { mockVesselData } from "./mockVesselData";
import { QatarVessel } from "./types/vesselTypes";
import VesselsTable from "./vessel-list/VesselsTable";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface VesselListProps {
  onVesselSelect: (vesselId: string) => void;
}

const VesselList: React.FC<VesselListProps> = ({ onVesselSelect }) => {
  const [vessels, setVessels] = useState<QatarVessel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [lineFilter, setLineFilter] = useState("");
  const [directionFilter, setDirectionFilter] = useState("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filteredVessels, setFilteredVessels] = useState<QatarVessel[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof QatarVessel;
    direction: 'asc' | 'desc';
  }>({ key: 'runningNumber', direction: 'desc' });

  // Load vessels from localStorage or mock data
  useEffect(() => {
    setLoading(true);
    try {
      const savedVesselData = localStorage.getItem('vesselData');
      if (savedVesselData) {
        const parsedData = JSON.parse(savedVesselData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setVessels(parsedData);
        } else {
          setVessels(mockVesselData);
        }
      } else {
        setVessels(mockVesselData);
      }
    } catch (error) {
      console.error("Error loading vessel data:", error);
      setVessels(mockVesselData);
    }
    
    // Add a small delay to simulate loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Apply filters
  useEffect(() => {
    // Filter vessels based on search term and filters
    let filtered = vessels;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(vessel => 
        vessel.vesselName.toLowerCase().includes(term) ||
        vessel.runningNumber.toLowerCase().includes(term) ||
        vessel.voyage.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(vessel => vessel.status === statusFilter);
    }
    
    // Apply shipping line filter
    if (lineFilter) {
      filtered = filtered.filter(vessel => vessel.shippingLine === lineFilter);
    }
    
    // Apply direction filter
    if (directionFilter) {
      filtered = filtered.filter(vessel => vessel.direction === directionFilter);
    }
    
    // Apply date range filter
    if (dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(vessel => {
        const etd = new Date(vessel.etd);
        const startDate = dateRange[0] as Date;
        const endDate = dateRange[1] as Date;
        
        // Check if etd is between the start and end dates
        return etd >= startDate && etd <= endDate;
      });
    }
    
    // Apply sorting
    const sortedVessels = [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredVessels(sortedVessels);
  }, [vessels, searchTerm, statusFilter, lineFilter, directionFilter, dateRange, sortConfig]);

  const handleSort = (key: keyof QatarVessel) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setLineFilter("");
    setDirectionFilter("");
    setDateRange([null, null]);
  };

  const shippingLines = Array.from(new Set(vessels.map(v => v.shippingLine)));

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"
      >
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search vessel name, number or voyage..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white border-gray-200"
            />
          </div>
        </div>
        
        <div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-white border-gray-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="SCHEDULED">Scheduled</SelectItem>
              <SelectItem value="LOADING">Loading</SelectItem>
              <SelectItem value="LOADING_COMPLETE">Loading Complete</SelectItem>
              <SelectItem value="MANIFEST_SUBMITTED">Manifest Submitted</SelectItem>
              <SelectItem value="DEPARTED">Departed</SelectItem>
              <SelectItem value="ARRIVED">Arrived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={lineFilter} onValueChange={setLineFilter}>
            <SelectTrigger className="bg-white border-gray-200">
              <SelectValue placeholder="Shipping Line" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Shipping Lines</SelectItem>
              {shippingLines.map(line => (
                <SelectItem key={line} value={line}>{line}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white border-gray-200"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange[0] && dateRange[1] ? (
                  <span>
                    {format(dateRange[0], "d MMM yyyy")} - {format(dateRange[1], "d MMM yyyy")}
                  </span>
                ) : (
                  <span>Select ETD range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange as [Date, Date]}
                onSelect={(range) => {
                  setDateRange(range);
                  setCalendarOpen(false);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </motion.div>

      {(searchTerm || statusFilter || lineFilter || directionFilter || (dateRange[0] && dateRange[1])) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center bg-blue-50 p-2 rounded-md"
        >
          <span className="text-sm text-blue-700 mr-2">Active filters:</span>
          {searchTerm && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center">
              Search: {searchTerm}
              <button onClick={() => setSearchTerm("")} className="ml-1 text-blue-700 hover:text-blue-900">
                <X size={12} />
              </button>
            </div>
          )}
          {statusFilter && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center">
              Status: {statusFilter}
              <button onClick={() => setStatusFilter("")} className="ml-1 text-blue-700 hover:text-blue-900">
                <X size={12} />
              </button>
            </div>
          )}
          {lineFilter && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center">
              Line: {lineFilter}
              <button onClick={() => setLineFilter("")} className="ml-1 text-blue-700 hover:text-blue-900">
                <X size={12} />
              </button>
            </div>
          )}
          {dateRange[0] && dateRange[1] && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center">
              ETD: {format(dateRange[0], "d/M/yy")} - {format(dateRange[1], "d/M/yy")}
              <button onClick={() => setDateRange([null, null])} className="ml-1 text-blue-700 hover:text-blue-900">
                <X size={12} />
              </button>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs h-7 ml-auto hover:bg-blue-200"
          >
            Clear All
          </Button>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 flex flex-col items-center">
                <div className="animate-pulse flex space-x-4 w-full justify-center">
                  <div className="rounded-full bg-slate-200 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 max-w-md">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-gray-500">Loading vessels...</div>
              </div>
            ) : filteredVessels.length > 0 ? (
              <VesselsTable 
                vessels={filteredVessels} 
                onVesselSelect={onVesselSelect} 
                onSort={handleSort}
                sortConfig={sortConfig}
              />
            ) : (
              <div className="p-8 text-center">
                <Ship size={48} className="text-gray-300 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-500 mb-1">No vessels found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your search filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default VesselList;
