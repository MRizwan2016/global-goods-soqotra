
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountryConfig, ContainerData } from "./types";

interface ContainerListViewProps {
  config: CountryConfig;
  containers: ContainerData[];
  selectedSector: string;
  setSelectedSector: (v: string) => void;
  confirmFilter: string;
  setConfirmFilter: (v: string) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  entriesPerPage: number;
  setEntriesPerPage: (v: number) => void;
  onAddNew: () => void;
  onLoadContainer?: (container: ContainerData) => void;
  onViewManifest?: (container: ContainerData) => void;
}

const ContainerListView: React.FC<ContainerListViewProps> = ({
  config,
  containers,
  selectedSector,
  setSelectedSector,
  confirmFilter,
  setConfirmFilter,
  searchTerm,
  setSearchTerm,
  entriesPerPage,
  setEntriesPerPage,
  onAddNew,
  onLoadContainer,
  onViewManifest,
}) => {
  const displayContainers = containers.slice(0, entriesPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-green-50 border-b border-green-200 px-4 py-3">
        <h3 className="font-bold text-green-800">
          <span className="text-green-700">View Container List</span>{" "}
          {containers.length === 0 && <span className="text-gray-500 font-normal">Record not found.</span>}
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

            <Select value={confirmFilter} onValueChange={setConfirmFilter}>
              <SelectTrigger className="w-48 bg-blue-500 text-white hover:bg-blue-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.confirmStatuses.map(cs => (
                  <SelectItem key={cs} value={cs}>{cs}</SelectItem>
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
                <th className="border px-2 py-2 text-left font-bold">CONTAINER NUMBER</th>
                <th className="border px-2 py-2 text-left font-bold">SEAL NUMBER</th>
                <th className="border px-2 py-2 text-left font-bold">CONTAINER TYPE</th>
                <th className="border px-2 py-2 text-left font-bold">DIR/MIX</th>
                <th className="border px-2 py-2 text-left font-bold">E.T.D</th>
                <th className="border px-2 py-2 text-left font-bold">E.T.A</th>
                <th className="border px-2 py-2 text-left font-bold">LOAD DATE</th>
                <th className="border px-2 py-2 text-left font-bold">MODIFY</th>
              </tr>
            </thead>
            <tbody>
              {displayContainers.length > 0 ? (
                displayContainers.map((c, i) => (
                  <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1.5">{i + 1}</td>
                    <td className="border px-2 py-1.5">{c.runningNumber}</td>
                    <td className="border px-2 py-1.5">{c.containerNumber}</td>
                    <td className="border px-2 py-1.5">{c.sealNumber}</td>
                    <td className="border px-2 py-1.5">{c.containerType}</td>
                    <td className="border px-2 py-1.5">{c.direction}</td>
                    <td className="border px-2 py-1.5">{c.etd}</td>
                    <td className="border px-2 py-1.5">{c.eta}</td>
                    <td className="border px-2 py-1.5">{c.loadDate || ""}</td>
                    <td className="border px-2 py-1.5">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs h-7">Edit</Button>
                        <Button size="sm" className="text-xs h-7 bg-green-600 hover:bg-green-700 text-white" onClick={(e) => { e.stopPropagation(); onLoadContainer?.(c); }}>Load</Button>
                        <Button size="sm" className="text-xs h-7 bg-blue-600 hover:bg-blue-700 text-white" onClick={(e) => { e.stopPropagation(); onViewManifest?.(c); }}>Manifest</Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="border px-2 py-4 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-blue-500 text-white">
                <th className="border px-2 py-2 text-left font-bold">Num</th>
                <th className="border px-2 py-2 text-left font-bold">RUNNING NUMBER</th>
                <th className="border px-2 py-2 text-left font-bold">CONTAINER NUMBER</th>
                <th className="border px-2 py-2 text-left font-bold">SEAL NUMBER</th>
                <th className="border px-2 py-2 text-left font-bold">CONTAINER TYPE</th>
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
          <span>Showing {displayContainers.length > 0 ? 1 : 0} to {displayContainers.length} of {containers.length} entries</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerListView;
