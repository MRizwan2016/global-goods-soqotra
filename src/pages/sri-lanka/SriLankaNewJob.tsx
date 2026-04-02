import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Save, Plus, Trash2, Truck } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import {
  sriLankaSectors,
  sriLankaDrivers,
  sriLankaSalesReps,
  sriLankaCities,
  sriLankaPackageTypes,
  doorToDoorPricing,
} from "./data/sriLankaData";

interface PackageItem {
  id: string;
  description: string;
  quantity: number;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  cbm: number;
}

const emptyItem = (): PackageItem => ({
  id: uuidv4(),
  description: "",
  quantity: 1,
  weightKg: 0,
  lengthCm: 0,
  widthCm: 0,
  heightCm: 0,
  cbm: 0,
});

const generateUniqueJobNumber = (prefix: string, storageKey: string): string => {
  const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const existingIds = new Set(existing.map((j: any) => j.id));
  
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateStr = `${year}${month}${day}`;
  
  // Find the next sequential number for today
  let seq = 1;
  let jobId: string;
  do {
    jobId = `${prefix}-${dateStr}-${String(seq).padStart(3, "0")}`;
    seq++;
  } while (existingIds.has(jobId));
  
  return jobId;
};

const SriLankaNewJob = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // Auto-generate unique job number on mount
  const [autoJobNumber] = useState(() => 
    generateUniqueJobNumber("LK", "sriLankaJobs")
  );

  const [jobData, setJobData] = useState({
    jobType: "collection" as "collection" | "delivery",
    customer: "",
    mobileNumber: "",
    city: "",
    sector: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    driver: "",
    salesRep: "",
    notes: "",
    advanceAmount: 0,
  });

  const [items, setItems] = useState<PackageItem[]>([emptyItem()]);

  const updateField = (field: string, value: any) =>
    setJobData((prev) => ({ ...prev, [field]: value }));

  const updateItem = (id: string, field: keyof PackageItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (["lengthCm", "widthCm", "heightCm"].includes(field)) {
          updated.cbm = (updated.lengthCm * updated.widthCm * updated.heightCm) / 1000000;
        }
        return updated;
      })
    );
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (id: string) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));

  const totalPackages = items.reduce((s, i) => s + i.quantity, 0);
  const totalWeight = items.reduce((s, i) => s + i.weightKg, 0);
  const totalCbm = items.reduce((s, i) => s + i.cbm, 0);

  const sectorPricing = doorToDoorPricing[jobData.sector as keyof typeof doorToDoorPricing];
  const estimatedCost = sectorPricing ? totalCbm * sectorPricing.price : 0;

  const handleSave = () => {
    if (!jobData.customer.trim()) { toast.error("Please enter customer name"); return; }
    if (!jobData.city) { toast.error("Please select a city"); return; }
    if (!jobData.driver) { toast.error("Please assign a driver"); return; }

    setIsSaving(true);

    const newJob = {
      id: autoJobNumber,
      jobNumber: autoJobNumber,
      ...jobData,
      items,
      totalPackages,
      totalWeight: totalWeight.toFixed(2),
      totalCbm: totalCbm.toFixed(3),
      estimatedCost: estimatedCost.toFixed(2),
      status: "scheduled",
      packages: totalPackages,
      weight: totalWeight.toFixed(2),
      type: jobData.jobType,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("sriLankaJobs") || "[]");
      existing.push(newJob);
      localStorage.setItem("sriLankaJobs", JSON.stringify(existing));
      toast.success(`Job ${autoJobNumber} created successfully`);
      navigate("/sri-lanka/collection-delivery");
    } catch (error) {
      toast.error("Failed to save job");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout title="Sri Lanka - New Job">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-amber-700 to-amber-900 rounded flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Add New Job - Sri Lanka</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/sri-lanka/collection-delivery")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button className="bg-[#8B4513] hover:bg-[#6d3610]" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" /> {isSaving ? "Saving..." : "Save Job"}
            </Button>
          </div>
        </div>

        {/* Auto-generated Job Number */}
        <Card>
          <CardContent className="py-3 flex items-center gap-4 bg-green-50 border-green-200">
            <Label className="font-bold text-green-800">JOB NUMBER:</Label>
            <span className="font-mono text-lg font-bold text-green-900 tracking-wider">{autoJobNumber}</span>
            <span className="text-xs text-green-600">(Auto-generated, unique)</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3">
            <CardTitle className="text-base">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Job Type</Label>
              <Select value={jobData.jobType} onValueChange={(v) => updateField("jobType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="collection">Collection</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Date</Label><Input type="date" value={jobData.date} onChange={(e) => updateField("date", e.target.value)} /></div>
            <div><Label>Time</Label><Input type="time" value={jobData.time} onChange={(e) => updateField("time", e.target.value)} /></div>
            <div><Label>Advance Amount (QAR)</Label><Input type="number" min={0} value={jobData.advanceAmount} onChange={(e) => updateField("advanceAmount", parseFloat(e.target.value) || 0)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3">
            <CardTitle className="text-base">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Customer Name *</Label><Input placeholder="Enter customer name" value={jobData.customer} onChange={(e) => updateField("customer", e.target.value.toUpperCase())} /></div>
            <div><Label>Mobile Number</Label><Input placeholder="+94 7XXXXXXXX" value={jobData.mobileNumber} onChange={(e) => updateField("mobileNumber", e.target.value)} /></div>
            <div>
              <Label>City *</Label>
              <Select value={jobData.city} onValueChange={(v) => updateField("city", v)}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {sriLankaCities.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sector</Label>
              <Select value={jobData.sector} onValueChange={(v) => updateField("sector", v)}>
                <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                <SelectContent>
                  {sriLankaSectors.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2"><Label>Location / Address</Label><Input placeholder="Full address" value={jobData.location} onChange={(e) => updateField("location", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3">
            <CardTitle className="text-base">Assignment</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Driver *</Label>
              <Select value={jobData.driver} onValueChange={(v) => updateField("driver", v)}>
                <SelectTrigger><SelectValue placeholder="Assign driver" /></SelectTrigger>
                <SelectContent>
                  {sriLankaDrivers.map((d) => (<SelectItem key={d.value} value={d.label}>{d.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sales Representative</Label>
              <Select value={jobData.salesRep} onValueChange={(v) => updateField("salesRep", v)}>
                <SelectTrigger><SelectValue placeholder="Select sales rep" /></SelectTrigger>
                <SelectContent>
                  {sriLankaSalesReps.map((s) => (<SelectItem key={s.value} value={s.label}>{s.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Package Items</CardTitle>
            <Button size="sm" variant="secondary" onClick={addItem}><Plus className="h-4 w-4 mr-1" /> Add Item</Button>
          </CardHeader>
          <CardContent className="pt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Description</TableHead>
                  <TableHead className="w-20">Qty</TableHead>
                  <TableHead className="w-24">Weight (kg)</TableHead>
                  <TableHead className="w-20">L (cm)</TableHead>
                  <TableHead className="w-20">W (cm)</TableHead>
                  <TableHead className="w-20">H (cm)</TableHead>
                  <TableHead className="w-24">CBM</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Select value={item.description} onValueChange={(v) => updateItem(item.id, "description", v)}>
                        <SelectTrigger className="min-w-[160px]"><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {sriLankaPackageTypes.map((p, i) => (
                            <SelectItem key={i} value={`${p.name} (${p.dimensions.length}x${p.dimensions.width}x${p.dimensions.height})`}>
                              {p.name} ({p.dimensions.length}x{p.dimensions.width}x{p.dimensions.height})
                            </SelectItem>
                          ))}
                          <SelectItem value="OTHER">OTHER</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell><Input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)} /></TableCell>
                    <TableCell><Input type="number" min={0} step={0.1} value={item.weightKg} onChange={(e) => updateItem(item.id, "weightKg", parseFloat(e.target.value) || 0)} /></TableCell>
                    <TableCell><Input type="number" min={0} value={item.lengthCm} onChange={(e) => updateItem(item.id, "lengthCm", parseFloat(e.target.value) || 0)} /></TableCell>
                    <TableCell><Input type="number" min={0} value={item.widthCm} onChange={(e) => updateItem(item.id, "widthCm", parseFloat(e.target.value) || 0)} /></TableCell>
                    <TableCell><Input type="number" min={0} value={item.heightCm} onChange={(e) => updateItem(item.id, "heightCm", parseFloat(e.target.value) || 0)} /></TableCell>
                    <TableCell className="font-medium">{item.cbm.toFixed(4)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-destructive p-1"><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="py-3"><CardTitle className="text-base">Notes</CardTitle></CardHeader>
            <CardContent>
              <Textarea placeholder="Add any notes..." value={jobData.notes} onChange={(e) => updateField("notes", e.target.value)} rows={4} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3"><CardTitle className="text-base">Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Packages:</span><span className="font-bold">{totalPackages}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Weight:</span><span className="font-bold">{totalWeight.toFixed(2)} kg</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total CBM:</span><span className="font-bold">{totalCbm.toFixed(4)}</span></div>
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Estimated Cost:</span>
                <span className="font-bold text-[#8B4513]">QAR {estimatedCost.toFixed(2)}</span>
              </div>
              {jobData.advanceAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Advance Paid:</span>
                  <span className="font-bold">QAR {jobData.advanceAmount.toFixed(2)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pb-8">
          <Button variant="outline" onClick={() => navigate("/sri-lanka/collection-delivery")}>Cancel</Button>
          <Button className="bg-[#8B4513] hover:bg-[#6d3610]" onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" /> {isSaving ? "Saving..." : "Create Job"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SriLankaNewJob;
