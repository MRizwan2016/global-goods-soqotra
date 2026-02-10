
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const FormHeader = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <Link to="/kenya/deliveries">
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#1e2a3a]">
          Create New Delivery
        </h1>
      </div>
      <p className="text-gray-500">
        Add new cargo for delivery in Kenya - link to an existing invoice or create a new record
      </p>
    </div>
  );
};

export default FormHeader;
