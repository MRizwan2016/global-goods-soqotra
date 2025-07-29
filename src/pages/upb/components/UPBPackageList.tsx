import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UPBPackageItem {
  id: string;
  description: string;
  dimensions: string;
  volume: number;
  weight?: number;
  price: number;
  pricingType: 'perKg' | 'perCBM' | 'fixed';
  documentsFee: number;
  total: number;
}

interface UPBPackageListProps {
  packages: UPBPackageItem[];
  onRemovePackage: (id: string) => void;
}

const UPBPackageList: React.FC<UPBPackageListProps> = ({ packages, onRemovePackage }) => {
  if (packages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No packages added yet. Add packages using the form above.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Dimensions</TableHead>
            <TableHead>Volume (CBM)</TableHead>
            <TableHead>Weight (KG)</TableHead>
            <TableHead>Pricing Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Docs Fee</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg.id}>
              <TableCell>{pkg.description}</TableCell>
              <TableCell>{pkg.dimensions}</TableCell>
              <TableCell>{pkg.volume.toFixed(3)}</TableCell>
              <TableCell>{pkg.weight?.toFixed(2) || '-'}</TableCell>
              <TableCell className="capitalize">{pkg.pricingType}</TableCell>
              <TableCell>QAR {pkg.price.toFixed(2)}</TableCell>
              <TableCell>QAR {pkg.documentsFee.toFixed(2)}</TableCell>
              <TableCell className="font-medium">QAR {pkg.total.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemovePackage(pkg.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UPBPackageList;