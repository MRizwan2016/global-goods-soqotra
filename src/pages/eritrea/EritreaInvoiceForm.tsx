import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Save, Eye, Printer } from "lucide-react";
import EritreaInvoicePreview from "./components/EritreaInvoicePreview";

const EritreaInvoiceForm = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    sector: "",
    branch: "",
    warehouse: "",
    salesRep: "",
    driver: "",
    volume: "",
    weight: "",
    packages: "",
    doorToDoor: "NO",
    district: "",
    catZone: "",
    freightBy: "SEA",
    invoiceNumber: "",
    invoiceDate: "",
    giftCargo: "NO",
    prePaid: "NO",
    agentName: "",
    agentNumber: "",
    remarks: ""
  });

  const [packageDetails, setPackageDetails] = useState([
    { name: "", length: "", width: "", height: "", cubicMetre: "", cubicFeet: "", weight: "", boxNumber: "", volumeWeight: "" }
  ]);

  const [shippingDetails, setShippingDetails] = useState({
    handOverBy: "",
    shipper1: "",
    shipper2: "",
    address: "",
    postCode: "",
    city: "",
    town: "",
    country: "",
    mobile: "",
    landPhone: "",
    passportNic: "",
    email: "",
    consignee1: "",
    consignee2: "",
    consigneeAddress: "",
    consigneeTown: "",
    consigneeCountry: "",
    consigneeMobile: "",
    consigneeLandPhone: "",
    consigneePassportNic: "",
    consigneeEmail: ""
  });

  const [costDetails, setCostDetails] = useState({
    freight: "",
    destinationTransport: "",
    document: "",
    localTransport: "",
    packing: "",
    storage: "",
    destinationClearing: "",
    destinationDoorDelivery: "",
    other: "",
    gross: "",
    discount: "",
    net: ""
  });

  const addPackageRow = () => {
    setPackageDetails([...packageDetails, {
      name: "", length: "", width: "", height: "", cubicMetre: "", cubicFeet: "", weight: "", boxNumber: "", volumeWeight: ""
    }]);
  };

  const handleGoBack = () => {
    navigate("/eritrea");
  };

  const handleSave = () => {
    // Here you would typically save the data
    console.log("Saving invoice data:", { formData, packageDetails, shippingDetails, costDetails });
    navigate("/eritrea");
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handlePrint = () => {
    const invoiceData = {
      formData,
      packageDetails,
      shippingDetails,
      costDetails
    };
    
    navigate(`/eritrea/invoice/print/${formData.invoiceNumber || 'ER' + Date.now()}`, {
      state: { invoiceData }
    });
  };

  const handlePrintFromPreview = () => {
    setShowPreview(false);
    handlePrint();
  };

  const renderPage1 = () => (
    <div className="space-y-6">
      {/* Basic Invoice Details */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">SECTOR:</label>
              <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MASSAWA">MASSAWA · M</SelectItem>
                  <SelectItem value="ASSAB">ASSAB · A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">BRANCH:</label>
              <Select value={formData.branch} onValueChange={(value) => setFormData({...formData, branch: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MASSAWA">MASSAWA</SelectItem>
                  <SelectItem value="ASSAB">ASSAB</SelectItem>
                  <SelectItem value="ASMARA">ASMARA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">WAREHOUSE:</label>
              <Select value={formData.warehouse} onValueChange={(value) => setFormData({...formData, warehouse: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Massawa">Massawa</SelectItem>
                  <SelectItem value="Assab">Assab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">SALES REP:</label>
              <Select value={formData.salesRep} onValueChange={(value) => setFormData({...formData, salesRep: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sales Rep" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SALEM001">SALEM001</SelectItem>
                  <SelectItem value="AHMED002">AHMED002</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">DRIVER:</label>
              <Select value={formData.driver} onValueChange={(value) => setFormData({...formData, driver: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MOHAMED HASSAN">MOHAMED HASSAN</SelectItem>
                  <SelectItem value="IBRAHIM SAID">IBRAHIM SAID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">DOOR TO DOOR:</label>
              <Select value={formData.doorToDoor} onValueChange={(value) => setFormData({...formData, doorToDoor: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NO">NO</SelectItem>
                  <SelectItem value="YES">YES</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">DISTRICT:</label>
              <Select value={formData.district} onValueChange={(value) => setFormData({...formData, district: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MASSAWA_M">MASSAWA · M</SelectItem>
                  <SelectItem value="ASSAB_A">ASSAB · A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">CAT/ ZONE:</label>
              <Select value={formData.catZone} onValueChange={(value) => setFormData({...formData, catZone: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Normal Rate · 0" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal Rate">Normal Rate · 0</SelectItem>
                  <SelectItem value="Special Rate">Special Rate · 1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">FREIGHT BY:</label>
              <Select value={formData.freightBy} onValueChange={(value) => setFormData({...formData, freightBy: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SEA">SEA</SelectItem>
                  <SelectItem value="AIR">AIR</SelectItem>
                  <SelectItem value="LAND">LAND</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">VOLUME:</label>
              <Input
                type="number"
                value={formData.volume}
                onChange={(e) => setFormData({...formData, volume: e.target.value})}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">WEIGHT:</label>
              <Input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">PACKAGES:</label>
              <Input
                type="number"
                value={formData.packages}
                onChange={(e) => setFormData({...formData, packages: e.target.value})}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">INVOICE NUMBER:</label>
              <Input
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                placeholder="Invoice Number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">INVOICE DATE:</label>
              <Input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">GIFT CARGO:</label>
              <Select value={formData.giftCargo} onValueChange={(value) => setFormData({...formData, giftCargo: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NO">NO</SelectItem>
                  <SelectItem value="YES">YES</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">PRE PAID:</label>
              <Select value={formData.prePaid} onValueChange={(value) => setFormData({...formData, prePaid: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NO">NO</SelectItem>
                  <SelectItem value="YES">YES</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">REMARKS:</label>
              <Textarea
                value={formData.remarks}
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                placeholder="Enter remarks"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Package Details */}
      <Card>
        <CardHeader className="bg-blue-500 text-white">
          <CardTitle>PACKAGES DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">PACKAGES NAME:</label>
              <Input placeholder="Package name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CUBIC METRE:</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">LENGTH:</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CUBIC FEET:</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">WIDTH:</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">WEIGHT:</label>
              <Input type="number" placeholder="1" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">HEIGHT:</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">BOX NUMBER:</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">VOLUME WEIGHT:</label>
              <Input type="number" placeholder="0" />
            </div>
          </div>
          
          <div className="p-6">
            <Button onClick={addPackageRow} className="mb-4">
              <Plus className="h-4 w-4 mr-2" />
              Insert
            </Button>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 hover:bg-blue-500">
                    <TableHead className="text-white">Num</TableHead>
                    <TableHead className="text-white">PACKAGE</TableHead>
                    <TableHead className="text-white">LENGTH</TableHead>
                    <TableHead className="text-white">WIDTH</TableHead>
                    <TableHead className="text-white">HEIGHT</TableHead>
                    <TableHead className="text-white">VOLUME</TableHead>
                    <TableHead className="text-white">WEIGHT</TableHead>
                    <TableHead className="text-white">BOX Num</TableHead>
                    <TableHead className="text-white">VOL_WGHT</TableHead>
                    <TableHead className="text-white">MODIFY</TableHead>
                    <TableHead className="text-white">REMOVE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packageDetails.map((pkg, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{pkg.name || "-"}</TableCell>
                      <TableCell>{pkg.length || "-"}</TableCell>
                      <TableCell>{pkg.width || "-"}</TableCell>
                      <TableCell>{pkg.height || "-"}</TableCell>
                      <TableCell>{pkg.cubicMetre || "-"}</TableCell>
                      <TableCell>{pkg.weight || "-"}</TableCell>
                      <TableCell>{pkg.boxNumber || "-"}</TableCell>
                      <TableCell>{pkg.volumeWeight || "-"}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPage2 = () => (
    <div className="space-y-6">
      {/* Cost Details */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">FREIGHT:</label>
                <Input
                  type="number"
                  value={costDetails.freight}
                  onChange={(e) => setCostDetails({...costDetails, freight: e.target.value})}
                  placeholder="1129"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DESTINATION TRANSPORT:</label>
                <Input
                  type="number"
                  value={costDetails.destinationTransport}
                  onChange={(e) => setCostDetails({...costDetails, destinationTransport: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DOCUMENT:</label>
                <Input
                  type="number"
                  value={costDetails.document}
                  onChange={(e) => setCostDetails({...costDetails, document: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LOCAL TRANSPORT:</label>
                <Input
                  type="number"
                  value={costDetails.localTransport}
                  onChange={(e) => setCostDetails({...costDetails, localTransport: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PACKING:</label>
                <Input
                  type="number"
                  value={costDetails.packing}
                  onChange={(e) => setCostDetails({...costDetails, packing: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">STORAGE:</label>
                <Input
                  type="number"
                  value={costDetails.storage}
                  onChange={(e) => setCostDetails({...costDetails, storage: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DESTINATION CLEARING:</label>
                <Input
                  type="number"
                  value={costDetails.destinationClearing}
                  onChange={(e) => setCostDetails({...costDetails, destinationClearing: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DESTINATION DOOR DELIVERY:</label>
                <Input
                  type="number"
                  value={costDetails.destinationDoorDelivery}
                  onChange={(e) => setCostDetails({...costDetails, destinationDoorDelivery: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">OTHER:</label>
                <Input
                  type="number"
                  value={costDetails.other}
                  onChange={(e) => setCostDetails({...costDetails, other: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GROSS:</label>
                <Input
                  type="number"
                  value={costDetails.gross}
                  onChange={(e) => setCostDetails({...costDetails, gross: e.target.value})}
                  placeholder="1129"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DISCOUNT:</label>
                <Input
                  type="number"
                  value={costDetails.discount}
                  onChange={(e) => setCostDetails({...costDetails, discount: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">NET:</label>
                <Input
                  type="number"
                  value={costDetails.net}
                  onChange={(e) => setCostDetails({...costDetails, net: e.target.value})}
                  placeholder="1129"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">AGENT NAME:</label>
                <Input
                  value={formData.agentName}
                  onChange={(e) => setFormData({...formData, agentName: e.target.value})}
                  placeholder="Agent name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">AGENT NUMBER:</label>
                <Input
                  type="number"
                  value={formData.agentNumber}
                  onChange={(e) => setFormData({...formData, agentNumber: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">INVOICE NUMBER:</label>
                <Input
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                  placeholder="13138223"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">INVOICE DATE:</label>
                <Input
                  value={formData.invoiceDate}
                  onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
                  placeholder="20/07/2025"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">BRANCH:</label>
                <Input value="MASSAWA" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SECTOR:</label>
                <Input value="M" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WAREHOUSE:</label>
                <Input value="Massawa" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">FREIGHT BY:</label>
                <Input value="S" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">VOLUME:</label>
                <Input value="2.85" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WEIGHT:</label>
                <Input value="420.50" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PACKAGES:</label>
                <Input value="2" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DOOR TO DOOR:</label>
                <Input value="No" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CAT/ ZONE:</label>
                <Input value="Normal Rate" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DISTRICT:</label>
                <Select defaultValue="MASSAWA_M">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MASSAWA_M">MASSAWA · M</SelectItem>
                    <SelectItem value="ASSAB_A">ASSAB · A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SUB ZONE:</label>
                <Select defaultValue="1_Massawa">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1_Massawa">1 - Massawa</SelectItem>
                    <SelectItem value="2_Assab">2 - Assab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">REMARKS:</label>
                <Textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  placeholder="Enter remarks"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPage3 = () => (
    <div className="space-y-6">
      {/* Shipping Details */}
      <Card>
        <CardHeader className="bg-blue-500 text-white">
          <CardTitle>SHIPPING DETAILS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipper Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Shipper Information</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">HAND-OVER BY:</label>
                <Input
                  value={shippingDetails.handOverBy}
                  onChange={(e) => setShippingDetails({...shippingDetails, handOverBy: e.target.value})}
                  placeholder="GAYASHAN"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SHIPPER 1:</label>
                <Input
                  value={shippingDetails.shipper1}
                  onChange={(e) => setShippingDetails({...shippingDetails, shipper1: e.target.value})}
                  placeholder="AHMED HASSAN M"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SHIPPER 2:</label>
                <Input
                  value={shippingDetails.shipper2}
                  onChange={(e) => setShippingDetails({...shippingDetails, shipper2: e.target.value})}
                  placeholder="-"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ADDRESS:</label>
                <Textarea
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                  placeholder="-"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">POST CODE:</label>
                <Input
                  value={shippingDetails.postCode}
                  onChange={(e) => setShippingDetails({...shippingDetails, postCode: e.target.value})}
                  placeholder="-"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CITY:</label>
                <Select value={shippingDetails.city} onValueChange={(value) => setShippingDetails({...shippingDetails, city: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="MASSAWA · 171" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MASSAWA_171">MASSAWA · 171</SelectItem>
                    <SelectItem value="ASSAB_172">ASSAB · 172</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">TOWN:</label>
                <Input
                  value={shippingDetails.town}
                  onChange={(e) => setShippingDetails({...shippingDetails, town: e.target.value})}
                  placeholder="INDUSTRIAL AREA 38"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">COUNTRY:</label>
                <Input
                  value={shippingDetails.country}
                  onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})}
                  placeholder="ERITREA"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">MOBILE:</label>
                <Input
                  value={shippingDetails.mobile}
                  onChange={(e) => setShippingDetails({...shippingDetails, mobile: e.target.value})}
                  placeholder="33456762"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LAND PHONE:</label>
                <Input
                  value={shippingDetails.landPhone}
                  onChange={(e) => setShippingDetails({...shippingDetails, landPhone: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PASSPORT /NIC:</label>
                <Input
                  value={shippingDetails.passportNic}
                  onChange={(e) => setShippingDetails({...shippingDetails, passportNic: e.target.value})}
                  placeholder="ER8840923"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">EMAIL:</label>
                <Input
                  type="email"
                  value={shippingDetails.email}
                  onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                  placeholder="-"
                />
              </div>
            </div>

            {/* Consignee Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Consignee Information</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">CONSIGNEE 1:</label>
                <Input
                  value={shippingDetails.consignee1}
                  onChange={(e) => setShippingDetails({...shippingDetails, consignee1: e.target.value})}
                  placeholder="AHMED HASSAN M"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CONSIGNEE 2:</label>
                <Input
                  value={shippingDetails.consignee2}
                  onChange={(e) => setShippingDetails({...shippingDetails, consignee2: e.target.value})}
                  placeholder="-"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ADDRESS:</label>
                <Textarea
                  value={shippingDetails.consigneeAddress}
                  onChange={(e) => setShippingDetails({...shippingDetails, consigneeAddress: e.target.value})}
                  placeholder="NO 250/B MAHA"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">TOWN:</label>
                <Input
                  value={shippingDetails.consigneeTown}
                  onChange={(e) => setShippingDetails({...shippingDetails, consigneeTown: e.target.value})}
                  placeholder="GINTOTA"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">COUNTRY:</label>
                <Input
                  value={shippingDetails.consigneeCountry}
                  onChange={(e) => setShippingDetails({...shippingDetails, consigneeCountry: e.target.value})}
                  placeholder="SRI LANKA"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">MOBILE:</label>
                <Input
                  value={shippingDetails.consigneeMobile}
                  onChange={(e) => setShippingDetails({...shippingDetails, consigneeMobile: e.target.value})}
                  placeholder="771016525"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LAND PHONE:</label>
                <Input
                  value={shippingDetails.consigneeLandPhone}
                  onChange={(e) => setShippingDetails({...shippingDetails, consigneeLandPhone: e.target.value})}
                  placeholder="774265836"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PASSPORT /NIC:</label>
                <Input
                  value={shippingDetails.consigneePassportNic}
                  onChange={(e) => setShippingDetails({...shippingDetails, consigneePassportNic: e.target.value})}
                  placeholder="ER8840923"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">EMAIL:</label>
                <Input
                  type="email"
                  value={shippingDetails.consigneeEmail}
                  onChange={(e) => setShippingDetails({...shippingDetails, consigneeEmail: e.target.value})}
                  placeholder="-"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Package Details Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 hover:bg-blue-500">
                  <TableHead className="text-white">Num</TableHead>
                  <TableHead className="text-white">PACKAGE</TableHead>
                  <TableHead className="text-white">LENGTH</TableHead>
                  <TableHead className="text-white">WIDTH</TableHead>
                  <TableHead className="text-white">HEIGHT</TableHead>
                  <TableHead className="text-white">VOLUME</TableHead>
                  <TableHead className="text-white">WEIGHT</TableHead>
                  <TableHead className="text-white">BOX Num</TableHead>
                  <TableHead className="text-white">VOL_WGHT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>WOODEN BOX (P/E)</TableCell>
                  <TableCell>63</TableCell>
                  <TableCell>37</TableCell>
                  <TableCell>44</TableCell>
                  <TableCell>1.72</TableCell>
                  <TableCell>309.6</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>WASHING MACHINE (P/E)</TableCell>
                  <TableCell>29</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>44</TableCell>
                  <TableCell>0.535</TableCell>
                  <TableCell>96.3</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>REFRIGERATOR (P/E)</TableCell>
                  <TableCell>29</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>69</TableCell>
                  <TableCell>0.839</TableCell>
                  <TableCell>151.02</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Layout title="Add New Invoice - Eritrea">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded"></div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Invoice - Eritrea</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">{currentPage}ND PAGE</span>
          </div>
        </div>

        {/* Page Content */}
        {currentPage === 1 && renderPage1()}
        {currentPage === 2 && renderPage2()}
        {currentPage === 3 && renderPage3()}

        {/* Navigation Controls */}
        <div className="flex justify-between items-center pt-6">
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            {currentPage < 3 && (
              <Button onClick={() => setCurrentPage(currentPage + 1)}>
                Next Page
              </Button>
            )}
          </div>
        </div>
      </div>

      <EritreaInvoicePreview
        formData={formData}
        packageDetails={packageDetails}
        shippingDetails={shippingDetails}
        costDetails={costDetails}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onPrint={handlePrintFromPreview}
      />
    </Layout>
  );
};

export default EritreaInvoiceForm;