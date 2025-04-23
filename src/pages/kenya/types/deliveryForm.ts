
export interface DeliveryFormState {
  invoiceNumber: string;
  invoiceDate?: string; // Added for invoice date
  senderName: string;
  senderContact: string;
  senderAddress: string;
  receiverName: string;
  receiverContact: string;
  receiverAddress: string;
  county: string;
  district: string;
  originWarehouse: string;
  destinationWarehouse: string;
  isDoorToDoor: boolean;
  weight: string;
  volume: string;
  packages: string;
  description: string;
  collectionDate: string;
  estimatedDeliveryDate: string;
  driverId: string;
  vehicleId: string;
  loadingDate?: string; // New field for date of loading
  receiveDate?: string; // New field for date received
  deliveryDate?: string; // New field for date of loading for delivery
  paymentStatus?: string; // Added for payment status
  paymentApproved?: boolean; // Added for payment approval
  receivedPackages?: string; // Added for packages received
}

export interface DeliveryFormHandlers {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}
