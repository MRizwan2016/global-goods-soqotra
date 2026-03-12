
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2, MessageCircle } from "lucide-react";

interface ReceiptActionsProps {
  onPrint: () => void;
  onDownload: () => void;
  onShare: () => void;
  onWhatsAppShare?: () => void;
}

const ReceiptActions: React.FC<ReceiptActionsProps> = ({ onPrint, onDownload, onShare, onWhatsAppShare }) => {
  return (
    <DialogFooter className="p-4 bg-gray-50 print:hidden">
      <div className="flex gap-2 w-full">
        <Button 
          onClick={onPrint}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          <Printer className="mr-2" size={16} />
          Print
        </Button>
        <Button 
          onClick={onDownload} 
          variant="outline" 
          className="flex-1"
        >
          <Download className="mr-2" size={16} />
          PDF
        </Button>
        {onWhatsAppShare && (
          <Button 
            onClick={onWhatsAppShare}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="mr-2" size={16} />
            WhatsApp
          </Button>
        )}
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
