
import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface WeightBasedPricingTabProps {
  formState: {
    kenyaMombasaPrice: string;
    kenyaMombasaDocFee: string;
    kenyaNairobiPrice: string;
    kenyaNairobiDocFee: string;
    eritreaAsmaraPrice: string;
    eritreaAsmaraDocFee: string;
    eritreaHargeisaPrice: string;
    eritreaHargeisaDocFee: string;
    sudanPortSudanPrice: string;
    sudanPortSudanDocFee: string;
  };
  totals: {
    kenyaMombasa: string;
    kenyaNairobi: string;
    eritreaAsmara: string;
    eritreaHargeisa: string;
    sudanPortSudan: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WeightBasedPricingTab: React.FC<WeightBasedPricingTabProps> = ({ formState, totals, onChange }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h4 className="font-medium text-green-700 mb-2">
            Weight-Based Pricing (per kg)
          </h4>
          <p className="text-sm text-gray-500">
            These countries use weight-based pricing for shipments.
          </p>
        </div>
        
        {/* Kenya Pricing */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h5 className="font-medium mb-2">Kenya</h5>
          
          {/* Mombasa */}
          <div className="mb-4">
            <h6 className="text-sm text-gray-700 mb-1">Mombasa</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Price:</label>
                <Input 
                  name="kenyaMombasaPrice"
                  value={formState.kenyaMombasaPrice}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Documents Fee:</label>
                <Input 
                  name="kenyaMombasaDocFee"
                  value={formState.kenyaMombasaDocFee}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Total:</label>
                <Input 
                  value={totals.kenyaMombasa}
                  readOnly
                  className="border border-gray-300 bg-gray-50 font-bold"
                />
              </div>
            </div>
          </div>
          
          {/* Nairobi */}
          <div>
            <h6 className="text-sm text-gray-700 mb-1">Nairobi</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Price:</label>
                <Input 
                  name="kenyaNairobiPrice"
                  value={formState.kenyaNairobiPrice}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Documents Fee:</label>
                <Input 
                  name="kenyaNairobiDocFee"
                  value={formState.kenyaNairobiDocFee}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Total:</label>
                <Input 
                  value={totals.kenyaNairobi}
                  readOnly
                  className="border border-gray-300 bg-gray-50 font-bold"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Eritrea Pricing */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h5 className="font-medium mb-2">Eritrea</h5>
          
          {/* Asmara */}
          <div className="mb-4">
            <h6 className="text-sm text-gray-700 mb-1">Asmara</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Price:</label>
                <Input 
                  name="eritreaAsmaraPrice"
                  value={formState.eritreaAsmaraPrice}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Documents Fee:</label>
                <Input 
                  name="eritreaAsmaraDocFee"
                  value={formState.eritreaAsmaraDocFee}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Total:</label>
                <Input 
                  value={totals.eritreaAsmara}
                  readOnly
                  className="border border-gray-300 bg-gray-50 font-bold"
                />
              </div>
            </div>
          </div>
          
          {/* Hargeisa */}
          <div>
            <h6 className="text-sm text-gray-700 mb-1">Hargeisa</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Price:</label>
                <Input 
                  name="eritreaHargeisaPrice"
                  value={formState.eritreaHargeisaPrice}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Documents Fee:</label>
                <Input 
                  name="eritreaHargeisaDocFee"
                  value={formState.eritreaHargeisaDocFee}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Total:</label>
                <Input 
                  value={totals.eritreaHargeisa}
                  readOnly
                  className="border border-gray-300 bg-gray-50 font-bold"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sudan Pricing */}
        <div className="border-t border-gray-200 pt-4">
          <h5 className="font-medium mb-2">Sudan</h5>
          
          {/* Port Sudan */}
          <div>
            <h6 className="text-sm text-gray-700 mb-1">Port Sudan</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Price:</label>
                <Input 
                  name="sudanPortSudanPrice"
                  value={formState.sudanPortSudanPrice}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Documents Fee:</label>
                <Input 
                  name="sudanPortSudanDocFee"
                  value={formState.sudanPortSudanDocFee}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Total:</label>
                <Input 
                  value={totals.sudanPortSudan}
                  readOnly
                  className="border border-gray-300 bg-gray-50 font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightBasedPricingTab;
