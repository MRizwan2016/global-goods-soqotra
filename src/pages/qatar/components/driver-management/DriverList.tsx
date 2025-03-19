
import React from "react";
import DriverTable from "./DriverTable";
import DriverEditDialog from "./DriverEditDialog";
import { useDriverManagement } from "./useDriverManagement";

const DriverList: React.FC = () => {
  const {
    drivers,
    vehicles,
    currentDriver,
    isDialogOpen,
    setIsDialogOpen,
    handleEditClick,
    handleSaveChanges
  } = useDriverManagement();
  
  return (
    <>
      <DriverTable 
        drivers={drivers} 
        onEditDriver={handleEditClick} 
      />

      <DriverEditDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentDriver={currentDriver}
        vehicles={vehicles}
        onSave={handleSaveChanges}
      />
    </>
  );
};

export default DriverList;
