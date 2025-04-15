
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  FileDown,
  ArrowLeft
} from "lucide-react";

interface EntriesControlProps {
  entriesPerPage: number;
  setEntriesPerPage: (value: number) => void;
}

const EntriesControl: React.FC<EntriesControlProps> = ({
  entriesPerPage,
  setEntriesPerPage
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Show</span>
        <Select value={entriesPerPage.toString()} onValueChange={(value) => setEntriesPerPage(Number(value))}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="50" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm">entries</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          BACK
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => {
            // Export to CSV functionality could be added here
            alert("Export functionality will be implemented here");
          }}
        >
          <FileDown size={16} />
          EXPORT
        </Button>
      </div>
    </div>
  );
};

export default EntriesControl;
