
import React from "react";
import { cn } from "@/lib/utils";
import PermissionToggleCard from "./PermissionToggleCard";
import { User } from "@/types/auth";
import { Database, FileInput, BarChart4, Download, DollarSign, Settings, Truck, Building2, Users, Globe, FileText } from "lucide-react";

interface CategoryPermissionsProps {
  user: User;
  toggleUserPermission: (userId: string, permissionType: keyof User['permissions']) => void;
  isAdminOnly?: boolean;
}

const CategoryPermissions = ({ user, toggleUserPermission, isAdminOnly = false }: CategoryPermissionsProps) => {
  const permissionCategories = [
    { 
      key: "masterData" as keyof User['permissions'], 
      title: "Master Data Access", 
      icon: <Database />
    },
    { 
      key: "dataEntry" as keyof User['permissions'], 
      title: "Data Entry Access", 
      icon: <FileInput />
    },
    { 
      key: "reports" as keyof User['permissions'], 
      title: "Reports Access", 
      icon: <BarChart4 />
    },
    { 
      key: "downloads" as keyof User['permissions'], 
      title: "Downloads Access", 
      icon: <Download />
    },
    { 
      key: "accounting" as keyof User['permissions'], 
      title: "Accounting Access", 
      icon: <DollarSign />
    },
    { 
      key: "controlPanel" as keyof User['permissions'], 
      title: "Control Panel Access", 
      icon: <Settings />
    },
    { 
      key: "cargoDelivery" as keyof User['permissions'], 
      title: "Cargo Collection & Delivery", 
      icon: <Truck />
    },
    { 
      key: "accountFunctions" as keyof User['permissions'], 
      title: "Account Functions", 
      icon: <Building2 />
    },
    { 
      key: "accountRegistrations" as keyof User['permissions'], 
      title: "Account Registrations", 
      icon: <Users />
    },
    { 
      key: "accountFinancialEntities" as keyof User['permissions'], 
      title: "Account Financial Entities", 
      icon: <FileText />
    },
    { 
      key: "accountCountryReconciliations" as keyof User['permissions'], 
      title: "Account Country Reconciliations", 
      icon: <Globe />
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4")}>
      {permissionCategories.map(category => (
        <PermissionToggleCard
          key={category.key}
          title={category.title}
          icon={category.icon}
          isEnabled={!!user.permissions?.[category.key]}
          onToggle={() => !isAdminOnly && toggleUserPermission(user.id, category.key)}
          id={`${user.id}-${category.key}`}
          disabled={isAdminOnly}
        />
      ))}
    </div>
  );
};

export default CategoryPermissions;
