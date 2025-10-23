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
    let maxHBLNumber = 15150; // Starting HBL number
    
    // Find the highest HBL number used
    books.forEach(book => {
      const usedPages = 50 - book.available.length;
      const bookHBLNumber = 15150 + (parseInt(book.bookNumber.replace('#', '')) - 1) * 50 + usedPages;
      if (bookHBLNumber > maxHBLNumber) {
        maxHBLNumber = bookHBLNumber;
      }
    });
    
    return `2025/04700/${maxHBLNumber}`;
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
