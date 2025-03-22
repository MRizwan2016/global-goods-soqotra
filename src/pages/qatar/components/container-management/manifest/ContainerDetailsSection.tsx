
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Grid } from "@/components/ui/grid";
import { QatarContainer } from "../../../types/containerTypes";

interface ContainerDetailsSectionProps {
  container: QatarContainer;
  confirmDate: string;
  setConfirmDate: (date: string) => void;
  vgmWeight: string;
  setVgmWeight: (weight: string) => void;
  totalPackages: number;
  totalVolume: number;
  formatVolume: (volume: number) => string;
}

const ContainerDetailsSection: React.FC<ContainerDetailsSectionProps> = ({
  container,
  confirmDate,
  setConfirmDate,
  vgmWeight,
  setVgmWeight,
  totalPackages,
  totalVolume,
  formatVolume,
}) => {
  return (
    <>
      <div className="bg-blue-600 text-white text-center py-2 mb-4 font-bold">
        CONTAINER DETAILS
      </div>
      
      <Grid className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-bold text-gray-700 mb-1 block">SECTOR:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.sector}
              </div>
            </div>
            
            <div>
              <Label className="font-bold text-gray-700 mb-1 block">RUNNING NUMBER:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.runningNumber}
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">CONTAINER NUMBER:</Label>
            <div className="bg-gray-100 border border-gray-300 p-2 rounded">
              {container.containerNumber}
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">SEAL NUMBER:</Label>
            <div className="bg-gray-100 border border-gray-300 p-2 rounded">
              {container.sealNumber}
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">DATE CONFIRM:</Label>
            <Input
              value={confirmDate}
              onChange={(e) => setConfirmDate(e.target.value)}
            />
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">V.G.M. WEIGHT:</Label>
            <Input
              value={vgmWeight}
              onChange={(e) => setVgmWeight(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <div>
            <Label className="font-bold text-gray-700 mb-1 block">CONTAINER TYPE:</Label>
            <div className="bg-blue-500 text-white p-2 rounded text-center font-semibold">
              {container.containerType}
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">DIRECT/ MIX:</Label>
            <div className="bg-blue-500 text-white p-2 rounded text-center font-semibold">
              {container.direction}
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">E.T.D:</Label>
            <div className="bg-gray-100 border border-gray-300 p-2 rounded">
              {container.etd}
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">E.T.A:</Label>
            <div className="bg-gray-100 border border-gray-300 p-2 rounded">
              {container.eta}
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">PACKAGES:</Label>
            <div className="bg-gray-100 border border-gray-300 p-2 rounded">
              {totalPackages}
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">VOLUME:</Label>
            <div className="bg-gray-100 border border-gray-300 p-2 rounded">
              {formatVolume(totalVolume)}
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default ContainerDetailsSection;
