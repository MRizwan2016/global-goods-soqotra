
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import InvoiceTable from "./InvoiceTable";

const StatusTabs = () => {
  return (
    <Tabs defaultValue="unpaid" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
        <TabsTrigger value="partial">Partially Paid</TabsTrigger>
        <TabsTrigger value="paid">Paid</TabsTrigger>
      </TabsList>
      
      <TabsContent value="unpaid" className="space-y-4 mt-4">
        <Card className="p-6">
          <InvoiceTable status="unpaid" />
        </Card>
      </TabsContent>
      
      <TabsContent value="partial" className="space-y-4 mt-4">
        <Card className="p-6">
          <InvoiceTable status="partial" />
        </Card>
      </TabsContent>
      
      <TabsContent value="paid" className="space-y-4 mt-4">
        <Card className="p-6">
          <InvoiceTable status="paid" />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default StatusTabs;
