
import React from 'react';
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow,
  InvoiceTableHead,
  InvoiceTableCell
} from "@/components/ui/table";
import { BoxType } from '../hooks/useSellingRateForm';

interface RatesTableProps {
  districts: string[];
  rateBoxes: BoxType[];
  districtRates: {[key: string]: {[key: string]: string}};
  handleRateChange: (district: string, boxId: string, value: string) => void;
}

const RatesTable: React.FC<RatesTableProps> = ({ 
  districts, 
  rateBoxes, 
  districtRates, 
  handleRateChange 
}) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-soqotra-navy text-white hover:bg-soqotra-navy/90">
            <InvoiceTableHead className="w-48 text-white">DISTRICT/ZONE</InvoiceTableHead>
            {rateBoxes.map(box => (
              <InvoiceTableHead key={box.id} className="text-white">
                {box.name}
              </InvoiceTableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {districts.map(district => (
            <TableRow key={district} className="hover:bg-blue-50">
              <InvoiceTableCell className="font-medium text-soqotra-slate">{district}</InvoiceTableCell>
              {rateBoxes.map(box => (
                <InvoiceTableCell key={box.id}>
                  <Input
                    type="number"
                    value={districtRates[district]?.[box.id] || "0"}
                    onChange={(e) => handleRateChange(district, box.id, e.target.value)}
                    className="border border-gray-300 w-full focus:border-soqotra-blue focus:ring-1 focus:ring-soqotra-blue"
                  />
                </InvoiceTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RatesTable;
