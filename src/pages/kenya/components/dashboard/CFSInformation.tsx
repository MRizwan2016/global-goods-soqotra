
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CFSInformation = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle>Mombasa CFS</CardTitle>
          <CardDescription>Container Freight Station near Mombasa Sea Port</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Available Space:</div>
              <div className="font-medium">75%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Cargo Volume:</div>
              <div className="font-medium">450 m³</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Shipments Handling:</div>
              <div className="font-medium">125 per month</div>
            </div>
            <div className="mt-4">
              <Link to="/kenya/mombasa-cfs">
                <Button variant="outline" size="sm" className="w-full">
                  Manage Mombasa CFS
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle>Nairobi CFS</CardTitle>
          <CardDescription>Inland Container Depot for Nairobi Distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Available Space:</div>
              <div className="font-medium">60%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Cargo Volume:</div>
              <div className="font-medium">320 m³</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Shipments Handling:</div>
              <div className="font-medium">95 per month</div>
            </div>
            <div className="mt-4">
              <Link to="/kenya/nairobi-cfs">
                <Button variant="outline" size="sm" className="w-full">
                  Manage Nairobi CFS
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CFSInformation;
