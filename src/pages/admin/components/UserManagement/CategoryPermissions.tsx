
import React from "react";
import { Grid } from "@/components/ui/grid";
import PermissionToggleCard from "./PermissionToggleCard";
import { User } from "@/types/auth";
import { Database, FileInput, BarChart4, Download, DollarSign, Settings } from "lucide-react";

interface CategoryPermissionsProps {
  user: User;
  toggleUserPermission: (userId: string, permissionType: keyof User['permissions']) => void;
}

const CategoryPermissions = ({ user, toggleUserPermission }: CategoryPermissionsProps) => {
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
    }
  ];

  return (
    <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {permissionCategories.map(category => (
        <PermissionToggleCard
          key={category.key}
          title={category.title}
          icon={category.icon}
          isEnabled={!!user.permissions?.[category.key]}
          onToggle={() => toggleUserPermission(user.id, category.key)}
          id={`${user.id}-${category.key}`}
        />
      ))}
    </Grid>
  );
};

export default CategoryPermissions;
