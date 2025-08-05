import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const BillOfLadingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing] = useState(!!id);

  const [blData, setBLData] = useState({
    blNumber: "",
    jobNumber: "",
    shipperName: "",
    shipperMobile: "",
    consigneeName: "",
    consigneeMobile: "",
    deliveryAgentName: "",
    cargoDescription: "",
    grossWeight: "",
    packagesNumber: ""
  });

  useEffect(() => {
    if (!isEditing && !blData.blNumber) {
      const timestamp = Date.now();
      const blNumber = `BL${timestamp.toString().slice(-8)}`;
      setBLData(prev => ({ ...prev, blNumber }));
    }
  }, [isEditing]);

  // Auto-populate job number when mobile is entered
  useEffect(() => {
    if (blData.shipperMobile && blData.shipperMobile.length >= 10) {
      const eritreaInvoices = JSON.parse(localStorage.getItem('eritreaInvoices') || '[]');
      const customerFound = eritreaInvoices.find((inv: any) => 
        inv.shipperMobile === blData.shipperMobile || inv.consigneeMobile === blData.shipperMobile
      );

      if (customerFound) {
        setBLData(prev => ({
          ...prev,
          jobNumber: customerFound.jobNumber || customerFound.invoiceNumber || "",
          shipperName: customerFound.shipperName || "",
          consigneeName: customerFound.consigneeName || ""
        }));
        toast.success("Customer details loaded from invoice records");
      }
    }
  }, [blData.shipperMobile]);

  const handleSave = async () => {
    try {
      if (!blData.blNumber || !blData.shipperName || !blData.consigneeName) {
        toast.error("BL Number, Shipper name, and Consignee name are required");
        return;
      }

      const blRecord = {
        ...blData,
        id: blData.blNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const existingBLs = JSON.parse(localStorage.getItem('billsOfLading') || '[]');
      existingBLs.push(blRecord);
      localStorage.setItem('billsOfLading', JSON.stringify(existingBLs));
      
      toast.success("Bill of Lading created successfully");
      navigate("/bill-of-lading");
    } catch (error) {
      console.error("Error saving Bill of Lading:", error);
      toast.error("Failed to save Bill of Lading");
    }
  };

  return (
    <Layout title="House Bill of Lading">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Create House Bill of Lading</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/bill-of-lading")}>Back</Button>
            <Button onClick={handleSave}>Create BL</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>BL Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>BL Number (Auto-generated)</Label>
                <Input value={blData.blNumber} readOnly />
              </div>
              <div>
                <Label>Job Number</Label>
                <Input
                  value={blData.jobNumber}
                  onChange={(e) => setBLData(prev => ({ ...prev, jobNumber: e.target.value }))}
                  placeholder="Auto-populated from mobile"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipper Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Shipper Name *</Label>
              <Input
                value={blData.shipperName}
                onChange={(e) => setBLData(prev => ({ ...prev, shipperName: e.target.value }))}
              />
            </div>
            <div>
              <Label>Shipper Mobile (for auto-filling) *</Label>
              <Input
                value={blData.shipperMobile}
                onChange={(e) => setBLData(prev => ({ ...prev, shipperMobile: e.target.value }))}
                placeholder="Enter mobile to auto-fill job number"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consignee Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Consignee Name *</Label>
              <Input
                value={blData.consigneeName}
                onChange={(e) => setBLData(prev => ({ ...prev, consigneeName: e.target.value }))}
              />
            </div>
            <div>
              <Label>Consignee Mobile</Label>
              <Input
                value={blData.consigneeMobile}
                onChange={(e) => setBLData(prev => ({ ...prev, consigneeMobile: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Agent (Leave blank for destination update)</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Agent Name</Label>
              <Input
                value={blData.deliveryAgentName}
                onChange={(e) => setBLData(prev => ({ ...prev, deliveryAgentName: e.target.value }))}
                placeholder="To be updated at destination"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cargo Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Description of Goods</Label>
              <Textarea
                value={blData.cargoDescription}
                onChange={(e) => setBLData(prev => ({ ...prev, cargoDescription: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Number of Packages</Label>
                <Input
                  value={blData.packagesNumber}
                  onChange={(e) => setBLData(prev => ({ ...prev, packagesNumber: e.target.value }))}
                />
              </div>
              <div>
                <Label>Gross Weight</Label>
                <Input
                  value={blData.grossWeight}
                  onChange={(e) => setBLData(prev => ({ ...prev, grossWeight: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BillOfLadingForm;