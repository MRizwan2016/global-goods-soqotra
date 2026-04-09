import React, { useState, useEffect } from "react";
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
import { Plus, Search, Calendar, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ScheduleService } from "@/services/ScheduleService";
import { sudanDrivers, sudanSalesReps, sudanVehicles, getSudanDriverForVehicle } from "./data/sudanOpsData";

const SudanOpsCollectionDelivery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("collections");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduleVehicle, setScheduleVehicle] = useState("");
  const [scheduleDriver, setScheduleDriver] = useState("");
  const [scheduleSalesRep, setScheduleSalesRep] = useState("");
  const [scheduleNumber, setScheduleNumber] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('regional_invoices')
        .select('*')
        .eq('country', 'Sudan')
        .in('service_type', ['COLLECTION', 'DELIVERY'])
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      const mappedJobs = (data || []).map(inv => {
        const extraData = inv.extra_data as any;
        return {
          id: inv.id,
          jobNumber: inv.job_number || inv.invoice_number,
          shipperName: inv.shipper_name,
          consigneeName: inv.consignee_name,
          city: inv.consignee_city || inv.shipper_city,
          shipperAddress: inv.shipper_address || '',
          shipperCity: inv.shipper_city || '',
          consigneeAddress: inv.consignee_address || inv.consignee_delivery_address || '',
          consigneeCity: inv.consignee_city || '',
          packages: inv.total_packages || 0,
          totalWeight: inv.total_weight || 0,
          totalVolume: inv.total_volume || 0,
          type: extraData?.jobType || (inv.service_type === 'COLLECTION' ? 'collection' : 'delivery'),
          status: inv.status?.toLowerCase() || 'pending',
          date: inv.invoice_date,
          salesRep: inv.sales_representative,
          driver: inv.driver_name,
        };
      });

      setJobs(mappedJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (job.shipperName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.consigneeName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.jobNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "collections" ? job.type === "collection" : job.type === "delivery";
    return matchesSearch && matchesTab;
  });

  const handleToggleJob = (jobId: string) => {
    setSelectedJobs(prev => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId); else next.add(jobId);
      return next;
    });
  };

  const selectedJobsList = jobs.filter(j => selectedJobs.has(j.id));

  const handlePostSchedule = async () => {
    if (selectedJobs.size === 0) { toast.error("Select at least one job"); return; }
    if (!scheduleVehicle) { toast.error("Select a vehicle"); return; }
    const jobNumbers = selectedJobsList.map(j => j.jobNumber).join(', ');
    const num = scheduleNumber || `SD-SCH-${Date.now().toString().slice(-6)}`;
    const jobsToSave = selectedJobsList.map(j => ({
      jobNumber: j.jobNumber,
      customer: j.shipperName,
      shipperName: j.shipperName,
      consigneeName: j.consigneeName,
      city: j.city,
      packages: j.packages,
      totalWeight: j.totalWeight,
      totalVolume: j.totalVolume,
      serviceType: j.type === 'collection' ? 'COLLECTION' : 'DELIVERY',
      status: 'SCHEDULED',
    }));
    try {
      await ScheduleService.saveSchedule({
        schedule_number: num,
        schedule_date: new Date().toISOString().split('T')[0],
        vehicle: scheduleVehicle,
        driver: scheduleDriver,
        sales_rep: scheduleSalesRep,
        helper: "",
        country: 'Sudan',
        jobs: jobsToSave,
      });
      toast.success("Schedule posted successfully!");
      setShowScheduleDialog(false);
      setSelectedJobs(new Set());
    } catch (e) {
      console.error("Error posting schedule:", e);
      toast.error("Failed to post schedule");
    }
  };

  return (
    <Layout title="Collection & Delivery - Sudan">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1e2a3a]">Collection & Delivery - Sudan</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchJobs} className="gap-2">
              <RefreshCw className="h-4 w-4" />Refresh
            </Button>
            <Button className="gap-2 bg-red-700 hover:bg-red-800" onClick={() => navigate("/sudan-ops/new-job")}>
              <Plus className="h-4 w-4" />Add New Job
            </Button>
            {selectedJobs.size > 0 && (
              <Button variant="outline" onClick={() => setShowScheduleDialog(true)} className="gap-2">
                <Calendar className="h-4 w-4" />Post to Schedule ({selectedJobs.size})
              </Button>
            )}
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList><TabsTrigger value="collections">Collections</TabsTrigger><TabsTrigger value="deliveries">Deliveries</TabsTrigger></TabsList>
          <TabsContent value={activeTab}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search by name or job number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
                </div>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading jobs...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-red-700 hover:bg-red-700">
                        <TableHead className="text-white w-10"></TableHead>
                        <TableHead className="text-white">JOB #</TableHead>
                        <TableHead className="text-white">SHIPPER</TableHead>
                        <TableHead className="text-white">CONSIGNEE</TableHead>
                        <TableHead className="text-white">CITY</TableHead>
                        <TableHead className="text-white">PKGS</TableHead>
                        <TableHead className="text-white">STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map(job => (
                        <TableRow key={job.id}>
                          <TableCell><Checkbox checked={selectedJobs.has(job.id)} onCheckedChange={() => handleToggleJob(job.id)} /></TableCell>
                          <TableCell className="font-medium">{job.jobNumber || job.id}</TableCell>
                          <TableCell>{job.shipperName}</TableCell>
                          <TableCell>{job.consigneeName}</TableCell>
                          <TableCell>{job.city}</TableCell>
                          <TableCell>{job.packages}</TableCell>
                          <TableCell><Badge variant={job.status === 'completed' ? 'secondary' : 'default'}>{job.status || 'pending'}</Badge></TableCell>
                        </TableRow>
                      ))}
                      {filteredJobs.length === 0 && (
                        <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-500">No jobs found.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Post to Schedule</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Selected Jobs ({selectedJobsList.length})</Label>
                <div className="bg-gray-50 rounded p-2 text-sm max-h-24 overflow-y-auto">
                  {selectedJobsList.map(j => (
                    <div key={j.id} className="flex justify-between py-0.5">
                      <span className="font-medium">{j.jobNumber}</span>
                      <span className="text-gray-500">{j.shipperName} → {j.city}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2"><Label>Schedule Number</Label><Input value={scheduleNumber} onChange={(e) => setScheduleNumber(e.target.value)} placeholder="Auto-generated" /></div>
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <Select value={scheduleVehicle} onValueChange={(v) => { setScheduleVehicle(v); const d = getSudanDriverForVehicle(v); if (d) setScheduleDriver(d); }}>
                  <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                  <SelectContent>{sudanVehicles.map(v => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Driver</Label><Input value={scheduleDriver} onChange={(e) => setScheduleDriver(e.target.value)} /></div>
              <div className="space-y-2">
                <Label>Sales Rep</Label>
                <Select value={scheduleSalesRep} onValueChange={setScheduleSalesRep}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{sudanSalesReps.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>Cancel</Button>
              <Button className="bg-red-700 hover:bg-red-800" onClick={handlePostSchedule}>Post Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default SudanOpsCollectionDelivery;
