import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ManifestRow {
  id: string;
  book_number: string | null;
  page_number: string | null;
  shipper_name: string | null;
  job_number: string | null;
  total_volume: number | null;
  total_weight: number | null;
  total_packages: number | null;
  consignee_name: string | null;
  invoice_number: string;
  description: string | null;
  sector: string | null;
}

const SudanManifestDialog = () => {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [manifestRows, setManifestRows] = useState<ManifestRow[]>([]);
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const loadBooks = async () => {
      const { data } = await supabase
        .from("regional_invoices")
        .select("book_number")
        .eq("country", "Sudan")
        .not("book_number", "is", null);
      if (data) {
        const unique = [...new Set(data.map(r => r.book_number).filter(Boolean))] as string[];
        unique.sort();
        setBooks(unique);
      }
    };
    loadBooks();
  }, [open]);

  const loadManifest = async (book: string) => {
    setSelectedBook(book);
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("regional_invoices")
        .select("id, book_number, page_number, shipper_name, job_number, total_volume, total_weight, total_packages, consignee_name, invoice_number, description, sector")
        .eq("country", "Sudan")
        .eq("book_number", book)
        .order("page_number", { ascending: true });

      if (error) throw error;

      // Build full page range with gaps
      const rows = data || [];
      const pageNumbers = rows.map(r => r.page_number).filter(Boolean);
      
      if (pageNumbers.length === 0) {
        setManifestRows([]);
        setLoading(false);
        return;
      }

      // Find the book's start/end from manage_invoice_book_stock
      const { data: bookData } = await supabase
        .from("manage_invoice_book_stock")
        .select("start_page, end_page")
        .eq("book_number", book)
        .eq("country", "Sudan")
        .maybeSingle();

      let start = parseInt(pageNumbers[0] || "0");
      let end = parseInt(pageNumbers[pageNumbers.length - 1] || "0");
      
      if (bookData) {
        start = parseInt(bookData.start_page);
        end = parseInt(bookData.end_page);
      }

      const fullManifest: ManifestRow[] = [];
      const rowMap = new Map(rows.map(r => [r.page_number, r]));

      for (let p = start; p <= end; p++) {
        const pageStr = p.toString();
        const existing = rowMap.get(pageStr);
        if (existing) {
          fullManifest.push(existing as ManifestRow);
        } else {
          fullManifest.push({
            id: `gap-${p}`,
            book_number: book,
            page_number: pageStr,
            shipper_name: null,
            job_number: null,
            total_volume: null,
            total_weight: null,
            total_packages: null,
            consignee_name: null,
            invoice_number: "",
            description: null,
            sector: null,
          });
        }
      }

      setManifestRows(fullManifest);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load manifest");
    }
    setLoading(false);
  };

  const totalCBM = manifestRows
    .filter(r => r.total_volume)
    .reduce((s, r) => s + (r.total_volume || 0), 0);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Sudan Port Manifest - Book ${selectedBook}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #000; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 11px; }
        th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
        th { background: #b91c1c; color: white; font-weight: 600; }
        .gap-row { background: #fef3c7; color: #92400e; font-style: italic; }
        .header { text-align: center; margin-bottom: 20px; }
        .header h1 { font-size: 18px; margin: 0; text-transform: uppercase; }
        .header p { font-size: 12px; color: #555; margin: 4px 0; }
        .summary { margin-top: 16px; font-size: 13px; font-weight: bold; text-align: right; }
        .meta { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px; }
        @media print { body { margin: 0; } }
      </style></head><body>
      ${content.innerHTML}
      </body></html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); win.close(); }, 400);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-red-700 text-red-700 hover:bg-red-50">
          <FileText className="h-4 w-4" /> Print Manifest
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sudan Port Manifest</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Select value={selectedBook} onValueChange={loadManifest}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Book Number" />
            </SelectTrigger>
            <SelectContent>
              {books.map(b => (
                <SelectItem key={b} value={b}>{`Book ${b}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {manifestRows.length > 0 && (
            <Button onClick={handlePrint} className="gap-2 bg-red-700 hover:bg-red-800">
              <Printer className="h-4 w-4" /> Print
            </Button>
          )}
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && manifestRows.length > 0 && (
          <div ref={printRef}>
            <div className="header" style={{ textAlign: "center", marginBottom: 20 }}>
              <h1 style={{ fontSize: 18, margin: 0, textTransform: "uppercase" }}>
                SOQOTRA LOGISTICS SERVICES - SUDAN PORT MANIFEST
              </h1>
              <p style={{ fontSize: 12, color: "#555", margin: "4px 0" }}>
                Book Number: {selectedBook} | Generated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="meta" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 8 }}>
              <span>Total Entries: {manifestRows.filter(r => r.shipper_name).length}</span>
              <span>Gaps: {manifestRows.filter(r => !r.shipper_name).length}</span>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr style={{ background: "#b91c1c", color: "white" }}>
                  <th style={{ border: "1px solid #333", padding: "6px 8px" }}>#</th>
                  <th style={{ border: "1px solid #333", padding: "6px 8px" }}>Page #</th>
                  <th style={{ border: "1px solid #333", padding: "6px 8px" }}>Shipper Name</th>
                  <th style={{ border: "1px solid #333", padding: "6px 8px" }}>Consignee</th>
                  <th style={{ border: "1px solid #333", padding: "6px 8px" }}>Job #</th>
                  <th style={{ border: "1px solid #333", padding: "6px 8px" }}>Sector</th>
                  <th style={{ border: "1px solid #333", padding: "6px 8px", textAlign: "right" }}>CBM</th>
                </tr>
              </thead>
              <tbody>
                {manifestRows.map((row, i) => {
                  const isGap = !row.shipper_name;
                  return (
                    <tr key={row.id} style={isGap ? { background: "#fef3c7", color: "#92400e", fontStyle: "italic" } : {}}>
                      <td style={{ border: "1px solid #333", padding: "6px 8px" }}>{i + 1}</td>
                      <td style={{ border: "1px solid #333", padding: "6px 8px" }}>{row.page_number}</td>
                      <td style={{ border: "1px solid #333", padding: "6px 8px" }}>{isGap ? "— GAP —" : row.shipper_name}</td>
                      <td style={{ border: "1px solid #333", padding: "6px 8px" }}>{isGap ? "" : row.consignee_name || ""}</td>
                      <td style={{ border: "1px solid #333", padding: "6px 8px" }}>{isGap ? "" : row.job_number || ""}</td>
                      <td style={{ border: "1px solid #333", padding: "6px 8px" }}>{isGap ? "" : row.sector || ""}</td>
                      <td style={{ border: "1px solid #333", padding: "6px 8px", textAlign: "right" }}>
                        {isGap ? "" : (row.total_volume || 0).toFixed(4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="summary" style={{ marginTop: 16, fontSize: 13, fontWeight: "bold", textAlign: "right" }}>
              Total Container Volume: {totalCBM.toFixed(4)} CBM
            </div>
          </div>
        )}

        {!loading && selectedBook && manifestRows.length === 0 && (
          <p className="text-gray-500 text-center py-8">No invoices found for Book {selectedBook}.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SudanManifestDialog;
