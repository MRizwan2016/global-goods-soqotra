
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const SalesRepForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id || `sales-rep-${Date.now()}`,
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
    
    try {
      // Save to localStorage for persistence
      const existingSalesReps = JSON.parse(localStorage.getItem('salesReps') || '[]');
      
      if (id) {
        // Update existing
        const index = existingSalesReps.findIndex((rep: any) => rep.id === id);
        if (index !== -1) {
          existingSalesReps[index] = formData;
        } else {
          existingSalesReps.push(formData);
        }
      } else {
        // Add new
        existingSalesReps.push(formData);
      }
      
      localStorage.setItem('salesReps', JSON.stringify(existingSalesReps));
      toast.success("Sales representative saved successfully");
      navigate("/master/salesrep/list");
    } catch (error) {
      console.error("Error saving sales rep:", error);
      toast.error("Failed to save sales representative");
    }
  };
  
  return (
    <Layout title="Add Sales Representative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in"
      >
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800 flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-green-700" />
            {id ? "Update" : "Add"} Sales Representative
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 max-w-3xl">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label className="text-sm font-medium mb-1">NAME:</label>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-green-400"
                placeholder="Enter name"
              />
            </motion.div>
            
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-sm font-medium mb-1">EMPLOYEE NUMBER:</label>
              <Input 
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-green-400"
                placeholder="Enter employee number"
              />
            </motion.div>
            
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
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
            </motion.div>
            
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 transition-colors hover:scale-105 transform duration-200 flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button 
              onClick={() => navigate("/master/salesrep/list")}
              variant="outline"
              className="border-gray-300 transition-colors hover:border-green-400 flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SalesRepForm;
