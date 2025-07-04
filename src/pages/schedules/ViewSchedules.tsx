import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Printer, Search } from "lucide-react";
import { toast } from "sonner";
import { ScheduleService, Schedule } from "@/services/ScheduleService";
import { useNavigate, useLocation } from "react-router-dom";

const ViewSchedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("ALL VEHICLES");
  const [scheduleNumberFilter, setScheduleNumberFilter] = useState("ALL SCHEDULES");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableVehicles, setAvailableVehicles] = useState<string[]>([]);
  const [availableScheduleNumbers, setAvailableScheduleNumbers] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Determine country from route
  const getCountryFromPath = () => {
    const path = location.pathname;
    if (path.includes('sri-lanka')) return 'sri-lanka';
    if (path.includes('kenya')) return 'kenya';
    if (path.includes('philippines')) return 'philippines';
    return '';
  };

  const currentCountry = getCountryFromPath();

  useEffect(() => {
    loadSchedules();
    loadFilterOptions();
  }, [currentCountry]);

  useEffect(() => {
    filterSchedules();
  }, [schedules, searchText, vehicleFilter, scheduleNumberFilter]);

  const loadSchedules = async () => {
    setLoading(true);
    try {
      const result = await ScheduleService.getSchedules({ 
        country: currentCountry || undefined 
      });
      
      if (result.success && result.schedules) {
        setSchedules(result.schedules);
      } else {
        toast.error(result.error || "Failed to load schedules");
      }
    } catch (error) {
      console.error("Error loading schedules:", error);
      toast.error("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const [vehicles, scheduleNumbers] = await Promise.all([
        ScheduleService.getUniqueVehicles(currentCountry || undefined),
        ScheduleService.getUniqueScheduleNumbers(currentCountry || undefined)
      ]);
      
      setAvailableVehicles(vehicles);
      setAvailableScheduleNumbers(scheduleNumbers);
    } catch (error) {
      console.error("Error loading filter options:", error);
    }
  };

  const filterSchedules = () => {
    let filtered = [...schedules];

    // Apply vehicle filter
    if (vehicleFilter !== "ALL VEHICLES") {
      filtered = filtered.filter(schedule => schedule.vehicle === vehicleFilter);
    }

    // Apply schedule number filter
    if (scheduleNumberFilter !== "ALL SCHEDULES") {
      filtered = filtered.filter(schedule => schedule.schedule_number === scheduleNumberFilter);
    }

    // Apply search filter
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(schedule =>
        schedule.schedule_number.toLowerCase().includes(searchLower) ||
        schedule.vehicle.toLowerCase().includes(searchLower) ||
        schedule.sales_rep?.toLowerCase().includes(searchLower) ||
        schedule.driver?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredSchedules(filtered);
    setCurrentPage(1);
  };

  const handleDisplaySchedule = (schedule: Schedule) => {
    const countryPath = currentCountry ? `/${currentCountry}` : '';
    navigate(`${countryPath}/schedules/display/${schedule.id}`, { 
      state: { schedule } 
    });
  };

  const handlePrintSchedule = (schedule: Schedule) => {
    const countryPath = currentCountry ? `/${currentCountry}` : '';
    navigate(`${countryPath}/schedules/print/${schedule.id}`, { 
      state: { schedule } 
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCountryDisplayName = () => {
    switch (currentCountry) {
      case 'sri-lanka': return 'Sri Lanka';
      case 'kenya': return 'Kenya';
      case 'philippines': return 'Philippines';
      default: return 'All Countries';
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredSchedules.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentSchedules = filteredSchedules.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading schedules...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-emerald-800 text-lg">
            View Schedule Jobs List Record Listed - {getCountryDisplayName()}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger className="w-48 bg-blue-500 text-white hover:bg-blue-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL VEHICLES">ALL VEHICLES</SelectItem>
                  {availableVehicles.map((vehicle) => (
                    <SelectItem key={vehicle} value={vehicle}>
                      {vehicle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={scheduleNumberFilter} onValueChange={setScheduleNumberFilter}>
                <SelectTrigger className="w-48 bg-blue-500 text-white hover:bg-blue-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL SCHEDULES">ALL SCHEDULES</SelectItem>
                  {availableScheduleNumbers.map((number) => (
                    <SelectItem key={number} value={number}>
                      {number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search schedules..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Show</span>
          <Select value={entriesPerPage.toString()} onValueChange={(value) => setEntriesPerPage(parseInt(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm">entries</span>
        </div>
      </div>

      {/* Schedules Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 hover:bg-blue-500">
                <TableHead className="text-white font-semibold">Num</TableHead>
                <TableHead className="text-white font-semibold">SCHEDULE NUMBER</TableHead>
                <TableHead className="text-white font-semibold">SCHEDULE DATE</TableHead>
                <TableHead className="text-white font-semibold">VEHICLE</TableHead>
                <TableHead className="text-white font-semibold">SALES REP</TableHead>
                <TableHead className="text-white font-semibold">DISPLAY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSchedules.map((schedule, index) => (
                <TableRow key={schedule.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                  <TableCell className="font-semibold">{schedule.schedule_number}</TableCell>
                  <TableCell>{formatDate(schedule.schedule_date)}</TableCell>
                  <TableCell>{schedule.vehicle}</TableCell>
                  <TableCell>{schedule.sales_rep || "Not Assigned"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="link" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                        onClick={() => handleDisplaySchedule(schedule)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Display
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm"
                        className="text-green-600 hover:text-green-800 p-0 h-auto"
                        onClick={() => handlePrintSchedule(schedule)}
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        Print
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredSchedules.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No schedules found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredSchedules.length)} of {filteredSchedules.length} entries
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSchedules;