
import { Badge } from "@/components/ui/badge";

interface JobStatusBadgeProps {
  status: string;
}

const JobStatusBadge = ({ status }: JobStatusBadgeProps) => {
  switch(status) {
    case 'PENDING':
      return <Badge className="bg-yellow-500">PENDING</Badge>;
    case 'IN_PROGRESS':
      return <Badge className="bg-orange-500">IN PROGRESS</Badge>;
    case 'SCHEDULED':
      return <Badge className="bg-blue-500">SCHEDULED</Badge>;
    case 'COMPLETED':
      return <Badge className="bg-green-500">COMPLETED</Badge>;
    case 'CANCELLED':
      return <Badge className="bg-red-500">CANCELLED</Badge>;
    default:
      return <Badge className="bg-gray-500">{status}</Badge>;
  }
};

export default JobStatusBadge;
