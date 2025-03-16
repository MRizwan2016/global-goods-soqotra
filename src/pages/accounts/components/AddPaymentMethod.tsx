
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AddPaymentMethod = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center h-full py-6">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <Plus className="h-6 w-6 text-gray-500" />
        </div>
        <CardTitle className="text-lg text-center mb-2">Add New Payment Method</CardTitle>
        <CardDescription className="text-center mb-4">
          Configure additional payment options for your customers
        </CardDescription>
        <Button variant="outline">Configure</Button>
      </CardContent>
    </Card>
  );
};

export default AddPaymentMethod;
