
import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Download, ArrowLeft } from "lucide-react";
import { ContainerData, VesselData } from "@/components/shared/vessel-container/types";
import SeaCargoManifest from "@/components/shared/vessel-container/SeaCargoManifest";
import { useContainerLoadMetrics } from "@/components/shared/vessel-container/hooks/useContainerLoadMetrics";

const SriLankaDownloads: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"load-sheet" | "sea-manifest" | "air-manifest" | null>(null);
  const [containers, setContainers] = useState<ContainerData[]>([]);
  const [vessels, setVessels] = useState<VesselData[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<ContainerData | null>(null);
  const [sectorFilter, setSectorFilter] = useState("all");
  const [confirmFilter, setConfirmFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const { containerMetrics } = useContainerLoadMetrics("SRI LANKA", containers);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const savedC = localStorage.getItem("containers_LK");
      if (savedC) setContainers(JSON.parse(savedC));
      const savedV = localStorage.getItem("vessels_LK");
      if (savedV) setVessels(JSON.parse(savedV));
    } catch (e) {
      console.error("Error loading data:", e);
    }
  };

  const findVesselForContainer = (container: ContainerData): VesselData | null => {
    return vessels.find((v) =>
      v.containers?.includes(container.runningNumber) ||
      v.containers?.includes(container.id)
    ) || null;
  };

  const filteredContainers = containers.filter((c) => {
    if (sectorFilter !== "all") {
      const sectorMap: Record<string, string> = { colombo: "COLOMBO", galle: "GALLE", kurunegala: "KURUNEGALA", mix: "MIX" };
      const target = sectorMap[sectorFilter] || "";
      if (!c.direction?.toUpperCase().includes(target) && !c.sector?.toUpperCase().includes(target)) return false;
    }
    if (confirmFilter === "confirmed" && c.status !== "CONFIRMED") return false;
    if (confirmFilter === "not-confirmed" && c.status === "CONFIRMED") return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return c.runningNumber.toLowerCase().includes(term) ||
        c.containerNumber.toLowerCase().includes(term) ||
        c.sealNumber?.toLowerCase().includes(term);
    }
    return true;
  });

  // If viewing a specific container's manifest
  if (selectedContainer) {
    const vessel = findVesselForContainer(selectedContainer);
    return (
      <Layout title="Dashboard - SRI LANKA">
        <PageBreadcrumb className="mb-4" />
        <SeaCargoManifest
          container={selectedContainer}
          vessel={vessel}
          countryName="SRI LANKA"
          onBack={() => setSelectedContainer(null)}
        />
      </Layout>
    );
  }

  // Downloads menu
  if (!activeSection) {
    return (
      <Layout title="Dashboard - SRI LANKA">
        <PageBreadcrumb className="mb-4" />
        <div className="bg-gray-100 border rounded-lg p-3 mb-4">
          <span className="text-sm text-gray-600">Downloads</span>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Downloads</h2>
          <div className="space-y-2 max-w-md">
            <button
              onClick={() => setActiveSection("load-sheet")}
              className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-800 font-medium transition-colors"
            >
              01 Cont. Load Sheet
            </button>
            <button
              onClick={() => setActiveSection("sea-manifest")}
              className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-800 font-medium transition-colors"
            >
              02 Manifest Sea Cargo
            </button>
            <button
              onClick={() => setActiveSection("air-manifest")}
              className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-800 font-medium transition-colors"
            >
              03 Manifest Air Cargo
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (activeSection === "air-manifest") {
    return (
      <Layout title="Dashboard - SRI LANKA">
        <PageBreadcrumb className="mb-4" />
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Manifest Air Cargo</h2>
            <Button variant="outline" onClick={() => setActiveSection(null)}>← Back to Downloads</Button>
          </div>
          <p className="text-gray-500 text-center py-12">Air Cargo Manifest coming soon.</p>
        </div>
      </Layout>
    );
  }

  const title = activeSection === "load-sheet" ? "View Container Loading List" : "Manifest Sea Cargo";

  return (
    <Layout title="Dashboard - SRI LANKA">
      <PageBreadcrumb className="mb-4" />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-green-50 border-b border-green-200 px-4 py-3 flex items-center justify-between">
          <h3 className="font-bold text-green-800">{title} <span className="text-gray-500 font-normal">Record Listed.</span></h3>
          <Button variant="outline" size="sm" onClick={() => setActiveSection(null)}>← Back to Downloads</Button>
        </div>

        {/* Filters */}
        <div className="p-4 flex flex-wrap items-center gap-4 border-b">
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="w-[180px] bg-blue-600 text-white border-blue-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL SECTORS</SelectItem>
              <SelectItem value="colombo">COLOMBO : C</SelectItem>
              <SelectItem value="galle">GALLE : G</SelectItem>
              <SelectItem value="kurunegala">KURUNEGALA : K</SelectItem>
              <SelectItem value="mix">MIX : M</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <span className="text-sm">Show</span>
            <Select value={String(entriesPerPage)} onValueChange={(v) => setEntriesPerPage(Number(v))}>
              <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">entries</span>
          </div>

          <Select value={confirmFilter} onValueChange={setConfirmFilter}>
            <SelectTrigger className="w-[180px] bg-blue-600 text-white border-blue-700 ml-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL</SelectItem>
              <SelectItem value="confirmed">CONFIRMED</SelectItem>
              <SelectItem value="not-confirmed">NOT CONFIRM</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <span className="text-sm">Search:</span>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border px-2 py-2 text-center">Num</th>
                <th className="border px-2 py-2 text-center">RUNNING NUMBER</th>
                <th className="border px-2 py-2 text-center">CONTAINER NUMBER</th>
                <th className="border px-2 py-2 text-center">SEAL NUMBER</th>
                <th className="border px-2 py-2 text-center">CONTAINER TYPE</th>
                <th className="border px-2 py-2 text-center">DIR/MIX</th>
                <th className="border px-2 py-2 text-center">E.T.D</th>
                <th className="border px-2 py-2 text-center">E.T.A</th>
                <th className="border px-2 py-2 text-center">WEIGHT</th>
                <th className="border px-2 py-2 text-center">PACKAGES</th>
                <th className="border px-2 py-2 text-center">VOLUME</th>
                <th className="border px-2 py-2 text-center">LOAD DATE</th>
                <th className="border px-2 py-2 text-center">VIEW</th>
              </tr>
            </thead>
            <tbody>
              {filteredContainers.slice(0, entriesPerPage).map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-2 py-1.5 text-center">{i + 1}</td>
                  <td className="border px-2 py-1.5 text-center font-medium">{c.runningNumber}</td>
                  <td className="border px-2 py-1.5 text-center">{c.containerNumber}</td>
                  <td className="border px-2 py-1.5 text-center">{c.sealNumber}</td>
                  <td className="border px-2 py-1.5 text-center">{c.containerType}</td>
                  <td className="border px-2 py-1.5 text-center">{c.direction}</td>
                  <td className="border px-2 py-1.5 text-center">{c.etd}</td>
                  <td className="border px-2 py-1.5 text-center">{c.eta}</td>
                  <td className="border px-2 py-1.5 text-center">{c.weight || 0}</td>
                  <td className="border px-2 py-1.5 text-center">{containerMetrics[c.runningNumber]?.packages || "-"}</td>
                  <td className="border px-2 py-1.5 text-center">{containerMetrics[c.runningNumber]?.volume ? containerMetrics[c.runningNumber].volume.toFixed(3) : "-"}</td>
                  <td className="border px-2 py-1.5 text-center">{containerMetrics[c.runningNumber]?.loadDate ? new Date(containerMetrics[c.runningNumber].loadDate).toLocaleDateString() : (c.loadDate || "-")}</td>
                  <td className="border px-2 py-1.5 text-center">
                    {activeSection === "sea-manifest" ? (
                      <button
                        onClick={() => setSelectedContainer(c)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        {c.runningNumber}
                      </button>
                    ) : (
                      <span className="text-blue-600 font-bold">{c.runningNumber}</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredContainers.length === 0 && (
                <tr>
                  <td colSpan={13} className="border px-4 py-8 text-center text-gray-500">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default SriLankaDownloads;
