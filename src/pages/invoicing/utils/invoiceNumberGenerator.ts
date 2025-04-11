
/**
 * Utility to generate invoice numbers when none are available
 */

/**
 * Generate a sequence of invoice numbers with GY prefix
 * @param start Starting number
 * @param count Number of invoice numbers to generate
 * @returns Array of generated invoice numbers
 */
export const generateInvoiceNumbers = (start = 1, count = 100): string[] => {
  const invoices: string[] = [];
  
  for (let i = start; i < start + count; i++) {
    // Format as GY followed by 6 digits (e.g., GY000001)
    const formattedNumber = i.toString().padStart(6, '0');
    invoices.push(`GY${formattedNumber}`);
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
    const invoiceNumbers = generateInvoiceNumbers(1, 100);
    
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
    
    const maxUsedNumber = allUsedNumbers
      .filter((num: string) => num.startsWith('GY'))
      .map((num: string) => parseInt(num.replace('GY', '')) || 0)
      .reduce((max: number, num: number) => (num > max ? num : max), 0);
    
    const startNumber = maxUsedNumber + 1;
    const newInvoices = generateInvoiceNumbers(startNumber, 100);
    
    const newBook = {
      id: `book-${Date.now()}`,
      bookNumber: `AUTO-${startNumber.toString().padStart(6, '0')}`,
      startNumber: `GY${startNumber.toString().padStart(6, '0')}`,
      endNumber: `GY${(startNumber + 99).toString().padStart(6, '0')}`,
      availablePages: newInvoices,
      isActivated: true,
      country: "All",
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
