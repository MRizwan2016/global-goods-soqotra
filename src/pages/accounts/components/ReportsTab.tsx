
import { BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReportsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Reports</CardTitle>
        <CardDescription>
          Generate and view payment reports and analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
            <BarChart className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Payment Analytics</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Get insights into your payment flows, track payment methods, and analyze payment trends.
          </p>
          <Button variant="outline">
            Generate Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
