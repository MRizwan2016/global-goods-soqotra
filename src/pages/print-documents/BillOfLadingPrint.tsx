
import React, { useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import PrintControls from "./components/PrintControls";
import BillOfLadingDocument from "./components/BillOfLadingDocument";
import HouseBillOfLadingDocument from "./components/HouseBillOfLadingDocument";
import PrintStyles from "./components/PrintStyles";
import { useBillOfLadingData } from "./hooks/useBillOfLadingData";
import { useLocation } from "react-router-dom";

const BillOfLadingPrint: React.FC = () => {
  const location = useLocation();
  const { loading, blData, blType, handlePrint, handleBack } = useBillOfLadingData();
  
  // Check if we're in preview mode or print mode based on the URL
  const isPreviewMode = location.pathname.includes('/bl-preview/');
  
  // In preview mode, use a different title and add "Preview" to the document name
  const documentTitle = `${blType === 'house' ? 'House' : 'Master'} Bill of Lading #${blData?.blNumber || ''}`;
  const pageTitle = isPreviewMode ? `${documentTitle} (Preview)` : documentTitle;

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
        title={pageTitle}
        isPreview={isPreviewMode}
      />

      {/* Document to print - select based on type */}
      <div className={isPreviewMode ? "p-4 max-w-[210mm] mx-auto" : ""}>
        {blType === 'house' ? (
          <HouseBillOfLadingDocument blData={blData} />
        ) : (
          <BillOfLadingDocument blData={blData} />
        )}
      </div>
    </div>
  );
};

export default BillOfLadingPrint;
