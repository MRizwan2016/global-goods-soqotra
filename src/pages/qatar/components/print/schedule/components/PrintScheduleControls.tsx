
import React from "react";
import PrintControls from "../../PrintControls";

interface PrintScheduleControlsProps {
  handleBack: () => void;
  handlePrint: () => void;
}

const PrintScheduleControls: React.FC<PrintScheduleControlsProps> = ({
  handleBack,
  handlePrint
}) => {
  return (
    <PrintControls 
      handleBack={handleBack}
      handlePrint={handlePrint}
      title="JOB SCHEDULE PRINT"
    />
  );
};

export default PrintScheduleControls;
