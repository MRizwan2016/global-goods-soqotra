
import React from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import PrintControls from "./components/PrintControls";
import BillOfLadingDocument from "./components/BillOfLadingDocument";
import PrintStyles from "./components/PrintStyles";
import { useBillOfLadingData } from "./hooks/useBillOfLadingData";

const BillOfLadingPrint: React.FC = () => {
  const { loading, blData, handlePrint, handleBack } = useBillOfLadingData();

  if (loading) {
    return <LoadingSpinner message="Loading Bill of Lading..." />;
  }

  return (
    <div>
      <PrintStyles />
      
      {/* Non-printable controls */}
      <PrintControls 
        handleBack={handleBack}
        handlePrint={handlePrint}
        title={`Bill of Lading #${blData.blNumber}`}
      />

      {/* Document to print */}
      <BillOfLadingDocument blData={blData} />
    </div>
  );
};

export default BillOfLadingPrint;
