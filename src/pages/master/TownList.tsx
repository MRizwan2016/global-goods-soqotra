
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, PlusCircle, Edit, Trash, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Town {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
  district: string;
  active: string;
}

const TownList = () => {
  const navigate = useNavigate();
  const [towns, setTowns] = useState<Town[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Load towns data
  useEffect(() => {
    try {
      const loadedTowns = JSON.parse(localStorage.getItem('towns') || '[]');
      setTowns(loadedTowns);
    } catch (error) {
      console.error("Failed to load towns:", error);
      toast.error("Failed to load towns data");
    }
  }, []);
  
  // Handle adding a new town
  const handleAddTown = () => {
    navigate("/master/town/new");
  };
  
  // Handle editing a town
  const handleEditTown = (id: string) => {
    navigate(`/master/town/edit/${id}`);
  };
  
  // Handle deleting a town
  const handleDeleteTown = (id: string) => {
    try {
      const updatedTowns = towns.filter(town => town.id !== id);
      setTowns(updatedTowns);
      localStorage.setItem('towns', JSON.stringify(updatedTowns));
      toast.success("Town deleted successfully");
    } catch (error) {
      console.error("Failed to delete town:", error);
      toast.error("Failed to delete town");
    }
  };
  
  // Filter towns based on search term
  const filteredTowns = towns.filter(town => 
    town.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    town.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    town.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout title="Town Management">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-blue-800 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-blue-700" />
            Town List
          </h3>
          <Button 
            onClick={handleAddTown}
            className="bg-blue-600 hover:bg-blue-700 transition-colors hover:scale-105 transform duration-200 flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Town
          </Button>
        </div>
        
        <div className="p-4">
          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search towns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Town Name</th>
                  <th className="px-4 py-2 border">Code</th>
                  <th className="px-4 py-2 border">Country</th>
                  <th className="px-4 py-2 border">City</th>
                  <th className="px-4 py-2 border">District</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTowns.length > 0 ? (
                  filteredTowns.map((town, index) => (
                    <motion.tr
                      key={town.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 border">{town.name}</td>
                      <td className="px-4 py-2 border">{town.code}</td>
                      <td className="px-4 py-2 border">{town.country}</td>
                      <td className="px-4 py-2 border">{town.city}</td>
                      <td className="px-4 py-2 border">{town.district}</td>
                      <td className="px-4 py-2 border">
                        <span className={`px-2 py-1 rounded text-xs ${town.active === 'Y' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {town.active === 'Y' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTown(town.id)}
                            className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTown(town.id)}
                            className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                      No towns found. Add a new town to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default TownList;
