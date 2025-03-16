
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentMethodType } from "../types/payment-types";

interface PaymentMethodProps {
  method: PaymentMethodType;
}

const PaymentMethod = ({ method }: PaymentMethodProps) => {
  return (
    <Card key={method.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-md ${method.color}`}>
            {method.icon}
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="mt-2">{method.name}</CardTitle>
        <CardDescription>{method.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {method.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-gray-300"></span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
