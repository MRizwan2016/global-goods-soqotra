
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PackageTable from "../details/packages/PackageTable";
import { PackageInfo } from "../details/packages/types";

interface PackageSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPackage: (pkg: PackageInfo) => void;
}

const PackageSelectionDialog: React.FC<PackageSelectionDialogProps> = ({
  open,
  onOpenChange,
  onSelectPackage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectPackage = (pkg: PackageInfo) => {
    onSelectPackage(pkg);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Package</DialogTitle>
        </DialogHeader>

        <div className="my-4">
          <div className="flex items-center border rounded-md px-3 py-1 mb-4">
            <Search className="h-4 w-4 mr-2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <PackageTable onSelectPackage={handleSelectPackage} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PackageSelectionDialog;
