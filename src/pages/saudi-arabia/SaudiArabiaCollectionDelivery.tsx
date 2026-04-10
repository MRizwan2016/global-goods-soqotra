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
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { ScheduleService } from "@/services/ScheduleService";
import { QRCodeSVG } from "qrcode.react";
import {
  saudiArabiaDrivers,
  saudiArabiaSalesReps,
  saudiArabiaVehicles,
  saudiVehicleDriverMap,
  getSaudiDriverForVehicle,
} from "./data/saudiArabiaData";

const SaudiArabiaCollectionDelivery = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [activeTab, setActiveTab] = useState("collections");
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showJobDetail, setShowJobDetail] = useState<any>(null);
  const [showPrintSchedule, setShowPrintSchedule] = useState(false);
  const [scheduleVehicle, setScheduleVehicle] = useState("");
  const [scheduleDriver, setScheduleDriver] = useState("");
  const [scheduleSalesRep, setScheduleSalesRep] = useState("");
  const [scheduleHelper, setScheduleHelper] = useState("");
  const [scheduleNumber, setScheduleNumber] = useState("");
  const [lastScheduleData, setLastScheduleData] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedJobs = JSON.parse(localStorage.getItem("saudiArabiaJobs") || "[]");
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
      if (next.has(jobId)) next.delete(jobId); else next.add(jobId);
      return next;
    });
  };

  const handleVehicleChange = (v: string) => {
    setScheduleVehicle(v);
    const driver = getSaudiDriverForVehicle(v);
    if (driver) setScheduleDriver(driver);
  };

  const handlePostToSchedule = async () => {
    if (selectedJobs.size === 0) { toast.error("Please select jobs"); return; }
    if (!scheduleVehicle) { toast.error("Please select a vehicle"); return; }

    const selectedJobsData = jobs.filter(j => selectedJobs.has(j.id));
    const schNum = `SA-SCH-${Date.now() % 10000}`;
    setScheduleNumber(schNum);

    try {
      const result = await ScheduleService.saveSchedule({
        schedule_number: schNum,
        schedule_date: new Date().toISOString().split("T")[0],
        vehicle: scheduleVehicle,
        sales_rep: scheduleSalesRep,
        driver: scheduleDriver,
        country: "saudi-arabia",
        jobs: selectedJobsData,
      });

      if (result.success) {
        const updatedJobs = jobs.map(j =>
          selectedJobs.has(j.id) ? { ...j, status: "scheduled", scheduleNumber: schNum, vehicle: scheduleVehicle, driver: scheduleDriver } : j
        );
        setJobs(updatedJobs);
        localStorage.setItem("saudiArabiaJobs", JSON.stringify(updatedJobs));

        setLastScheduleData({
          scheduleNumber: schNum,
          vehicle: scheduleVehicle,
          driver: scheduleDriver,
          salesRep: scheduleSalesRep,
          helper: scheduleHelper,
          date: new Date().toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" }),
          jobs: selectedJobsData.map((j, idx) => ({ ...j, sequenceNum: idx + 1 })),
        });
        setSelectedJobs(new Set());
        setShowScheduleDialog(false);
        toast.success(`Schedule ${schNum} created with ${selectedJobsData.length} jobs`);
        setShowPrintSchedule(true);
      } else {
        toast.error(result.error || "Failed to create schedule");
      }
    } catch {
      toast.error("Failed to create schedule");
    }
  };

  const handleWhatsApp = (job: any) => {
    const message = encodeURIComponent(
      `📦 *SOQOTRA SOLUTIONS WLL - Job ${job.id}*\n` +
      `Customer: ${job.customer}\nType: ${(job.type || job.jobType || "").toUpperCase()}\n` +
      `City: ${job.city}\nPackages: ${job.packages || job.totalPackages || 0}\n` +
      `Weight: ${job.weight || job.totalWeight || 0} kg\nDate: ${job.date}\nDriver: ${job.driver}`
    );
    const phone = job.mobileNumber?.replace(/\s+/g, "") || "";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const stats = [
    { title: t("collection.cargoCollections"), value: collections.length.toString(), icon: Package, color: "bg-emerald-500" },
    { title: t("collection.boxesDeliveries"), value: deliveries.length.toString(), icon: Truck, color: "bg-blue-500" },
    { title: t("status.completed"), value: allJobs.filter(j => j.status === "completed" || j.status === "delivered").length.toString(), icon: Clock, color: "bg-green-600" },
    { title: isRTL ? "محدد" : "Selected", value: selectedJobs.size.toString(), icon: Calendar, color: "bg-purple-600" },
  ];

  const renderJobTable = (data: any[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
            <TableHead className="text-white font-medium w-10">✓</TableHead>
            <TableHead className="text-white font-medium">{t("table.jobNumber")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.date")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.customer")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.city")}</TableHead>
            <TableHead className="text-white font-medium">{isRTL ? "صناديق" : "BOXES"}</TableHead>
            <TableHead className="text-white font-medium">{t("unit.cbm")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.vehicle")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.driver")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.status")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow><TableCell colSpan={11} className="text-center py-8 text-muted-foreground">No records found</TableCell></TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className={`hover:bg-gray-50 ${selectedJobs.has(item.id) ? "bg-green-50" : ""}`}>
                <TableCell><Checkbox checked={selectedJobs.has(item.id)} onCheckedChange={() => toggleJobSelection(item.id)} /></TableCell>
                <TableCell className="font-medium text-[#006c35]">{item.id || item.jobNumber}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="font-medium">{item.customer}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.packages || item.totalPackages || (item.items?.length || 0)}</TableCell>
                <TableCell>{item.totalCbm || "—"}</TableCell>
                <TableCell className="font-semibold text-blue-700">{item.vehicle || "—"}</TableCell>
                <TableCell>{item.driver}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-blue-600 p-1" onClick={() => setShowJobDetail(item)} title="View"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-green-600 p-1" onClick={() => { setShowJobDetail(item); setTimeout(() => window.print(), 500); }} title="Print"><Printer className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-emerald-600 p-1" onClick={() => handleWhatsApp(item)} title="WhatsApp"><Send className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  // Print schedule
  const renderSchedulePrint = () => {
    if (!lastScheduleData) return null;
    const sJobs = lastScheduleData.jobs || [];
    const JOBS_PER_PAGE = 5;
    const pages: any[][] = [];
    for (let i = 0; i < sJobs.length; i += JOBS_PER_PAGE) pages.push(sJobs.slice(i, i + JOBS_PER_PAGE));

    const allItems: { num: number; jobNumber: string; item: string; jobType: string; quantity: number }[] = [];
    const itemSummary: { name: string; quantity: number }[] = [];
    sJobs.forEach((job: any) => {
      (job.items || []).forEach((item: any, idx: number) => {
        allItems.push({ num: idx + 1, jobNumber: job.jobNumber || job.id, item: item.description || item.name || "—", jobType: (job.type || job.jobType || "COLLECTION").toUpperCase(), quantity: item.quantity || 1 });
        const existing = itemSummary.find(s => s.name === (item.description || item.name));
        if (existing) existing.quantity += (item.quantity || 1);
        else itemSummary.push({ name: item.description || item.name || "—", quantity: item.quantity || 1 });
      });
    });

    const deliveryCount = sJobs.filter((j: any) => (j.type || j.jobType) === "delivery").length;
    const collectionCount = sJobs.filter((j: any) => (j.type || j.jobType) === "collection").length;
    const totalAmount = sJobs.reduce((s: number, j: any) => s + (parseFloat(j.advanceAmount) || 0), 0);
    const printTime = new Date().toLocaleString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

    return (
      <div className="print-schedule-content">
        <style>{`
          @media print {
            @page { size: A4 landscape; margin: 8mm; }
            body * { visibility: hidden; }
            .print-schedule-content, .print-schedule-content * { visibility: visible; }
            .print-schedule-content { position: absolute; left: 0; top: 0; width: 100%; }
            .no-print { display: none !important; }
            .page-break { page-break-before: always; }
          }
        `}</style>

        {pages.map((pageJobs, pageIdx) => (
          <div key={pageIdx} className={pageIdx > 0 ? "page-break" : ""}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 text-center">
                <h1 className="text-sm font-bold underline">
                  COLLECTION/ DELIVERY JOB SHEET [ SCHEDULE NO: {lastScheduleData.scheduleNumber} ] - [SOQOTRA SOLUTIONS WLL - KSA]
                </h1>
                <p className="text-xs mt-1">Printed Time: {printTime}</p>
              </div>
              {pageIdx === 0 && (
                <div className="flex flex-col items-center ml-4">
                  <QRCodeSVG value={`${window.location.origin}/schedules/display/${lastScheduleData.scheduleId || ""}?schedule=${lastScheduleData.scheduleNumber}&verified=true`} size={80} level="M" includeMargin={false} />
                  <p className="text-[8px] text-gray-500 mt-0.5">Scan for Details</p>
                </div>
              )}
            </div>

            <table className="w-full border-collapse border border-black text-xs mb-2">
              <thead><tr className="bg-green-800 text-white"><th colSpan={6} className="border border-black p-1 text-center">JOB SCHEDULE</th></tr></thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1 font-bold">SHED. Num :</td>
                  <td className="border border-black p-1">{lastScheduleData.scheduleNumber}</td>
                  <td className="border border-black p-1 font-bold">VEHICLE :</td>
                  <td className="border border-black p-1">{lastScheduleData.vehicle}</td>
                  <td className="border border-black p-1 font-bold">DRIVER :</td>
                  <td className="border border-black p-1">{lastScheduleData.driver}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 font-bold">DATE :</td>
                  <td className="border border-black p-1">{lastScheduleData.date}</td>
                  <td className="border border-black p-1 font-bold">SALES REP:1</td>
                  <td className="border border-black p-1">{lastScheduleData.salesRep}</td>
                  <td className="border border-black p-1 font-bold">SALES REP:2</td>
                  <td className="border border-black p-1">{lastScheduleData.helper}</td>
                </tr>
              </tbody>
            </table>

            {pageJobs.map((job: any) => {
              const itemDesc = (job.items || []).map((it: any) => `${it.description || it.name}: ${it.quantity || 1}`).join("/ ");
              return (
                <div key={job.id} className="border border-black mb-1 text-xs">
                  <div className={`p-1 ${(job.type || job.jobType) === "collection" ? "bg-green-100" : "bg-blue-100"} font-bold`}>
                    {(job.type || job.jobType || "COLLECTION").toUpperCase()} Time: {job.time || "00:00"}
                    <span className="ml-4">Job No: <span className="text-green-700">{job.jobNumber || job.id}</span></span>
                    <span className="ml-4">Contact No: {job.mobileNumber || "0"}/ {job.telephone || "0"}</span>
                    <span className="ml-4">Name: {job.customer}</span>
                    <span className="ml-4">Amount: SAR {(parseFloat(job.advanceAmount) || 0).toFixed(2)}</span>
                  </div>
                  <div className="p-1">
                    Location: {job.city || ""}-{job.location || job.sector || ""}
                    <br />Remarks : {job.notes || ""}
                    <br />Description : {itemDesc || "—"}
                  </div>
                </div>
              );
            })}

            {pageIdx === pages.length - 1 && (
              <>
                <div className="flex gap-4 mt-2">
                  <table className="border-collapse border border-black text-xs">
                    <tbody>
                      <tr><td className="border border-black p-1 font-bold">NUMBER OF DELIVERIES</td><td className="border border-black p-1 text-center">: {deliveryCount}</td></tr>
                      <tr><td className="border border-black p-1 font-bold">NUMBER OF COLLECTIONS</td><td className="border border-black p-1 text-center">: {collectionCount}</td></tr>
                    </tbody>
                  </table>
                  <table className="border-collapse border border-black text-xs">
                    <tbody>
                      <tr><td className="border border-black p-1 font-bold">TOTAL DELIVERY AMOUNT</td><td className="border border-black p-1 text-center">: 0</td></tr>
                      <tr><td className="border border-black p-1 font-bold">TOTAL COLLECTION AMOUNT</td><td className="border border-black p-1 text-center">: {totalAmount.toFixed(0)}</td></tr>
                      <tr><td className="border border-black p-1 font-bold">TOTAL AMOUNT</td><td className="border border-black p-1 text-center">: {totalAmount.toFixed(0)}</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-xs mt-1 italic">Page {pageIdx + 1}/{pages.length}</p>

                {allItems.length > 0 && (
                  <div className="flex gap-4 mt-2">
                    <div className="flex-1">
                      <table className="w-full border-collapse border border-black text-xs">
                        <thead><tr className="bg-green-700 text-white"><th className="border border-black p-1">Num</th><th className="border border-black p-1">JOB NUMBER</th><th className="border border-black p-1">ITEM</th><th className="border border-black p-1">JOB TYPE</th><th className="border border-black p-1">QUANTITY</th></tr></thead>
                        <tbody>{allItems.map((it, idx) => (<tr key={idx}><td className="border border-black p-1 text-center">{it.num}</td><td className="border border-black p-1 text-center">{it.jobNumber}</td><td className="border border-black p-1">{it.item}</td><td className="border border-black p-1 text-center">{it.jobType}</td><td className="border border-black p-1 text-center">{it.quantity}</td></tr>))}</tbody>
                      </table>
                    </div>
                    <div className="w-[350px]">
                      <table className="w-full border-collapse border border-black text-xs">
                        <thead><tr className="bg-green-700 text-white"><th className="border border-black p-1">Num</th><th className="border border-black p-1">ITEM</th><th className="border border-black p-1">QUANTITY</th></tr></thead>
                        <tbody>{itemSummary.map((it, idx) => (<tr key={idx}><td className="border border-black p-1 text-center">{idx + 1}</td><td className="border border-black p-1">{it.name}</td><td className="border border-black p-1 text-center">{it.quantity}</td></tr>))}</tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4 mt-4 no-print">
                  <Button onClick={() => window.print()} className="bg-green-600 hover:bg-green-700"><Printer className="h-4 w-4 mr-2" /> Print</Button>
                  <Button variant="outline" onClick={() => setShowPrintSchedule(false)}>Go Back</Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (showPrintSchedule && lastScheduleData) {
    return (
      <Layout title="Print Schedule - Saudi Arabia">
        <div className="no-print mb-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setShowPrintSchedule(false)}>← Back to Collection & Delivery</Button>
          <Button onClick={() => window.print()} className="bg-green-600 hover:bg-green-700"><Printer className="h-4 w-4 mr-2" /> Print Schedule</Button>
          <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50" onClick={() => {
            if (!lastScheduleData) return;
            const sJobs = lastScheduleData.jobs || [];
            const jobLines = sJobs.map((j: any, i: number) => `${i + 1}. ${j.jobNumber || j.id} - ${j.customer || "N/A"} (${(j.type || j.jobType || "COLLECTION").toUpperCase()})`).join("\n");
            const msg = [`📋 *SCHEDULE: ${lastScheduleData.scheduleNumber}*`, `📅 Date: ${lastScheduleData.date}`, `🚛 Vehicle: ${lastScheduleData.vehicle}`, `🚗 Driver: ${lastScheduleData.driver}`, `👤 Sales Rep: ${lastScheduleData.salesRep}`, `📦 Total Jobs: ${sJobs.length}`, ``, `*Jobs:*`, jobLines, ``, `— SOQOTRA SOLUTIONS WLL`].filter(Boolean).join("\n");
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
          }}>
            <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
          </Button>
        </div>
        {renderSchedulePrint()}
      </Layout>
    );
  }

  return (
    <Layout title={t("page.collectionDeliverySaudi")}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t("page.collectionDeliverySaudi")}</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {selectedJobs.size > 0 && (
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700" onClick={() => setShowScheduleDialog(true)}>
                <Calendar className="h-4 w-4" /> {isRTL ? "إرسال للجدول" : "Post to Schedule"} ({selectedJobs.size})
              </Button>
            )}
            <Button className="gap-2 bg-[#006c35] hover:bg-[#005a2d]" onClick={() => navigate("/saudi-arabia/schedules")}>
              <Calendar className="h-4 w-4" /> {t("collection.viewSchedules")}
            </Button>
            <Button className="gap-2 bg-[#006c35] hover:bg-[#005a2d]" onClick={() => navigate("/saudi-arabia/new-job")}>
              <Plus className="h-4 w-4" /> {t("collection.addNewJob")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}><stat.icon className="h-4 w-4 text-white" /></div>
              </CardHeader>
              <CardContent><div className="text-2xl font-bold text-foreground">{stat.value}</div></CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger><SelectValue placeholder={t("warehouse.allCities")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("warehouse.allCities")}</SelectItem>
              {["RIYADH", "JEDDAH", "DAMMAM", "AL-KHOBAR", "MECCA", "MEDINAH", "TABUK", "ABHA"].map(c => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
            </SelectContent>
          </Select>
          <div className="relative col-span-2">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
            <Input placeholder={t("search.searchJobs")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={isRTL ? 'pr-10' : 'pl-10'} />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="collections">{isRTL ? "التحصيلات" : "Collections"} ({collections.length})</TabsTrigger>
            <TabsTrigger value="deliveries">{isRTL ? "التوصيلات" : "Deliveries"} ({deliveries.length})</TabsTrigger>
            <TabsTrigger value="all">{t("label.all")} ({allJobs.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="collections">{renderJobTable(filterJobs(collections))}</TabsContent>
          <TabsContent value="deliveries">{renderJobTable(filterJobs(deliveries))}</TabsContent>
          <TabsContent value="all">{renderJobTable(filterJobs(allJobs))}</TabsContent>
        </Tabs>
      </div>

      {/* Post to Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{isRTL ? `إرسال ${selectedJobs.size} عمل للجدول` : `Post ${selectedJobs.size} Job(s) to Schedule`}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t("schedule.vehicle")} *</Label>
              <Select value={scheduleVehicle} onValueChange={handleVehicleChange}>
                <SelectTrigger><SelectValue placeholder={t("form.selectVehicle")} /></SelectTrigger>
                <SelectContent>{saudiArabiaVehicles.map(v => (<SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("schedule.driver")}</Label>
              <Select value={scheduleDriver} onValueChange={setScheduleDriver}>
                <SelectTrigger><SelectValue placeholder={t("form.selectDriver")} /></SelectTrigger>
                <SelectContent>{saudiArabiaDrivers.map(d => (<SelectItem key={d.value} value={d.label}>{d.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("schedule.salesRep")}</Label>
              <Select value={scheduleSalesRep} onValueChange={setScheduleSalesRep}>
                <SelectTrigger><SelectValue placeholder={isRTL ? "اختر مندوب المبيعات" : "Select sales rep"} /></SelectTrigger>
                <SelectContent>{saudiArabiaSalesReps.map(s => (<SelectItem key={s.value} value={s.label}>{s.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("schedule.helper")}</Label>
              <Input placeholder={isRTL ? "أدخل اسم المساعد" : "Enter helper name"} value={scheduleHelper} onChange={(e) => setScheduleHelper(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>{t("action.cancel")}</Button>
            <Button className="bg-[#006c35] hover:bg-[#005a2d]" onClick={handlePostToSchedule}>{t("action.createSchedule")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Detail Dialog */}
      <Dialog open={!!showJobDetail} onOpenChange={(open) => !open && setShowJobDetail(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" /> Job Details — {showJobDetail?.id}
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
                  <QRCodeSVG value={`SOQOTRA-SA-JOB:${showJobDetail.id}|${showJobDetail.customer}|${showJobDetail.city}`} size={100} />
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
                    <TableRow className="bg-green-100">
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
                        <TableCell>{item.length}×{item.width}×{item.height}</TableCell>
                        <TableCell>{(item.volume || 0).toFixed?.(3) ?? item.volume}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
          <DialogFooter className="print:hidden">
            <Button variant="outline" onClick={() => showJobDetail && handleWhatsApp(showJobDetail)}><Send className="h-4 w-4 mr-2" /> WhatsApp</Button>
            <Button onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" /> Print</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SaudiArabiaCollectionDelivery;
