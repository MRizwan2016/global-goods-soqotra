
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Eye, Download, Printer } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ContainerRecord {
  id: string;
  runningNumber: string;
  containerNumber: string;
  sealNumber: string;
  containerType: string;
  direction: string;
  etd: string;
  eta: string;
  weight: number;
  packages: number;
  volume: number;
  dateConfirm: string;
}

const SriLankaDownloads: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"load-sheet" | "sea-manifest" | "air-manifest" | null>(null);
  const [containers, setContainers] = useState<ContainerRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [sectorFilter, setSectorFilter] = useState("all");
  const [confirmFilter, setConfirmFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection === "load-sheet" || activeSection === "sea-manifest") {
      fetchContainers();
    }
  }, [activeSection]);

  const fetchContainers = async () => {
    setLoading(true);
    try {
      // Fetch containers from regional_invoices grouped by container_running_number
      const { data, error } = await supabase
        .from("regional_invoices")
        .select("container_running_number, total_packages, total_volume, total_weight")
        .eq("country", "SRI LANKA")
        .not("container_running_number", "is", null)
        .order("container_running_number", { ascending: false });

      if (error) throw error;

      // Group by container running number
      const containerMap: Record<string, ContainerRecord> = {};
      (data || []).forEach((inv) => {
        const rn = inv.container_running_number || "";
        if (!rn) return;
        if (!containerMap[rn]) {
          containerMap[rn] = {
            id: rn,
            runningNumber: rn,
            containerNumber: "",
            sealNumber: "",
            containerType: "40FT_HIGHC",
            direction: "",
            etd: "",
            eta: "",
            weight: 0,
            packages: 0,
            volume: 0,
            dateConfirm: "",
          };
        }
        containerMap[rn].packages += 1;
        containerMap[rn].volume += inv.total_volume || 0;
        containerMap[rn].weight += inv.total_weight || 0;
      });

      setContainers(Object.values(containerMap));
    } catch (err) {
      console.error("Error fetching containers:", err);
      toast.error("Failed to load container data");
    } finally {
      setLoading(false);
    }
  };

  const filteredContainers = containers.filter((c) => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        c.runningNumber.toLowerCase().includes(term) ||
        c.containerNumber.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const handlePrintPDF = async () => {
    if (!printRef.current) return;
    toast.info("Generating PDF...");
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgRatio = canvas.width / canvas.height;
      const pdfRatio = pdfW / pdfH;
      let w = pdfW - 16;
      let h = w / imgRatio;
      if (h > pdfH - 16) {
        h = pdfH - 16;
        w = h * imgRatio;
      }
      pdf.addImage(imgData, "PNG", 8, 8, w, h);
      pdf.save(`Container_Loading_List_${new Date().toISOString().slice(0, 10)}.pdf`);
      toast.success("PDF downloaded successfully");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF");
    }
  };

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

  // Container Loading List / Sea Manifest list view
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
        {loading ? (
          <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" size={32} /></div>
        ) : (
          <div ref={printRef} className="overflow-x-auto">
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
                  <th className="border px-2 py-2 text-center">DATE CONFIRM</th>
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
                    <td className="border px-2 py-1.5 text-center">{c.weight.toFixed(0)}</td>
                    <td className="border px-2 py-1.5 text-center">{c.packages}</td>
                    <td className="border px-2 py-1.5 text-center">{c.volume.toFixed(3)}</td>
                    <td className="border px-2 py-1.5 text-center">{c.dateConfirm}</td>
                    <td className="border px-2 py-1.5 text-center">
                      <span className="text-blue-600 font-bold cursor-pointer hover:underline">{c.runningNumber}</span>
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
        )}

        {/* Action bar */}
        <div className="p-4 border-t flex justify-end gap-2">
          <Button onClick={handlePrintPDF} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <Download size={16} /> Download PDF
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SriLankaDownloads;
