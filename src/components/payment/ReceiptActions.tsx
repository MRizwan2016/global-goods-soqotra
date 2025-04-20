
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2 } from "lucide-react";

interface ReceiptActionsProps {
  onPrint: () => void;
  onDownload: () => void;
  onShare: () => void;
}

const ReceiptActions: React.FC<ReceiptActionsProps> = ({ onPrint, onDownload, onShare }) => {
  return (
    <DialogFooter className="p-4 bg-gray-50 print:hidden">
      <div className="flex gap-2 w-full">
        <Button 
          onClick={onPrint}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          <Printer className="mr-2" size={16} />
          Print Receipt
        </Button>
        <Button 
          onClick={onDownload} 
          variant="outline" 
          className="flex-1"
        >
          <Download className="mr-2" size={16} />
          Download PDF
        </Button>
        <Button 
          onClick={onShare}
          variant="outline" 
          className="w-10 p-0"
        >
          <Share2 size={16} />
        </Button>
      </div>
    </DialogFooter>
  );
};

export default ReceiptActions;
