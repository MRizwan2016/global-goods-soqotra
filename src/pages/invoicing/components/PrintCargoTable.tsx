
interface Package {
  id: string;
  name: string;
  length: string;
  width: string;
  height: string;
  volume: string;
}

interface CargoTableProps {
  packages: Package[];
  totalWeight: string;
  totalVolume: string;
}

const PrintCargoTable = ({ packages, totalWeight, totalVolume }: CargoTableProps) => {
  return (
    <div className="border-t border-black">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-16 border border-black p-1 text-center">SL</th>
            <th className="border border-black p-1 text-center">CARGO DESCRIPTION</th>
            <th className="w-12 border border-black p-1 text-center">L</th>
            <th className="w-12 border border-black p-1 text-center">W</th>
            <th className="w-12 border border-black p-1 text-center">H</th>
            <th className="w-24 border border-black p-1 text-center">CBF</th>
            <th className="w-24 border border-black p-1 text-center">CBM</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={pkg.id}>
              <td className="border border-black p-1 text-center">({index + 1})</td>
              <td className="border border-black p-1">{pkg.name} (P/E)</td>
              <td className="border border-black p-1 text-center">{pkg.length}</td>
              <td className="border border-black p-1 text-center">{pkg.width}</td>
              <td className="border border-black p-1 text-center">{pkg.height}</td>
              <td className="border border-black p-1 text-right">
                {(parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height) / 1000).toFixed(3)}
              </td>
              <td className="border border-black p-1 text-right">{pkg.volume}</td>
            </tr>
          ))}
          
          {/* Add empty rows to match template */}
          {Array.from({ length: Math.max(10 - packages.length, 0) }).map((_, i) => (
            <tr key={`empty-${i}`}>
              <td className="border border-black p-1 h-7"></td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1"></td>
            </tr>
          ))}
          
          {/* Totals Row */}
          <tr>
            <td colSpan={2} className="border border-black p-1 font-bold">TOTAL</td>
            <td colSpan={3} className="border border-black p-1 text-center font-bold">WEIGHT {totalWeight} KG</td>
            <td className="border border-black p-1 text-right font-bold">VOLUME (CBM)</td>
            <td className="border border-black p-1 text-right font-bold">{totalVolume}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrintCargoTable;
