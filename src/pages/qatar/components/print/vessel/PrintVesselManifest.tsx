
import React from "react";
import { QatarContainer } from "@/pages/qatar/types/containerTypes";

export interface PrintVesselManifestProps {
  vessel: {
    id: string;
    vesselName: string;
    voyageNumber?: string;
    voyage?: string;
    loadingPort?: string;
    portOfLoading?: string;
    destination?: string;
  };
  containerData: QatarContainer[];
  printSection?: "all" | "cargo" | "summary";
  orientation?: "portrait" | "landscape";
  totalWeight?: number;
  totalVolume?: number;
  totalPackages?: number;
}

const PrintVesselManifest: React.FC<PrintVesselManifestProps> = ({
  vessel,
  containerData,
  printSection = "all",
  orientation = "portrait",
  totalWeight: providedTotalWeight,
  totalVolume: providedTotalVolume,
  totalPackages: providedTotalPackages
}) => {
  // Calculate totals if not provided
  const totalWeight = providedTotalWeight !== undefined ? providedTotalWeight : 
    containerData.reduce((sum, container) => sum + (Number(container.weight) || 0), 0);
    
  const totalVolume = providedTotalVolume !== undefined ? providedTotalVolume : 
    containerData.reduce((sum, container) => sum + (Number(container.volume) || 0), 0);
    
  const totalPackages = providedTotalPackages !== undefined ? providedTotalPackages : 
    containerData.reduce((sum, container) => sum + (Number(container.packages) || 0), 0);

  return (
    <div className={`print-container ${orientation === "landscape" ? "landscape" : ""}`}>
      {/* Vessel Header */}
      <header className="vessel-manifest-header">
        <h1>Vessel Manifest: {vessel.vesselName}</h1>
        <div className="vessel-details">
          <div>Vessel ID: {vessel.id}</div>
          <div>Voyage: {vessel.voyageNumber || vessel.voyage}</div>
          <div>Loading Port: {vessel.loadingPort || vessel.portOfLoading}</div>
          <div>Destination: {vessel.destination}</div>
        </div>
      </header>

      {/* Summary Section */}
      {(printSection === "all" || printSection === "summary") && (
        <section className="vessel-summary page-break-inside-avoid">
          <h2>Manifest Summary</h2>
          <div className="summary-stats">
            <div className="stat-item">
              <span>Total Containers:</span>
              <span>{containerData.length}</span>
            </div>
            <div className="stat-item">
              <span>Total Weight:</span>
              <span>{totalWeight.toFixed(2)} KG</span>
            </div>
            <div className="stat-item">
              <span>Total Volume:</span>
              <span>{totalVolume.toFixed(2)} CBM</span>
            </div>
            <div className="stat-item">
              <span>Total Packages:</span>
              <span>{totalPackages}</span>
            </div>
          </div>
        </section>
      )}

      {/* Cargo Details Section */}
      {(printSection === "all" || printSection === "cargo") && (
        <section className="vessel-cargo">
          <h2>Container Details</h2>
          <table className="cargo-table">
            <thead>
              <tr>
                <th>Container #</th>
                <th>Type</th>
                <th>Seal #</th>
                <th>Weight (KG)</th>
                <th>Volume (CBM)</th>
                <th>Packages</th>
              </tr>
            </thead>
            <tbody>
              {containerData.map((container) => (
                <tr key={container.id}>
                  <td>{container.containerNumber}</td>
                  <td>{container.containerType}</td>
                  <td>{container.sealNumber}</td>
                  <td>{Number(container.weight)?.toFixed(2) || '0.00'}</td>
                  <td>{Number(container.volume)?.toFixed(2) || '0.00'}</td>
                  <td>{container.packages || 0}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}><strong>TOTALS</strong></td>
                <td><strong>{totalWeight.toFixed(2)}</strong></td>
                <td><strong>{totalVolume.toFixed(2)}</strong></td>
                <td><strong>{totalPackages}</strong></td>
              </tr>
            </tfoot>
          </table>
        </section>
      )}

      {/* Footer */}
      <footer className="vessel-manifest-footer">
        <div>Printed on: {new Date().toLocaleDateString()}</div>
        <div>SOQOTRA LOGISTICS SERVICES WLL</div>
      </footer>
    </div>
  );
};

export default PrintVesselManifest;
