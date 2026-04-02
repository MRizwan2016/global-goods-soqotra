import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Truck, Package, MapPin, Calendar, Eye, Edit, Clock, Printer, Send, QrCode } from "lucide-react";
import { toast } from "sonner";
import { ScheduleService } from "@/services/ScheduleService";
import { QRCodeSVG } from "qrcode.react";

const SriLankaCollectionDelivery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [activeTab, setActiveTab] = useState("collections");
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showJobDetail, setShowJobDetail] = useState<any>(null);
  const [scheduleVehicle, setScheduleVehicle] = useState("");
  const [scheduleDriver, setScheduleDriver] = useState("");
  const [scheduleSalesRep, setScheduleSalesRep] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedJobs = JSON.parse(localStorage.getItem('sriLankaJobs') || '[]');
      setJobs(storedJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  }, []);

  const collections = jobs.filter(j => j.type === "collection" || j.jobType === "collection");
  const deliveries = jobs.filter(j => j.type === "delivery" || j.jobType === "delivery");
  const allJobs = jobs;

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      scheduled: { variant: "outline", label: "Scheduled" },
      "in-progress": { variant: "default", label: "In Progress" },
      completed: { variant: "secondary", label: "Completed" },
      "out-for-delivery": { variant: "default", label: "Out for Delivery" },
      delivered: { variant: "secondary", label: "Delivered" },
      pending: { variant: "destructive", label: "Pending" },
    };
    const c = config[status] || config.pending;
    return <Badge variant={c.variant}>{c.label}</Badge>;
  };

  const filterJobs = (list: any[]) => list.filter(item => {
    const matchesSearch = item.customer?.toLowerCase().includes(searchTerm.toLowerCase()) || item.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "all" || item.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs(prev => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  };

  const handlePostToSchedule = async () => {
    if (selectedJobs.size === 0) {
      toast.error("Please select jobs to add to schedule");
      return;
    }
    if (!scheduleVehicle) {
      toast.error("Please select a vehicle");
      return;
    }

    const selectedJobsData = jobs.filter(j => selectedJobs.has(j.id));
    const scheduleNumber = `LK-SCH-${Date.now() % 10000}`;

    try {
      const result = await ScheduleService.saveSchedule({
        schedule_number: scheduleNumber,
        schedule_date: new Date().toISOString().split('T')[0],
        vehicle: scheduleVehicle,
        sales_rep: scheduleSalesRep,
        driver: scheduleDriver,
        country: 'sri-lanka',
        jobs: selectedJobsData,
      });

      if (result.success) {
        const updatedJobs = jobs.map(j =>
          selectedJobs.has(j.id)
            ? { ...j, status: "scheduled", scheduleNumber, vehicle: scheduleVehicle }
            : j
        );
        setJobs(updatedJobs);
        localStorage.setItem("sriLankaJobs", JSON.stringify(updatedJobs));
        setSelectedJobs(new Set());
        setShowScheduleDialog(false);
        toast.success(`Schedule ${scheduleNumber} created with ${selectedJobsData.length} jobs`);
      } else {
        toast.error(result.error || "Failed to create schedule");
      }
    } catch (error) {
      toast.error("Failed to create schedule");
    }
  };

  const handlePrintJob = (job: any) => {
    setShowJobDetail(job);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleWhatsApp = (job: any) => {
    const message = encodeURIComponent(
      `📦 *Soqotra Logistics - Job ${job.id}*\n` +
      `Customer: ${job.customer}\n` +
      `Type: ${(job.type || job.jobType || "").toUpperCase()}\n` +
      `City: ${job.city}\n` +
      `Packages: ${job.packages || job.totalPackages || 0}\n` +
      `Weight: ${job.weight || job.totalWeight || 0} kg\n` +
      `CBM: ${job.totalCbm || 0}\n` +
      `Date: ${job.date}\n` +
      `Driver: ${job.driver}\n` +
      `Status: ${job.status}`
    );
    const phone = job.mobileNumber?.replace(/\s+/g, '') || '';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const stats = [
    { title: "Total Collections", value: collections.length.toString(), icon: Package, color: "bg-amber-600" },
    { title: "Total Deliveries", value: deliveries.length.toString(), icon: Truck, color: "bg-blue-600" },
    { title: "Completed", value: allJobs.filter(j => j.status === "completed" || j.status === "delivered").length.toString(), icon: Clock, color: "bg-green-600" },
    { title: "Selected for Schedule", value: selectedJobs.size.toString(), icon: Calendar, color: "bg-purple-600" },
  ];

  const renderJobTable = (data: any[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#8B4513] hover:bg-[#8B4513]">
            <TableHead className="text-white font-medium w-10">✓</TableHead>
            <TableHead className="text-white font-medium">JOB #</TableHead>
            <TableHead className="text-white font-medium">DATE</TableHead>
            <TableHead className="text-white font-medium">CUSTOMER</TableHead>
            <TableHead className="text-white font-medium">CITY</TableHead>
            <TableHead className="text-white font-medium">BOXES</TableHead>
            <TableHead className="text-white font-medium">CBM</TableHead>
            <TableHead className="text-white font-medium">DRIVER</TableHead>
            <TableHead className="text-white font-medium">STATUS</TableHead>
            <TableHead className="text-white font-medium">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow><TableCell colSpan={10} className="text-center py-8 text-muted-foreground">No records found</TableCell></TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className={`hover:bg-gray-50 ${selectedJobs.has(item.id) ? "bg-amber-50" : ""}`}>
                <TableCell>
                  <Checkbox
                    checked={selectedJobs.has(item.id)}
                    onCheckedChange={() => toggleJobSelection(item.id)}
                  />
                </TableCell>
                <TableCell className="font-medium text-[#8B4513]">{item.id || item.jobNumber}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="font-medium">{item.customer}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.packages || item.totalPackages || (item.items?.length || 0)}</TableCell>
                <TableCell>{item.totalCbm || "—"}</TableCell>
                <TableCell>{item.driver}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-blue-600 p-1" onClick={() => setShowJobDetail(item)} title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-600 p-1" onClick={() => handlePrintJob(item)} title="Print">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-emerald-600 p-1" onClick={() => handleWhatsApp(item)} title="WhatsApp">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Layout title="Sri Lanka - Collection & Delivery">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-amber-700 to-amber-900 rounded flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Collection & Delivery - Sri Lanka</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {selectedJobs.size > 0 && (
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700" onClick={() => setShowScheduleDialog(true)}>
                <Calendar className="h-4 w-4" /> Post to Schedule ({selectedJobs.size})
              </Button>
            )}
            <Button className="gap-2 bg-[#8B4513] hover:bg-[#6d3610]" onClick={() => navigate("/sri-lanka/schedules")}>
              <Calendar className="h-4 w-4" /> View Schedules
            </Button>
            <Button className="gap-2 bg-[#8B4513] hover:bg-[#6d3610]" onClick={() => navigate("/sri-lanka/new-job")}>
              <Plus className="h-4 w-4" /> Add New Job
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger><SelectValue placeholder="All Cities" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {["Colombo","Kandy","Galle","Kurunegala","Jaffna","Negombo","Matara"].map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by customer or job #..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="collections">Collections ({collections.length})</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries ({deliveries.length})</TabsTrigger>
            <TabsTrigger value="all">All Jobs ({allJobs.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="collections">{renderJobTable(filterJobs(collections))}</TabsContent>
          <TabsContent value="deliveries">{renderJobTable(filterJobs(deliveries))}</TabsContent>
          <TabsContent value="all">{renderJobTable(filterJobs(allJobs))}</TabsContent>
        </Tabs>
      </div>

      {/* Post to Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Post {selectedJobs.size} Job(s) to Schedule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Vehicle *</Label>
              <Select value={scheduleVehicle} onValueChange={setScheduleVehicle}>
                <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="TRUCK-01">TRUCK-01</SelectItem>
                  <SelectItem value="TRUCK-02">TRUCK-02</SelectItem>
                  <SelectItem value="VAN-01">VAN-01</SelectItem>
                  <SelectItem value="VAN-02">VAN-02</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Driver</Label>
              <Select value={scheduleDriver} onValueChange={setScheduleDriver}>
                <SelectTrigger><SelectValue placeholder="Select driver" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="MR. ASHOKA UDESH">MR. ASHOKA UDESH</SelectItem>
                  <SelectItem value="MR. CHAMINDA">MR. CHAMINDA</SelectItem>
                  <SelectItem value="MR. NUWAN">MR. NUWAN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sales Rep</Label>
              <Select value={scheduleSalesRep} onValueChange={setScheduleSalesRep}>
                <SelectTrigger><SelectValue placeholder="Select sales rep" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="MR. SAJJAD">MR. SAJJAD</SelectItem>
                  <SelectItem value="MR. IMAM UBAIDULLA">MR. IMAM UBAIDULLA</SelectItem>
                  <SelectItem value="MR. LAHIRU CHATHURANGA">MR. LAHIRU CHATHURANGA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>Cancel</Button>
            <Button className="bg-[#8B4513] hover:bg-[#6d3610]" onClick={handlePostToSchedule}>
              Create Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Detail / Print Dialog */}
      <Dialog open={!!showJobDetail} onOpenChange={(open) => !open && setShowJobDetail(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Job Details — {showJobDetail?.id}
            </DialogTitle>
          </DialogHeader>
          {showJobDetail && (
            <div ref={printRef} className="space-y-4 print:p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold">{showJobDetail.customer}</p>
                  <p className="text-sm text-muted-foreground">{showJobDetail.city} | {showJobDetail.date}</p>
                  <p className="text-sm">Driver: {showJobDetail.driver}</p>
                  <p className="text-sm">Type: {(showJobDetail.type || showJobDetail.jobType || "").toUpperCase()}</p>
                </div>
                <div className="flex flex-col items-center">
                  <QRCodeSVG
                    value={`SOQOTRA-JOB:${showJobDetail.id}|${showJobDetail.customer}|${showJobDetail.city}|${showJobDetail.date}`}
                    size={100}
                  />
                  <span className="text-xs mt-1 font-mono">{showJobDetail.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-muted p-2 rounded"><span className="text-muted-foreground">Boxes:</span> <strong>{showJobDetail.items?.length || showJobDetail.packages || 0}</strong></div>
                <div className="bg-muted p-2 rounded"><span className="text-muted-foreground">Weight:</span> <strong>{showJobDetail.totalWeight || showJobDetail.weight || 0} kg</strong></div>
                <div className="bg-muted p-2 rounded"><span className="text-muted-foreground">CBM:</span> <strong>{showJobDetail.totalCbm || 0}</strong></div>
              </div>

              {showJobDetail.items && showJobDetail.items.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-amber-100">
                      <TableHead className="font-bold">Box #</TableHead>
                      <TableHead className="font-bold">Package</TableHead>
                      <TableHead className="font-bold">Dimensions (in)</TableHead>
                      <TableHead className="font-bold">Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {showJobDetail.items.map((item: any, idx: number) => (
                      <TableRow key={item.id || idx}>
                        <TableCell className="font-bold">{item.boxNumber || idx + 1}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.length || item.lengthCm}×{item.width || item.widthCm}×{item.height || item.heightCm}</TableCell>
                        <TableCell>{(item.volume || item.cbm || 0).toFixed ? (item.volume || item.cbm || 0).toFixed(3) : item.volume || item.cbm || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {showJobDetail.estimatedCost && parseFloat(showJobDetail.estimatedCost) > 0 && (
                <div className="text-right text-lg font-bold text-[#8B4513]">
                  Estimated: QAR {showJobDetail.estimatedCost}
                </div>
              )}
            </div>
          )}
          <DialogFooter className="print:hidden">
            <Button variant="outline" onClick={() => handleWhatsApp(showJobDetail)}>
              <Send className="h-4 w-4 mr-2" /> WhatsApp
            </Button>
            <Button onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SriLankaCollectionDelivery;
