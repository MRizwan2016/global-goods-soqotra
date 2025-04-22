
import React from "react";
import { Users } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";
import { useParams } from "react-router-dom";

const CustomerRegistrationPage: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const isExport = !type || type === "exports";
  
  const title = isExport 
    ? "Export Customer Registration" 
    : "Import Customer Registration";
  
  const subtitle = isExport
    ? "Register and manage export customers for reconciliation"
    : "Register and manage import customers for reconciliation";

  return (
    <RegistrationLayout
      title={title}
      subtitle={subtitle}
      icon={<Users className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <div className="space-y-4">
        <p className="text-gray-500">
          {isExport ? "Export" : "Import"} customer registration form will be implemented here.
        </p>
      </div>
    </RegistrationLayout>
  );
};

export default CustomerRegistrationPage;
