
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingTabTable from "../../booking-form-stock/BookingTabTable";
import EmptyStateMessage from "./EmptyStateMessage";
import { Book } from "../../booking-form-stock/types";

interface BookStockTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
  books: Book[];
  onAssignUser: (book: Book) => void;
  onViewDetails: (book: Book) => void;
  onAddNewBook: () => void;
  onCancelBook?: (book: any) => void;
  onDeleteBook?: (book: any) => void;
  onReassignBook?: (book: Book) => void;
}

const BookStockTabs: React.FC<BookStockTabsProps> = ({
  selectedTab,
  onTabChange,
  books,
  onAssignUser,
  onViewDetails,
  onAddNewBook,
  onCancelBook,
  onDeleteBook
}) => {
  return (
    <Tabs
      value={selectedTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="active">Active Books</TabsTrigger>
        <TabsTrigger value="assigned">Assigned</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="space-y-4 mt-4">
        {books.length > 0 ? (
          <BookingTabTable
            books={books}
            tab="active"
            onAssignUser={onAssignUser}
            onViewDetails={onViewDetails}
            onCancelBook={onCancelBook}
            onDeleteBook={onDeleteBook}
          />
        ) : (
          <EmptyStateMessage onAddNewBook={onAddNewBook} />
        )}
      </TabsContent>
      
      <TabsContent value="assigned" className="space-y-4 mt-4">
        {books.filter(book => book.assignedTo).length > 0 ? (
          <BookingTabTable
            books={books}
            tab="assigned"
            onAssignUser={onAssignUser}
            onViewDetails={onViewDetails}
            onCancelBook={onCancelBook}
            onDeleteBook={onDeleteBook}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-500">No assigned books found.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-4 mt-4">
        <BookingTabTable
          books={books}
          tab="completed"
          onAssignUser={onAssignUser}
          onViewDetails={onViewDetails}
          onCancelBook={onCancelBook}
          onDeleteBook={onDeleteBook}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BookStockTabs;
