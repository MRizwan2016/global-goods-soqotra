
import React from "react";
import { Banknote } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";

const BankDetailsPage: React.FC = () => {
  return (
    <RegistrationLayout
      title="Bank Details"
      subtitle="Manage bank account details for reconciliation"
      icon={<Banknote className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <div className="space-y-4">
        <p className="text-gray-500">
          Bank details management interface will be implemented here.
        </p>
      </div>
    </RegistrationLayout>
  );
};

export default BankDetailsPage;
