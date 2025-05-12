
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, User } from "lucide-react";
import { Book } from "../../../booking-form-stock/types";

interface ActionButtonsProps {
  book: Book;
  onViewDetails: (book: Book) => void;
  onAssignUser: (book: Book) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ book, onViewDetails, onAssignUser }) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2"
        onClick={() => onViewDetails(book)}
      >
        <FileText className="h-4 w-4" />
        <span className="sr-only">View</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2"
        onClick={() => onAssignUser(book)}
      >
        <User className="h-4 w-4" />
        <span className="sr-only">Assign</span>
      </Button>
    </div>
  );
};

interface AssignUserButtonProps {
  book: Book;
  onAssignUser: (book: Book) => void;
}

export const AssignUserButton: React.FC<AssignUserButtonProps> = ({ book, onAssignUser }) => {
  if (book.assignedTo) {
    return <span>{book.assignedTo}</span>;
  }
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onAssignUser(book)}
      className="text-blue-600 hover:text-blue-800"
    >
      <User className="h-4 w-4 mr-1" />
      Assign User
    </Button>
  );
};

export const StatusBadge: React.FC = () => {
  return (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      ACTIVE
    </span>
  );
};
