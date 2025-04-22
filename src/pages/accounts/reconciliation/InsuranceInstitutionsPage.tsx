
import React from "react";
import { FileText } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";

const InsuranceInstitutionsPage: React.FC = () => {
  return (
    <RegistrationLayout
      title="Insurance Institutions"
      subtitle="Manage insurance institutions for reconciliation"
      icon={<FileText className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <div className="space-y-4">
        <p className="text-gray-500">
          Insurance institutions management interface will be implemented here.
        </p>
      </div>
    </RegistrationLayout>
  );
};

export default InsuranceInstitutionsPage;
