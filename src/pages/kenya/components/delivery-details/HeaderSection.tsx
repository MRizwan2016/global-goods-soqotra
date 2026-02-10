
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatStatusLabel, getStatusBadge, getPaymentBadge } from "../../utils/statusUtils";

interface HeaderSectionProps {
  invoiceNumber: string;
  id: string;
  invoiceId: string;
  latestStatus: string;
  paymentStatus: string;
}

const HeaderSection = ({ 
  invoiceNumber, 
  id, 
  invoiceId, 
  latestStatus, 
  paymentStatus 
}: HeaderSectionProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link to="/kenya/deliveries">
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#1e2a3a]">
            Delivery {invoiceNumber}
          </h1>
          {getStatusBadge(latestStatus || 'pending')}
          {getPaymentBadge(paymentStatus)}
        </div>
        <p className="text-gray-500 text-sm">
          Tracking ID: {id} | Invoice ID: {invoiceId}
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
