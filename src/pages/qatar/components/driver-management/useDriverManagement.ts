
import { useState, useEffect } from "react";
import { QatarDriver, QatarVehicle } from "../../types/vehicleTypes";
import { mockDrivers, mockVehicles } from "../../data/mockVehicles";

interface DriverEditForm {
  licenseNumber: string;
  assignedVehicleId: string;
}

export const useDriverManagement = () => {
  // Add employment status to each driver
  const [drivers, setDrivers] = useState<QatarDriver[]>(
    mockDrivers.map((driver, index) => ({
      ...driver,
      // Add employment status - first 5 drivers active, others on different statuses
      employmentStatus: index < 5 ? "ACTIVE" : (index === 5 ? "ON_LEAVE" : "INACTIVE"),
      // Add assigned vehicle for some drivers
      assignedVehicleId: index < 3 ? mockVehicles[index].id : undefined,
      assignedVehicleNumber: index < 3 ? mockVehicles[index].number : undefined,
    }))
  );

  const [vehicles] = useState<QatarVehicle[]>(mockVehicles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState<QatarDriver | null>(null);

  const handleEditClick = (driver: QatarDriver) => {
    setCurrentDriver(driver);
    setIsDialogOpen(true);
  };

  const handleSaveChanges = (data: DriverEditForm) => {
    if (!currentDriver) return;

    const selectedVehicle = vehicles.find(v => v.id === data.assignedVehicleId);
    
    setDrivers(prev => prev.map(driver => {
      if (driver.id === currentDriver.id) {
        return {
          ...driver,
          licenseNumber: data.licenseNumber,
          assignedVehicleId: data.assignedVehicleId || undefined,
          assignedVehicleNumber: selectedVehicle?.number || undefined,
        };
      }
      return driver;
    }));

    setIsDialogOpen(false);
    setCurrentDriver(null);
  };

  return {
    drivers,
    vehicles,
    currentDriver,
    isDialogOpen,
    setIsDialogOpen,
    handleEditClick,
    handleSaveChanges
  };
};
