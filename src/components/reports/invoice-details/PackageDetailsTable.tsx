
import React from 'react';

interface PackageDetailsTableProps {
  invoice: any;
  isFullScreen?: boolean;
}

const PackageDetailsTable: React.FC<PackageDetailsTableProps> = ({ 
  invoice, 
  isFullScreen = false 
}) => {
  return (
    <div className={`mt-6 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <div className="bg-blue-600 text-white p-2 font-semibold">
        PACKAGE DETAILS
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse mt-2">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2 text-left">Num</th>
              <th className="border border-gray-300 p-2 text-left">PACKAGE</th>
              <th className="border border-gray-300 p-2 text-center">LENGTH</th>
              <th className="border border-gray-300 p-2 text-center">WIDTH</th>
              <th className="border border-gray-300 p-2 text-center">HEIGHT</th>
              <th className="border border-gray-300 p-2 text-center">VOLUME</th>
              <th className="border border-gray-300 p-2 text-center">WEIGHT</th>
              <th className="border border-gray-300 p-2 text-center">BARCODE</th>
              <th className="border border-gray-300 p-2 text-center">CRNO</th>
              <th className="border border-gray-300 p-2 text-center">LOADED DATE</th>
              <th className="border border-gray-300 p-2 text-center">VRNO</th>
              <th className="border border-gray-300 p-2 text-center">NAME</th>
              <th className="border border-gray-300 p-2 text-center">VOYAGE</th>
              <th className="border border-gray-300 p-2 text-center">CNO</th>
              <th className="border border-gray-300 p-2 text-center">E.T.A</th>
              <th className="border border-gray-300 p-2 text-center">CLEAR</th>
              <th className="border border-gray-300 p-2 text-center">UNLOAD</th>
            </tr>
          </thead>
          <tbody>
            {invoice.packageDetails ? (
              invoice.packageDetails.map((pkg, index) => (
                <tr key={pkg.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{pkg.name}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.length}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.width}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.height}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.volume}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.weight || "22.5"}</td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center">0</td>
                  <td className="border border-gray-300 p-2 text-center">00/00/0000</td>
                  <td className="border border-gray-300 p-2 text-center">0</td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center">//</td>
                  <td className="border border-gray-300 p-2 text-center">//</td>
                  <td className="border border-gray-300 p-2 text-center">//</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">TELEVISION SET (P/E)</td>
                <td className="border border-gray-300 p-2 text-center">41</td>
                <td className="border border-gray-300 p-2 text-center">7</td>
                <td className="border border-gray-300 p-2 text-center">26</td>
                <td className="border border-gray-300 p-2 text-center">0.125</td>
                <td className="border border-gray-300 p-2 text-center">22.5</td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center">0</td>
                <td className="border border-gray-300 p-2 text-center">00/00/0000</td>
                <td className="border border-gray-300 p-2 text-center">0</td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center">//</td>
                <td className="border border-gray-300 p-2 text-center">//</td>
                <td className="border border-gray-300 p-2 text-center">//</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackageDetailsTable;
