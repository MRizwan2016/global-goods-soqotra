import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { useInvoiceNumberSelector } from "../invoicing/hooks/useInvoiceNumberSelector";
import InvoiceNumberSelector from "../invoicing/components/basic-information/InvoiceNumberSelector";
import UPBIntegrationCard from "@/components/invoice/UPBIntegrationCard";
import { useSudanOpsInvoice } from "./hooks/useSudanOpsInvoice";
import { lookupJobData } from "@/hooks/useJobAutoFill";
import { supabase } from "@/integrations/supabase/client";
import {
  sudanPorts, sudanSectors, sudanSalesReps, sudanDrivers, sudanDistricts,
  sudanPackageTypes, doorToDoorPricing, namePrefixes, qatarCities, sudanCities,
  destinationCountries, countryCodes,
} from "./data/sudanOpsData";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const SudanOpsInvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dbBooks, setDbBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('manage_invoice_book_stock')
          .select('*')
          .eq('country', 'Sudan')
          .in('status', ['available', 'assigned']);
        if (!error && data) setDbBooks(data);
      } catch (err) {
        console.error('Error loading Sudan books:', err);
      }
    };
    fetchBooks();
  }, []);

  const {
    formData, packageItems, selectedPackageType, packageInput, allPackageTypes,
    handleFormChange, handlePackageTypeSelect, handlePackageInputChange,
    addPackageItem, removePackageItem, saveInvoice, loadInvoice
  } = useSudanOpsInvoice(id);

  const handleJobNumberChange = useCallback(async (value: string) => {
    handleFormChange('jobNumber', value);
    if (value.length >= 3) {
      const result = await lookupJobData(value, dbBooks);
      if (result) {
        if (result.shipperName) handleFormChange('shipperName', result.shipperName);
        if (result.shipperMobile) handleFormChange('shipperMobile', result.shipperMobile);
        if (result.shipperCity) handleFormChange('shipperCity', result.shipperCity);
        if (result.consigneeName) handleFormChange('consigneeName', result.consigneeName);
        if (result.consigneeMobile) handleFormChange('consigneeMobile', result.consigneeMobile);
        if (result.driverName) handleFormChange('driver', result.driverName);
        if (result.salesRepresentative) handleFormChange('salesRep', result.salesRepresentative);
        if (result.invoiceNumber) handleFormChange('invoiceNumber', result.invoiceNumber);
        if (result.bookNumber) handleFormChange('bookNumber', result.bookNumber);
        toast.success('Job details auto-filled');
      }
    }
  }, [dbBooks, handleFormChange]);

  useEffect(() => { if (id) loadInvoice(id); }, [id]);

  const handleSelectInvoice = (invoiceNumber: string) => {
    handleFormChange('invoiceNumber', invoiceNumber);
  };

  const {
    availableInvoiceList, bookActivationStatus, driverName, bookAssignedUser,
  } = useInvoiceNumberSelector({
    formState: { invoiceNumber: formData.invoiceNumber },
    isEditing: !!id,
    handleSelectInvoice
  });

  const handleGoBack = () => navigate("/sudan-ops");
  const handleSave = async () => {
    const success = await saveInvoice();
    if (success) navigate("/sudan-ops");
  };

  const getDoorToDoorPricing = () => {
    if (formData.doorToDoor === "YES" && formData.sector) {
      const pricing = doorToDoorPricing[formData.sector as keyof typeof doorToDoorPricing];
      return pricing ? `${pricing.price} ${pricing.currency}` : "Not Available";
    }
    return "N/A";
  };

  const CURRENCY = "SDG";

  return (
    <Layout title={`${id ? 'Edit' : 'Add New'} Invoice - Sudan`}>
      <PageBreadcrumb className="mb-4" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleGoBack}><ArrowLeft className="h-4 w-4 mr-2" />Go Back</Button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-b from-red-600 via-white to-black rounded"></div>
              <h1 className="text-3xl font-bold text-[#1e2a3a]">{id ? 'Edit' : 'Add New'} Invoice - Sudan</h1>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <Card>
          <CardHeader><CardTitle>Invoice Details</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">PORT:</label>
                <Select value={formData.port} onValueChange={(v) => handleFormChange('port', v)}>
                  <SelectTrigger><SelectValue placeholder="Select Port" /></SelectTrigger>
                  <SelectContent>{sudanPorts.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SECTOR:</label>
                <Select value={formData.sector} onValueChange={(v) => handleFormChange('sector', v)}>
                  <SelectTrigger><SelectValue placeholder="Select Sector" /></SelectTrigger>
                  <SelectContent>{sudanSectors.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SALES REPRESENTATIVE:</label>
                <Select value={formData.salesRep} onValueChange={(v) => handleFormChange('salesRep', v)}>
                  <SelectTrigger><SelectValue placeholder="Select Sales Rep" /></SelectTrigger>
                  <SelectContent>{sudanSalesReps.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DRIVER:</label>
                <Select value={formData.driver} onValueChange={(v) => handleFormChange('driver', v)}>
                  <SelectTrigger><SelectValue placeholder="Select Driver" /></SelectTrigger>
                  <SelectContent>{sudanDrivers.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DISTRICT:</label>
                <Select value={formData.district} onValueChange={(v) => handleFormChange('district', v)}>
                  <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
                  <SelectContent>{sudanDistricts.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DOOR TO DOOR:</label>
                <Select value={formData.doorToDoor} onValueChange={(v) => handleFormChange('doorToDoor', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="NO">NO</SelectItem><SelectItem value="YES">YES</SelectItem></SelectContent>
                </Select>
              </div>
              {formData.doorToDoor === "YES" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">DOOR TO DOOR PRICE:</label>
                  <Input value={getDoorToDoorPricing()} readOnly className="bg-red-50" />
                </div>
              )}
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">INVOICE NUMBER (UPB INTEGRATED):</label>
                <InvoiceNumberSelector
                  formState={{ invoiceNumber: formData.invoiceNumber }}
                  handleInputChange={(e) => handleFormChange('invoiceNumber', e.target.value)}
                  showInvoiceSelector={true}
                  setShowInvoiceSelector={() => {}}
                  availableInvoices={availableInvoiceList}
                  handleSelectInvoice={handleSelectInvoice}
                  isEditing={!!id}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">INVOICE DATE:</label>
                <Input type="date" value={formData.invoiceDate} onChange={(e) => handleFormChange('invoiceDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">JOB NUMBER:</label>
                <Input value={formData.jobNumber} onChange={(e) => handleJobNumberChange(e.target.value)} placeholder="Enter job number to auto-fill" className="border-orange-300 focus:border-orange-500" />
                <p className="text-xs text-muted-foreground">Type a job number to auto-fill details</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {formData.invoiceNumber && (
          <Card><CardContent className="pt-6">
            <UPBIntegrationCard activationStatus={bookActivationStatus} userName={bookAssignedUser} driverName={driverName} invoiceNumber={formData.invoiceNumber} />
          </CardContent></Card>
        )}

        {/* Shipper */}
        <Card>
          <CardHeader><CardTitle>SHIPPER INFORMATION</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">PREFIX:</label>
                <Select value={formData.shipperPrefix} onValueChange={(v) => handleFormChange('shipperPrefix', v)}>
                  <SelectTrigger><SelectValue placeholder="Select prefix" /></SelectTrigger>
                  <SelectContent>{namePrefixes.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">FULL NAME:</label>
                <Input value={formData.shipperName} onChange={(e) => handleFormChange('shipperName', e.target.value)} placeholder="Shipper full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">COUNTRY:</label>
                <Select value={formData.shipperCountry} onValueChange={(v) => handleFormChange('shipperCountry', v)}>
                  <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>{destinationCountries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CITY:</label>
                <Select value={formData.shipperCity} onValueChange={(v) => handleFormChange('shipperCity', v)}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>{(formData.shipperCountry === 'QATAR' ? qatarCities : sudanCities).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">MOBILE:</label>
                <Input value={formData.shipperMobile} onChange={(e) => handleFormChange('shipperMobile', e.target.value)} placeholder="Mobile number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">EMAIL:</label>
                <Input value={formData.shipperEmail} onChange={(e) => handleFormChange('shipperEmail', e.target.value)} placeholder="Email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ID NUMBER:</label>
                <Input value={formData.shipperIdNumber} onChange={(e) => handleFormChange('shipperIdNumber', e.target.value)} placeholder="ID number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ADDRESS:</label>
                <Textarea value={formData.shipperAddress} onChange={(e) => handleFormChange('shipperAddress', e.target.value)} placeholder="Full address" rows={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consignee */}
        <Card>
          <CardHeader><CardTitle>CONSIGNEE INFORMATION</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">PREFIX:</label>
                <Select value={formData.consigneePrefix} onValueChange={(v) => handleFormChange('consigneePrefix', v)}>
                  <SelectTrigger><SelectValue placeholder="Select prefix" /></SelectTrigger>
                  <SelectContent>{namePrefixes.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">FULL NAME:</label>
                <Input value={formData.consigneeName} onChange={(e) => handleFormChange('consigneeName', e.target.value)} placeholder="Consignee full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">COUNTRY:</label>
                <Select value={formData.consigneeCountry} onValueChange={(v) => handleFormChange('consigneeCountry', v)}>
                  <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>{destinationCountries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CITY:</label>
                <Select value={formData.consigneeCity} onValueChange={(v) => handleFormChange('consigneeCity', v)}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>{sudanCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">MOBILE:</label>
                <Input value={formData.consigneeMobile} onChange={(e) => handleFormChange('consigneeMobile', e.target.value)} placeholder="Mobile (+249...)" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">EMAIL:</label>
                <Input value={formData.consigneeEmail} onChange={(e) => handleFormChange('consigneeEmail', e.target.value)} placeholder="Email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ID NUMBER:</label>
                <Input value={formData.consigneeIdNumber} onChange={(e) => handleFormChange('consigneeIdNumber', e.target.value)} placeholder="ID number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ADDRESS:</label>
                <Textarea value={formData.consigneeAddress} onChange={(e) => handleFormChange('consigneeAddress', e.target.value)} placeholder="Full address" rows={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packages */}
        <Card>
          <CardHeader className="bg-[#1e2a3a] text-white"><CardTitle>PACKAGE DETAILS</CardTitle></CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">PACKAGE TYPE:</label>
                <Select value={selectedPackageType} onValueChange={handlePackageTypeSelect}>
                  <SelectTrigger><SelectValue placeholder="Select Package Type" /></SelectTrigger>
                  <SelectContent>
                    {allPackageTypes.map((pkg, i) => (
                      <SelectItem key={i} value={pkg.name}>{pkg.name} ({pkg.dimensions.length}×{pkg.dimensions.width}×{pkg.dimensions.height} - {pkg.volume.toFixed(3)}m³)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">PACKAGE NAME:</label>
                <Input value={packageInput.name} onChange={(e) => handlePackageInputChange('name', e.target.value)} placeholder="Package name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LENGTH (cm):</label>
                <Input type="number" value={packageInput.length} onChange={(e) => handlePackageInputChange('length', e.target.value)} placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WIDTH (cm):</label>
                <Input type="number" value={packageInput.width} onChange={(e) => handlePackageInputChange('width', e.target.value)} placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">HEIGHT (cm):</label>
                <Input type="number" value={packageInput.height} onChange={(e) => handlePackageInputChange('height', e.target.value)} placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WEIGHT (kg) [auto: CBM×1000]:</label>
                <Input type="number" value={packageInput.weight} onChange={(e) => handlePackageInputChange('weight', e.target.value)} placeholder="Auto-filled" className="bg-yellow-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">QUANTITY:</label>
                <Input type="number" value={packageInput.quantity} onChange={(e) => handlePackageInputChange('quantity', e.target.value)} placeholder="1" />
              </div>
            </div>
            <Button onClick={addPackageItem} className="gap-2"><Plus className="h-4 w-4" />Insert Package</Button>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#1e2a3a] hover:bg-[#1e2a3a]">
                    <TableHead className="text-white">No.</TableHead>
                    <TableHead className="text-white">PACKAGE</TableHead>
                    <TableHead className="text-white">DIMENSIONS</TableHead>
                    <TableHead className="text-white">VOLUME (m³)</TableHead>
                    <TableHead className="text-white">WEIGHT (kg)</TableHead>
                    <TableHead className="text-white">QTY</TableHead>
                    <TableHead className="text-white">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packageItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.length}×{item.width}×{item.height} cm</TableCell>
                      <TableCell>{item.cubicMetre.toFixed(3)}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => removePackageItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {packageItems.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center text-gray-500 py-8">No packages added yet.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {packageItems.length > 0 && (
              <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-700">{formData.totalPackages}</div>
                  <div className="text-sm text-gray-600">Total Packages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{formData.totalWeight.toFixed(2)} kg</div>
                  <div className="text-sm text-gray-600">Total Weight</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{formData.totalVolume.toFixed(3)} m³</div>
                  <div className="text-sm text-gray-600">Total Volume</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Costs */}
        <Card>
          <CardHeader className="bg-red-700 text-white"><CardTitle>COSTS & PRICING</CardTitle></CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">FREIGHT ({CURRENCY}):</label>
                <Input type="number" value={formData.freight} onChange={(e) => handleFormChange('freight', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DOCUMENTS FEE ({CURRENCY}):</label>
                <Input type="number" value={formData.documentsFee} readOnly className="bg-yellow-50" />
                <p className="text-xs text-muted-foreground">Auto: 50 if CBM ≥ 1</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PACKING ({CURRENCY}):</label>
                <Input type="number" value={formData.packing} onChange={(e) => handleFormChange('packing', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">TRANSPORTATION ({CURRENCY}):</label>
                <Input type="number" value={formData.destinationTransport} onChange={(e) => handleFormChange('destinationTransport', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DISCOUNT ({CURRENCY}):</label>
                <Input type="number" value={formData.discount} onChange={(e) => handleFormChange('discount', parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-700">{formData.gross.toFixed(2)} {CURRENCY}</div>
                <div className="text-sm text-gray-600">Gross Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">-{formData.discount.toFixed(2)} {CURRENCY}</div>
                <div className="text-sm text-gray-600">Discount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1e2a3a]">{formData.net.toFixed(2)} {CURRENCY}</div>
                <div className="text-sm text-gray-600">Net Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional */}
        <Card>
          <CardHeader><CardTitle>ADDITIONAL DETAILS</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">GIFT CARGO:</label>
                <Select value={formData.giftCargo} onValueChange={(v) => handleFormChange('giftCargo', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="NO">NO</SelectItem><SelectItem value="YES">YES</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PRE-PAID:</label>
                <Select value={formData.prePaid} onValueChange={(v) => handleFormChange('prePaid', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="NO">NO</SelectItem><SelectItem value="YES">YES</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">FREIGHT BY:</label>
                <Select value={formData.freightBy} onValueChange={(v) => handleFormChange('freightBy', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="SEA">SEA</SelectItem><SelectItem value="AIR">AIR</SelectItem><SelectItem value="LAND">LAND</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-3">
                <label className="text-sm font-medium">REMARKS:</label>
                <Textarea value={formData.remarks} onChange={(e) => handleFormChange('remarks', e.target.value)} placeholder="Enter any additional remarks..." rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleGoBack} className="gap-2"><ArrowLeft className="h-4 w-4" />Go Back</Button>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2 bg-red-700 hover:bg-red-800"><Save className="h-4 w-4" />{id ? 'Update' : 'Save'} Invoice</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SudanOpsInvoiceForm;
