import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Save, Plus, Trash2, Truck, Package, Search } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import {
  sriLankaSectors,
  sriLankaCities,
  doorToDoorPricing,
  sriLankaPorts,
} from "./data/sriLankaData";
import { VEHICLES, DRIVERS, SALES_REPS, VEHICLE_DRIVER_MAP, getDriverForVehicle } from "@/data/vehicleDriverMapping";
import {
  cargoCollectionPackages,
  calcVolumeCBM,
  getCollectionPriceFromVolume,
  CargoPackage,
} from "@/data/cargoPackages";
import { lookupJobData } from "@/hooks/useJobAutoFill";
import { qatarTowns } from "@/pages/invoicing/constants/locationData";

const NAME_PREFIXES = ["Mr.", "Mrs.", "Ms.", "Pastor", "Rev.", "Dr.", "Prof."];

const QATAR_CITIES = qatarTowns;

const QATAR_SECTORS = qatarTowns.map(t => ({ value: t, label: t }));

interface PackageItem {
  id: string;
  boxNumber: number;
  description: string;
  quantity: number;
  weightKg: number;
  length: number;
  width: number;
  height: number;
  volume: number;
  collectionPrice: number;
  deliveryPriceWhite: number;
  deliveryPriceBlack: number;
}

const emptyItem = (boxNum: number): PackageItem => ({
  id: uuidv4(),
  boxNumber: boxNum,
  description: "",
  quantity: 1,
  weightKg: 0,
  length: 0,
  width: 0,
  height: 0,
  volume: 0,
  collectionPrice: 0,
  deliveryPriceWhite: 0,
  deliveryPriceBlack: 0,
});

const generateUniqueJobNumber = (prefix: string, storageKey: string): string => {
  const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const existingIds = new Set(existing.map((j: any) => j.id));
  const date = new Date();
  const dateStr = `${date.getFullYear().toString().slice(-2)}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
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
  const [autoJobNumber] = useState(() => generateUniqueJobNumber("LK", "sriLankaJobs"));
  const [searchJobNumber, setSearchJobNumber] = useState("");

  const [jobData, setJobData] = useState({
    jobType: "collection" as "collection" | "delivery",
    origin: "QATAR",
    customerPrefix: "Mr.",
    customer: "",
    mobileNumber: "",
    telephone: "",
    city: "",
    sector: "",
    location: "",
    destination: "SRI LANKA",
    warehouse: "COLOMBO",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    driver: "",
    vehicle: "",
    salesRep: "",
    notes: "",
    advanceAmount: 0,
  });

  const [items, setItems] = useState<PackageItem[]>([emptyItem(1)]);
  const [nextBoxNumber, setNextBoxNumber] = useState(2);
  const [lastDriverSelection, setLastDriverSelection] = useState({ driver: "", vehicle: "", salesRep: "" });

  // Load last used driver/vehicle/salesRep for quick reuse
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sriLankaLastAssignment");
      if (saved) {
        const parsed = JSON.parse(saved);
        setLastDriverSelection(parsed);
      }
    } catch {}
  }, []);

  const updateField = (field: string, value: any) =>
    setJobData((prev) => ({ ...prev, [field]: value }));

  const isQatarOrigin = jobData.origin === "QATAR";
  const cities = isQatarOrigin ? QATAR_CITIES : sriLankaCities;

  // Auto-fill from job number lookup
  const handleJobLookup = useCallback(async () => {
    if (!searchJobNumber || searchJobNumber.length < 3) return;
    const result = await lookupJobData(searchJobNumber);
    if (result) {
      setJobData(prev => ({
        ...prev,
        customer: result.shipperName || prev.customer,
        mobileNumber: result.shipperMobile || prev.mobileNumber,
        city: result.shipperCity || prev.city,
        location: result.shipperAddress || prev.location,
        driver: result.driverName || prev.driver,
        salesRep: result.salesRepresentative || prev.salesRep,
      }));
      toast.success("Job data auto-filled!");
    } else {
      toast.info("No matching job found for auto-fill");
    }
  }, [searchJobNumber]);

  const selectPackage = (itemId: string, pkgName: string) => {
    const pkg = cargoCollectionPackages.find(p => p.name === pkgName);
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      if (!pkg) return { ...item, description: pkgName };
      const vol = pkg.hasManualDimensions ? 0 : pkg.volume;
      const colPrice = jobData.jobType === "collection"
        ? getCollectionPriceFromVolume(vol, jobData.sector || "COLOMBO")
        : 0;
      return {
        ...item,
        description: pkg.name,
        length: pkg.dimensions.length,
        width: pkg.dimensions.width,
        height: pkg.dimensions.height,
        volume: vol,
        collectionPrice: colPrice,
        deliveryPriceWhite: pkg.deliveryPrices.whitePlywood12mm,
        deliveryPriceBlack: pkg.deliveryPrices.blackPlywood18mm,
      };
    }));
  };

  const updateItem = (id: string, field: keyof PackageItem, value: any) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (["length", "width", "height"].includes(field)) {
        updated.volume = Math.round(calcVolumeCBM(updated.length, updated.width, updated.height) * 1000) / 1000;
        if (jobData.jobType === "collection") {
          updated.collectionPrice = getCollectionPriceFromVolume(updated.volume, jobData.sector || "COLOMBO");
        }
      }
      return updated;
    }));
  };

  const addItem = () => {
    if (nextBoxNumber > 20) { toast.error("Maximum 20 boxes allowed"); return; }
    setItems(prev => [...prev, emptyItem(nextBoxNumber)]);
    setNextBoxNumber(prev => prev + 1);
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      if (prev.length <= 1) return prev;
      const filtered = prev.filter(i => i.id !== id);
      return filtered.map((item, idx) => ({ ...item, boxNumber: idx + 1 }));
    });
    setNextBoxNumber(prev => Math.max(2, prev - 1));
  };

  const handleSectorChange = (sector: string) => {
    updateField("sector", sector);
    if (jobData.jobType === "collection") {
      setItems(prev => prev.map(item => ({
        ...item,
        collectionPrice: item.volume > 0 ? getCollectionPriceFromVolume(item.volume, sector) : 0,
      })));
    }
  };

  const handleJobTypeChange = (type: string) => {
    updateField("jobType", type);
    setItems(prev => prev.map(item => ({
      ...item,
      collectionPrice: type === "collection" && item.volume > 0
        ? getCollectionPriceFromVolume(item.volume, jobData.sector || "COLOMBO")
        : 0,
    })));
  };

  const applyLastAssignment = () => {
    if (lastDriverSelection.driver || lastDriverSelection.vehicle || lastDriverSelection.salesRep) {
      setJobData(prev => ({
        ...prev,
        driver: lastDriverSelection.driver || prev.driver,
        vehicle: lastDriverSelection.vehicle || prev.vehicle,
        salesRep: lastDriverSelection.salesRep || prev.salesRep,
      }));
      toast.success("Previous driver/vehicle/sales rep applied");
    } else {
      toast.info("No previous assignment found");
    }
  };

  const totalPackages = items.reduce((s, i) => s + i.quantity, 0);
  const totalWeight = items.reduce((s, i) => s + i.weightKg, 0);
  const totalCbm = items.reduce((s, i) => s + i.volume, 0);
  const totalCollectionPrice = items.reduce((s, i) => s + i.collectionPrice, 0);
  const totalDeliveryWhite = items.reduce((s, i) => s + i.deliveryPriceWhite, 0);
  const totalDeliveryBlack = items.reduce((s, i) => s + i.deliveryPriceBlack, 0);

  const isCollection = jobData.jobType === "collection";

  const handleSave = () => {
    if (!jobData.customer.trim()) { toast.error("Please enter customer name"); return; }
    if (!jobData.city) { toast.error("Please select a city"); return; }
    if (!jobData.driver) { toast.error("Please assign a driver"); return; }

    setIsSaving(true);

    // Save last assignment for reuse
    const assignment = { driver: jobData.driver, vehicle: jobData.vehicle, salesRep: jobData.salesRep };
    localStorage.setItem("sriLankaLastAssignment", JSON.stringify(assignment));

    const newJob = {
      id: autoJobNumber,
      jobNumber: autoJobNumber,
      ...jobData,
      items,
      totalPackages,
      totalWeight: totalWeight.toFixed(2),
      totalCbm: totalCbm.toFixed(3),
      estimatedCost: (isCollection ? totalCollectionPrice : totalDeliveryWhite).toFixed(2),
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
    } catch {
      toast.error("Failed to save job");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout title="Sri Lanka - New Job">
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
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

        {/* Job Number + Auto-fill */}
        <Card>
          <CardContent className="py-3 flex flex-wrap items-center gap-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2">
              <Label className="font-bold text-green-800">JOB NUMBER:</Label>
              <span className="font-mono text-lg font-bold text-green-900 tracking-wider">{autoJobNumber}</span>
              <span className="text-xs text-green-600">(Auto-generated)</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Label className="text-sm font-medium">Auto-fill from Job #:</Label>
              <Input
                placeholder="Enter existing job number"
                className="w-48"
                value={searchJobNumber}
                onChange={(e) => setSearchJobNumber(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleJobLookup()}
              />
              <Button size="sm" variant="outline" onClick={handleJobLookup}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3">
            <CardTitle className="text-base">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Job Type</Label>
              <Select value={jobData.jobType} onValueChange={handleJobTypeChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="collection">Collection</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Origin Country</Label>
              <Select value={jobData.origin} onValueChange={(v) => updateField("origin", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="QATAR">Qatar</SelectItem>
                  <SelectItem value="SRI LANKA">Sri Lanka</SelectItem>
                  <SelectItem value="SAUDI ARABIA">Saudi Arabia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Date</Label><Input type="date" value={jobData.date} onChange={(e) => updateField("date", e.target.value)} /></div>
            <div><Label>Time</Label><Input type="time" value={jobData.time} onChange={(e) => updateField("time", e.target.value)} /></div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3">
            <CardTitle className="text-base">
              Customer Information {isQatarOrigin ? "(Qatar Address)" : "(Sri Lanka Address)"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 grid grid-cols-[120px_1fr] gap-2">
              <div>
                <Label>Title</Label>
                <Select value={jobData.customerPrefix} onValueChange={(v) => updateField("customerPrefix", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {NAME_PREFIXES.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Customer Name *</Label>
                <Input placeholder="Enter customer name" value={jobData.customer} onChange={(e) => updateField("customer", e.target.value.toUpperCase())} />
              </div>
            </div>
            <div>
              <Label>Mobile Number *</Label>
              <Input placeholder={isQatarOrigin ? "+974 XXXXXXXX" : "+94 7XXXXXXXX"} value={jobData.mobileNumber} onChange={(e) => updateField("mobileNumber", e.target.value)} />
            </div>
            <div>
              <Label>Telephone No.</Label>
              <Input placeholder="Landline number" value={jobData.telephone} onChange={(e) => updateField("telephone", e.target.value)} />
            </div>
            <div>
              <Label>City * {isQatarOrigin && <span className="text-xs text-muted-foreground">(Qatar)</span>}</Label>
              <Select value={jobData.city} onValueChange={(v) => updateField("city", v)}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sector {isQatarOrigin && <span className="text-xs text-muted-foreground">(Qatar)</span>}</Label>
              <Select value={jobData.sector} onValueChange={handleSectorChange}>
                <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                <SelectContent>
                  {sriLankaSectors.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>{isQatarOrigin ? "Collection / Delivery Address (Qatar)" : "Location / Address"}</Label>
              <Input placeholder={isQatarOrigin ? "Full Qatar address" : "Full address"} value={jobData.location} onChange={(e) => updateField("location", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Destination */}
        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3">
            <CardTitle className="text-base">Destination</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Destination Country</Label>
              <Input value="SRI LANKA" readOnly className="bg-muted font-bold" />
            </div>
            <div>
              <Label>Warehouse</Label>
              <Select value={jobData.warehouse} onValueChange={(v) => updateField("warehouse", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {sriLankaPorts.map((p) => (<SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Advance Amount (QAR)</Label>
              <Input type="number" min={0} value={jobData.advanceAmount} onChange={(e) => updateField("advanceAmount", parseFloat(e.target.value) || 0)} />
            </div>
          </CardContent>
        </Card>

        {/* Assignment */}
        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Assignment</CardTitle>
            <Button size="sm" variant="secondary" onClick={applyLastAssignment} className="text-xs">
              Reuse Last Driver/Vehicle
            </Button>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Vehicle / Driver *</Label>
              <Select value={jobData.driver} onValueChange={(v) => {
                updateField("driver", v);
                const match = v.match(/\((\d+)\)/);
                if (match) updateField("vehicle", match[1]);
              }}>
                <SelectTrigger><SelectValue placeholder="Select vehicle/driver" /></SelectTrigger>
                <SelectContent>
                  {DRIVERS.map((d) => (<SelectItem key={d.value} value={d.label}>{d.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Vehicle Number</Label>
              <Input placeholder="Auto or manual" value={jobData.vehicle} onChange={(e) => updateField("vehicle", e.target.value.toUpperCase())} />
            </div>
            <div>
              <Label>Sales Representative</Label>
              <Select value={jobData.salesRep} onValueChange={(v) => updateField("salesRep", v)}>
                <SelectTrigger><SelectValue placeholder="Select sales rep" /></SelectTrigger>
                <SelectContent>
                  {SALES_REPS.map((s) => (<SelectItem key={s.value} value={s.label}>{s.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Packages */}
        <Card>
          <CardHeader className="bg-[#8B4513] text-white rounded-t-lg py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              {isCollection ? "CARGO COLLECTIONS" : "BOXES DELIVERIES"} — Packages (Dimensions in Inches)
            </CardTitle>
            <Button size="sm" variant="secondary" onClick={addItem} disabled={nextBoxNumber > 20}>
              <Plus className="h-4 w-4 mr-1" /> Add Box {nextBoxNumber <= 20 ? `#${nextBoxNumber}` : "(Max)"}
            </Button>
          </CardHeader>
          <CardContent className="pt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-yellow-100">
                  <TableHead className="w-14 font-bold">BOX #</TableHead>
                  <TableHead className="font-bold">PACKAGES</TableHead>
                  <TableHead className="w-16 font-bold">QTY</TableHead>
                  <TableHead className="w-20 font-bold">L (in)</TableHead>
                  <TableHead className="w-20 font-bold">W (in)</TableHead>
                  <TableHead className="w-20 font-bold">H (in)</TableHead>
                  <TableHead className="w-20 font-bold">VOLUME</TableHead>
                  {isCollection ? (
                    <TableHead className="w-28 font-bold text-blue-700">PRICE ({jobData.sector || "COLOMBO"})</TableHead>
                  ) : (
                    <>
                      <TableHead className="w-28 font-bold text-green-700">WHITE PLY</TableHead>
                      <TableHead className="w-28 font-bold text-gray-700">BLACK PLY</TableHead>
                    </>
                  )}
                  <TableHead className="w-20 font-bold">WT (kg)</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-bold text-center text-[#8B4513]">{item.boxNumber}</TableCell>
                    <TableCell>
                      <Select value={item.description} onValueChange={(v) => selectPackage(item.id, v)}>
                        <SelectTrigger className="min-w-[200px]"><SelectValue placeholder="Select package" /></SelectTrigger>
                        <SelectContent>
                          {cargoCollectionPackages.map((p) => (
                            <SelectItem key={p.id} value={p.name}>
                              {p.name} {!p.hasManualDimensions ? `(${p.dimensions.length}×${p.dimensions.width}×${p.dimensions.height})` : ""}
                            </SelectItem>
                          ))}
                          <SelectItem value="OTHER">OTHER (Manual Entry)</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell><Input type="number" min={1} className="w-16" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)} /></TableCell>
                    <TableCell><Input type="number" min={0} className="w-20" value={item.length || ""} onChange={(e) => updateItem(item.id, "length", parseFloat(e.target.value) || 0)} /></TableCell>
                    <TableCell><Input type="number" min={0} className="w-20" value={item.width || ""} onChange={(e) => updateItem(item.id, "width", parseFloat(e.target.value) || 0)} /></TableCell>
                    <TableCell><Input type="number" min={0} className="w-20" value={item.height || ""} onChange={(e) => updateItem(item.id, "height", parseFloat(e.target.value) || 0)} /></TableCell>
                    <TableCell className="font-medium">{item.volume.toFixed(3)}</TableCell>
                    {isCollection ? (
                      <TableCell className="font-bold text-blue-700">QAR {item.collectionPrice.toFixed(2)}</TableCell>
                    ) : (
                      <>
                        <TableCell className="font-bold text-green-700">QAR {item.deliveryPriceWhite.toFixed(2)}</TableCell>
                        <TableCell className="font-bold text-gray-700">{item.deliveryPriceBlack > 0 ? `QAR ${item.deliveryPriceBlack.toFixed(2)}` : "—"}</TableCell>
                      </>
                    )}
                    <TableCell><Input type="number" min={0} step={0.1} className="w-20" value={item.weightKg || ""} onChange={(e) => updateItem(item.id, "weightKg", parseFloat(e.target.value) || 0)} /></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-destructive p-1"><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notes + Summary */}
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
              <div className="flex justify-between"><span className="text-muted-foreground">Total Boxes:</span><span className="font-bold">{items.length}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Packages:</span><span className="font-bold">{totalPackages}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Weight:</span><span className="font-bold">{totalWeight.toFixed(2)} kg</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total CBM:</span><span className="font-bold">{totalCbm.toFixed(3)}</span></div>
              <hr />
              {isCollection ? (
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Collection Total:</span>
                  <span className="font-bold text-blue-700">QAR {totalCollectionPrice.toFixed(2)}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="font-semibold">White Plywood 12mm:</span>
                    <span className="font-bold text-green-700">QAR {totalDeliveryWhite.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Black Plywood 18mm:</span>
                    <span className="font-bold text-gray-700">QAR {totalDeliveryBlack.toFixed(2)}</span>
                  </div>
                </>
              )}
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
