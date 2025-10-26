export interface AlgeriaInvoiceBook {
  id: string;
  bookNumber: string;
  startPage: string;
  endPage: string;
  available: string[];
  assignedTo?: string;
  status: "available" | "assigned" | "completed";
  assignedDate?: string;
  country: string;
  totalPages: number;
}

export class AlgeriaInvoiceBookService {
  private static STORAGE_KEY = "algeria_invoice_books";

  static initializeDefaultBooks(): void {
    const existingBooks = this.loadBooks();
    if (existingBooks.length === 0) {
      const defaultBooks: AlgeriaInvoiceBook[] = [];
      
      // Create books starting from #1, pages 013400-013450 (50 pages each)
      for (let bookNum = 1; bookNum <= 10; bookNum++) {
        const startNum = 13400 + (bookNum - 1) * 50;
        const endNum = startNum + 49;
        
        const available: string[] = [];
        for (let i = startNum; i <= endNum; i++) {
          available.push(i.toString().padStart(6, '0'));
        }

        const book: AlgeriaInvoiceBook = {
          id: `algeria-book-${bookNum}`,
          bookNumber: `#${bookNum}`,
          startPage: startNum.toString().padStart(6, '0'),
          endPage: endNum.toString().padStart(6, '0'),
          available,
          status: "available",
          country: "Algeria",
          totalPages: 50
        };

        defaultBooks.push(book);
      }

      this.saveBooks(defaultBooks);
    }
  }

  static getNextHBLNumber(): string {
    const books = this.loadBooks();
    
    // Find the first available book
    for (const book of books) {
      if (book.available.length > 0 && book.status !== 'completed') {
        // Calculate the next HBL number based on book position and pages used
        const bookIndex = parseInt(book.bookNumber.replace('#', '')) - 1;
        const usedPagesInBook = 50 - book.available.length;
        const hblSequence = 15150 + (bookIndex * 50) + usedPagesInBook;
        
        return `2025/04700/${hblSequence}`;
      }
    }
    
    // If no available books, return the next number after all books
    return `2025/04700/${15150 + books.length * 50}`;
  }

  static allocateHBLNumber(hblNumber: string): boolean {
    const books = this.loadBooks();
    const hblSequence = parseInt(hblNumber.split('/')[2]);
    
    // Find which book this HBL belongs to
    const bookIndex = Math.floor((hblSequence - 15150) / 50);
    const pageInBook = (hblSequence - 15150) % 50;
    const pageNumber = (13400 + bookIndex * 50 + pageInBook).toString().padStart(6, '0');
    
    const book = books.find(b => parseInt(b.bookNumber.replace('#', '')) === bookIndex + 1);
    
    if (!book || !book.available.includes(pageNumber)) {
      return false;
    }
    
    // Remove the page from available
    book.available = book.available.filter(p => p !== pageNumber);
    
    // Update book status if all pages used
    if (book.available.length === 0) {
      book.status = 'completed';
    }
    
    this.saveBooks(books);
    return true;
  }

  static loadBooks(): AlgeriaInvoiceBook[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading Algeria invoice books:", error);
      return [];
    }
  }

  static saveBooks(books: AlgeriaInvoiceBook[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error("Error saving Algeria invoice books:", error);
    }
  }

  static getAvailableBooks(): AlgeriaInvoiceBook[] {
    return this.loadBooks().filter(book => book.status !== "completed");
  }
}
