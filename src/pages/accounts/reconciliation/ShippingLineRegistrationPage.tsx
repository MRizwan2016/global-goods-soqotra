
import React from "react";
import { Ship } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";
import ShippingLineForm from "./components/shipping-line/ShippingLineForm";

const ShippingLineRegistrationPage: React.FC = () => {
  return (
    <RegistrationLayout
      title="Shipping Line Registration"
      subtitle="Register and manage shipping lines for reconciliation"
      icon={<Ship className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <ShippingLineForm />
    </RegistrationLayout>
  );
};

export default ShippingLineRegistrationPage;
