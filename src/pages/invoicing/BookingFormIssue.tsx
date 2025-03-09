
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const BookingFormIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pagesInBook: "50",
    bookNumber: "",
    firstPageNumber: "",
    lastPageNumber: "",
    branch: "DOHA : HOF"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If updating bookNumber, calculate first and last page numbers
    if (name === "bookNumber" && value) {
      const bookNum = parseInt(value);
      if (!isNaN(bookNum)) {
        const firstPage = 13136000 + ((bookNum - 722) * 50) + 1;
        const lastPage = firstPage + 49;
        
        setFormData({
          ...formData,
          bookNumber: value,
          firstPageNumber: firstPage.toString(),
          lastPageNumber: lastPage.toString()
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
    
    // In a real app, this would save to a backend
    toast.success("Booking form issued successfully");
    
    // Navigate back to booking form stock list
    navigate("/data-entry/booking-form-stock");
  };
  
  return (
    <Layout title="Issue Booking Form">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            Issue Booking Form Stock
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
                className="border border-gray-300"
                placeholder="Enter book number"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">FIRST PAGE NUMBER:</label>
              <Input 
                name="firstPageNumber"
                value={formData.firstPageNumber}
                className="border border-gray-300"
                readOnly
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">LAST PAGE NUMBER:</label>
              <Input 
                name="lastPageNumber"
                value={formData.lastPageNumber}
                className="border border-gray-300"
                readOnly
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">BRANCH:</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm h-10"
              >
                <option value="DOHA : HOF">DOHA : HOF</option>
                <option value="DUBAI : DXB">DUBAI : DXB</option>
                <option value="COLOMBO : CMB">COLOMBO : CMB</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
            <Button 
              onClick={() => navigate("/data-entry/booking-form-stock")}
              variant="outline"
              className="border-gray-300"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingFormIssue;
