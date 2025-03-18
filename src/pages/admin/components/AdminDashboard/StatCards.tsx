
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserIcon, CheckCircle, XCircle } from "lucide-react";
import { User } from "@/types/auth";

interface StatCardsProps {
  users: User[];
}

const StatCards = ({ users }: StatCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
            <div className="text-2xl font-bold">{users.length}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div className="text-2xl font-bold">{users.filter(user => user.isActive).length}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending Activation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-yellow-500" />
            <div className="text-2xl font-bold">{users.filter(user => !user.isActive).length}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
