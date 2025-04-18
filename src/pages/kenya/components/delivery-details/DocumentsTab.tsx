
import { FileText, FileCheck, Package, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface DocumentsTabProps {
  invoiceNumber: string;
  deliveryId: string;
}

const DocumentsTab = ({ invoiceNumber, deliveryId }: DocumentsTabProps) => {
  const navigate = useNavigate();

  const handleViewDocument = (documentType: string) => {
    switch (documentType) {
      case "invoice":
        // Navigate to the invoice print page with this invoice number
        navigate(`/invoicing/print/${invoiceNumber}`);
        break;
      case "delivery-note":
        // In a real app, this would open the delivery note document
        console.log(`Opening delivery note for delivery ${deliveryId}`);
        break;
      case "cargo-manifest":
        // In a real app, this would open the cargo manifest
        console.log(`Opening cargo manifest for delivery ${deliveryId}`);
        break;
      case "proof-of-delivery":
        // In a real app, this would open the proof of delivery
        console.log(`Opening proof of delivery for delivery ${deliveryId}`);
        break;
      default:
        console.log(`Opening ${documentType} for delivery ${deliveryId}`);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-2">DOCUMENTS</h2>
      <p className="text-gray-500 mb-6">VIEW AND PRINT RELATED DOCUMENTS</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 h-12"
          onClick={() => handleViewDocument("invoice")}
        >
          <FileText className="h-5 w-5" />
          View Invoice #{invoiceNumber}
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 h-12"
          onClick={() => handleViewDocument("delivery-note")}
        >
          <FileCheck className="h-5 w-5" />
          Delivery Note
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 h-12"
          onClick={() => handleViewDocument("cargo-manifest")}
        >
          <Package className="h-5 w-5" />
          Cargo Manifest
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 h-12"
          onClick={() => handleViewDocument("proof-of-delivery")}
        >
          <ClipboardCheck className="h-5 w-5" />
          Proof of Delivery
        </Button>
      </div>
    </Card>
  );
};

export default DocumentsTab;
