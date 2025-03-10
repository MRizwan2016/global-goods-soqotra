
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SectionHeader } from "./FormFields";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow,
  InvoiceTableHead,
  InvoiceTableCell
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

interface PackageDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  packageItems: any[];
  setPackageItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const PackageDetails = ({ 
  formState, 
  handleInputChange, 
  packageItems, 
  setPackageItems 
}: PackageDetailsProps) => {

  const handleAddPackage = () => {
    if (!formState.packagesName || !formState.length || !formState.width || !formState.height) {
      toast.error("Please fill all package details");
      return;
    }
    
    const newPackage = {
      id: Date.now().toString(),
      name: formState.packagesName,
      length: formState.length,
      width: formState.width,
      height: formState.height,
      volume: (
        parseFloat(formState.length) * 
        parseFloat(formState.width) * 
        parseFloat(formState.height) / 1000000
      ).toFixed(3),
      weight: formState.packageWeight,
      boxNumber: formState.boxNumber,
      volumeWeight: formState.volumeWeight,
    };
    
    setPackageItems([...packageItems, newPackage]);
    
    // Reset package form fields
    const resetEvent = {
      target: {
        name: "packagesName",
        value: ""
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(resetEvent);
    
    // Reset other package form fields
    ["length", "width", "height"].forEach(field => {
      const resetFieldEvent = {
        target: {
          name: field,
          value: ""
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(resetFieldEvent);
    });
    
    ["packageWeight", "boxNumber", "volumeWeight"].forEach(field => {
      const resetFieldEvent = {
        target: {
          name: field,
          value: "0"
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(resetFieldEvent);
    });
  };
  
  const handleRemovePackage = (id: string) => {
    setPackageItems(packageItems.filter(item => item.id !== id));
  };

  return (
    <div className="mt-8">
      <SectionHeader title="PACKAGES DETAILS" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">PACKAGES NAME:</label>
          <Input 
            name="packagesName"
            value={formState.packagesName}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">CUBIC METRE:</label>
          <Input 
            name="cubicMetre"
            value={formState.cubicMetre}
            onChange={handleInputChange}
            className="border border-gray-300"
            readOnly
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">LENGTH:</label>
          <Input 
            name="length"
            value={formState.length}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">CUBIC FEET:</label>
          <Input 
            name="cubicFeet"
            value={formState.cubicFeet}
            onChange={handleInputChange}
            className="border border-gray-300"
            readOnly
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">WIDTH:</label>
          <Input 
            name="width"
            value={formState.width}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">WEIGHT:</label>
          <Input 
            name="packageWeight"
            value={formState.packageWeight}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">HEIGHT:</label>
          <Input 
            name="height"
            value={formState.height}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">BOX NUMBER:</label>
          <Input 
            name="boxNumber"
            value={formState.boxNumber}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex items-end">
          <Button 
            onClick={handleAddPackage}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Insert
          </Button>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">VOLUME WEIGHT:</label>
          <Input 
            name="volumeWeight"
            value={formState.volumeWeight}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto border border-gray-200 mb-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-soqotra-blue hover:bg-soqotra-blue">
              <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
              <InvoiceTableHead>PACKAGE</InvoiceTableHead>
              <InvoiceTableHead>LENGTH</InvoiceTableHead>
              <InvoiceTableHead>WIDTH</InvoiceTableHead>
              <InvoiceTableHead>HEIGHT</InvoiceTableHead>
              <InvoiceTableHead>VOLUME</InvoiceTableHead>
              <InvoiceTableHead>WEIGHT</InvoiceTableHead>
              <InvoiceTableHead>BOX Num</InvoiceTableHead>
              <InvoiceTableHead>VOL. WGHT</InvoiceTableHead>
              <InvoiceTableHead className="w-16">MODIFY</InvoiceTableHead>
              <InvoiceTableHead className="w-16">REMOVE</InvoiceTableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packageItems.length > 0 ? (
              packageItems.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <InvoiceTableCell className="text-center">{index + 1}</InvoiceTableCell>
                  <InvoiceTableCell>{item.name}</InvoiceTableCell>
                  <InvoiceTableCell className="text-right">{item.length}</InvoiceTableCell>
                  <InvoiceTableCell className="text-right">{item.width}</InvoiceTableCell>
                  <InvoiceTableCell className="text-right">{item.height}</InvoiceTableCell>
                  <InvoiceTableCell className="text-right">{item.volume}</InvoiceTableCell>
                  <InvoiceTableCell className="text-right">{item.weight}</InvoiceTableCell>
                  <InvoiceTableCell className="text-center">{item.boxNumber}</InvoiceTableCell>
                  <InvoiceTableCell className="text-right">{item.volumeWeight}</InvoiceTableCell>
                  <InvoiceTableCell className="text-center">
                    <Edit size={16} className="text-blue-500 inline-block cursor-pointer" />
                  </InvoiceTableCell>
                  <InvoiceTableCell className="text-center">
                    <Trash 
                      size={16} 
                      className="text-red-500 inline-block cursor-pointer"
                      onClick={() => handleRemovePackage(item.id)}
                    />
                  </InvoiceTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <InvoiceTableCell colSpan={11} className="text-center py-4">
                  No packages added yet
                </InvoiceTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PackageDetails;
