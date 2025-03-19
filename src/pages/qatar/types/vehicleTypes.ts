
export interface QatarVehicle {
  id: string;
  number: string;
  type: string;
  description: string;
  status: "RUN" | "GARAGE" | "MAINTENANCE";
  licenseExpiry: string;
  insuranceExpiry: string;
  mileage: string;
}

export interface QatarDriver {
  id: string;
  name: string;
  code: string;
  mobileNumber: string;
  licenseNumber: string;
  licenseExpiry: string;
}
