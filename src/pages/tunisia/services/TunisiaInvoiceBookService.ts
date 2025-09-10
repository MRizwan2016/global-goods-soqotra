export interface TunisiaInvoiceBook {
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

export interface TunisiaBookAssignment {
  bookId: string;
  bookNumber: string;
  username: string;
  assignedDate: string;
  availablePages: string[];
}

export class TunisiaInvoiceBookService {
  private static STORAGE_KEY = "tunisia_invoice_books";
  private static ASSIGNMENTS_KEY = "tunisia_book_assignments";

  // Initialize default Tunisia invoice books
  static initializeDefaultBooks(): void {
    const existingBooks = this.loadBooks();
    if (existingBooks.length === 0) {
      const defaultBooks: TunisiaInvoiceBook[] = [];
      
      // Create books from 013100 to 013600 (Books 1-10), 50 pages each
      for (let bookNum = 1; bookNum <= 10; bookNum++) {
        const startNum = 13100 + (bookNum - 1) * 50;
        const endNum = startNum + 49;
        
        const available: string[] = [];
        for (let i = startNum; i <= endNum; i++) {
          available.push(i.toString().padStart(6, '0'));
        }

        const book: TunisiaInvoiceBook = {
          id: `tunisia-book-${bookNum}`,
          bookNumber: `Book ${bookNum}`,
          startPage: startNum.toString().padStart(6, '0'),
          endPage: endNum.toString().padStart(6, '0'),
          available,
          status: "available",
          country: "Tunisia",
          totalPages: 50
        };

        defaultBooks.push(book);
      }

      this.saveBooks(defaultBooks);
    }
  }

  static loadBooks(): TunisiaInvoiceBook[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading Tunisia invoice books:", error);
      return [];
    }
  }

  static saveBooks(books: TunisiaInvoiceBook[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error("Error saving Tunisia invoice books:", error);
    }
  }

  static assignBookToUser(bookId: string, username: string): TunisiaBookAssignment | null {
    const books = this.loadBooks();
    const book = books.find(b => b.id === bookId && b.status === "available");
    
    if (!book) {
      return null;
    }

    // Update book status
    book.status = "assigned";
    book.assignedTo = username;
    book.assignedDate = new Date().toISOString();

    this.saveBooks(books);

    // Create assignment record
    const assignment: TunisiaBookAssignment = {
      bookId: book.id,
      bookNumber: book.bookNumber,
      username,
      assignedDate: book.assignedDate,
      availablePages: [...book.available]
    };

    this.saveAssignment(assignment);
    return assignment;
  }

  static loadAssignments(): TunisiaBookAssignment[] {
    try {
      const stored = localStorage.getItem(this.ASSIGNMENTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading Tunisia book assignments:", error);
      return [];
    }
  }

  static saveAssignment(assignment: TunisiaBookAssignment): void {
    const assignments = this.loadAssignments();
    const existingIndex = assignments.findIndex(a => a.bookId === assignment.bookId);
    
    if (existingIndex >= 0) {
      assignments[existingIndex] = assignment;
    } else {
      assignments.push(assignment);
    }

    try {
      localStorage.setItem(this.ASSIGNMENTS_KEY, JSON.stringify(assignments));
    } catch (error) {
      console.error("Error saving Tunisia book assignment:", error);
    }
  }

  static getAssignmentByUser(username: string): TunisiaBookAssignment | null {
    const assignments = this.loadAssignments();
    return assignments.find(a => a.username === username) || null;
  }

  static useInvoiceNumber(username: string, invoiceNumber: string): boolean {
    const assignment = this.getAssignmentByUser(username);
    if (!assignment) {
      return false;
    }

    const pageIndex = assignment.availablePages.indexOf(invoiceNumber);
    if (pageIndex === -1) {
      return false;
    }

    // Remove the used page
    assignment.availablePages.splice(pageIndex, 1);
    this.saveAssignment(assignment);

    // Update the book's available pages
    const books = this.loadBooks();
    const book = books.find(b => b.id === assignment.bookId);
    if (book) {
      const bookPageIndex = book.available.indexOf(invoiceNumber);
      if (bookPageIndex >= 0) {
        book.available.splice(bookPageIndex, 1);
        
        // Mark book as completed if no pages left
        if (book.available.length === 0) {
          book.status = "completed";
        }
        
        this.saveBooks(books);
      }
    }

    return true;
  }

  static getAvailableBooks(): TunisiaInvoiceBook[] {
    return this.loadBooks().filter(book => book.status === "available");
  }

  static getAssignedBooks(): TunisiaInvoiceBook[] {
    return this.loadBooks().filter(book => book.status === "assigned");
  }

  static getAllBooks(): TunisiaInvoiceBook[] {
    return this.loadBooks();
  }
}