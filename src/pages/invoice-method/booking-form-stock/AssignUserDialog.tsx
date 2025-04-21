
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User } from "../BookingFormStock";

interface AssignUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBook: any;
  users: User[];
  selectedUserId: string;
  onUserChange: (val: string) => void;
  onConfirm: () => void;
}

const AssignUserDialog: React.FC<AssignUserDialogProps> = ({
  open,
  onOpenChange,
  selectedBook,
  users,
  selectedUserId,
  onUserChange,
  onConfirm
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Assign User to Book #{selectedBook?.bookNumber}</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <p className="text-sm text-gray-600 mb-4">
          Select a user to assign to this booking form book
        </p>
        <Select value={selectedUserId} onValueChange={onUserChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users.map(user => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          Assign User
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default AssignUserDialog;
