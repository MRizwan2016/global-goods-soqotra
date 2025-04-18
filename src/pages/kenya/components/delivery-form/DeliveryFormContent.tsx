
import { ChangeEvent } from "react";
import InvoiceSelector from "../InvoiceSelector";
import SenderInformation from "../SenderInformation";
import ReceiverInformation from "../ReceiverInformation";
import DeliveryLocation from "../DeliveryLocation";
import CargoDetails from "../CargoDetails";
import WarehouseSchedule from "../WarehouseSchedule";
import TransportAssignment from "../TransportAssignment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DeliveryFormContentProps {
  formState: any; // Using any temporarily, should be properly typed
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheckboxChange: (checked: boolean) => void;
  onSelectChange: (name: string, value: string) => void;
}

const DeliveryFormContent = ({
  formState,
  onInputChange,
  onCheckboxChange,
  onSelectChange
}: DeliveryFormContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Invoice Selection */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg">Invoice Information</CardTitle>
          <CardDescription>
            Link this delivery to an existing invoice or create a new delivery record
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InvoiceSelector 
            invoiceNumber={formState.invoiceNumber} 
            onInvoiceSelect={(invoiceNumber) => onSelectChange("invoiceNumber", invoiceNumber)} 
          />
        </CardContent>
      </Card>
      
      {/* Sender, Receiver & Location */}
      <SenderInformation 
        senderName={formState.senderName}
        senderContact={formState.senderContact}
        senderAddress={formState.senderAddress}
        onInputChange={onInputChange}
      />
      
      <ReceiverInformation 
        receiverName={formState.receiverName}
        receiverContact={formState.receiverContact}
        receiverAddress={formState.receiverAddress}
        onInputChange={onInputChange}
      />
      
      <DeliveryLocation 
        county={formState.county}
        district={formState.district}
        isDoorToDoor={formState.isDoorToDoor}
        counties={[
          "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Machakos", 
          "Nyeri", "Kakamega", "Kilifi", "Uasin Gishu", "Turkana", "Garissa"
        ]}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
        onCheckboxChange={onCheckboxChange}
      />
      
      {/* Cargo, Warehouse & Transport */}
      <CargoDetails 
        weight={formState.weight}
        volume={formState.volume}
        packages={formState.packages}
        description={formState.description}
        onInputChange={onInputChange}
      />
      
      <WarehouseSchedule 
        originWarehouse={formState.originWarehouse}
        destinationWarehouse={formState.destinationWarehouse}
        collectionDate={formState.collectionDate}
        estimatedDeliveryDate={formState.estimatedDeliveryDate}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
      />
      
      <TransportAssignment 
        driverId={formState.driverId}
        vehicleId={formState.vehicleId}
        drivers={mockDrivers}
        vehicles={mockVehicles}
        onSelectChange={onSelectChange}
      />
    </div>
  );
};

export default DeliveryFormContent;
