
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Book } from "../BookingFormStock";

interface ViewBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBook: Book | null;
  onAssignUser: (book: Book) => void;
}

const ViewBookDialog: React.FC<ViewBookDialogProps> = ({
  open,
  onOpenChange,
  selectedBook,
  onAssignUser
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Book #{selectedBook?.bookNumber} Details</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Book Information</h3>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Book Number</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.bookNumber}</dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Start Page</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.startPage}</dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">End Page</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.endPage}</dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Available Pages</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.available.length}</dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">
                  {selectedBook?.assignedTo || "Not assigned"}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Available Invoice Numbers</h3>
            <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
              <ul className="grid grid-cols-2 gap-2">
                {selectedBook?.available.slice(0, 10).map((pageNumber, index) => (
                  <li key={index} className="text-sm text-gray-700 py-1 px-2 bg-white rounded border border-gray-200">
                    {pageNumber}
                  </li>
                ))}
                {selectedBook && selectedBook.available.length > 10 && (
                  <li className="text-sm text-gray-500 py-1 px-2">
                    ...and {selectedBook.available.length - 10} more
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
        {!selectedBook?.assignedTo && selectedBook && (
          <Button onClick={() => {
            onOpenChange(false);
            onAssignUser(selectedBook);
          }}>
            <User className="h-4 w-4 mr-1" />
            Assign User
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ViewBookDialog;
