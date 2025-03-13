
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PackageOption } from "@/data/packageOptions";

interface PackageSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  packageOptions: PackageOption[];
  handlePackageSelect: (description: string) => void;
  handleAddPackage: () => void;
}

const PackageSelector: React.FC<PackageSelectorProps> = ({
  formState,
  handleInputChange,
  packageOptions,
  handlePackageSelect,
  handleAddPackage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">PACKAGES NAME:</label>
        <select
          name="packagesName"
          value={formState.packagesName}
          onChange={(e) => handlePackageSelect(e.target.value)}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="">Select a package</option>
          {packageOptions.map(pkg => (
            <option key={pkg.id} value={pkg.description}>
              {pkg.description}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">PRICE:</label>
        <Input 
          name="price"
          value={formState.price}
          readOnly
          className="border border-gray-300 bg-gray-50"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">DOCUMENTS FEE:</label>
        <Input 
          name="documentsFee"
          value={formState.documentsFee}
          readOnly
          className="border border-gray-300 bg-gray-50"
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
    </div>
  );
};

export default PackageSelector;
