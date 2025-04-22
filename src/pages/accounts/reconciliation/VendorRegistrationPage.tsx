
import React from "react";
import { user } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";
import VendorForm from "./components/vendor/VendorForm";

const VendorRegistrationPage: React.FC = () => {
  return (
    <RegistrationLayout
      title="Vendor Registration"
      subtitle="Register and manage vendors for reconciliation"
      icon={<user className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <VendorForm />
    </RegistrationLayout>
  );
};

export default VendorRegistrationPage;
