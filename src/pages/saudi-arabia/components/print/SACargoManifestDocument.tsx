import React from "react";

interface SACargoManifestDocumentProps {
  invoiceData: any;
  allInvoices?: any[];
}

const SACargoManifestDocument: React.FC<SACargoManifestDocumentProps> = ({ invoiceData, allInvoices }) => {
  // Use all invoices if provided, otherwise wrap single invoice
  const invoices = allInvoices && allInvoices.length > 0 ? allInvoices : [invoiceData];
  
  // Build manifest rows from all invoices
  const manifestRows = invoices.map((inv: any, idx: number) => {
    const packages = inv.packages || inv.packageItems || [];
    const totalPkgs = packages.reduce((s: number, p: any) => s + (parseInt(p.quantity) || 1), 0) || 1;
    const totalWeight = packages.reduce((s: number, p: any) => s + (parseFloat(p.weight) || 0), 0);
    const totalVolume = packages.reduce((s: number, p: any) => s + (parseFloat(p.cubicMetre || p.volume) || 0), 0);
    return {
      sl: idx + 1,
      invoiceNumber: inv.invoiceNumber || "N/A",
      shipper: inv.shipperName || inv.shipper?.name || "N/A",
      consignee: inv.consigneeName || inv.consignee?.name || "N/A",
      destination: inv.sector || inv.district || "RIYADH",
      packages: totalPkgs,
      weight: totalWeight,
      volume: totalVolume,
      description: packages.map((p: any) => p.name).filter(Boolean).join(", ") || "PERSONAL EFFECTS",
      amount: inv.net || inv.pricing?.net || 0,
    };
  });

  const grandTotalPkgs = manifestRows.reduce((s, r) => s + r.packages, 0);
  const grandTotalWeight = manifestRows.reduce((s, r) => s + r.weight, 0);
  const grandTotalVolume = manifestRows.reduce((s, r) => s + r.volume, 0);
  const grandTotalAmount = manifestRows.reduce((s, r) => s + r.amount, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "9pt" }}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b-2 border-black">
        <img src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" alt="Logo" className="w-28 h-auto" />
        <div className="text-center flex-1">
          <h1 className="text-lg font-bold">CARGO MANIFEST</h1>
          <p className="text-sm font-bold">SOQOTRA SOLUTIONS WLL - KSA</p>
          <p className="text-xs">Eastern Province, Saudi Arabia</p>
        </div>
        <div className="text-right text-sm">
          <p><span className="font-bold">Date:</span> {new Date().toLocaleDateString("en-GB")}</p>
          <p><span className="font-bold">Manifest No:</span> SM-{Date.now().toString().slice(-6)}</p>
          <p><span className="font-bold">Destination:</span> SAUDI ARABIA</p>
        </div>
      </div>

      {/* Manifest Table - landscape optimized */}
      <table className="w-full text-[8pt] border-collapse mt-2">
        <thead>
          <tr>
            <th className="border border-black px-1 py-1 bg-gray-200 w-8">SL</th>
            <th className="border border-black px-1 py-1 bg-gray-200">INVOICE NO</th>
            <th className="border border-black px-1 py-1 bg-gray-200">SHIPPER</th>
            <th className="border border-black px-1 py-1 bg-gray-200">CONSIGNEE</th>
            <th className="border border-black px-1 py-1 bg-gray-200">DESTINATION</th>
            <th className="border border-black px-1 py-1 bg-gray-200">DESCRIPTION</th>
            <th className="border border-black px-1 py-1 bg-gray-200 w-12">PKGS</th>
            <th className="border border-black px-1 py-1 bg-gray-200 w-16">WT (KG)</th>
            <th className="border border-black px-1 py-1 bg-gray-200 w-16">VOL (CBM)</th>
            <th className="border border-black px-1 py-1 bg-gray-200 w-20">AMT (SAR)</th>
          </tr>
        </thead>
        <tbody>
          {manifestRows.map((row) => (
            <tr key={row.sl}>
              <td className="border border-black px-1 py-0.5 text-center">{row.sl}</td>
              <td className="border border-black px-1 py-0.5">{row.invoiceNumber}</td>
              <td className="border border-black px-1 py-0.5">{row.shipper}</td>
              <td className="border border-black px-1 py-0.5">{row.consignee}</td>
              <td className="border border-black px-1 py-0.5">{row.destination}</td>
              <td className="border border-black px-1 py-0.5">{row.description}</td>
              <td className="border border-black px-1 py-0.5 text-center">{row.packages}</td>
              <td className="border border-black px-1 py-0.5 text-center">{row.weight.toFixed(1)}</td>
              <td className="border border-black px-1 py-0.5 text-center">{row.volume.toFixed(3)}</td>
              <td className="border border-black px-1 py-0.5 text-right">{row.amount.toFixed(2)}</td>
            </tr>
          ))}
          {/* Empty rows */}
          {Array.from({ length: Math.max(0, 15 - manifestRows.length) }).map((_, i) => (
            <tr key={`e-${i}`}>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
              <td className="border border-black px-1 py-2"></td>
            </tr>
          ))}
          {/* Totals */}
          <tr className="font-bold bg-gray-100">
            <td colSpan={6} className="border border-black px-2 py-1 text-right">GRAND TOTAL ({manifestRows.length} Invoices)</td>
            <td className="border border-black px-1 py-1 text-center">{grandTotalPkgs}</td>
            <td className="border border-black px-1 py-1 text-center">{grandTotalWeight.toFixed(1)}</td>
            <td className="border border-black px-1 py-1 text-center">{grandTotalVolume.toFixed(3)}</td>
            <td className="border border-black px-1 py-1 text-right">{grandTotalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex justify-between mt-6 text-sm">
        <div className="text-center">
          <div className="border-t border-black mt-12 pt-1 w-48 mx-auto font-bold">PREPARED BY</div>
        </div>
        <div className="text-center">
          <div className="border-t border-black mt-12 pt-1 w-48 mx-auto font-bold">CHECKED BY</div>
        </div>
        <div className="text-center">
          <div className="border-t border-black mt-12 pt-1 w-48 mx-auto font-bold">APPROVED BY</div>
        </div>
      </div>

      <div className="mt-4 text-center text-[7pt] text-gray-500">
        <p>SOQOTRA SOLUTIONS WLL | Eastern Province, Saudi Arabia | accounts-ksa@soqotralogistics.com</p>
      </div>
    </div>
  );
};

export default SACargoManifestDocument;
