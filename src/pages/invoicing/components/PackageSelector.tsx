
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { PackageOption } from "@/data/packageOptions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface PackageSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  packageOptions: PackageOption[];
  handlePackageSelect: (description: string) => void;
  handleManualPackage?: (packageName: string, price: string) => void;
  handleAddPackage: () => void;
}

const PackageSelector: React.FC<PackageSelectorProps> = ({
  formState,
  handleInputChange,
  packageOptions,
  handlePackageSelect,
  handleManualPackage,
  handleAddPackage,
}) => {
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [manualPackageName, setManualPackageName] = useState("");
  const [manualPrice, setManualPrice] = useState("");

  const submitManualPackage = () => {
    if (handleManualPackage) {
      handleManualPackage(manualPackageName, manualPrice);
      setShowManualDialog(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">PACKAGES NAME:</label>
        <div className="flex gap-2">
          <Select 
            onValueChange={handlePackageSelect}
            value={formState.packagesName || ""}
          >
            <SelectTrigger className="bg-blue-500 text-white py-2 px-3 rounded text-sm w-full">
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {packageOptions.map(pkg => (
                <SelectItem key={pkg.id} value={pkg.description}>
                  {pkg.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => setShowManualDialog(true)}
            className="flex-shrink-0"
          >
            <Edit size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">PRICE:</label>
        <Input 
          name="price"
          value={formState.price}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">DOCUMENTS FEE:</label>
        <Input 
          name="documentsFee"
          value={formState.documentsFee}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">TOTAL:</label>
        <Input 
          name="total"
          value={formState.total}
          readOnly
          className="border border-gray-300 bg-gray-50 font-bold"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">CUBIC METRE:</label>
        <Input 
          name="cubicMetre"
          value={formState.cubicMetre}
          onChange={handleInputChange}
          className="border border-gray-300"
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
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">VOLUME WEIGHT:</label>
        <Input 
          name="volumeWeight"
          value={formState.volumeWeight}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="md:col-span-1 flex items-end">
        <Button
          type="button"
          onClick={handleAddPackage}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 w-full"
        >
          <Plus size={18} className="mr-2" />
          Add Package
        </Button>
      </div>

      {/* Manual Package Dialog */}
      <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Package Details Manually</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Package Name:</label>
              <Input 
                value={manualPackageName}
                onChange={(e) => setManualPackageName(e.target.value)}
                placeholder="Enter package name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Price:</label>
              <Input 
                value={manualPrice}
                onChange={(e) => setManualPrice(e.target.value)}
                placeholder="Enter price"
                type="number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowManualDialog(false)}>Cancel</Button>
            <Button onClick={submitManualPackage}>Save Package</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackageSelector;
