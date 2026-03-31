import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Clock, Box, Ship, Truck, FileCheck, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CargoResult {
  id: string;
  invoice_number: string;
  customer_name: string;
  cargo_description: string | null;
  origin: string | null;
  destination: string | null;
  collection_date: string | null;
  loaded_date: string | null;
  in_transit_date: string | null;
  arrival_date: string | null;
  clearance_date: string | null;
  processing_date: string | null;
  delivery_date: string | null;
  current_status: string;
  notes: string | null;
  created_at: string;
}

const statusConfig: Record<string, { icon: React.ElementType; label: string; color: string; bgColor: string }> = {
  collected: { icon: Box, label: "Collected", color: "text-amber-700", bgColor: "bg-amber-50 border-amber-200" },
  loaded: { icon: Package, label: "Loaded", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
  in_transit: { icon: Ship, label: "In Transit", color: "text-indigo-700", bgColor: "bg-indigo-50 border-indigo-200" },
  arrived: { icon: Truck, label: "Arrived", color: "text-purple-700", bgColor: "bg-purple-50 border-purple-200" },
  clearance: { icon: FileCheck, label: "Clearance", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
  processing: { icon: Clock, label: "Processing", color: "text-cyan-700", bgColor: "bg-cyan-50 border-cyan-200" },
  delivered: { icon: CheckCircle2, label: "Delivered", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
};

const statusOrder = ["collected", "loaded", "in_transit", "arrived", "clearance", "processing", "delivered"];

const PublicTrackTrace = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [results, setResults] = useState<CargoResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!invoiceNumber.trim()) return;
    setSearching(true);
    setSearched(true);

    const { data, error } = await supabase.rpc("track_cargo_by_invoice", {
      _invoice_number: invoiceNumber.trim(),
    });

    if (!error && data) {
      setResults(data as CargoResult[]);
    } else {
      setResults([]);
    }
    setSearching(false);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a365d] to-[#2d4a7a]">
      {/* Header */}
      <header className="bg-[#1a365d] border-b border-white/10 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <img src="/lovable-uploads/0cc8e06c-f4fc-44ee-8e5c-4effd61273ec.png" alt="Logo" className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-white text-lg font-bold tracking-wide">SOQOTRA LOGISTICS</h1>
            <p className="text-white/60 text-xs">Track & Trace</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Search Card */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-[#1a365d]">
              <Package className="h-7 w-7" />
              Track Your Shipment
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Enter your invoice number to get real-time updates on your cargo
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 max-w-lg mx-auto">
              <Input
                placeholder="Enter Invoice Number (e.g. 13136051)"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 text-base h-11"
              />
              <Button onClick={handleSearch} disabled={searching || !invoiceNumber.trim()} className="h-11 px-6 bg-[#1a365d] hover:bg-[#2d4a7a]">
                {searching ? <Clock className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="ml-1.5">{searching ? "Searching..." : "Track"}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {searched && !searching && results.length === 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="text-center py-10">
              <Package className="h-12 w-12 mx-auto text-red-400 mb-3" />
              <h3 className="text-lg font-semibold text-red-800">Shipment Not Found</h3>
              <p className="text-red-600 text-sm mt-1">No shipment found for invoice "{invoiceNumber}". Please verify and try again.</p>
            </CardContent>
          </Card>
        )}

        {results.map((cargo) => {
          const currentIdx = statusOrder.indexOf(cargo.current_status);
          const steps = [
            { key: "collected", date: cargo.collection_date, label: "Collected" },
            { key: "loaded", date: cargo.loaded_date, label: "Loaded" },
            { key: "in_transit", date: cargo.in_transit_date, label: "In Transit" },
            { key: "arrived", date: cargo.arrival_date, label: "Arrived" },
            { key: "clearance", date: cargo.clearance_date, label: "Clearance" },
            { key: "processing", date: cargo.processing_date, label: "Processing" },
            { key: "delivered", date: cargo.delivery_date, label: "Delivered" },
          ];

          const config = statusConfig[cargo.current_status] || statusConfig.collected;

          return (
            <Card key={cargo.id} className="border-0 shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-lg text-[#1a365d]">Invoice: {cargo.invoice_number}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cargo.customer_name}</p>
                  </div>
                  <Badge variant="outline" className={`${config.bgColor} ${config.color} border font-medium gap-1`}>
                    <config.icon className="h-3 w-3" />
                    {config.label}
                  </Badge>
                </div>
                {cargo.cargo_description && <p className="text-sm text-muted-foreground mt-1">{cargo.cargo_description}</p>}
                <p className="text-xs text-muted-foreground">{cargo.origin || "Origin"} → {cargo.destination || "Destination"}</p>
              </CardHeader>
              <CardContent>
                {/* Timeline */}
                <div className="flex items-center justify-between overflow-x-auto pb-2">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;
                    const sc = statusConfig[step.key];
                    const StepIcon = sc.icon;

                    return (
                      <div key={step.key} className="flex flex-col items-center min-w-[80px] relative">
                        {idx > 0 && (
                          <div
                            className={`absolute top-4 -left-1/2 w-full h-0.5 ${idx <= currentIdx ? "bg-[#1a365d]" : "bg-border"}`}
                            style={{ zIndex: 0 }}
                          />
                        )}
                        <div
                          className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center ${
                            isCurrent
                              ? "bg-[#1a365d] text-white ring-4 ring-[#1a365d]/20"
                              : isCompleted
                              ? "bg-[#1a365d] text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <StepIcon className="h-4 w-4" />
                        </div>
                        <span className={`text-[10px] mt-1 text-center leading-tight ${isCompleted ? "font-medium" : "text-muted-foreground"}`}>
                          {step.label}
                        </span>
                        <span className="text-[9px] text-muted-foreground mt-0.5">{step.date ? formatDate(step.date) : "—"}</span>
                      </div>
                    );
                  })}
                </div>
                {cargo.notes && (
                  <p className="text-sm text-muted-foreground mt-3 bg-muted/50 p-2 rounded">
                    <strong>Notes:</strong> {cargo.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <footer className="text-center py-6 text-white/50 text-xs">
        © {new Date().getFullYear()} Soqotra Logistics Services, Transportation & Trading WLL. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicTrackTrace;
