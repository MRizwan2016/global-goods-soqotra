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
import { Plus, Search, Truck, Package, MapPin, Calendar, Eye, Clock, Printer, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { ScheduleService } from "@/services/ScheduleService";
import { QRCodeSVG } from "qrcode.react";
import {
  kenyaDrivers,
  kenyaSalesReps,
  kenyaVehicles,
  kenyaVehicleDriverMap,
  getKenyaDriverForVehicle,
} from "./data/kenyaData";

const KenyaCollectionDelivery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [activeTab, setActiveTab] = useState("collections");
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduleVehicle, setScheduleVehicle] = useState("");
  const [scheduleDriver, setScheduleDriver] = useState("");
  const [scheduleSalesRep, setScheduleSalesRep] = useState("");
  const [scheduleHelper, setScheduleHelper] = useState("");
  const [scheduleNumber, setScheduleNumber] = useState("");

  useEffect(() => {
    try {
      const storedJobs = JSON.parse(localStorage.getItem("kenyaJobs") || "[]");
      setJobs(storedJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (job.shipperName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.consigneeName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "all" || job.city === selectedCity;
    const matchesTab = activeTab === "collections" ? job.type === "collection" : job.type === "delivery";
    return matchesSearch && matchesCity && matchesTab;
  });

  const handleToggleJob = (jobId: string) => {
    setSelectedJobs(prev => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId); else next.add(jobId);
      return next;
    });
  };

  const handlePostSchedule = async () => {
    if (selectedJobs.size === 0) { toast.error("Select at least one job"); return; }
    if (!scheduleVehicle) { toast.error("Select a vehicle"); return; }
    
    const num = scheduleNumber || `KE-SCH-${Date.now().toString().slice(-6)}`;
    const selectedJobsList = jobs.filter(j => selectedJobs.has(j.id));
    
    try {
      await ScheduleService.saveSchedule({
        schedule_number: num,
        schedule_date: new Date().toISOString().split('T')[0],
        vehicle: scheduleVehicle,
        driver: scheduleDriver,
        sales_rep: scheduleSalesRep,
        helper: scheduleHelper,
        country: 'Kenya',
        jobs: selectedJobsList,
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
    <Layout title="Collection & Delivery - Kenya">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1e2a3a]">Collection & Delivery - Kenya</h1>
          <div className="flex gap-2">
            <Button className="gap-2 bg-green-700 hover:bg-green-800" onClick={() => navigate("/kenya-ops/new-job")}>
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
                    <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-700 hover:bg-green-700">
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
                        <TableCell>
                          <Checkbox checked={selectedJobs.has(job.id)} onCheckedChange={() => handleToggleJob(job.id)} />
                        </TableCell>
                        <TableCell className="font-medium">{job.jobNumber || job.id}</TableCell>
                        <TableCell>{job.shipperName}</TableCell>
                        <TableCell>{job.consigneeName}</TableCell>
                        <TableCell>{job.city}</TableCell>
                        <TableCell>{job.packages}</TableCell>
                        <TableCell><Badge variant={job.status === 'completed' ? 'secondary' : 'default'}>{job.status || 'pending'}</Badge></TableCell>
                      </TableRow>
                    ))}
                    {filteredJobs.length === 0 && (
                      <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-500">No jobs found. Add new jobs to get started.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Schedule Dialog */}
        <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
          <DialogContent>
            <DialogHeader><DialogTitle>Post to Schedule</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Schedule Number</Label>
                <Input value={scheduleNumber} onChange={(e) => setScheduleNumber(e.target.value)} placeholder="Auto-generated" />
              </div>
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <Select value={scheduleVehicle} onValueChange={(v) => {
                  setScheduleVehicle(v);
                  const d = getKenyaDriverForVehicle(v);
                  if (d) setScheduleDriver(d);
                }}>
                  <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                  <SelectContent>{kenyaVehicles.map(v => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Driver</Label>
                <Input value={scheduleDriver} onChange={(e) => setScheduleDriver(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Sales Rep</Label>
                <Select value={scheduleSalesRep} onValueChange={setScheduleSalesRep}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{kenyaSalesReps.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>Cancel</Button>
              <Button className="bg-green-700 hover:bg-green-800" onClick={handlePostSchedule}>Post Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default KenyaCollectionDelivery;
