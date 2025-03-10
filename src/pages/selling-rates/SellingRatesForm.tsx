
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock data for selling rates
const mockSellingRates = [
  {
    id: "1",
    freightType: "SEA",
    tariffNumber: "SL-001",
    effectiveFrom: "2023-09-01",
    district: "COLOMBO",
    country: "Sri Lanka",
  },
  {
    id: "2",
    freightType: "AIR",
    tariffNumber: "SL-002",
    effectiveFrom: "2023-10-15",
    district: "KANDY",
    country: "Sri Lanka",
  },
];

const countries = [
  "Sri Lanka",
  "Kenya",
  "Eritrea",
  "Sudan",
  "Saudi Arabia",
  "United Arab Emirates",
  "Somalia",
  "Tunisia"
];

const SellingRatesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const existingRate = isEditing 
    ? mockSellingRates.find(rate => rate.id === id) 
    : null;
    
  const [formState, setFormState] = useState({
    freightType: existingRate?.freightType || "SEA",
    tariffNumber: existingRate?.tariffNumber || "",
    effectiveFrom: existingRate?.effectiveFrom || "",
    district: existingRate?.district || "",
    country: existingRate?.country || "Sri Lanka",
    remark: "",
    cargoType: "General Cargo",
    
    // Rate values
    rate1: "0",
    rate2: "0",
    rate3: "0",
    rate4: "0",
    rate5: "0"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    if (!formState.tariffNumber || !formState.effectiveFrom || !formState.district) {
      toast.error("Please fill all required fields");
      return;
    }
    
    console.log("Saving selling rate:", formState);
    toast.success("Selling rate saved successfully");
    
    navigate("/data-entry/selling-rates");
  };
  
  return (
    <Layout title={isEditing ? "Update Selling Rate" : "Add Selling Rate"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-orange-50 border-b border-orange-100">
          <h3 className="text-lg font-medium text-orange-800">
            {isEditing ? "Update Selling Rate" : "Add Selling Rate"}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Freight Type:</label>
              <select
                name="freightType"
                value={formState.freightType}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="SEA">SEA</option>
                <option value="AIR">AIR</option>
                <option value="LAND">LAND</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Tariff Number:</label>
              <Input 
                name="tariffNumber"
                value={formState.tariffNumber}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Effective From:</label>
              <Input 
                type="date"
                name="effectiveFrom"
                value={formState.effectiveFrom}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Country:</label>
              <select
                name="country"
                value={formState.country}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">District/City:</label>
              <Input 
                name="district"
                value={formState.district}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Cargo Type:</label>
              <select
                name="cargoType"
                value={formState.cargoType}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="General Cargo">General Cargo</option>
                <option value="Personal Effects">Personal Effects</option>
                <option value="Household Goods">Household Goods</option>
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
          </div>
          
          <div className="bg-orange-100 p-4 rounded mb-6">
            <h4 className="font-medium mb-3">Rate Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">0 - 10 kg Rate:</label>
                <Input 
                  name="rate1"
                  type="number"
                  value={formState.rate1}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">11 - 20 kg Rate:</label>
                <Input 
                  name="rate2"
                  type="number"
                  value={formState.rate2}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">21 - 30 kg Rate:</label>
                <Input 
                  name="rate3"
                  type="number"
                  value={formState.rate3}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">31 - 40 kg Rate:</label>
                <Input 
                  name="rate4"
                  type="number"
                  value={formState.rate4}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Above 40 kg Rate:</label>
                <Input 
                  name="rate5"
                  type="number"
                  value={formState.rate5}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="text-sm font-medium mb-1">Remarks:</label>
            <Textarea 
              name="remark"
              value={formState.remark}
              onChange={handleInputChange}
              className="border border-gray-300 w-full h-24"
              placeholder="Enter any additional notes about this rate"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Save Rate
            </Button>
            <Button 
              onClick={() => navigate("/data-entry/selling-rates")}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellingRatesForm;
