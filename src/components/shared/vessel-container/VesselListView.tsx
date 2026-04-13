
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountryConfig, VesselData } from "./types";

interface VesselListViewProps {
  config: CountryConfig;
  vessels: VesselData[];
  selectedSector: string;
  setSelectedSector: (v: string) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  entriesPerPage: number;
  setEntriesPerPage: (v: number) => void;
  onAddNew: () => void;
  onEditVessel?: (vessel: VesselData) => void;
  onLoadVessel?: (vessel: VesselData) => void;
  onViewVesselManifest?: (vessel: VesselData) => void;
}

const VesselListView: React.FC<VesselListViewProps> = ({
  config,
  vessels,
  selectedSector,
  setSelectedSector,
  searchTerm,
  setSearchTerm,
  entriesPerPage,
  setEntriesPerPage,
  onAddNew,
  onEditVessel,
  onLoadVessel,
  onViewVesselManifest,
}) => {
  const displayVessels = vessels.slice(0, entriesPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-green-50 border-b border-green-200 px-4 py-3">
        <h3 className="font-bold text-green-800">
          <span className="text-green-700">View Vessel List</span>{" "}
          {vessels.length === 0 && <span className="text-gray-500 font-normal">Record not found.</span>}
        </h3>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-48 bg-blue-500 text-white hover:bg-blue-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.sectors.map(s => (
                  <SelectItem key={s.code} value={s.code}>{s.label} : {s.code}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onAddNew} className="bg-blue-700 hover:bg-blue-800 text-white px-6 font-bold">
            Add New
          </Button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm">
            Show{" "}
            <select 
              value={entriesPerPage} 
              onChange={e => setEntriesPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{" "}
            entries
          </div>
          <div className="flex items-center gap-2 text-sm">
            Search:
            <Input 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="w-48 h-8" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-2 py-2 text-left font-bold">Num</th>
                <th className="border px-2 py-2 text-left font-bold">RUNNING NUMBER</th>
                <th className="border px-2 py-2 text-left font-bold">VESSEL NAME</th>
                <th className="border px-2 py-2 text-left font-bold">VOYAGE</th>
                <th className="border px-2 py-2 text-left font-bold">P.O.L</th>
                <th className="border px-2 py-2 text-left font-bold">P.O.D</th>
                <th className="border px-2 py-2 text-left font-bold">DIR/MIX</th>
                <th className="border px-2 py-2 text-left font-bold">E.T.D</th>
                <th className="border px-2 py-2 text-left font-bold">E.T.A</th>
                <th className="border px-2 py-2 text-left font-bold">LOAD DATE</th>
                <th className="border px-2 py-2 text-left font-bold">MODIFY</th>
              </tr>
            </thead>
            <tbody>
              {displayVessels.length > 0 ? (
                displayVessels.map((v, i) => (
                  <tr key={v.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1.5">{i + 1}</td>
                    <td className="border px-2 py-1.5">{v.runningNumber}</td>
                    <td className="border px-2 py-1.5">{v.vesselName}</td>
                    <td className="border px-2 py-1.5">{v.voyage}</td>
                    <td className="border px-2 py-1.5">{v.portOfLoading}</td>
                    <td className="border px-2 py-1.5">{v.portOfDischarge}</td>
                    <td className="border px-2 py-1.5">{v.direction}</td>
                    <td className="border px-2 py-1.5">{v.etd}</td>
                    <td className="border px-2 py-1.5">{v.eta}</td>
                    <td className="border px-2 py-1.5">{v.loadDate || ""}</td>
                    <td className="border px-2 py-1.5">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => onEditVessel?.(v)}>Edit</Button>
                        <Button size="sm" className="text-xs h-7 bg-green-600 hover:bg-green-700 text-white" onClick={() => onLoadVessel?.(v)}>Load</Button>
                        <Button size="sm" className="text-xs h-7 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => onViewVesselManifest?.(v)}>Manifest</Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="border px-2 py-4 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-blue-500 text-white">
                <th className="border px-2 py-2 text-left font-bold">Num</th>
                <th className="border px-2 py-2 text-left font-bold">RUNNING NUMBER</th>
                <th className="border px-2 py-2 text-left font-bold">VESSEL NAME</th>
                <th className="border px-2 py-2 text-left font-bold">VOYAGE</th>
                <th className="border px-2 py-2 text-left font-bold">P.O.L</th>
                <th className="border px-2 py-2 text-left font-bold">P.O.D</th>
                <th className="border px-2 py-2 text-left font-bold">DIR/MIX</th>
                <th className="border px-2 py-2 text-left font-bold">E.T.D</th>
                <th className="border px-2 py-2 text-left font-bold">E.T.A</th>
                <th className="border px-2 py-2 text-left font-bold">LOAD DATE</th>
                <th className="border px-2 py-2 text-left font-bold">MODIFY</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <span>Showing {displayVessels.length > 0 ? 1 : 0} to {displayVessels.length} of {vessels.length} entries</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VesselListView;
