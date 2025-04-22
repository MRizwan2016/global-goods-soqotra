
import React from "react";
import { Building } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";

const FinancialInstitutionsPage: React.FC = () => {
  return (
    <RegistrationLayout
      title="Financial Institutions"
      subtitle="Manage financial institutions for reconciliation"
      icon={<Building className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <div className="space-y-4">
        <p className="text-gray-500">
          Financial institutions management interface will be implemented here.
        </p>
      </div>
    </RegistrationLayout>
  );
};

export default FinancialInstitutionsPage;
