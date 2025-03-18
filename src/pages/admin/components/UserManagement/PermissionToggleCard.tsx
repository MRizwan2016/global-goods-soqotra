
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface PermissionToggleCardProps {
  title: string;
  icon: React.ReactElement;
  isEnabled: boolean;
  onToggle: () => void;
  id: string;
}

const PermissionToggleCard = ({ 
  title, 
  icon, 
  isEnabled, 
  onToggle, 
  id 
}: PermissionToggleCardProps) => {
  return (
    <Card>
      <CardHeader className="py-2">
        <CardTitle className="text-sm flex items-center">
          {React.cloneElement(icon, { className: "h-4 w-4 mr-2" })}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex items-center mb-2">
          <Switch 
            checked={isEnabled}
            onCheckedChange={onToggle}
            id={id}
          />
          <label htmlFor={id} className="ml-2 text-sm font-medium">
            {isEnabled ? "Enabled" : "Disabled"}
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionToggleCard;
