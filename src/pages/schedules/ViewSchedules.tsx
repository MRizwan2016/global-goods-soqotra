import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScheduleService } from "@/services/ScheduleService";
import { Printer, Eye, Calendar, Truck, Search } from "lucide-react";
import { toast } from "sonner";

interface Schedule {
  id: string;
  schedule_number: string;
  schedule_date: string;
  vehicle: string;
  sales_rep: string;
  driver?: string;
  helper?: string;
  total_jobs: number;
  status: string;
  country: string;
}

const ViewSchedules: React.FC = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [scheduleNumberFilter, setScheduleNumberFilter] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [scheduleNumbers, setScheduleNumbers] = useState<string[]>([]);

  // Get country from current path
  const getCountryFromPath = (): string => {
    const path = window.location.pathname;
    if (path.includes('/sudan-ops')) return 'Sudan';
    if (path.includes('/sri-lanka')) return 'Sri Lanka';
    if (path.includes('/qatar')) return 'Qatar';
    if (path.includes('/kenya')) return 'Kenya';
    if (path.includes('/uganda')) return 'Uganda';
    if (path.includes('/saudi')) return 'Saudi Arabia';
    if (path.includes('/ethiopia')) return 'Ethiopia';
    if (path.includes('/eritrea')) return 'Eritrea';
    return 'Qatar'; // Default
  };

  const country = getCountryFromPath();
  const countryLower = country.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    loadSchedules();
    loadFilterOptions();
  }, [country]);

  useEffect(() => {
    filterSchedules();
  }, [schedules, searchTerm, vehicleFilter, scheduleNumberFilter]);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      // Query with both casings to match existing data
      const result = await ScheduleService.getSchedules({ country: countryLower });
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
      const vehicleList = await ScheduleService.getUniqueVehicles(countryLower);
      const scheduleList = await ScheduleService.getUniqueScheduleNumbers(countryLower);
      setVehicles(vehicleList);
      setScheduleNumbers(scheduleList);
    } catch (error) {
      console.error("Error loading filter options:", error);
    }
  };

  const filterSchedules = () => {
    let filtered = schedules.filter(schedule => {
      const matchesSearch = 
        schedule.schedule_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (schedule.sales_rep || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (schedule.driver || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (schedule.helper || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesVehicle = vehicleFilter === "all" || schedule.vehicle === vehicleFilter;
      const matchesScheduleNumber = scheduleNumberFilter === "all" || schedule.schedule_number === scheduleNumberFilter;

      return matchesSearch && matchesVehicle && matchesScheduleNumber;
    });

    setFilteredSchedules(filtered);
    setCurrentPage(1);
  };

  const handleDisplaySchedule = (scheduleId: string) => {
    navigate(`/schedules/display/${scheduleId}`);
  };

  const handlePrintSchedule = (scheduleId: string) => {
    navigate(`/schedules/print/${scheduleId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getCountryDisplayName = (country: string) => {
    switch (country) {
      case 'Qatar': return 'Qatar';
      case 'Kenya': return 'Kenya';
      case 'Uganda': return 'Uganda';
      default: return country;
    }
  };

  // Pagination
  const itemsPerPage = parseInt(entriesPerPage);
  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedules = filteredSchedules.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Layout title="View Schedules">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading schedules...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="View Schedules">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {getCountryDisplayName(country)} Job Schedules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger className="bg-blue-500 text-white">
                  <SelectValue placeholder="ALL VEHICLES" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ALL VEHICLES</SelectItem>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle} value={vehicle}>
                      {vehicle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={scheduleNumberFilter} onValueChange={setScheduleNumberFilter}>
                <SelectTrigger className="bg-blue-500 text-white">
                  <SelectValue placeholder="SCHEDULE NUMBER" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ALL SCHEDULE NUMBERS</SelectItem>
                  {scheduleNumbers.map((scheduleNumber) => (
                    <SelectItem key={scheduleNumber} value={scheduleNumber}>
                      {scheduleNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Table Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
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
                <span>entries</span>
              </div>
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredSchedules.length)} of {filteredSchedules.length} entries
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500">
                    <TableHead className="text-white font-bold">Num ↑</TableHead>
                    <TableHead className="text-white font-bold">SCHEDULE NUMBER</TableHead>
                    <TableHead className="text-white font-bold">SCHEDULE DATE</TableHead>
                    <TableHead className="text-white font-bold">VEHICLE</TableHead>
                    <TableHead className="text-white font-bold">SALES REP</TableHead>
                    <TableHead className="text-white font-bold">JOBS</TableHead>
                    <TableHead className="text-white font-bold">DISPLAY</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSchedules.length > 0 ? (
                    currentSchedules.map((schedule, index) => (
                      <TableRow key={schedule.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                        <TableCell className="font-medium">{schedule.schedule_number}</TableCell>
                        <TableCell>{formatDate(schedule.schedule_date)}</TableCell>
                        <TableCell>{schedule.vehicle}</TableCell>
                        <TableCell>{schedule.sales_rep}</TableCell>
                        <TableCell>{schedule.total_jobs}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDisplaySchedule(schedule.id)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Display
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePrintSchedule(schedule.id)}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Printer className="h-4 w-4 mr-1" />
                              Print
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No schedules found. Create your first schedule to see it here.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ViewSchedules;