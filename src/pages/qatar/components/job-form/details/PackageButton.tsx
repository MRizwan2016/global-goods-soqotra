
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PackageTable from "./packages/PackageTable";
import { PackageButtonProps } from "./packages/types";

const PackageButton = ({ onSelectPackage }: PackageButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
          <Package size={16} />
          PACKAGES
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[800px] bg-white p-0" align="start">
        <PackageTable onSelectPackage={(pkg) => {
          if (onSelectPackage) {
            onSelectPackage(pkg);
          }
          setIsDropdownOpen(false);
        }} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PackageButton;
