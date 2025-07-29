import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UPBDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-soqotra-blue mb-2">UPB Dashboard</h1>
        <p className="text-gray-600">Universal Package Bureau - Logistics Management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              New Invoice
            </CardTitle>
            <CardDescription>
              Create a new UPB invoice with package details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/upb/invoice/add')}
              className="w-full bg-soqotra-blue hover:bg-soqotra-blue/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Invoices
            </CardTitle>
            <CardDescription>
              View and manage recent UPB invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View All Invoices
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Package Management
            </CardTitle>
            <CardDescription>
              Manage package templates and pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Manage Packages
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UPBDashboard;