
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TownForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "DOHA",
    townName: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    if (!formData.townName.trim()) {
      toast.error("Please enter a town name");
      return;
    }
    
    toast.success("Town added successfully");
    navigate("/master/town");
  };
  
  return (
    <Layout title="Add Town">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            Add Town
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 max-w-3xl">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">CITY:</label>
              <select 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-blue-500 bg-blue-500 text-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="DOHA">DOHA : 171</option>
                <option value="AL RAYYAN">AL RAYYAN : 84</option>
                <option value="AL WAKRAH">AL WAKRAH : 32</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">TOWN NAME:</label>
              <Input 
                name="townName"
                value={formData.townName}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-green-400"
                placeholder="Enter town name"
              />
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
              onClick={() => navigate("/master/town")}
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

export default TownForm;
