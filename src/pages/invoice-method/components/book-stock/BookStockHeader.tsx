
import React from "react";
import BookingFormActions from "../../booking-form-stock/BookingFormActions";

interface BookStockHeaderProps {
  onGenerateReport: () => void;
  onAddNewBook: () => void;
  onViewHistory?: () => void;
}

const BookStockHeader: React.FC<BookStockHeaderProps> = ({ 
  onGenerateReport,
  onAddNewBook 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">BOOKING FORM STOCK MANAGEMENT</h1>
      <BookingFormActions
        onGenerateReport={onGenerateReport}
        onAddNewBook={onAddNewBook}
      />
    </div>
  );
};

export default BookStockHeader;
