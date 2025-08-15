import React, { useState, useEffect, useRef, startTransition } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScheduleService } from "@/services/ScheduleService";
import { JobStorageService } from "@/pages/qatar/services/JobStorageService";
import { Printer, Search, User, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface SalesRepData {
  salesRep: string;
  totalJobs: number;
  collections: number;
  deliveries: number;
  totalRevenue: number;
  schedules: any[];
  jobs: any[];
}

const SalesRepReport: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [salesRepData, setSalesRepData] = useState<SalesRepData[]>([]);
  const [filteredData, setFilteredData] = useState<SalesRepData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedSalesRep, setSelectedSalesRep] = useState<string>("all");
  const [salesRepList, setSalesRepList] = useState<string[]>([]);

  useEffect(() => {
    startTransition(() => {
      loadData();
    });
  }, []);

  useEffect(() => {
    startTransition(() => {
      filterData();
    });
  }, [salesRepData, searchTerm, selectedSalesRep, dateFrom, dateTo]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Initialize with empty data first
      setSalesRepData([]);
      setFilteredData([]);
      setSalesRepList([]);
      
      await new Promise(resolve => setTimeout(resolve, 0)); // Allow render cycle
      
      // Get all schedules with error handling
      let schedules = [];
      try {
        const schedulesResult = await ScheduleService.getSchedules({});
        schedules = schedulesResult.success ? schedulesResult.schedules || [] : [];
      } catch (scheduleError) {
        console.warn("Could not load schedules:", scheduleError);
        schedules = [];
      }
      
      // Get all jobs safely with error handling
      let jobs = [];
      try {
        jobs = JobStorageService.getAllJobs() || [];
      } catch (error) {
        console.warn("Could not load jobs from storage:", error);
        jobs = [];
      }
      
      // Process data by sales rep
      const salesRepMap = new Map<string, SalesRepData>();
      
      // Process schedules
      schedules.forEach(schedule => {
        const salesRep = schedule.sales_rep;
        if (!salesRep) return;
        
        if (!salesRepMap.has(salesRep)) {
          salesRepMap.set(salesRep, {
            salesRep,
            totalJobs: 0,
            collections: 0,
            deliveries: 0,
            totalRevenue: 0,
            schedules: [],
            jobs: []
          });
        }
        
        const data = salesRepMap.get(salesRep)!;
        data.schedules.push(schedule);
        data.totalJobs += schedule.total_jobs || 0;
      });
      
      // Process individual jobs
      jobs.forEach(job => {
        const salesRep = job.salesRep;
        if (!salesRep) return;
        
        if (!salesRepMap.has(salesRep)) {
          salesRepMap.set(salesRep, {
            salesRep,
            totalJobs: 0,
            collections: 0,
            deliveries: 0,
            totalRevenue: 0,
            schedules: [],
            jobs: []
          });
        }
        
        const data = salesRepMap.get(salesRep)!;
        data.jobs.push(job);
        
        // Count service types
        if (job.serviceType === 'COLLECTION') {
          data.collections++;
        } else if (job.serviceType === 'DELIVERY') {
          data.deliveries++;
        }
        
        // Calculate revenue (assuming each job has a value)
        const jobValue = parseFloat(job.totalAmount || job.amount || '0');
        data.totalRevenue += jobValue;
      });
      
      const salesRepArray = Array.from(salesRepMap.values());
      
      // Use startTransition for state updates
      startTransition(() => {
        setSalesRepData(salesRepArray);
        
        // Extract unique sales rep names for filter
        const uniqueSalesReps = [...new Set(salesRepArray.map(data => data.salesRep))].sort();
        setSalesRepList(uniqueSalesReps);
      });
      
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load sales rep data");
      
      // Set empty data on error
      startTransition(() => {
        setSalesRepData([]);
        setFilteredData([]);
        setSalesRepList([]);
      });
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    try {
    let filtered = salesRepData.filter(data => {
      const matchesSearch = data.salesRep.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSalesRep = selectedSalesRep === "all" || data.salesRep === selectedSalesRep;
      
      // Date filtering on schedules
      let matchesDate = true;
      if (dateFrom || dateTo) {
        const from = dateFrom ? new Date(dateFrom) : null;
        const to = dateTo ? new Date(dateTo) : null;
        
        matchesDate = data.schedules.some(schedule => {
          const scheduleDate = new Date(schedule.schedule_date);
          const afterFrom = !from || scheduleDate >= from;
          const beforeTo = !to || scheduleDate <= to;
          return afterFrom && beforeTo;
        });
      }
      
      return matchesSearch && matchesSalesRep && matchesDate;
    });
    
    startTransition(() => {
      setFilteredData(filtered);
    });
    } catch (error) {
      console.error("Error filtering data:", error);
      startTransition(() => {
        setFilteredData([]);
      });
    }
  };

  const handlePrint = () => {
    if (printRef.current) {
      printRef.current.style.display = "block";
      printRef.current.style.visibility = "visible";
    }
    
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const getTotalStats = () => {
    return filteredData.reduce((acc, data) => ({
      totalJobs: acc.totalJobs + data.totalJobs,
      collections: acc.collections + data.collections,
      deliveries: acc.deliveries + data.deliveries,
      totalRevenue: acc.totalRevenue + data.totalRevenue
    }), { totalJobs: 0, collections: 0, deliveries: 0, totalRevenue: 0 });
  };

  const totalStats = getTotalStats();

  if (loading) {
    return (
      <Layout title="Sales Representative Report">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading sales representative data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Sales Representative Report">
      <style>
        {`
          @media print {
            .print\\:hidden { display: none !important; }
            .print-container { 
              margin: 0 !important; 
              padding: 0 !important;
              background: white !important;
            }
            body { 
              margin: 0 !important; 
              padding: 0 !important;
              background: white !important;
              font-size: 12px !important;
            }
            .print-content {
              margin: 0 !important;
              padding: 20px !important;
              background: white !important;
              width: 100% !important;
              max-width: none !important;
            }
            table { 
              width: 100% !important; 
              border-collapse: collapse !important;
            }
            th, td { 
              border: 1px solid #000 !important; 
              padding: 8px !important;
              font-size: 11px !important;
            }
          }
        `}
      </style>

      <div className="space-y-6">
        {/* Filters - Hidden when printing */}
        <Card className="print:hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Sales Representative Performance Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search sales rep..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSalesRep} onValueChange={setSelectedSalesRep}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sales Rep" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sales Reps</SelectItem>
                  {salesRepList.map((salesRep) => (
                    <SelectItem key={salesRep} value={salesRep}>
                      {salesRep}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="date"
                placeholder="From Date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
              
              <Input
                type="date"
                placeholder="To Date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Button onClick={loadData} disabled={loading}>
                {loading ? "Loading..." : "Refresh Data"}
              </Button>
              <Button onClick={handlePrint} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
                <Printer className="h-4 w-4" />
                Print Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards - Show in print */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 print:grid print:grid-cols-4 print:gap-2 print:mb-4">
          <Card className="print:border print:border-black">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500 print:hidden" />
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold">{totalStats.totalJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="print:border print:border-black">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-500 print:hidden" />
                <div>
                  <p className="text-sm text-gray-600">Collections</p>
                  <p className="text-2xl font-bold">{totalStats.collections}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="print:border print:border-black">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-orange-500 print:hidden" />
                <div>
                  <p className="text-sm text-gray-600">Deliveries</p>
                  <p className="text-2xl font-bold">{totalStats.deliveries}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="print:border print:border-black">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-500 print:hidden" />
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">QAR {totalStats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Report Table */}
        <div ref={printRef} className="print-content">
          {/* Print Header */}
          <div className="hidden print:block print:mb-6">
            <h1 className="text-xl font-bold text-center mb-2">QATAR CARGO COLLECTION & DELIVERY</h1>
            <h2 className="text-lg font-bold text-center mb-4">Sales Representative Performance Report</h2>
            <div className="text-center text-sm mb-4">
              {dateFrom && dateTo && (
                <p>Period: {dateFrom} to {dateTo}</p>
              )}
              <p>Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          <Card>
            <CardHeader className="print:hidden">
              <CardTitle>Sales Representative Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading data...</div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-500 print:bg-blue-500">
                        <TableHead className="text-white font-bold print:text-black print:border print:border-black">Sales Representative</TableHead>
                        <TableHead className="text-white font-bold print:text-black print:border print:border-black">Total Jobs</TableHead>
                        <TableHead className="text-white font-bold print:text-black print:border print:border-black">Collections</TableHead>
                        <TableHead className="text-white font-bold print:text-black print:border print:border-black">Deliveries</TableHead>
                        <TableHead className="text-white font-bold print:text-black print:border print:border-black">Schedules</TableHead>
                        <TableHead className="text-white font-bold print:text-black print:border print:border-black">Revenue (QAR)</TableHead>
                        <TableHead className="text-white font-bold print:text-black print:border print:border-black">Commission (5%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((data, index) => {
                          const commission = data.totalRevenue * 0.05; // 5% commission
                          return (
                            <TableRow key={data.salesRep} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} print:border print:border-black`}>
                              <TableCell className="font-medium print:border print:border-black">{data.salesRep}</TableCell>
                              <TableCell className="print:border print:border-black">{data.totalJobs}</TableCell>
                              <TableCell className="print:border print:border-black">{data.collections}</TableCell>
                              <TableCell className="print:border print:border-black">{data.deliveries}</TableCell>
                              <TableCell className="print:border print:border-black">{data.schedules.length}</TableCell>
                              <TableCell className="print:border print:border-black">{data.totalRevenue.toFixed(2)}</TableCell>
                              <TableCell className="print:border print:border-black">{commission.toFixed(2)}</TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            No sales representative data found for the selected criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Print Footer */}
          <div className="hidden print:block print:mt-6 text-center text-xs">
            <p>This report is generated for commission calculation purposes.</p>
            <p>Commission rate: 5% of total revenue generated by sales representative.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesRepReport;