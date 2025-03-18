
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
          <TableRow className="bg-blue-600 hover:bg-blue-600">
            <InvoiceTableHead className="w-48">DISTRICT/ZONE</InvoiceTableHead>
            {rateBoxes.map(box => (
              <InvoiceTableHead key={box.id}>
                {box.name}
              </InvoiceTableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {districts.map(district => (
            <TableRow key={district}>
              <InvoiceTableCell className="font-medium">{district}</InvoiceTableCell>
              {rateBoxes.map(box => (
                <InvoiceTableCell key={box.id}>
                  <Input
                    type="number"
                    value={districtRates[district]?.[box.id] || "0"}
                    onChange={(e) => handleRateChange(district, box.id, e.target.value)}
                    className="border border-gray-300 w-full"
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
