
import React, { useMemo } from "react";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface PackageListProps {
  packageItems: any[];
  handleRemovePackage: (id: string) => void;
}

const PackageList: React.FC<PackageListProps> = ({
  packageItems,
  handleRemovePackage,
}) => {
  const totals = useMemo(() => {
    let totalVolume = 0;
    let totalWeight = 0;
    let totalPrice = 0;
    let totalDocFee = 0;
    let totalAmount = 0;
    
    packageItems.forEach(item => {
      totalVolume += parseFloat(item.volume || "0");
      totalWeight += parseFloat(item.weight || "0");
      totalPrice += parseFloat(item.price || "0");
      totalDocFee += parseFloat(item.documentsFee || "0");
      totalAmount += parseFloat(item.total || "0");
    });
    
    return {
      volume: totalVolume.toFixed(6),
      weight: totalWeight.toFixed(2),
      price: totalPrice.toFixed(2),
      docFee: totalDocFee.toFixed(2),
      total: totalAmount.toFixed(2)
    };
  }, [packageItems]);

  if (packageItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border border-gray-200 rounded overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-medium">Package</TableCell>
            <TableCell className="font-medium">Dimensions (L×W×H)</TableCell>
            <TableCell className="font-medium">Volume</TableCell>
            <TableCell className="font-medium">Weight</TableCell>
            <TableCell className="font-medium">Price</TableCell>
            <TableCell className="font-medium">Docs Fee</TableCell>
            <TableCell className="font-medium">Total</TableCell>
            <TableCell className="font-medium">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{`${item.length}×${item.width}×${item.height}`}</TableCell>
              <TableCell>{item.volume}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.documentsFee}</TableCell>
              <TableCell className="font-bold">{item.total}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  onClick={() => handleRemovePackage(item.id)}
                  className="bg-red-500 hover:bg-red-600 p-1 h-8 w-8"
                >
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          
          {/* Totals row */}
          <TableRow className="bg-gray-50 font-semibold">
            <TableCell colSpan={2} className="text-right">TOTALS:</TableCell>
            <TableCell>{totals.volume} CBM</TableCell>
            <TableCell>{totals.weight} kg</TableCell>
            <TableCell>{totals.price}</TableCell>
            <TableCell>{totals.docFee}</TableCell>
            <TableCell className="font-bold">{totals.total}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PackageList;
