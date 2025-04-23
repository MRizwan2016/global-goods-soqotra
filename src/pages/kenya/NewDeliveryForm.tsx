
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useDeliveryForm } from "./hooks/useDeliveryForm";
import FormActions from "./components/FormActions";
import FormHeader from "./components/FormHeader";
import DeliveryFormContent from "./components/delivery-form/DeliveryFormContent";
import { toast } from "sonner";

const NewDeliveryForm = () => {
  const navigate = useNavigate();
  const { formState, handleInputChange, handleCheckboxChange, handleSelectChange, handleSubmit } = useDeliveryForm(navigate);
  
  return (
    <Layout title="New Delivery">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="mb-4 flex justify-between items-center">
          <BackButton to="/kenya/deliveries" />
          <h2 className="text-xl font-bold">Create New Delivery</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GY Invoice Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">GY Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={formState.invoiceNumber}
                    onChange={handleInputChange}
                    placeholder="Enter GY invoice number"
                  />
                </div>
                <div>
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input
                    id="invoiceDate"
                    name="invoiceDate"
                    type="date"
                    value={formState.invoiceDate || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senderName">Shipper Name</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    value={formState.senderName}
                    onChange={handleInputChange}
                    placeholder="Enter shipper name"
                  />
                </div>
                <div>
                  <Label htmlFor="senderContact">Telephone Number</Label>
                  <Input
                    id="senderContact"
                    name="senderContact"
                    value={formState.senderContact}
                    onChange={handleInputChange}
                    placeholder="Enter telephone number"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="senderAddress">Address</Label>
                <Textarea
                  id="senderAddress"
                  name="senderAddress"
                  value={formState.senderAddress}
                  onChange={handleInputChange}
                  placeholder="Enter shipper address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="loadingDate">Date of Loading</Label>
                  <Input
                    id="loadingDate"
                    name="loadingDate"
                    type="date"
                    value={formState.loadingDate || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="packages">Number of Packages Loaded</Label>
                  <Input
                    id="packages"
                    name="packages"
                    type="number"
                    value={formState.packages}
                    onChange={handleInputChange}
                    placeholder="Enter number of packages"
                  />
                </div>
                <div>
                  <Label htmlFor="destinationWarehouse">Delivery Destination</Label>
                  <select
                    id="destinationWarehouse"
                    name="destinationWarehouse"
                    value={formState.destinationWarehouse}
                    onChange={(e) => handleSelectChange("destinationWarehouse", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Nairobi CFS">Nairobi CFS</option>
                    <option value="Customer Direct">Customer Direct</option>
                  </select>
                </div>
              </div>
              
              <Card className="border-dashed">
                <CardHeader className="py-2">
                  <CardTitle className="text-sm">Consignee Information</CardTitle>
                </CardHeader>
                <CardContent className="py-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="receiverName">Consignee Name</Label>
                      <Input
                        id="receiverName"
                        name="receiverName"
                        value={formState.receiverName}
                        onChange={handleInputChange}
                        placeholder="Enter consignee name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="receiverContact">Contact Number</Label>
                      <Input
                        id="receiverContact"
                        name="receiverContact"
                        value={formState.receiverContact}
                        onChange={handleInputChange}
                        placeholder="Enter consignee contact"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="receiverAddress">Consignee Address</Label>
                    <Textarea
                      id="receiverAddress"
                      name="receiverAddress"
                      value={formState.receiverAddress}
                      onChange={handleInputChange}
                      placeholder="Enter consignee address"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="receiveDate">Date Received from Mombasa CFS</Label>
                      <Input
                        id="receiveDate"
                        name="receiveDate"
                        type="date"
                        value={formState.receiveDate || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryDate">Date of Loading for Delivery</Label>
                      <Input
                        id="deliveryDate"
                        name="deliveryDate"
                        type="date"
                        value={formState.deliveryDate || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          
          <FormActions onSubmit={handleSubmit} />
        </form>
      </div>
    </Layout>
  );
};

export default NewDeliveryForm;
