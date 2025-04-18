
export interface DeliveryFormState {
  invoiceNumber: string;
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
}

export interface DeliveryFormHandlers {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}
