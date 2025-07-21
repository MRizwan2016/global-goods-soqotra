import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Eye, Printer } from "lucide-react";
import { useInvoiceNumberSelector } from "@/pages/invoicing/hooks/useInvoiceNumberSelector";
import InvoiceNumberSelector from "@/pages/invoicing/components/basic-information/InvoiceNumberSelector";
import UPBIntegrationCard from "./UPBIntegrationCard";

interface UniversalInvoiceFormProps {
  countryName: string;
  countryCode: string;
  backPath: string;
  printPath: string;
  flagColors: string; // CSS gradient classes for flag
  sectorOptions?: Array<{value: string, label: string}>;
  branchOptions?: Array<{value: string, label: string}>;
  warehouseOptions?: Array<{value: string, label: string}>;
  salesRepOptions?: Array<{value: string, label: string}>;
  driverOptions?: Array<{value: string, label: string}>;
}

const UniversalInvoiceFormWithUPB: React.FC<UniversalInvoiceFormProps> = ({
  countryName,
  countryCode,
  backPath,
  printPath,
  flagColors,
  sectorOptions = [],
  branchOptions = [],
  warehouseOptions = [],
  salesRepOptions = [],
  driverOptions = []
}) => {
  const navigate = useNavigate();
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

  // Invoice number selector hook for UPB integration
  const handleSelectInvoice = (invoiceNumber: string) => {
    setFormData(prev => ({ ...prev, invoiceNumber }));
  };
  
  const {
    activeInvoiceUser,
    isDuplicate,
    availableInvoiceList,
    bookActivationStatus,
    driverName,
    bookAssignedUser
  } = useInvoiceNumberSelector({
    formState: formData,
    isEditing: false,
    handleSelectInvoice
  });

  const handleGoBack = () => {
    navigate(backPath);
  };

  const handleSave = () => {
    console.log("Saving invoice data:", formData);
    navigate(backPath);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handlePrint = () => {
    const invoiceData = { formData };
    navigate(`${printPath}/${formData.invoiceNumber || countryCode + Date.now()}`, {
      state: { invoiceData }
    });
  };

  return (
    <Layout title={`Add New Invoice - ${countryName}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-8 ${flagColors} rounded`}></div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Invoice - {countryName}</h1>
            </div>
          </div>
        </div>

        {/* Basic Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details - UPB Integrated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sectorOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">SECTOR:</label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {branchOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">BRANCH:</label>
                  <Select value={formData.branch} onValueChange={(value) => setFormData({...formData, branch: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branchOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {warehouseOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">WAREHOUSE:</label>
                  <Select value={formData.warehouse} onValueChange={(value) => setFormData({...formData, warehouse: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouseOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {salesRepOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">SALES REP:</label>
                  <Select value={formData.salesRep} onValueChange={(value) => setFormData({...formData, salesRep: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sales Rep" />
                    </SelectTrigger>
                    <SelectContent>
                      {salesRepOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {driverOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">DRIVER:</label>
                  <Select value={formData.driver} onValueChange={(value) => setFormData({...formData, driver: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {driverOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

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

              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">INVOICE NUMBER (UPB INTEGRATED):</label>
                <InvoiceNumberSelector
                  formState={formData}
                  handleInputChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                  showInvoiceSelector={true}
                  setShowInvoiceSelector={() => {}}
                  availableInvoices={availableInvoiceList}
                  handleSelectInvoice={handleSelectInvoice}
                  isEditing={false}
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

        {/* UPB Integration Status Card */}
        {formData.invoiceNumber && (
          <Card>
            <CardContent className="pt-6">
              <UPBIntegrationCard
                activationStatus={bookActivationStatus}
                userName={bookAssignedUser}
                driverName={driverName}
                invoiceNumber={formData.invoiceNumber}
              />
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6">
          <div />
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UniversalInvoiceFormWithUPB;