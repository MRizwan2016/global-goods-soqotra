
import { useState } from "react";
import { Truck, ClipboardEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatStatusLabel } from "../../utils/statusUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface DeliveryActionsProps {
  paymentStatus: string;
  invoiceNumber: string;
}

const DeliveryActions = ({ paymentStatus, invoiceNumber }: DeliveryActionsProps) => {
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("processing");
  const [statusNotes, setStatusNotes] = useState("");

  const handleUpdateStatus = () => {
    toast.success(`Status updated to ${formatStatusLabel(newStatus)}`);
    setStatusUpdateOpen(false);
  };
  
  const handleArrangeDelivery = () => {
    if (paymentStatus !== 'completed') {
      toast.error("Cannot arrange delivery: Payment is not completed");
      return;
    }
    toast.success("Delivery has been arranged. Driver will be assigned shortly.");
  };

  return (
    <div className="flex gap-2">
      <Dialog open={statusUpdateOpen} onOpenChange={setStatusUpdateOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-1">
            <ClipboardEdit size={16} />
            Update Status
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Delivery Status</DialogTitle>
            <DialogDescription>
              Select the new status for delivery #{invoiceNumber}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select
                value={newStatus}
                onValueChange={setNewStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="at-warehouse">At Warehouse</SelectItem>
                  <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="notes" className="text-sm font-medium">Notes</label>
              <Textarea 
                id="notes"
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                className="h-20"
                placeholder="Add any notes about this status update"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusUpdateOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Button 
        className={`gap-1 ${paymentStatus !== 'completed' ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        onClick={handleArrangeDelivery}
        disabled={paymentStatus !== 'completed'}
      >
        <Truck size={16} />
        Arrange Delivery
      </Button>
    </div>
  );
};

export default DeliveryActions;
