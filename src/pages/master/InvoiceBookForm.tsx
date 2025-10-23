
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
      case "SUDAN":
        return [
          { value: "MR_ABDULLA_YOUSUF", label: "Mr. Abdulla Yousuf" },
          { value: "MR_SALIH", label: "Mr. Salih" },
          { value: "MR_ABDUL_QADER", label: "Mr. Abdul Qader" }
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
      case "SUDAN":
        return [
          { value: "MR_JOHNNY_VENAKADY", label: "Mr. Johnny Venakady" },
          { value: "MR_SALIH", label: "Mr. Salih" },
          { value: "MR_BAKEETH", label: "Mr. Bakeeth" },
          { value: "MR_SALEH", label: "Mr. Saleh" },
          { value: "MR_KANAYA", label: "Mr. Kanaya" },
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
    
    // Handle page number calculation based on book number (same for all countries)
    if (name === "bookNumber" && value) {
      let updatedFormData = { ...formData, [name]: value };
      
      const bookNumber = parseInt(value);
      
      if (!isNaN(bookNumber) && bookNumber > 0) {
        let firstPage: number;
        let lastPage: number;
        
        // Fixed page numbering system for all countries:
        // Book 1: 100000-100050 (51 pages)
        // Book 2: 100051-100100 (50 pages)  
        // Book 3: 100101-100151 (51 pages)
        // Pattern: alternates between 51 and 50 pages
        
        if (bookNumber === 1) {
          firstPage = 100000;
          lastPage = 100050;
        } else {
          // Calculate starting page based on previous books
          let totalPages = 51; // Book 1 has 51 pages
          
          for (let i = 2; i < bookNumber; i++) {
            // Alternating pattern: odd books have 51 pages, even books have 50 pages
            totalPages += (i % 2 === 1) ? 51 : 50;
          }
          
          firstPage = 100000 + totalPages;
          // Current book pages: odd book numbers get 51 pages, even get 50 pages
          const currentBookPages = (bookNumber % 2 === 1) ? 51 : 50;
          lastPage = firstPage + currentBookPages - 1;
        }
        
        updatedFormData = {
          ...updatedFormData,
          startPage: firstPage.toString(),
          endPage: lastPage.toString(),
          pagesInBook: (lastPage - firstPage + 1).toString()
        };
      }
      
      setFormData(updatedFormData);
      return;
    }
    
    // Handle country changes - reset sales rep and driver
    if (name === "country") {
      setFormData({
        ...formData,
        [name]: value,
        salesRepresentative: "",
        driverName: ""
      });
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
    console.log("Browser localStorage support:", typeof(Storage) !== "undefined");
    console.log("Current localStorage state:", localStorage);
    
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
          (_, i) => (parseInt(formData.startPage) + i).toString()
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
      
      // Check if a book with the same number already exists across ALL countries
      const bookExists = existingBooks.some((book: any) => book.bookNumber === formData.bookNumber);
      console.log("Checking for existing book across all countries:", formData.bookNumber, "Found:", bookExists);
      
      if (bookExists) {
        const existingBook = existingBooks.find((book: any) => book.bookNumber === formData.bookNumber);
        console.log("ERROR: Book already exists in country:", existingBook?.country);
        
        // Enhanced error message with country-specific guidance
        const nextBookNumber = parseInt(formData.bookNumber) + 1;
        toast.error(`Book #${formData.bookNumber} is already assigned to ${existingBook?.country || 'another country'}. Choose the next book number (${nextBookNumber}) for assignment.`);
        return;
      }
      
      // Add the new book and save back to localStorage
      const updatedBooks = [...existingBooks, newBook];
      console.log("Saving to localStorage - invoiceBooks:", updatedBooks.length, "books");
      console.log("About to save this data:", JSON.stringify(updatedBooks));
      
      // Force a localStorage clear and re-save to ensure it works
      console.log("=== ATTEMPTING LOCALSTORAGE SAVE ===");
      console.log("Data being saved:", JSON.stringify(updatedBooks, null, 2));
      console.log("Number of books to save:", updatedBooks.length);
      console.log("Current localStorage size:", JSON.stringify(localStorage).length);
      
      try {
        // Check localStorage quota before saving
        const testData = JSON.stringify(updatedBooks);
        console.log("Size of data to save:", testData.length, "characters");
        
        localStorage.setItem('invoiceBooks', testData);
        console.log("localStorage save successful");
        
        // Immediately verify the save
        const immediateVerify = localStorage.getItem('invoiceBooks');
        console.log("Immediate verification - Data exists:", !!immediateVerify);
        console.log("Immediate verification - Length:", immediateVerify?.length);
        
      } catch (storageError) {
        console.error("localStorage save failed:", storageError);
        if (storageError.name === 'QuotaExceededError') {
          console.error("localStorage quota exceeded");
          toast.error("Storage quota exceeded. Please clear some data.");
        }
        throw storageError;
      }
      
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
