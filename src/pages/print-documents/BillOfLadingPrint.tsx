
import React from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import PrintControls from "./components/PrintControls";
import BillOfLadingDocument from "./components/bill-of-lading";
import HouseBillOfLadingDocument from "./components/house-bill-of-lading";
import PrintStyles from "./components/PrintStyles";
import { useBillOfLadingData } from "./hooks/useBillOfLadingData";
import { useLocation } from "react-router-dom";
import ErrorState from "./components/bill-of-lading/ErrorState";

const BillOfLadingPrint: React.FC = () => {
  const location = useLocation();
  const { 
    loading, 
    blData, 
    error, 
    blType, 
    isPreview, 
    isEdited,
    handlePrint, 
    handleBack,
    handleSave,
    handleBLDataChange
  } = useBillOfLadingData();
  
  // In preview mode, use a different title and add "Preview" to the document name
  const documentTitle = `${blType === 'house' ? 'House' : 'Master'} Bill of Lading ${blData?.blNumber ? `#${blData.blNumber}` : ''}`;
  const pageTitle = isPreview ? `${documentTitle} (Preview)` : documentTitle;

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
        handleSave={isPreview ? handleSave : undefined}
        title={pageTitle}
        isPreview={isPreview}
        isEdited={isEdited}
      />

      {/* Display error if there is one */}
      {error && <ErrorState />}

      {/* Document to print - select based on type */}
      {!error && blData && (
        <div className={isPreview ? "p-4 max-w-[210mm] mx-auto mt-16" : ""}>
          {blType === 'house' ? (
            <HouseBillOfLadingDocument 
              blData={blData} 
              onBLDataChange={isPreview ? handleBLDataChange : undefined}
              editable={isPreview}
            />
          ) : (
            <BillOfLadingDocument 
              blData={blData} 
              onBLDataChange={isPreview ? handleBLDataChange : undefined}
              editable={isPreview}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BillOfLadingPrint;
