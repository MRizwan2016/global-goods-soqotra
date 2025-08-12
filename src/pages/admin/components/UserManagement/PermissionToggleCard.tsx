
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
  disabled?: boolean;
}

const PermissionToggleCard = ({ 
  title, 
  icon, 
  isEnabled, 
  onToggle, 
  id,
  disabled = false
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
            onCheckedChange={disabled ? () => {} : onToggle}
            id={id}
            disabled={disabled}
          />
          <label htmlFor={id} className={`ml-2 text-sm font-medium ${disabled ? 'text-muted-foreground' : isEnabled ? 'text-green-600' : 'text-muted-foreground'}`}>
            {disabled ? "Admin Only" : isEnabled ? "Enabled" : "Disabled"}
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionToggleCard;
