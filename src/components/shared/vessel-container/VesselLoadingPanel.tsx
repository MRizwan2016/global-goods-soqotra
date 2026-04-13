
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ship } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { VesselData, ContainerData } from "./types";

interface VesselLoadingPanelProps {
  vessel: VesselData;
  allContainers: ContainerData[];
  onBack: () => void;
  onLoadComplete: (vesselId: string, containerRunningNumbers: string[]) => void;
}

const VesselLoadingPanel: React.FC<VesselLoadingPanelProps> = ({
  vessel,
  allContainers,
  onBack,
  onLoadComplete,
}) => {
  const alreadyLoaded = new Set(vessel.containers || []);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const availableContainers = allContainers.filter(
    (c) => !alreadyLoaded.has(c.runningNumber) && !alreadyLoaded.has(c.id)
  );

  const loadedContainers = allContainers.filter(
    (c) => alreadyLoaded.has(c.runningNumber) || alreadyLoaded.has(c.id)
  );

  const toggleSelect = (runningNumber: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(runningNumber)) next.delete(runningNumber);
      else next.add(runningNumber);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === availableContainers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(availableContainers.map((c) => c.runningNumber)));
    }
  };

  const handleConfirmLoading = () => {
    if (selectedIds.size === 0) {
      toast.error("Please select at least one container");
      return;
    }
    const allContainerRNs = [...Array.from(alreadyLoaded), ...Array.from(selectedIds)];
    onLoadComplete(vessel.id, allContainerRNs);
    toast.success(`${selectedIds.size} container(s) loaded into vessel ${vessel.vesselName}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ship className="text-blue-600" size={20} />
          <h3 className="font-bold text-blue-800">
            Load Containers into Vessel: {vessel.vesselName} ({vessel.runningNumber})
          </h3>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} /> Go Back
        </Button>
      </div>

      <div className="p-4">
        {/* Vessel summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 bg-blue-50 p-3 rounded text-sm">
          <div><span className="font-medium text-gray-600">Vessel:</span> {vessel.vesselName}</div>
          <div><span className="font-medium text-gray-600">Voyage:</span> {vessel.voyage}</div>
          <div><span className="font-medium text-gray-600">ETD:</span> {vessel.etd}</div>
          <div><span className="font-medium text-gray-600">ETA:</span> {vessel.eta}</div>
        </div>

        {/* Already loaded containers */}
        {loadedContainers.length > 0 && (
          <div className="mb-4">
            <h4 className="font-bold text-green-700 mb-2">Already Loaded ({loadedContainers.length})</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border px-2 py-1.5 text-left">Running #</th>
                    <th className="border px-2 py-1.5 text-left">Container #</th>
                    <th className="border px-2 py-1.5 text-left">Seal #</th>
                    <th className="border px-2 py-1.5 text-left">Type</th>
                    <th className="border px-2 py-1.5 text-left">DIR/MIX</th>
                  </tr>
                </thead>
                <tbody>
                  {loadedContainers.map((c) => (
                    <tr key={c.id} className="bg-green-50">
                      <td className="border px-2 py-1">{c.runningNumber}</td>
                      <td className="border px-2 py-1">{c.containerNumber}</td>
                      <td className="border px-2 py-1">{c.sealNumber}</td>
                      <td className="border px-2 py-1">{c.containerType}</td>
                      <td className="border px-2 py-1">{c.direction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Available containers to load */}
        <h4 className="font-bold text-blue-700 mb-2">Available Containers ({availableContainers.length})</h4>
        {availableContainers.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No available containers to load.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="border px-2 py-1.5 text-center w-10" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedIds.size === availableContainers.length && availableContainers.length > 0}
                        onCheckedChange={toggleAll}
                      />
                    </th>
                    <th className="border px-2 py-1.5 text-left">Running #</th>
                    <th className="border px-2 py-1.5 text-left">Container #</th>
                    <th className="border px-2 py-1.5 text-left">Seal #</th>
                    <th className="border px-2 py-1.5 text-left">Type</th>
                    <th className="border px-2 py-1.5 text-left">DIR/MIX</th>
                    <th className="border px-2 py-1.5 text-left">ETD</th>
                    <th className="border px-2 py-1.5 text-left">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {availableContainers.map((c, i) => (
                    <tr
                      key={c.id}
                      className={`cursor-pointer ${selectedIds.has(c.runningNumber) ? "bg-blue-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      onClick={() => toggleSelect(c.runningNumber)}
                    >
                      <td className="border px-2 py-1 text-center" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.has(c.runningNumber)}
                          onCheckedChange={() => toggleSelect(c.runningNumber)}
                        />
                      </td>
                      <td className="border px-2 py-1">{c.runningNumber}</td>
                      <td className="border px-2 py-1">{c.containerNumber}</td>
                      <td className="border px-2 py-1">{c.sealNumber}</td>
                      <td className="border px-2 py-1">{c.containerType}</td>
                      <td className="border px-2 py-1">{c.direction}</td>
                      <td className="border px-2 py-1">{c.etd}</td>
                      <td className="border px-2 py-1">{c.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={handleConfirmLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 font-bold"
                disabled={selectedIds.size === 0}
              >
                Confirm Loading ({selectedIds.size} selected)
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VesselLoadingPanel;
