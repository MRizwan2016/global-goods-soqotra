
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
      <div className="flex flex-wrap gap-2 w-full">
        <Button 
          onClick={onPrint}
          className="flex-1 min-w-[110px]"
        >
          <Printer className="mr-2" size={16} />
          Print
        </Button>
        <Button 
          onClick={onDownload} 
          variant="outline" 
          className="flex-1 min-w-[110px]"
        >
          <Download className="mr-2" size={16} />
          PDF
        </Button>
        {onWhatsAppShare && (
          <Button 
            onClick={onWhatsAppShare}
            variant="secondary"
            className="flex-1 min-w-[130px]"
          >
            <MessageCircle className="mr-2" size={16} />
            WhatsApp
          </Button>
        )}
        <Button 
          onClick={onShare}
          variant="outline" 
          className="flex-1 min-w-[100px]"
        >
          <Share2 className="mr-2" size={16} />
          Share
        </Button>
      </div>
    </DialogFooter>
  );
};

export default ReceiptActions;
