
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ReceiptHeaderProps {
  onClose: () => void;
}

const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({ onClose }) => {
  return (
    <DialogHeader className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white">
      <div className="flex justify-between items-center">
        <DialogTitle className="text-xl font-bold text-indigo-800">Payment Receipt</DialogTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="print:hidden">
          <X size={18} />
        </Button>
      </div>
    </DialogHeader>
  );
};

export default ReceiptHeader;
