
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Save, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const COUNTRIES = [
  "Qatar", 
  "UAE", 
  "Saudi Arabia", 
  "Kenya", 
  "Sri Lanka", 
  "Philippines"
];

// Country code prefixes
const COUNTRY_PREFIXES: Record<string, string> = {
  "Qatar": "QTR",
  "UAE": "UAE",
  "Saudi Arabia": "KSA",
  "Kenya": "KEN",
  "Sri Lanka": "LKA",
  "Philippines": "PHL"
};

const TownForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id || uuidv4(),
    name: "",
    code: "",
    country: "Qatar",
    city: "",
    district: "",
    active: "Y"
  });
  
  // Load existing town data if editing
  useEffect(() => {
    if (id) {
      try {
        const towns = JSON.parse(localStorage.getItem('towns') || '[]');
        const town = towns.find((t: any) => t.id === id);
        if (town) {
          setFormData(town);
        }
      } catch (error) {
        console.error("Failed to load town data:", error);
      }
    }
  }, [id]);
  
  // Generate town code when name or country changes
  useEffect(() => {
    if (!id && formData.name && formData.country) {
      const prefix = COUNTRY_PREFIXES[formData.country] || formData.country.substring(0, 3).toUpperCase();
      
      // Get existing towns to determine the next number
      const towns = JSON.parse(localStorage.getItem('towns') || '[]');
      const countryTowns = towns.filter((t: any) => t.country === formData.country);
      const nextNumber = countryTowns.length + 1;
      
      // Format the code as PREFIX-001, PREFIX-002, etc.
      const code = `${prefix}-${nextNumber.toString().padStart(3, '0')}`;
      
      setFormData(prev => ({
        ...prev,
        code
      }));
    }
  }, [formData.name, formData.country, id]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a town name");
      return;
    }
    
    if (!formData.code.trim()) {
      toast.error("Please enter a town code");
      return;
    }
    
    try {
      // Save to localStorage for persistence
      const existingTowns = JSON.parse(localStorage.getItem('towns') || '[]');
      
      if (id) {
        // Update existing
        const index = existingTowns.findIndex((t: any) => t.id === id);
        if (index !== -1) {
          existingTowns[index] = formData;
        } else {
          existingTowns.push(formData);
        }
      } else {
        // Add new
        existingTowns.push(formData);
      }
      
      localStorage.setItem('towns', JSON.stringify(existingTowns));
      toast.success("Town saved successfully");
      navigate("/master/town");
    } catch (error) {
      console.error("Error saving town:", error);
      toast.error("Failed to save town");
    }
  };
  
  // Generate city options based on selected country
  const getCityOptions = () => {
    if (formData.country === "Philippines") {
      return [
        "Metro Manila",
        "Luzon 1",
        "Luzon 2",
        "Luzon 3",
        "Visayas",
        "Mindanao"
      ];
    }
    return [];
  };
  
  const cityOptions = getCityOptions();
  
  return (
    <Layout title={id ? "Edit Town" : "Add Town"}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-blue-700" />
            {id ? "Update" : "Add"} Town
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label className="text-sm font-medium mb-1">Town Name:</label>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-blue-400"
                placeholder="Enter town name"
              />
            </motion.div>
            
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-sm font-medium mb-1">Town Code:</label>
              <Input 
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-blue-400"
                placeholder="Auto-generated code"
                readOnly={!id} // Only allow editing for existing towns
              />
              {!id && (
                <p className="text-xs text-gray-500 mt-1">
                  Code will be auto-generated based on country and name
                </p>
              )}
            </motion.div>
            
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-sm font-medium mb-1">Country:</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </motion.div>
            
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="text-sm font-medium mb-1">City:</label>
              {formData.country === "Philippines" && cityOptions.length > 0 ? (
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select City</option>
                  {cityOptions.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              ) : (
                <Input 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border border-gray-300 transition-colors focus:border-blue-400"
                  placeholder="Enter city name"
                />
              )}
            </motion.div>
            
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="text-sm font-medium mb-1">District:</label>
              <Input 
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-blue-400"
                placeholder="Enter district"
              />
            </motion.div>
            
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="text-sm font-medium mb-1">Active:</label>
              <select
                name="active"
                value={formData.active}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </motion.div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 transition-colors hover:scale-105 transform duration-200 flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Town
            </Button>
            <Button 
              onClick={() => navigate("/master/town")}
              variant="outline"
              className="border-gray-300 transition-colors hover:border-blue-400 flex items-center"
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

export default TownForm;
