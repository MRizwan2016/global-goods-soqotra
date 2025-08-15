
/**
 * Utility to generate invoice numbers when none are available
 */

/**
 * Generate a sequence of invoice numbers with country prefix
 * @param start Starting number
 * @param count Number of invoice numbers to generate
 * @param country Country to determine prefix
 * @returns Array of generated invoice numbers
 */
export const generateInvoiceNumbers = (start = 1, count = 100, country = ""): string[] => {
  const invoices: string[] = [];
  
  // Get country prefix
  const getCountryPrefix = (countryName: string): string => {
    switch (countryName.toUpperCase()) {
      case "ERITREA":
        return "ERT";
      case "SRI_LANKA":
        return "SRL";
      case "KENYA":
        return "KEN";
      case "SUDAN":
        return "SUD";
      case "UAE":
        return "UAE";
      case "SAUDI_ARABIA":
        return "SAU";
      case "OMAN":
        return "OMN";
      case "QATAR":
        return "QAT";
      default:
        return "GY"; // Default fallback
    }
  };
  
  const prefix = getCountryPrefix(country);
  
  for (let i = start; i < start + count; i++) {
    // Format as country prefix followed by 6 digits (e.g., ERT000001)
    const formattedNumber = i.toString().padStart(6, '0');
    invoices.push(`${prefix}${formattedNumber}`);
  }
  
  return invoices;
};

/**
 * Create and save a default invoice book if none exists
 */
export const createDefaultInvoiceBook = (): void => {
  const existingBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
  const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
  
  // Only create if no books exist
  if (existingBooks.length === 0 && activeBooks.length === 0) {
    const invoiceNumbers = generateInvoiceNumbers(1, 100, "DEFAULT");
    
    const defaultBook = {
      id: `book-${Date.now()}`,
      bookNumber: "DEFAULT-001",
      startNumber: "GY000001",
      endNumber: "GY000100",
      availablePages: invoiceNumbers,
      isActivated: true,
      country: "All",
      branch: "HEAD OFFICE",
      assignedTo: "System User",
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('invoiceBooks', JSON.stringify([defaultBook]));
    localStorage.setItem('activeInvoiceBooks', JSON.stringify([defaultBook]));
    
    console.log("Created default invoice book:", defaultBook);
  }
};

/**
 * Ensure there are available invoice numbers in the system
 */
export const ensureInvoiceAvailability = (): void => {
  console.log("Ensuring invoice number availability...");
  
  // Create default invoice book if none exists
  createDefaultInvoiceBook();
  
  // Return available invoices
  const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  const usedInvoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
  
  const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
  const generatedInvoiceNumbers = generatedInvoices.map((inv: any) => inv.invoiceNumber);
  
  // Combine all used numbers
  const allUsedNumbers = [...usedInvoiceNumbers, ...generatedInvoiceNumbers];
  
  // Get active books
  const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
  
  // Check if we need to generate more invoice numbers
  let needsMoreInvoices = true;
  
  if (activeBooks.length > 0) {
    // Check if any active book has available invoice numbers
    for (const book of activeBooks) {
      if (book.availablePages) {
        const availableInvoices = book.availablePages.filter(
          (invoiceNo: string) => !allUsedNumbers.includes(invoiceNo)
        );
        
        if (availableInvoices.length > 0) {
          needsMoreInvoices = false;
          console.log(`Found ${availableInvoices.length} available invoice numbers in book ${book.bookNumber}`);
          break;
        }
      }
    }
  }
  
  // Generate more invoice numbers if needed
  if (needsMoreInvoices) {
    console.log("Generating new invoice numbers...");
    
    // Get the most common country prefix or use default
    const commonPrefixes = ["GY", "ERT", "SRL", "KEN", "SUD", "UAE", "SAU", "OMN", "QAT"];
    let detectedCountry = "DEFAULT";
    
    for (const prefix of commonPrefixes) {
      const numbersWithPrefix = allUsedNumbers.filter((num: string) => num.startsWith(prefix));
      if (numbersWithPrefix.length > 0) {
        // Map prefix back to country
        switch (prefix) {
          case "ERT": detectedCountry = "ERITREA"; break;
          case "SRL": detectedCountry = "SRI_LANKA"; break;
          case "KEN": detectedCountry = "KENYA"; break;
          case "SUD": detectedCountry = "SUDAN"; break;
          case "UAE": detectedCountry = "UAE"; break;
          case "SAU": detectedCountry = "SAUDI_ARABIA"; break;
          case "OMN": detectedCountry = "OMAN"; break;
          case "QAT": detectedCountry = "QATAR"; break;
          default: detectedCountry = "DEFAULT"; break;
        }
        break;
      }
    }
    
    const maxUsedNumber = allUsedNumbers
      .filter((num: string) => {
        // Check numbers from the detected country or GY prefix
        const prefixToCheck = detectedCountry === "DEFAULT" ? "GY" : 
          detectedCountry === "ERITREA" ? "ERT" :
          detectedCountry === "SRI_LANKA" ? "SRL" :
          detectedCountry === "KENYA" ? "KEN" :
          detectedCountry === "SUDAN" ? "SUD" :
          detectedCountry === "UAE" ? "UAE" :
          detectedCountry === "SAUDI_ARABIA" ? "SAU" :
          detectedCountry === "OMAN" ? "OMN" :
          detectedCountry === "QATAR" ? "QAT" : "GY";
        return num.startsWith(prefixToCheck);
      })
      .map((num: string) => {
        const prefixToRemove = detectedCountry === "DEFAULT" ? "GY" : 
          detectedCountry === "ERITREA" ? "ERT" :
          detectedCountry === "SRI_LANKA" ? "SRL" :
          detectedCountry === "KENYA" ? "KEN" :
          detectedCountry === "SUDAN" ? "SUD" :
          detectedCountry === "UAE" ? "UAE" :
          detectedCountry === "SAUDI_ARABIA" ? "SAU" :
          detectedCountry === "OMAN" ? "OMN" :
          detectedCountry === "QATAR" ? "QAT" : "GY";
        return parseInt(num.replace(prefixToRemove, '')) || 0;
      })
      .reduce((max: number, num: number) => (num > max ? num : max), 0);
    
    const startNumber = maxUsedNumber + 1;
    const newInvoices = generateInvoiceNumbers(startNumber, 100, detectedCountry);
    
    const countryPrefix = detectedCountry === "DEFAULT" ? "GY" : 
      detectedCountry === "ERITREA" ? "ERT" :
      detectedCountry === "SRI_LANKA" ? "SRL" :
      detectedCountry === "KENYA" ? "KEN" :
      detectedCountry === "SUDAN" ? "SUD" :
      detectedCountry === "UAE" ? "UAE" :
      detectedCountry === "SAUDI_ARABIA" ? "SAU" :
      detectedCountry === "OMAN" ? "OMN" :
      detectedCountry === "QATAR" ? "QAT" : "GY";
    
    const newBook = {
      id: `book-${Date.now()}`,
      bookNumber: `AUTO-${startNumber.toString().padStart(6, '0')}`,
      startNumber: `${countryPrefix}${startNumber.toString().padStart(6, '0')}`,
      endNumber: `${countryPrefix}${(startNumber + 99).toString().padStart(6, '0')}`,
      availablePages: newInvoices,
      isActivated: true,
      country: detectedCountry === "DEFAULT" ? "All" : detectedCountry,
      branch: "HEAD OFFICE",
      assignedTo: "System User",
      createdAt: new Date().toISOString()
    };
    
    // Add to active books
    const updatedActiveBooks = [...activeBooks, newBook];
    localStorage.setItem('activeInvoiceBooks', JSON.stringify(updatedActiveBooks));
    
    // Also add to invoice books
    const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    const updatedStoredBooks = [...storedBooks, newBook];
    localStorage.setItem('invoiceBooks', JSON.stringify(updatedStoredBooks));
    
    console.log("Generated new invoice book:", newBook);
  }
};
