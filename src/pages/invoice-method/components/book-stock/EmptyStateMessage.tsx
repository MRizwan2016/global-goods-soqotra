
import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateMessageProps {
  onAddNewBook: () => void;
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({ onAddNewBook }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 border border-gray-200 rounded-lg">
      <p className="text-gray-500 mb-4">No active books found.</p>
      <Button 
        onClick={onAddNewBook}
        className="bg-blue-500 hover:bg-blue-600"
      >
        Add New Book
      </Button>
    </div>
  );
};

export default EmptyStateMessage;
