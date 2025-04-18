
import { CircleDashed, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DeliveryStatus } from "../../types/deliveryTracking";
import { getStatusBadge, formatStatusLabel } from "../../utils/statusUtils";

interface TimelineTabProps {
  statuses: DeliveryStatus[];
}

const TimelineTab = ({ statuses }: TimelineTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Status Timeline</CardTitle>
        <CardDescription>Track the complete delivery journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {statuses.map((status: DeliveryStatus) => (
              <div key={status.id} className="relative pl-10">
                <div className="absolute left-0 p-1 bg-white rounded-full border-2 border-blue-500">
                  <CircleDashed size={18} className="text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">
                      {formatStatusLabel(status.status)}
                    </div>
                    {getStatusBadge(status.status)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(status.timestamp).toLocaleString()}
                  </div>
                  {status.location && (
                    <div className="text-xs flex items-center mt-1">
                      <MapPin size={12} className="mr-1 text-gray-500" />
                      {status.location}
                    </div>
                  )}
                  {status.notes && (
                    <div className="text-sm mt-1">{status.notes}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">Updated by:</span> {status.updatedBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
