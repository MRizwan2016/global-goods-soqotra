
import React from "react";
import AssignUserDialog from "./AssignUserDialog";
import ViewBookDialog from "./ViewBookDialog";
import { Book, User } from "./types";

interface BookStockDialogsProps {
  isAssignDialogOpen: boolean;
  setIsAssignDialogOpen: (open: boolean) => void;
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  selectedBook: Book | null;
  selectedUserId: string;
  onUserChange: (userId: string) => void;
  onConfirmAssignment: () => void;
  onAssignUser: (book: Book) => void;
  users: User[];
}

const BookStockDialogs: React.FC<BookStockDialogsProps> = ({
  isAssignDialogOpen,
  setIsAssignDialogOpen,
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedBook,
  selectedUserId,
  onUserChange,
  onConfirmAssignment,
  onAssignUser,
  users
}) => {
  return (
    <>
      <AssignUserDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        selectedBook={selectedBook}
        users={users}
        selectedUserId={selectedUserId}
        onUserChange={onUserChange}
        onConfirm={onConfirmAssignment}
      />

      <ViewBookDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedBook={selectedBook}
        onAssignUser={onAssignUser}
      />
    </>
  );
};

export default BookStockDialogs;
