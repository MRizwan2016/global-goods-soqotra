
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TownForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    country: "Qatar",
    city: "DOHA",
    warehouse: "",
    sector: "",
    townName: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Reset dependent fields when country changes
    if (name === "country") {
      setFormData(prev => ({
        ...prev,
        city: value === "Qatar" ? "DOHA" : "MOMBASA WAREHOUSE",
        warehouse: "",
        sector: "",
        townName: ""
      }));
    }
    
    // Reset sector when warehouse changes
    if (name === "warehouse") {
      setFormData(prev => ({
        ...prev,
        sector: "",
        townName: ""
      }));
    }
  };
  
  const handleSave = () => {
    if (!formData.townName.trim()) {
      toast.error("Please enter a town name");
      return;
    }
    
    toast.success("Town added successfully");
    navigate("/master/town");
  };
  
  // Kenya warehouse options
  const kenyaWarehouses = [
    "MOMBASA WAREHOUSE", 
    "NAIROBI WAREHOUSE"
  ];
  
  // Kenya sectors based on warehouse
  const kenyaSectors: Record<string, string[]> = {
    "MOMBASA WAREHOUSE": ["NORTH COAST", "SOUTH COAST"],
    "NAIROBI WAREHOUSE": ["NAIROBI NORTH", "NAIROBI WEST", "NAIROBI SOUTH", "NAIROBI EAST", "SOUTH EAST"]
  };
  
  // Qatar city options
  const qatarCities = ["DOHA", "AL RAYYAN", "AL WAKRAH"];
  
  return (
    <Layout title={isEditMode ? "Edit Town" : "Add Town"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            {isEditMode ? "Edit Town" : "Add Town"}
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 max-w-3xl">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">COUNTRY:</label>
              <select 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-blue-500 bg-blue-500 text-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Qatar">Qatar</option>
                <option value="Kenya">Kenya</option>
              </select>
            </div>
            
            {formData.country === "Qatar" ? (
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">CITY:</label>
                <select 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-blue-500 bg-blue-500 text-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {qatarCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">WAREHOUSE:</label>
                  <select 
                    name="warehouse"
                    value={formData.warehouse}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-blue-500 bg-blue-500 text-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select Warehouse</option>
                    {kenyaWarehouses.map(warehouse => (
                      <option key={warehouse} value={warehouse}>{warehouse}</option>
                    ))}
                  </select>
                </div>
                
                {formData.warehouse && (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">SECTOR:</label>
                    <select 
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-blue-500 bg-blue-500 text-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select Sector</option>
                      {kenyaSectors[formData.warehouse]?.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
            
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
