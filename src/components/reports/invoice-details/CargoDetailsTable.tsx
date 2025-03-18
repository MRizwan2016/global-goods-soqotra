
import React from 'react';

interface CargoDetailsTableProps {
  type: 'hold' | 'clear';
  isFullScreen?: boolean;
}

const CargoDetailsTable: React.FC<CargoDetailsTableProps> = ({ 
  type, 
  isFullScreen = false 
}) => {
  const isHold = type === 'hold';
  
  return (
    <div className={`mt-6 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <div className="bg-green-600 text-white p-2 font-semibold text-center">
        {isHold ? 'CARGO HOLD DETAILS' : 'CARGO CLEAR DETAILS'}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse mt-2">
          <thead>
            <tr className="bg-blue-600 text-white">
              {isHold ? (
                <>
                  <th className="border border-gray-300 p-2 text-center">Num</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD NO</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD DATE</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD AMOUNT</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT DATE</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT AMOUNT</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT BY</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT RATE</th>
                  <th className="border border-gray-300 p-2 text-center">SELLING RATE</th>
                  <th className="border border-gray-300 p-2 text-center">VESSEL RNO</th>
                </>
              ) : (
                <>
                  <th className="border border-gray-300 p-2 text-center">Num</th>
                  <th className="border border-gray-300 p-2 text-center">GATE PASS</th>
                  <th className="border border-gray-300 p-2 text-center">W/H INVOICE</th>
                  <th className="border border-gray-300 p-2 text-center">CLEAR DATE</th>
                  <th className="border border-gray-300 p-2 text-center">CLEAR PKG</th>
                  <th className="border border-gray-300 p-2 text-center">TIME IN</th>
                  <th className="border border-gray-300 p-2 text-center">TIME OUT</th>
                  <th className="border border-gray-300 p-2 text-center">NIC</th>
                  <th className="border border-gray-300 p-2 text-center">DOB</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              {isHold ? (
                <>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CargoDetailsTable;
