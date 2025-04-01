
import React from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import PrintControls from "./components/PrintControls";
import BillOfLadingDocument from "./components/BillOfLadingDocument";
import HouseBillOfLadingDocument from "./components/HouseBillOfLadingDocument";
import PrintStyles from "./components/PrintStyles";
import { useBillOfLadingData } from "./hooks/useBillOfLadingData";

const BillOfLadingPrint: React.FC = () => {
  const { loading, blData, blType, handlePrint, handleBack } = useBillOfLadingData();

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
        title={`${blType === 'house' ? 'House' : 'Master'} Bill of Lading #${blData.blNumber}`}
      />

      {/* Document to print - select based on type */}
      {blType === 'house' ? (
        <HouseBillOfLadingDocument blData={blData} />
      ) : (
        <BillOfLadingDocument blData={blData} />
      )}
    </div>
  );
};

export default BillOfLadingPrint;
