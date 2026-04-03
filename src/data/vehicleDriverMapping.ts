// Vehicle-Driver mapping from operations data
export const VEHICLE_DRIVER_MAP = [
  { truck: "41067", driver: "MR. ASHOKA UDESH" },
  { truck: "41070", driver: "MR. KANAYA" },
  { truck: "41073", driver: "MR. BAKEETH" },
  { truck: "215004", driver: "MR. MOHAMMED NOOR" },
  { truck: "119929", driver: "MR. JOHNY VENAKDY" },
];

export const VEHICLES = VEHICLE_DRIVER_MAP.map(v => ({
  value: v.truck,
  label: `${v.truck} / ${v.driver}`,
}));

export const DRIVERS = VEHICLE_DRIVER_MAP.map(v => ({
  value: v.driver,
  label: v.driver,
}));

export const getDriverForVehicle = (truck: string): string => {
  const found = VEHICLE_DRIVER_MAP.find(v => v.truck === truck);
  return found?.driver || "";
};

export const getVehicleForDriver = (driver: string): string => {
  const found = VEHICLE_DRIVER_MAP.find(v => v.driver === driver);
  return found?.truck || "";
};

// Sales representatives shared across SL & SA
export const SALES_REPS = [
  { value: "M.P.A.Ranathunga/204", label: "M.P.A.Ranathunga/204" },
  { value: "MR. SAJJAD", label: "MR. SAJJAD" },
  { value: "MR. IMAM UBAIDULLA", label: "MR. IMAM UBAIDULLA" },
  { value: "MR. LAHIRU CHATHURANGA", label: "MR. LAHIRU CHATHURANGA" },
];

// Helpers
export const HELPERS = [
  { value: "M.P.A.Ranathunga/204", label: "M.P.A.Ranathunga/204" },
  { value: "MR. NUWAN", label: "MR. NUWAN" },
  { value: "MR. CHAMINDA", label: "MR. CHAMINDA" },
];
