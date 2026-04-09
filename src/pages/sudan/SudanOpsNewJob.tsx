import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { sudanSectors, sudanDrivers, sudanSalesReps, sudanVehicles, getSudanDriverForVehicle, sudanCities, sudanPackageTypes, namePrefixes, qatarCities } from "./data/sudanOpsData";

const NAME_PREFIXES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Sheikh"];

interface PackageItem {
  id: string; boxNumber: number; description: string; quantity: number;
  weightKg: number; length: number; width: number; height: number; volumeCBM: number;
}

const SudanOpsNewJob = () => {
  const navigate = useNavigate();
  const [jobType, setJobType] = useState<"collection" | "delivery">("collection");
  const [formData, setFormData] = useState({
    jobNumber: `SD-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    sector: "", salesRep: "", driver: "", vehicle: "",
    shipperPrefix: "", shipperName: "", shipperMobile: "", shipperCity: "", shipperAddress: "",
    consigneePrefix: "", consigneeName: "", consigneeMobile: "", consigneeCity: "", consigneeAddress: "",
    remarks: "",
  });
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [pkgInput, setPkgInput] = useState({ description: "", quantity: "1", weightKg: "", length: "", width: "", height: "" });
  const [allPackageTypes, setAllPackageTypes] = useState(sudanPackageTypes);
  const [selectedPkgType, setSelectedPkgType] = useState("");

  // Load package types from Supabase
  useEffect(() => {
    const fetchPkgTypes = async () => {
      try {
        const { data } = await supabase
          .from('package_types')
          .select('*')
          .or('country.eq.Sudan,country.is.null');
        if (data) {
          const dbTypes = data.map(p => ({
            name: p.name,
            dimensions: { length: Number(p.length_inches) || 0, width: Number(p.width_inches) || 0, height: Number(p.height_inches) || 0 },
            volume: Number(p.volume_cbm) || 0,
          }));
          const staticNames = new Set(sudanPackageTypes.map(s => s.name));
          setAllPackageTypes([...sudanPackageTypes, ...dbTypes.filter(d => !staticNames.has(d.name))]);
        }
      } catch (e) { console.error("Error loading package types:", e); }
    };
    fetchPkgTypes();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'vehicle') {
      const d = getSudanDriverForVehicle(value);
      if (d) setFormData(prev => ({ ...prev, driver: d, vehicle: value }));
    }
  };

  const handlePkgTypeSelect = (pkgName: string) => {
    const selected = allPackageTypes.find(p => p.name === pkgName);
    if (selected) {
      const vol = (selected.dimensions.length * selected.dimensions.width * selected.dimensions.height) / 1000000;
      const weight = vol * 1000;
      setPkgInput({
        description: selected.name,
        length: selected.dimensions.length.toString(),
        width: selected.dimensions.width.toString(),
        height: selected.dimensions.height.toString(),
        weightKg: weight.toFixed(2),
        quantity: "1",
      });
      setSelectedPkgType(pkgName);
    }
  };

  const addPackage = async () => {
    if (!pkgInput.description) { toast.error("Enter package description"); return; }
    const l = parseFloat(pkgInput.length) || 0;
    const w = parseFloat(pkgInput.width) || 0;
    const h = parseFloat(pkgInput.height) || 0;
    const vol = (l * w * h) / 1000000;
    const weight = parseFloat(pkgInput.weightKg) || vol * 1000;
    setPackages(prev => [...prev, { id: uuidv4(), boxNumber: prev.length + 1, description: pkgInput.description, quantity: parseInt(pkgInput.quantity) || 1, weightKg: weight, length: l, width: w, height: h, volumeCBM: vol }]);

    // Save custom package type
    const isKnown = allPackageTypes.some(p => p.name === pkgInput.description);
    if (!isKnown) {
      try {
        await supabase.from('package_types').upsert({
          name: pkgInput.description,
          length_inches: l, width_inches: w, height_inches: h,
          volume_cbm: vol, weight_kg: weight,
          country: 'Sudan', is_default: false,
        }, { onConflict: 'name' });
        setAllPackageTypes(prev => [...prev, { name: pkgInput.description, dimensions: { length: l, width: w, height: h }, volume: vol }]);
      } catch (e) { console.error("Error saving package type:", e); }
    }

    setPkgInput({ description: "", quantity: "1", weightKg: "", length: "", width: "", height: "" });
    setSelectedPkgType("");
    toast.success("Package added");
  };

  const removePackage = (id: string) => setPackages(prev => prev.filter(p => p.id !== id));

  const handleSave = async () => {
    if (!formData.shipperName || !formData.consigneeName) { toast.error("Shipper and consignee names are required"); return; }

    const jobData = {
      id: uuidv4(), ...formData, type: jobType,
      packages: packages.length,
      totalWeight: packages.reduce((s, p) => s + p.weightKg * p.quantity, 0),
      totalVolume: packages.reduce((s, p) => s + p.volumeCBM * p.quantity, 0),
      packageItems: packages,
      city: formData.consigneeCity || formData.shipperCity,
      status: "pending", createdAt: new Date().toISOString(),
    };

    // Save to regional_invoices as a job record
    try {
      const invoiceRow = {
        country: 'Sudan',
        invoice_number: formData.jobNumber,
        invoice_date: formData.date,
        job_number: formData.jobNumber,
        service_type: jobType === 'collection' ? 'COLLECTION' : 'DELIVERY',
        shipper_prefix: formData.shipperPrefix,
        shipper_name: formData.shipperName,
        shipper_mobile: formData.shipperMobile,
        shipper_city: formData.shipperCity,
        shipper_address: formData.shipperAddress,
        shipper_country: 'QATAR',
        consignee_prefix: formData.consigneePrefix,
        consignee_name: formData.consigneeName,
        consignee_mobile: formData.consigneeMobile,
        consignee_city: formData.consigneeCity,
        consignee_address: formData.consigneeAddress,
        consignee_country: 'SUDAN',
        sales_representative: formData.salesRep,
        driver_name: formData.driver,
        sector: formData.sector,
        total_packages: packages.length,
        total_weight: jobData.totalWeight,
        total_volume: jobData.totalVolume,
        status: 'PENDING',
        extra_data: { jobType, packageItems: packages } as any,
      };

      const { data: user } = await supabase.auth.getUser();
      if (user?.user) {
        (invoiceRow as any).created_by = user.user.id;
      }

      const { data, error } = await supabase.from('regional_invoices').insert(invoiceRow).select('id').single();
      if (error) throw error;

      // Save packages
      if (data && packages.length > 0) {
        const pkgRows = packages.map((p, idx) => ({
          invoice_id: data.id,
          package_name: p.description,
          length: p.length, width: p.width, height: p.height,
          weight: p.weightKg, quantity: p.quantity,
          cubic_metre: p.volumeCBM,
          cubic_feet: p.volumeCBM * 35.3147,
          volume_weight: (p.length * p.width * p.height) / 6000,
          box_number: idx + 1,
        }));
        await supabase.from('regional_invoice_packages').insert(pkgRows);
      }

      toast.success("Job saved successfully!");
      navigate("/sudan-ops/collection-delivery");
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job");
    }
  };

  return (
    <Layout title="Add New Job - Sudan">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/sudan-ops/collection-delivery")}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
          <h1 className="text-3xl font-bold text-[#1e2a3a]">Add New Job - Sudan</h1>
        </div>
        <Card>
          <CardHeader><CardTitle>Job Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>JOB TYPE</Label>
                <Select value={jobType} onValueChange={(v: any) => setJobType(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="collection">Collection</SelectItem><SelectItem value="delivery">Delivery</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>JOB NUMBER</Label><Input value={formData.jobNumber} readOnly className="bg-gray-50" /></div>
              <div className="space-y-2"><Label>DATE</Label><Input type="date" value={formData.date} onChange={(e) => handleChange('date', e.target.value)} /></div>
              <div className="space-y-2"><Label>VEHICLE</Label>
                <Select value={formData.vehicle} onValueChange={(v) => handleChange('vehicle', v)}>
                  <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                  <SelectContent>{sudanVehicles.map(v => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>DRIVER</Label><Input value={formData.driver} onChange={(e) => handleChange('driver', e.target.value)} /></div>
              <div className="space-y-2"><Label>SALES REP</Label>
                <Select value={formData.salesRep} onValueChange={(v) => handleChange('salesRep', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{sudanSalesReps.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>SHIPPER</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>PREFIX</Label>
                <Select value={formData.shipperPrefix} onValueChange={(v) => handleChange('shipperPrefix', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{NAME_PREFIXES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>NAME</Label><Input value={formData.shipperName} onChange={(e) => handleChange('shipperName', e.target.value)} /></div>
              <div className="space-y-2"><Label>MOBILE</Label><Input value={formData.shipperMobile} onChange={(e) => handleChange('shipperMobile', e.target.value)} placeholder="+974..." /></div>
              <div className="space-y-2"><Label>CITY</Label>
                <Select value={formData.shipperCity} onValueChange={(v) => handleChange('shipperCity', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{qatarCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2"><Label>ADDRESS</Label><Textarea value={formData.shipperAddress} onChange={(e) => handleChange('shipperAddress', e.target.value)} rows={2} /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>CONSIGNEE</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>PREFIX</Label>
                <Select value={formData.consigneePrefix} onValueChange={(v) => handleChange('consigneePrefix', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{NAME_PREFIXES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>NAME</Label><Input value={formData.consigneeName} onChange={(e) => handleChange('consigneeName', e.target.value)} /></div>
              <div className="space-y-2"><Label>MOBILE</Label><Input value={formData.consigneeMobile} onChange={(e) => handleChange('consigneeMobile', e.target.value)} placeholder="+249..." /></div>
              <div className="space-y-2"><Label>CITY</Label>
                <Select value={formData.consigneeCity} onValueChange={(v) => handleChange('consigneeCity', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{sudanCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2"><Label>ADDRESS</Label><Textarea value={formData.consigneeAddress} onChange={(e) => handleChange('consigneeAddress', e.target.value)} rows={2} /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-red-700 text-white"><CardTitle>PACKAGES</CardTitle></CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>PACKAGE TYPE (from saved list)</Label>
              <Select value={selectedPkgType} onValueChange={handlePkgTypeSelect}>
                <SelectTrigger><SelectValue placeholder="Select Package Type" /></SelectTrigger>
                <SelectContent>
                  {allPackageTypes.map((pkg, i) => (
                    <SelectItem key={i} value={pkg.name}>{pkg.name} ({pkg.dimensions.length}×{pkg.dimensions.width}×{pkg.dimensions.height} - {pkg.volume.toFixed(3)}m³)</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2"><Label>DESCRIPTION</Label><Input value={pkgInput.description} onChange={(e) => setPkgInput(p => ({ ...p, description: e.target.value }))} /></div>
              <div className="space-y-2"><Label>L (cm)</Label><Input type="number" value={pkgInput.length} onChange={(e) => setPkgInput(p => ({ ...p, length: e.target.value }))} /></div>
              <div className="space-y-2"><Label>W (cm)</Label><Input type="number" value={pkgInput.width} onChange={(e) => setPkgInput(p => ({ ...p, width: e.target.value }))} /></div>
              <div className="space-y-2"><Label>H (cm)</Label><Input type="number" value={pkgInput.height} onChange={(e) => setPkgInput(p => ({ ...p, height: e.target.value }))} /></div>
              <div className="space-y-2"><Label>WEIGHT (kg)</Label><Input type="number" value={pkgInput.weightKg} onChange={(e) => setPkgInput(p => ({ ...p, weightKg: e.target.value }))} /></div>
              <div className="space-y-2"><Label>QTY</Label><Input type="number" value={pkgInput.quantity} onChange={(e) => setPkgInput(p => ({ ...p, quantity: e.target.value }))} /></div>
            </div>
            <Button onClick={addPackage} className="gap-2"><Plus className="h-4 w-4" />Add Package</Button>
            {packages.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-red-700 hover:bg-red-700">
                    <TableHead className="text-white">#</TableHead><TableHead className="text-white">DESC</TableHead>
                    <TableHead className="text-white">DIMS</TableHead><TableHead className="text-white">VOL</TableHead>
                    <TableHead className="text-white">WGHT</TableHead><TableHead className="text-white">QTY</TableHead>
                    <TableHead className="text-white">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((p, i) => (
                    <TableRow key={p.id}>
                      <TableCell>{i + 1}</TableCell><TableCell>{p.description}</TableCell>
                      <TableCell>{p.length}×{p.width}×{p.height}</TableCell><TableCell>{p.volumeCBM.toFixed(3)}</TableCell>
                      <TableCell>{p.weightKg} kg</TableCell><TableCell>{p.quantity}</TableCell>
                      <TableCell><Button variant="ghost" size="sm" onClick={() => removePackage(p.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/sudan-ops/collection-delivery")}>Cancel</Button>
          <Button className="bg-red-700 hover:bg-red-800 gap-2" onClick={handleSave}><Save className="h-4 w-4" />Save Job</Button>
        </div>
      </div>
    </Layout>
  );
};

export default SudanOpsNewJob;
