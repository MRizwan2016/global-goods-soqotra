
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { normalizeCountryName, syncBookStockToExternal } from "@/lib/externalSync";

const InvoiceBookForm = () => {
  const navigate = useNavigate();
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [formData, setFormData] = useState({
    pagesInBook: "50",
    country: "",
    bookNumber: "",
    bookNumberEnd: "", // For range mode
    startPage: "",
    endPage: "",
    bookType: "NORMAL",
    salesRepresentative: "",
    driverName: ""
  });

  // Country-specific data
  const getSalesRepresentatives = (country: string) => {
    switch (country) {
      case "SRI_LANKA":
        return [
          { value: "MR_LAHIRU_CHATHURANGA", label: "Mr. Lahiru Chathuranga" },
          { value: "MR_SAJJAD", label: "Mr. Sajjad" },
          { value: "MR_IMAM_UBAIDULLA", label: "Mr. Imam Ubaidulla" },
          { value: "MR_RANATUNGHE", label: "Mr. Ranatunghe" },
          { value: "MR_MOHAMED_RIZWAN", label: "Mr. Mohamed Rizwan" }
        ];
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
      case "SRI_LANKA":
        return [
          { value: "ASHOKA_UDESH", label: "Ashoka Udesh" },
          { value: "JOHNNY_VENAKADY", label: "Johnny Venakady" },
          { value: "KANAYA", label: "Kanaya" },
          { value: "BAKEETH_IDRIS", label: "Bakeeth Idris" },
          { value: "IDRIES_KARAR", label: "Idries Karar" }
        ];
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

  const calculatePageNumbers = (country: string, bookNumber: number) => {
    if (country === "SRI_LANKA") {
      const sriLankaBaseBook = 800;
      const sriLankaBasePage = 140800;
      const countryPrefix = 13;
      const bookOffset = bookNumber - sriLankaBaseBook;
      const pagesPerBook = 50;
      
      const firstPage = countryPrefix * 1000000 + sriLankaBasePage + (bookOffset * pagesPerBook);
      const lastPage = firstPage + pagesPerBook - 1;
      return { firstPage, lastPage, pagesPerBook };
    } else {
      let firstPage: number;
      let lastPage: number;
      if (bookNumber === 1) {
        firstPage = 100000;
        lastPage = 100050;
      } else {
        let totalPages = 51;
        for (let i = 2; i < bookNumber; i++) {
          totalPages += (i % 2 === 1) ? 51 : 50;
        }
        firstPage = 100000 + totalPages;
        const currentBookPages = (bookNumber % 2 === 1) ? 51 : 50;
        lastPage = firstPage + currentBookPages - 1;
      }
      return { firstPage, lastPage, pagesPerBook: lastPage - firstPage + 1 };
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "bookNumber" && value) {
      const bookNumber = parseInt(value);
      if (!isNaN(bookNumber) && bookNumber > 0 && formData.country) {
        const { firstPage, lastPage, pagesPerBook } = calculatePageNumbers(formData.country, bookNumber);
        setFormData({
          ...formData,
          [name]: value,
          startPage: firstPage.toString(),
          endPage: lastPage.toString(),
          pagesInBook: pagesPerBook.toString()
        });
        return;
      }
    }
    
    if (name === "country") {
      setFormData({
        ...formData,
        [name]: value,
        salesRepresentative: "",
        driverName: "",
        bookNumber: "",
        bookNumberEnd: "",
        startPage: "",
        endPage: ""
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSave = async () => {
    if (!formData.country) {
      toast.error("Please select a country");
      return;
    }
    
    if (!formData.bookNumber) {
      toast.error("Please enter a book number");
      return;
    }
    
    if (!formData.salesRepresentative) {
      toast.error("Please enter a sales representative name");
      return;
    }
    
    if (!formData.driverName) {
      toast.error("Please enter a driver name");
      return;
    }

    // Determine the range of books to create
    const startBookNum = parseInt(formData.bookNumber);
    const endBookNum = isRangeMode && formData.bookNumberEnd 
      ? parseInt(formData.bookNumberEnd) 
      : startBookNum;

    if (isNaN(startBookNum) || (isRangeMode && isNaN(endBookNum))) {
      toast.error("Please enter valid book numbers");
      return;
    }

    if (endBookNum < startBookNum) {
      toast.error("End book number must be greater than or equal to start book number");
      return;
    }

    if (endBookNum - startBookNum > 50) {
      toast.error("Maximum 50 books can be added at once");
      return;
    }
    
    try {
      const existingBooksJson = localStorage.getItem('invoiceBooks');
      const existingBooks = existingBooksJson ? JSON.parse(existingBooksJson) : [];
      
      const salesRepLabel = getSalesRepresentatives(formData.country).find(rep => rep.value === formData.salesRepresentative)?.label || formData.salesRepresentative;
      const driverLabel = getDrivers(formData.country).find(driver => driver.value === formData.driverName)?.label || formData.driverName;

      // Check for duplicates in the range
      const duplicates: string[] = [];
      const requestedBookNumbers: string[] = [];
      for (let bn = startBookNum; bn <= endBookNum; bn++) {
        const bnStr = bn.toString();
        requestedBookNumbers.push(bnStr);
        if (existingBooks.some((book: any) => book.bookNumber === bnStr)) {
          duplicates.push(bnStr);
        }
      }

      const { data: existingDbBooks, error: existingDbBooksError } = await supabase
        .from("manage_invoice_book_stock")
        .select("book_number")
        .in("book_number", requestedBookNumbers);

      if (existingDbBooksError) throw existingDbBooksError;

      (existingDbBooks || []).forEach((book: any) => {
        const value = String(book.book_number);
        if (!duplicates.includes(value)) duplicates.push(value);
      });

      if (duplicates.length > 0) {
        toast.error(`Book number(s) ${duplicates.join(', ')} already exist. Please choose different numbers.`);
        return;
      }

      // Create all books in the range
      const newBooks: any[] = [];
      for (let bn = startBookNum; bn <= endBookNum; bn++) {
        const { firstPage, lastPage, pagesPerBook } = calculatePageNumbers(formData.country, bn);
        
        const newBook = {
          id: `${Date.now()}-${bn}`,
          country: formData.country,
          bookNumber: bn.toString(),
          startPage: firstPage.toString(),
          endPage: lastPage.toString(),
          isIssued: false,
          isActivated: true,
          bookType: formData.bookType,
          pagesUsed: 0,
          assignedTo: salesRepLabel,
          salesRepresentative: formData.salesRepresentative,
          driverName: driverLabel,
          availablePages: Array.from(
            { length: pagesPerBook }, 
            (_, i) => (firstPage + i).toString()
          )
        };
        newBooks.push(newBook);
      }
      
      console.log(`Creating ${newBooks.length} new book(s):`, newBooks);
      
      const updatedBooks = [...existingBooks, ...newBooks];
      localStorage.setItem('invoiceBooks', JSON.stringify(updatedBooks));
      
      // Also update activeInvoiceBooks
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const newActiveEntries = newBooks.map(book => ({
        bookNumber: book.bookNumber,
        availablePages: book.availablePages,
        pagesUsed: 0,
        isActivated: true
      }));
      const updatedActiveBooks = [...activeBooks, ...newActiveEntries];
      localStorage.setItem('activeInvoiceBooks', JSON.stringify(updatedActiveBooks));

      const dbRows = newBooks.map((book) => ({
        book_number: book.bookNumber,
        country: normalizeCountryName(formData.country),
        country_id_number: book.startPage.length > 6 ? book.startPage.slice(0, 2) : null,
        start_page: book.startPage,
        end_page: book.endPage,
        total_pages: Number(formData.pagesInBook || 50),
        pages_used: 0,
        available_pages: book.availablePages,
        assigned_to_sales_rep: salesRepLabel,
        assigned_to_driver: driverLabel,
        assigned_date: new Date().toISOString(),
        status: "assigned",
      }));

      const { error: insertError } = await supabase
        .from("manage_invoice_book_stock")
        .insert(dbRows);

      if (insertError) throw insertError;

      await Promise.all(dbRows.map((row) => syncBookStockToExternal(row)));
      
      const count = newBooks.length;
      toast.success(
        count === 1 
          ? "Invoice book added successfully" 
          : `${count} invoice books added successfully (Book #${startBookNum} to #${endBookNum})`
      );
      
      // Trigger storage event so other components know to refresh
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('book-update'));
      
      navigate("/master/book/stock");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save book. Please try again.");
    }
  };

  // Preview for range mode
  const getRangePreview = () => {
    if (!isRangeMode || !formData.bookNumber || !formData.bookNumberEnd || !formData.country) return null;
    const start = parseInt(formData.bookNumber);
    const end = parseInt(formData.bookNumberEnd);
    if (isNaN(start) || isNaN(end) || end < start) return null;
    const count = end - start + 1;
    const firstPages = calculatePageNumbers(formData.country, start);
    const lastPages = calculatePageNumbers(formData.country, end);
    return { count, firstStart: firstPages.firstPage, lastEnd: lastPages.lastPage };
  };

  const rangePreview = getRangePreview();
  
  return (
    <Layout title="Add Invoice Book">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">
            Add New Invoice Book
          </h3>
        </div>
        
        <div className="p-6">
          {/* Range mode toggle */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Switch
              checked={isRangeMode}
              onCheckedChange={setIsRangeMode}
            />
            <Label className="text-sm font-medium text-blue-800 cursor-pointer" onClick={() => setIsRangeMode(!isRangeMode)}>
              Add Multiple Books (Range Mode)
            </Label>
            {isRangeMode && (
              <span className="text-xs text-blue-600 ml-2">
                Enter start and end book numbers to create multiple books at once
              </span>
            )}
          </div>

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
              <label className="text-sm font-medium mb-1">
                {isRangeMode ? "FROM BOOK NUMBER:" : "BOOK NUMBER:"}
              </label>
              <Input 
                name="bookNumber"
                value={formData.bookNumber}
                onChange={handleInputChange}
                className="border border-gray-300 transition-colors focus:border-blue-400"
                placeholder={isRangeMode ? "Start book number (e.g. 800)" : "Enter book number"}
                disabled={!formData.country}
              />
            </div>

            {isRangeMode && (
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">TO BOOK NUMBER:</label>
                <Input 
                  name="bookNumberEnd"
                  value={formData.bookNumberEnd}
                  onChange={handleInputChange}
                  className="border border-gray-300 transition-colors focus:border-blue-400"
                  placeholder="End book number (e.g. 810)"
                  disabled={!formData.country}
                />
              </div>
            )}
            
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
            
            {!isRangeMode && (
              <>
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
              </>
            )}
            
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

          {/* Range preview */}
          {isRangeMode && rangePreview && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg max-w-4xl">
              <h4 className="text-sm font-semibold text-green-800 mb-2">Range Preview</h4>
              <div className="grid grid-cols-3 gap-4 text-sm text-green-700">
                <div>
                  <span className="font-medium">Total Books:</span> {rangePreview.count}
                </div>
                <div>
                  <span className="font-medium">First Page (Book #{formData.bookNumber}):</span> {rangePreview.firstStart}
                </div>
                <div>
                  <span className="font-medium">Last Page (Book #{formData.bookNumberEnd}):</span> {rangePreview.lastEnd}
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                All {rangePreview.count} books will be assigned to {formData.salesRepresentative || "selected sales representative"} 
                {formData.driverName ? ` with driver ${formData.driverName}` : ""}
              </p>
            </div>
          )}
          
          <div className="mt-8 flex gap-3">
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 transition-colors hover:scale-105 transform duration-200"
            >
              {isRangeMode ? `Save ${rangePreview ? rangePreview.count : ''} Book(s)` : 'Save'}
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
