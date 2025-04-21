
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface Props {
  onGenerateReport: () => void;
  onAddNewBook: () => void;
}

const BookingFormActions: React.FC<Props> = ({ onGenerateReport, onAddNewBook }) => (
  <div className="flex gap-2">
    <Button variant="outline" className="gap-2" onClick={onGenerateReport}>
      <FileText className="h-4 w-4" />
      Generate Report
    </Button>
    <Button className="gap-2" onClick={onAddNewBook}>
      <Plus className="h-4 w-4" />
      Add New Book
    </Button>
  </div>
);

export default BookingFormActions;
