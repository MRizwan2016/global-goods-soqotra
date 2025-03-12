
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { packageOptions, PackageOption } from "@/data/packageOptions";

const PackageOptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const existingPackage = isEditing 
    ? packageOptions.find(pkg => pkg.id === Number(id)) 
    : null;
    
  const [formState, setFormState] = useState({
    description: existingPackage?.description || "",
    length: existingPackage?.dimensions.length.toString() || "",
    width: existingPackage?.dimensions.width.toString() || "",
    height: existingPackage?.dimensions.height.toString() || "",
    price: existingPackage?.price.toString() || "",
    documentsFee: existingPackage?.documentsFee.toString() || "",
  });
  
  const [volumeInMeters, setVolumeInMeters] = useState(existingPackage?.volumeInMeters.toString() || "0");
  const [total, setTotal] = useState(existingPackage?.total.toString() || "0");
  
  useEffect(() => {
    // Calculate volume in cubic meters when dimensions change
    const length = parseFloat(formState.length) || 0;
    const width = parseFloat(formState.width) || 0;
    const height = parseFloat(formState.height) || 0;
    
    // Convert from inches to meters and calculate volume
    const volumeInches = length * width * height;
    const volumeMeters = volumeInches * 0.000016387064; // Convert cubic inches to cubic meters
    
    setVolumeInMeters(volumeMeters.toFixed(3));
    
    // Calculate total
    const price = parseFloat(formState.price) || 0;
    const documentsFee = parseFloat(formState.documentsFee) || 0;
    setTotal((price + documentsFee).toFixed(2));
  }, [formState]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // Validation
    if (!formState.description) {
      toast.error("Description is required");
      return;
    }
    
    if (!formState.length || !formState.width || !formState.height) {
      toast.error("All dimensions are required");
      return;
    }
    
    if (!formState.price) {
      toast.error("Price is required");
      return;
    }
    
    // In a real app, this would make an API call to save the data
    toast.success(`Package option ${isEditing ? "updated" : "added"} successfully (Simulated)`);
    console.log("Saving package option:", {
      ...formState,
      volumeInMeters,
      total,
    });
    
    navigate("/master/package-options");
  };
  
  return (
    <Layout title={isEditing ? "Edit Package Option" : "Add Package Option"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            {isEditing ? "Edit Package Option" : "Add Package Option"}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Description:</label>
              <Input 
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="e.g., 1 METER WOODEN BOX"
              />
            </div>
            
            <div className="flex flex-col md:col-span-2">
              <h4 className="font-medium text-gray-700 mb-2">Dimensions</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Length (inches):</label>
                  <Input 
                    name="length"
                    value={formState.length}
                    onChange={handleInputChange}
                    type="number"
                    className="border border-gray-300"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Width (inches):</label>
                  <Input 
                    name="width"
                    value={formState.width}
                    onChange={handleInputChange}
                    type="number"
                    className="border border-gray-300"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Height (inches):</label>
                  <Input 
                    name="height"
                    value={formState.height}
                    onChange={handleInputChange}
                    type="number"
                    className="border border-gray-300"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Volume (cubic meters):</label>
              <Input 
                value={volumeInMeters}
                readOnly
                className="border border-gray-300 bg-gray-50"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Price:</label>
              <Input 
                name="price"
                value={formState.price}
                onChange={handleInputChange}
                type="number"
                step="0.01"
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Documents Fee:</label>
              <Input 
                name="documentsFee"
                value={formState.documentsFee}
                onChange={handleInputChange}
                type="number"
                step="0.01"
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Total:</label>
              <Input 
                value={total}
                readOnly
                className="border border-gray-300 bg-gray-50 font-bold"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-4">
            <Button 
              type="button"
              onClick={() => navigate("/master/package-options")}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600"
            >
              {isEditing ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PackageOptionForm;
