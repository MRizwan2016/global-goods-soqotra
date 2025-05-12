
import React from "react";
import { Book } from "./types";
import ActiveBooksTable from "../components/book-stock/table/ActiveBooksTable";
import AssignedBooksTable from "../components/book-stock/table/AssignedBooksTable";
import CompletedBooksTable from "../components/book-stock/table/CompletedBooksTable";
import { ActionButtons, AssignUserButton, StatusBadge } from "../components/book-stock/table/TableComponents";

interface BookingTabTableProps {
  books: Book[];
  tab: "active" | "assigned" | "completed";
  onAssignUser: (book: Book) => void;
  onViewDetails: (book: Book) => void;
}

const BookingTabTable: React.FC<BookingTabTableProps> = ({ books, tab, onAssignUser, onViewDetails }) => {
  // For completed tab, we use a specific table with hardcoded values
  if (tab === "completed") {
    return <CompletedBooksTable />;
  }

  // Filter books based on tab type
  const filteredBooks = tab === "active"
    ? books.filter(book => book.status === "ACTIVE" && !book.assignedTo)
    : books.filter(book => book.status === "ACTIVE" && !!book.assignedTo);
  
  console.log(`BookingTabTable - ${tab} tab:`, { 
    allBooks: books,
    filteredBooks: filteredBooks
  });

  // Use the appropriate table component based on tab
  if (tab === "active") {
    return (
      <ActiveBooksTable 
        books={filteredBooks}
        onAssignUser={onAssignUser}
        onViewDetails={onViewDetails}
      />
    );
  }
  
  return (
    <AssignedBooksTable 
      books={filteredBooks}
      onAssignUser={onAssignUser}
      onViewDetails={onViewDetails}
    />
  );
};

export default BookingTabTable;
