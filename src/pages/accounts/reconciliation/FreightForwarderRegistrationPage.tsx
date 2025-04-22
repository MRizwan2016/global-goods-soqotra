
import React from "react";
import { Package } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";

const FreightForwarderRegistrationPage: React.FC = () => {
  return (
    <RegistrationLayout
      title="Freight Forwarder Registration"
      subtitle="Register and manage freight forwarders for reconciliation"
      icon={<Package className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <div className="space-y-4">
        <p className="text-gray-500">
          Freight forwarder registration form will be implemented here.
        </p>
      </div>
    </RegistrationLayout>
  );
};

export default FreightForwarderRegistrationPage;
