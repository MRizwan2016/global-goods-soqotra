
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SalesRepForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    employeeNumber: "",
    operation: "UPB - SYSTEM",
    available: "Y"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    
    if (!formData.employeeNumber.trim()) {
      toast.error("Please enter an employee number");
      return;
    }
    
    toast.success("Sales representative added successfully");
    navigate("/master/sales-rep");
  };
  
  return (
    <Layout title="Add Sales Representative">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            Add Sales Representative
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 max-w-3xl">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">NAME:</label>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-green-400"
                placeholder="Enter name"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">EMPLOYEE NUMBER:</label>
              <Input 
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-green-400"
                placeholder="Enter employee number"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">OPERATION:</label>
              <select
                name="operation"
                value={formData.operation}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="UPB - SYSTEM">UPB - SYSTEM</option>
                <option value="ICG">ICG</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">AVAILABLE:</label>
              <select
                name="available"
                value={formData.available}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 transition-colors hover:scale-105 transform duration-200"
            >
              Save
            </Button>
            <Button 
              onClick={() => navigate("/master/sales-rep")}
              variant="outline"
              className="border-gray-300 transition-colors hover:border-blue-400"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesRepForm;
