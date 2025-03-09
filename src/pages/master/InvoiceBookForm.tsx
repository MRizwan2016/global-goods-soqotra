
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const InvoiceBookForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pagesInBook: "50",
    bookNumber: "",
    startPage: "",
    endPage: "",
    bookType: "NORMAL"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "bookNumber" && value) {
      const bookNum = parseInt(value);
      if (!isNaN(bookNum)) {
        const firstPage = 13136000 + ((bookNum - 722) * 50) + 1;
        const lastPage = firstPage + 49;
        
        setFormData({
          ...formData,
          bookNumber: value,
          startPage: firstPage.toString(),
          endPage: lastPage.toString()
        });
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    if (!formData.bookNumber) {
      toast.error("Please enter a book number");
      return;
    }
    
    toast.success("Invoice book added successfully");
    navigate("/master/invoice-book");
  };
  
  return (
    <Layout title="Add Invoice Book">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">
            Add New Invoice Book
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">PAGES IN BOOK:</label>
              <Input 
                name="pagesInBook"
                value={formData.pagesInBook}
                onChange={handleInputChange}
                className="border border-gray-300"
                readOnly
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">BOOK NUMBER:</label>
              <Input 
                name="bookNumber"
                value={formData.bookNumber}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-blue-400"
                placeholder="Enter book number"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">FIRST PAGE NUMBER:</label>
              <Input 
                name="startPage"
                value={formData.startPage}
                className="border border-gray-300"
                readOnly
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">LAST PAGE NUMBER:</label>
              <Input 
                name="endPage"
                value={formData.endPage}
                className="border border-gray-300"
                readOnly
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">BOOK TYPE:</label>
              <select
                name="bookType"
                value={formData.bookType}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm h-10 transition-all hover:bg-blue-600"
              >
                <option value="NORMAL">NORMAL</option>
                <option value="SPECIAL">SPECIAL</option>
                <option value="EXPRESS">EXPRESS</option>
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
              onClick={() => navigate("/master/invoice-book")}
              variant="outline"
              className="border-gray-300 transition-colors hover:border-blue-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceBookForm;
