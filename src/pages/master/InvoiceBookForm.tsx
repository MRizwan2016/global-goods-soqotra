
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
    country: "",
    bookNumber: "",
    startPage: "",
    endPage: "",
    bookType: "NORMAL",
    salesRepresentative: "",
    driverName: ""
  });

  // Country-specific data
  const getSalesRepresentatives = (country: string) => {
    switch (country) {
      case "ERITREA":
        return [
          { value: "MR_YOUSUF", label: "Mr. Yousuf" },
          { value: "MR_SALEH", label: "Mr. Saleh" },
          { value: "MR_ABDUL_QADER", label: "Mr. Abdul Qader" },
          { value: "MR_YASIR", label: "Mr. Yasir" }
        ];
      default:
        return [
          { value: "DEFAULT_REP", label: "Default Representative" }
        ];
    }
  };

  const getDrivers = (country: string) => {
    switch (country) {
      case "ERITREA":
        return [
          { value: "MR_JOHNY_VENAKADY", label: "Mr. Johny Venakady" },
          { value: "MR_SALIH", label: "Mr. Salih" },
          { value: "MR_BAKHEETH", label: "Mr. Bakheeth" },
          { value: "MR_IDRIS_KARAR", label: "Mr. Idris Karar" }
        ];
      default:
        return [
          { value: "DEFAULT_DRIVER", label: "Default Driver" }
        ];
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle country-specific page number calculation
    if (name === "country" || (name === "bookNumber" && value && formData.country)) {
      let updatedFormData = { ...formData, [name]: value };
      
      const country = name === "country" ? value : formData.country;
      const bookNumber = name === "bookNumber" ? parseInt(value) : parseInt(formData.bookNumber);
      
      if (country && !isNaN(bookNumber) && bookNumber > 0) {
        let firstPage: number;
        let lastPage: number;
        
        switch (country) {
          case "SRI_LANKA":
            // Sri Lanka: book 1 = 13131000-13131051, book 2 = 13131051-13131101, etc.
            firstPage = 13131000 + ((bookNumber - 1) * 50);
            lastPage = firstPage + 49;
            break;
          case "ERITREA":
            // Eritrea: book 1 = 010000-010051, book 2 = 010052-010101, etc.
            firstPage = 10000 + ((bookNumber - 1) * 50);
            lastPage = firstPage + 51;
            break;
          case "KENYA":
            // Kenya: book 1 = 02000-02051, book 2 = 02051-02101, etc.
            firstPage = 2000 + ((bookNumber - 1) * 50);
            lastPage = firstPage + 49;
            break;
          case "SUDAN":
            // Sudan: book 1 = 03000-03051, book 2 = 03051-03101, etc.
            firstPage = 3000 + ((bookNumber - 1) * 50);
            lastPage = firstPage + 49;
            break;
          case "UAE":
            // UAE: book 1 = 04000-04051, book 2 = 04051-04101, etc.
            firstPage = 4000 + ((bookNumber - 1) * 50);
            lastPage = firstPage + 49;
            break;
          default:
            // Default fallback (keeping existing logic for other countries)
            firstPage = 13136000 + ((bookNumber - 722) * 50) + 1;
            lastPage = firstPage + 49;
            break;
        }
        
        updatedFormData = {
          ...updatedFormData,
          startPage: firstPage.toString().padStart(6, '0'),
          endPage: lastPage.toString().padStart(6, '0')
        };
      }
      
      // Reset sales rep and driver when country changes
      if (name === "country") {
        updatedFormData.salesRepresentative = "";
        updatedFormData.driverName = "";
      }
      
      setFormData(updatedFormData);
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    console.log("=== SAVE BUTTON CLICKED ===");
    console.log("Form data:", formData);
    
    if (!formData.country) {
      console.log("ERROR: No country selected");
      toast.error("Please select a country");
      return;
    }
    
    if (!formData.bookNumber) {
      console.log("ERROR: No book number provided");
      toast.error("Please enter a book number");
      return;
    }
    
    if (!formData.salesRepresentative) {
      console.log("ERROR: No sales representative provided");
      toast.error("Please enter a sales representative name");
      return;
    }
    
    if (!formData.driverName) {
      console.log("ERROR: No driver name provided");
      toast.error("Please enter a driver name");
      return;
    }
    
    try {
      // Create the new book object
      const newBook = {
        id: Date.now().toString(),
        country: formData.country,
        bookNumber: formData.bookNumber,
        startPage: formData.startPage,
        endPage: formData.endPage,
        isIssued: false,
        isActivated: true, // Set to active by default so it shows in the active tab
        bookType: formData.bookType,
        pagesUsed: 0,
        salesRepresentative: formData.salesRepresentative,
        driverName: formData.driverName,
        availablePages: Array.from(
          { length: parseInt(formData.endPage) - parseInt(formData.startPage) + 1 }, 
          (_, i) => (parseInt(formData.startPage) + i).toString().padStart(6, '0')
        )
      };
      
      console.log("Creating new book:", newBook);
      
      // Get existing books from localStorage
      console.log("=== BEFORE SAVE ===");
      console.log("All localStorage keys BEFORE save:", Object.keys(localStorage));
      console.log("localStorage 'invoiceBooks' BEFORE save:", localStorage.getItem('invoiceBooks'));
      
      const existingBooksJson = localStorage.getItem('invoiceBooks');
      const existingBooks = existingBooksJson ? JSON.parse(existingBooksJson) : [];
      console.log("Existing books from localStorage:", existingBooks);
      
      // Check if a book with the same number already exists
      const bookExists = existingBooks.some((book: any) => book.bookNumber === formData.bookNumber);
      console.log("Checking for existing book:", formData.bookNumber, "Found:", bookExists);
      
      if (bookExists) {
        console.log("ERROR: Book already exists");
        toast.error(`Book #${formData.bookNumber} already exists`);
        return;
      }
      
      // Add the new book and save back to localStorage
      const updatedBooks = [...existingBooks, newBook];
      console.log("Saving to localStorage - invoiceBooks:", updatedBooks.length, "books");
      console.log("About to save this data:", JSON.stringify(updatedBooks));
      localStorage.setItem('invoiceBooks', JSON.stringify(updatedBooks));
      
      // Verify the save worked
      console.log("=== AFTER SAVE VERIFICATION ===");
      const verifyBooks = localStorage.getItem('invoiceBooks');
      console.log("localStorage 'invoiceBooks' AFTER save:", verifyBooks);
      console.log("All localStorage keys AFTER save:", Object.keys(localStorage));
      
      // Also update activeInvoiceBooks
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const updatedActiveBooks = [
        ...activeBooks, 
        {
          bookNumber: newBook.bookNumber,
          availablePages: newBook.availablePages,
          pagesUsed: 0,
          isActivated: true
        }
      ];
      console.log("Saving to localStorage - activeInvoiceBooks:", updatedActiveBooks.length, "books");
      localStorage.setItem('activeInvoiceBooks', JSON.stringify(updatedActiveBooks));
      
      console.log("=== SAVE SUCCESS ===");
      toast.success("Invoice book added successfully");
      console.log("Updated books in localStorage:", updatedBooks);
      
      // Trigger storage event so other components know to refresh
      console.log("Dispatching storage event...");
      window.dispatchEvent(new Event('storage'));
      
      // Also dispatch a custom event specific for book updates
      console.log("Dispatching book-update event...");
      const bookUpdateEvent = new Event('book-update');
      window.dispatchEvent(bookUpdateEvent);
      
      console.log("Navigating back to stock list...");
      navigate("/master/book/stock");
    } catch (error) {
      console.error("=== SAVE ERROR ===", error);
      toast.error("Failed to save book. Please try again.");
    }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">COUNTRY:</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm h-10 transition-all hover:bg-blue-600"
              >
                <option value="">Select Country</option>
                <option value="SRI_LANKA">Sri Lanka</option>
                <option value="ERITREA">Eritrea</option>
                <option value="KENYA">Kenya</option>
                <option value="SUDAN">Sudan</option>
                <option value="UAE">UAE</option>
                <option value="SAUDI_ARABIA">Saudi Arabia</option>
                <option value="OMAN">Oman</option>
                <option value="QATAR">Qatar</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">BOOK NUMBER:</label>
              <Input 
                name="bookNumber"
                value={formData.bookNumber}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-blue-400"
                placeholder="Enter book number"
                disabled={!formData.country}
              />
            </div>
            
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
              <label className="text-sm font-medium mb-1">SALES REPRESENTATIVE:</label>
              <select
                name="salesRepresentative"
                value={formData.salesRepresentative}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm h-10 transition-all hover:bg-blue-600"
                disabled={!formData.country}
              >
                <option value="">Select Sales Representative</option>
                {getSalesRepresentatives(formData.country).map(rep => (
                  <option key={rep.value} value={rep.label}>
                    {rep.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">DRIVER NAME:</label>
              <select
                name="driverName"
                value={formData.driverName}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm h-10 transition-all hover:bg-blue-600"
                disabled={!formData.country}
              >
                <option value="">Select Driver</option>
                {getDrivers(formData.country).map(driver => (
                  <option key={driver.value} value={driver.label}>
                    {driver.label}
                  </option>
                ))}
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
              onClick={() => navigate("/master/book/stock")}
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
