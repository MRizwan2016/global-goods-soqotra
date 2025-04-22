
import React from "react";
import { Banknote } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";
import BankDetailsForm from "./components/bank/BankDetailsForm";

const BankDetailsPage: React.FC = () => {
  return (
    <RegistrationLayout
      title="Bank Details"
      subtitle="Manage bank account details for reconciliation"
      icon={<Banknote className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <BankDetailsForm />
    </RegistrationLayout>
  );
};

export default BankDetailsPage;
