
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
  isDistrictRatesValid?: boolean;
}

const RatesTable: React.FC<RatesTableProps> = ({ 
  districts, 
  rateBoxes, 
  districtRates, 
  handleRateChange,
  isDistrictRatesValid = true
}) => {
  return (
    <div className="mt-8">
      <div className="mb-2">
        <h3 className="text-md font-medium text-soqotra-slate">DISTRICT RATES:</h3>
        {!isDistrictRatesValid && (
          <p className="text-red-500 text-xs mt-1">
            Please ensure all rates are valid positive numbers
          </p>
        )}
      </div>
      <div className="overflow-x-auto">
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
                {rateBoxes.map(box => {
                  // Validate the input value
                  const value = districtRates[district]?.[box.id] || "0";
                  const isInvalid = value !== "" && (isNaN(Number(value)) || Number(value) < 0);
                  
                  return (
                    <InvoiceTableCell key={box.id}>
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => handleRateChange(district, box.id, e.target.value)}
                        className={`border ${isInvalid ? 'border-red-500' : 'border-gray-300'} w-full focus:border-soqotra-blue focus:ring-1 focus:ring-soqotra-blue`}
                      />
                      {isInvalid && (
                        <p className="text-red-500 text-xs mt-1">
                          Must be a positive number
                        </p>
                      )}
                    </InvoiceTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RatesTable;
