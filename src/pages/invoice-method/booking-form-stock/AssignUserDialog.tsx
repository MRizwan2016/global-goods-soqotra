
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "./types";

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
}) => {
  const [manualEntry, setManualEntry] = useState(false);
  const [manualUserName, setManualUserName] = useState("");

  const handleConfirm = () => {
    if (manualEntry && manualUserName.trim()) {
      // Create a temporary user ID for manual entry
      onUserChange(`manual_${Date.now()}`);
      // Store the manual name for later use
      localStorage.setItem(`manual_user_${Date.now()}`, manualUserName.trim());
    }
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign User to Book #{selectedBook?.bookNumber}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Select a user or enter a name manually to assign to this booking form book
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="select-user"
                name="assignment-type"
                checked={!manualEntry}
                onChange={() => setManualEntry(false)}
                className="h-4 w-4 text-blue-600"
              />
              <Label htmlFor="select-user" className="text-sm font-medium">
                Select from existing users
              </Label>
            </div>
            
            {!manualEntry && (
              <Select value={selectedUserId} onValueChange={onUserChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="manual-entry"
                name="assignment-type"
                checked={manualEntry}
                onChange={() => setManualEntry(true)}
                className="h-4 w-4 text-blue-600"
              />
              <Label htmlFor="manual-entry" className="text-sm font-medium">
                Enter name manually
              </Label>
            </div>
            
            {manualEntry && (
              <div className="space-y-2">
                <Label htmlFor="manual-name" className="text-sm">
                  User Name
                </Label>
                <Input
                  id="manual-name"
                  value={manualUserName}
                  onChange={(e) => setManualUserName(e.target.value)}
                  placeholder="Enter user name (e.g., Mr. Yousuf Abdullah)"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={(!selectedUserId && !manualEntry) || (manualEntry && !manualUserName.trim())}
          >
            Assign User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignUserDialog;
