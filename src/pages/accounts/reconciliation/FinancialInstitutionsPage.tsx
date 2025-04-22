
import React from "react";
import { Building } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";
import FinancialInstitutionsForm from "./components/financial/FinancialInstitutionsForm";

const FinancialInstitutionsPage: React.FC = () => {
  return (
    <RegistrationLayout
      title="Financial Institutions"
      subtitle="Manage financial institutions for reconciliation"
      icon={<Building className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <FinancialInstitutionsForm />
    </RegistrationLayout>
  );
};

export default FinancialInstitutionsPage;
