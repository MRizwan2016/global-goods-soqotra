import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BasicInformationProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: (show: boolean) => void;
  availableInvoices: any[];
  handleSelectInvoice: (invoiceNumber: string) => void;
  isEditing: boolean;
  countrySectorMap: { [key: string]: string };
}

const BasicInformation = ({
  formState,
  handleInputChange,
  handleSelectChange,
  showInvoiceSelector,
  setShowInvoiceSelector,
  availableInvoices,
  handleSelectInvoice,
  isEditing,
  countrySectorMap
}: BasicInformationProps) => {
  const [activeInvoiceUser, setActiveInvoiceUser] = useState<string>("");
  
  useEffect(() => {
    if (formState.invoiceNumber) {
      // Check active books to find the user for this invoice
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const bookWithInvoice = activeBooks.find((book: any) => 
        book.availablePages.includes(formState.invoiceNumber)
      );
      
      if (bookWithInvoice) {
        setActiveInvoiceUser(bookWithInvoice.assignedTo);
      }
    }
  }, [formState.invoiceNumber]);

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold">Basic Information</h2>
      <p className="text-sm text-gray-500">Enter the basic details for this invoice.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Invoice Number</Label>
          <div className="flex gap-2 items-center">
            <Input
              name="invoiceNumber"
              value={formState.invoiceNumber}
              onChange={handleInputChange}
              className="w-full"
              readOnly={isEditing}
              onClick={() => !isEditing && setShowInvoiceSelector(true)}
            />
            {activeInvoiceUser && (
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {activeInvoiceUser}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Sector</Label>
          <Input
            name="sector"
            value={formState.sector}
            onChange={handleInputChange}
            className="w-full"
            readOnly
          />
        </div>
        
        <div className="space-y-2">
          <Label>Branch</Label>
          <Input
            name="branch"
            value={formState.branch}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Warehouse</Label>
          <Input
            name="warehouse"
            value={formState.warehouse}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Sales Rep</Label>
          <Input
            name="salesRep"
            value={formState.salesRep}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Door to Door</Label>
          <Select onValueChange={(value) => handleSelectChange("doorToDoor", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formState.doorToDoor || "Select"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YES">YES</SelectItem>
              <SelectItem value="NO">NO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Driver</Label>
          <Input
            name="driver"
            value={formState.driver}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>District</Label>
          <Input
            name="district"
            value={formState.district}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Volume</Label>
          <Input
            name="volume"
            value={formState.volume}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Cat Zone</Label>
          <Input
            name="catZone"
            value={formState.catZone}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Weight</Label>
          <Input
            name="weight"
            value={formState.weight}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Freight By</Label>
          <Select onValueChange={(value) => handleSelectChange("freightBy", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formState.freightBy || "Select"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SEA">SEA</SelectItem>
              <SelectItem value="AIR">AIR</SelectItem>
              <SelectItem value="LAND">LAND</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Packages</Label>
          <Input
            name="packages"
            value={formState.packages}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Remarks</Label>
          <Input
            name="remarks"
            value={formState.remarks}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Invoice Date</Label>
          <Input
            name="invoiceDate"
            type="date"
            value={formState.invoiceDate}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Gift Cargo</Label>
          <Select onValueChange={(value) => handleSelectChange("giftCargo", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formState.giftCargo || "Select"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YES">YES</SelectItem>
              <SelectItem value="NO">NO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Pre Paid</Label>
          <Select onValueChange={(value) => handleSelectChange("prePaid", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formState.prePaid || "Select"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YES">YES</SelectItem>
              <SelectItem value="NO">NO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Country</Label>
          <Select onValueChange={(value) => handleSelectChange("country", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formState.country || "Select a country"} />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(countrySectorMap).map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Dialog open={showInvoiceSelector} onOpenChange={setShowInvoiceSelector}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Invoice Number</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {availableInvoices.map(invoice => (
              <Button 
                key={invoice.invoiceNumber}
                variant="outline"
                onClick={() => handleSelectInvoice(invoice.invoiceNumber)}
              >
                {invoice.invoiceNumber} (Book {invoice.bookNumber})
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BasicInformation;
