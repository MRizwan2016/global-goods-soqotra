
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { VesselData, ContainerData, CountryConfig, ViewMode } from "../types";
import { syncSriLankaVesselToExternal } from "@/lib/externalSync";

const STORAGE_KEY_VESSELS = (code: string) => `vessels_${code}`;
const STORAGE_KEY_CONTAINERS = (code: string) => `containers_${code}`;

function getNextRunningNumber(existing: string[], prefix: string): string {
  let max = 0;
  existing.forEach((rn) => {
    const num = parseInt(rn.replace(/\D/g, ""), 10);
    if (!isNaN(num) && num > max) max = num;
  });
  return `${max + 1} ${prefix}`;
}

export function useVesselContainerManagement(config: CountryConfig) {
  const [vessels, setVessels] = useState<VesselData[]>([]);
  const [containers, setContainers] = useState<ContainerData[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("vessel-list");
  const [selectedSector, setSelectedSector] = useState(config.sectors[0]?.code || "");
  const [confirmFilter, setConfirmFilter] = useState("NOT CONFIRM");
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(50);

  // Vessel form state
  const [vesselForm, setVesselForm] = useState<Partial<VesselData>>({});
  // Container form state
  const [containerForm, setContainerForm] = useState<Partial<ContainerData>>({});

  // Load from localStorage
  useEffect(() => {
    try {
      const savedV = localStorage.getItem(STORAGE_KEY_VESSELS(config.countryCode));
      if (savedV) setVessels(JSON.parse(savedV));
    } catch (e) {
      console.error("Error loading vessels:", e);
    }
    try {
      const savedC = localStorage.getItem(STORAGE_KEY_CONTAINERS(config.countryCode));
      if (savedC) setContainers(JSON.parse(savedC));
    } catch (e) {
      console.error("Error loading containers:", e);
    }
  }, [config.countryCode]);

  // Save vessels
  useEffect(() => {
    if (vessels.length > 0) {
      localStorage.setItem(STORAGE_KEY_VESSELS(config.countryCode), JSON.stringify(vessels));
    }
  }, [vessels, config.countryCode]);

  // Save containers
  useEffect(() => {
    if (containers.length > 0) {
      localStorage.setItem(STORAGE_KEY_CONTAINERS(config.countryCode), JSON.stringify(containers));
    }
  }, [containers, config.countryCode]);

  // Initialize vessel form
  const initVesselForm = () => {
    const existingNumbers = vessels.map((v) => v.runningNumber);
    setVesselForm({
      id: uuidv4(),
      runningNumber: getNextRunningNumber(existingNumbers, selectedSector),
      vesselName: "",
      voyage: "",
      portOfLoading: config.portsOfLoading[0] || "",
      portOfDischarge: "",
      shippingLine: "",
      direction: "MIX",
      masterBL: "",
      etd: "",
      eta: "",
      sector: config.sectors[0]?.label || "",
      status: "NEW",
      containers: [],
    });
    setViewMode("add-vessel");
  };

  // Initialize container form
  const initContainerForm = () => {
    const existingNumbers = containers.map((c) => c.runningNumber);
    setContainerForm({
      id: uuidv4(),
      runningNumber: getNextRunningNumber(existingNumbers, selectedSector),
      containerNumber: "",
      sealNumber: "",
      containerType: config.containerTypes[0] || "20FT_NML",
      direction: config.directions[0] || "MIX",
      etd: "",
      eta: "",
      sector: config.sectors[0]?.label || "",
      status: "NOT CONFIRM",
      weight: 0,
    });
    setViewMode("add-container");
  };

  // Save vessel
  const saveVessel = () => {
    try {
      if (!vesselForm.vesselName || !vesselForm.voyage) {
        toast.error("Please fill in all required fields");
        return;
      }
      const isDuplicateVessel = vessels.some(
        (v) =>
          v.id !== vesselForm.id &&
          v.vesselName.toLowerCase() === (vesselForm.vesselName || "").toLowerCase() &&
          v.voyage.toLowerCase() === (vesselForm.voyage || "").toLowerCase()
      );
      if (isDuplicateVessel) {
        toast.error(`Vessel "${vesselForm.vesselName}" with voyage "${vesselForm.voyage}" already exists`);
        return;
      }
      const vessel: VesselData = {
        id: vesselForm.id || uuidv4(),
        runningNumber: vesselForm.runningNumber || "",
        vesselName: vesselForm.vesselName || "",
        voyage: vesselForm.voyage || "",
        portOfLoading: vesselForm.portOfLoading || "",
        portOfDischarge: vesselForm.portOfDischarge || "",
        shippingLine: vesselForm.shippingLine || "",
        direction: vesselForm.direction || "MIX",
        masterBL: vesselForm.masterBL || "",
        etd: vesselForm.etd || "",
        eta: vesselForm.eta || "",
        sector: vesselForm.sector || "",
        status: vesselForm.status || "NEW",
        containers: vesselForm.containers || [],
        loadDate: vesselForm.loadDate,
      };

      if (config.country === "Sri Lanka") {
        syncSriLankaVesselToExternal({
          ...vessel,
          country: "Sri Lanka",
        }).catch((error: any) => {
          console.error(error);
          const message = error?.message || "Unknown save error";
          toast.error(`Save failed: ${message}`);
          throw error;
        });
      }

      const existingIndex = vessels.findIndex((v) => v.id === vessel.id);
      if (existingIndex >= 0) {
        setVessels((prev) => prev.map((v) => (v.id === vessel.id ? vessel : v)));
        toast.success(`Vessel ${vessel.vesselName} updated successfully`);
      } else {
        setVessels((prev) => [vessel, ...prev]);
        toast.success(`Vessel ${vessel.vesselName} created successfully`);
      }
      setViewMode("vessel-list");
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to save vessel: ${error?.message || error}`);
    }
  };

  // Save container
  const saveContainer = () => {
    try {
      if (!containerForm.containerNumber) {
        toast.error("Please fill in container number");
        return;
      }
      const isDuplicateContainer = containers.some(
        (c) =>
          c.id !== containerForm.id &&
          c.containerNumber.toLowerCase() === (containerForm.containerNumber || "").toLowerCase() &&
          c.sealNumber.toLowerCase() === (containerForm.sealNumber || "").toLowerCase()
      );
      if (isDuplicateContainer) {
        toast.error(`Container "${containerForm.containerNumber}" with seal "${containerForm.sealNumber}" already exists`);
        return;
      }
      const container: ContainerData = {
        id: containerForm.id || uuidv4(),
        runningNumber: containerForm.runningNumber || "",
        containerNumber: containerForm.containerNumber || "",
        sealNumber: containerForm.sealNumber || "",
        containerType: containerForm.containerType || "20FT_NML",
        direction: containerForm.direction || "",
        etd: containerForm.etd || "",
        eta: containerForm.eta || "",
        sector: containerForm.sector || "",
        status: containerForm.status || "NOT CONFIRM",
        weight: containerForm.weight || 0,
        numberPlate: containerForm.numberPlate,
        loadDate: containerForm.loadDate,
      };
      const existingIndex = containers.findIndex((c) => c.id === container.id);
      if (existingIndex >= 0) {
        setContainers((prev) => prev.map((c) => (c.id === container.id ? container : c)));
        toast.success(`Container ${container.containerNumber} updated successfully`);
      } else {
        setContainers((prev) => [container, ...prev]);
        toast.success(`Container ${container.containerNumber} created successfully`);
      }
      setViewMode("container-list");
    } catch (error: any) {
      console.error("Save container error:", error);
      toast.error(`Failed to save container: ${error?.message || error}`);
    }
  };

  // Delete vessel
  const deleteVessel = (vesselId: string) => {
    const vessel = vessels.find((v) => v.id === vesselId);
    setVessels((prev) => {
      const updated = prev.filter((v) => v.id !== vesselId);
      if (updated.length === 0) {
        localStorage.removeItem(STORAGE_KEY_VESSELS(config.countryCode));
      }
      return updated;
    });
    toast.success(`Vessel "${vessel?.vesselName || ""}" deleted`);
  };

  // Delete container
  const deleteContainer = (containerId: string) => {
    const container = containers.find((c) => c.id === containerId);
    setContainers((prev) => {
      const updated = prev.filter((c) => c.id !== containerId);
      if (updated.length === 0) {
        localStorage.removeItem(STORAGE_KEY_CONTAINERS(config.countryCode));
      }
      return updated;
    });
    setVessels((prev) =>
      prev.map((v) => ({
        ...v,
        containers: v.containers.filter(
          (rn) => rn !== container?.runningNumber && rn !== containerId
        ),
      }))
    );
    toast.success(`Container "${container?.containerNumber || ""}" deleted`);
  };

  // Filter vessels by sector
  const filteredVessels = vessels.filter((v) => {
    const sectorMatch = !selectedSector || v.sector?.includes(selectedSector) || 
      config.sectors.find(s => s.code === selectedSector)?.label === v.sector;
    const searchMatch = !searchTerm || 
      v.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.runningNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.voyage.toLowerCase().includes(searchTerm.toLowerCase());
    return sectorMatch && searchMatch;
  });

  // Filter containers by sector & confirm status
  const filteredContainers = containers.filter((c) => {
    const sectorMatch = !selectedSector || c.sector?.includes(selectedSector) ||
      config.sectors.find(s => s.code === selectedSector)?.label === c.sector;
    const confirmMatch = !confirmFilter || confirmFilter === "all" || c.status === confirmFilter;
    const searchMatch = !searchTerm || 
      c.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.runningNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return sectorMatch && confirmMatch && searchMatch;
  });

  // Update vessel containers list
  const updateVesselContainers = (vesselId: string, containerRunningNumbers: string[]) => {
    setVessels((prev) =>
      prev.map((v) =>
        v.id === vesselId ? { ...v, containers: containerRunningNumbers } : v
      )
    );
  };

  return {
    vessels,
    containers,
    viewMode,
    setViewMode,
    selectedSector,
    setSelectedSector,
    confirmFilter,
    setConfirmFilter,
    searchTerm,
    setSearchTerm,
    entriesPerPage,
    setEntriesPerPage,
    vesselForm,
    setVesselForm,
    containerForm,
    setContainerForm,
    initVesselForm,
    initContainerForm,
    saveVessel,
    saveContainer,
    deleteVessel,
    deleteContainer,
    filteredVessels,
    filteredContainers,
    updateVesselContainers,
  };
}
