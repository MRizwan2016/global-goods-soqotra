
import React from "react";
import { Button } from "@/components/ui/button";
import BookingFormActions from "../../booking-form-stock/BookingFormActions";

interface BookStockHeaderProps {
  onGenerateReport: () => void;
  onAddNewBook: () => void;
  onViewHistory?: () => void;
}

const BookStockHeader: React.FC<BookStockHeaderProps> = ({ 
  onGenerateReport,
  onAddNewBook,
  onViewHistory 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">BOOKING FORM STOCK MANAGEMENT</h1>
      <div className="flex gap-2">
        <BookingFormActions
          onGenerateReport={onGenerateReport}
          onAddNewBook={onAddNewBook}
        />
        {onViewHistory && (
          <Button variant="outline" onClick={onViewHistory} className="gap-2">
            <span>View History</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookStockHeader;
