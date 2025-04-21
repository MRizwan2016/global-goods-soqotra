
export interface User {
  id: string;
  name: string;
}

export interface Book {
  bookNumber: string;
  startPage: string;
  endPage: string;
  available: string[];
  assignedTo: string;
  status?: string;
}
