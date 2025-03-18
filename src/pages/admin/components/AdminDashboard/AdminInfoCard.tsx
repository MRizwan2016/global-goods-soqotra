
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/constants/auth";

const AdminInfoCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Administrator Information</CardTitle>
        <CardDescription>
          System administrator details and credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Admin Credentials:</span>
          </div>
          <div className="border p-4 rounded-md bg-gray-50">
            <p className="flex items-center gap-2">
              <span className="font-medium">Username/Email:</span> 
              <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{ADMIN_EMAIL}</span>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <span className="font-medium">Password:</span> 
              <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{ADMIN_PASSWORD}</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-yellow-600 font-medium">Important:</span> For 
            security reasons, please change the default admin password after your first login.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminInfoCard;
