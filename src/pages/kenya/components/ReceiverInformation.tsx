
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface ReceiverInformationProps {
  receiverName: string;
  receiverContact: string;
  receiverAddress: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ReceiverInformation = ({ 
  receiverName, 
  receiverContact, 
  receiverAddress, 
  onInputChange 
}: ReceiverInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User size={18} />
          Receiver Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="receiverName">Receiver Name</Label>
          <Input
            id="receiverName"
            name="receiverName"
            value={receiverName}
            onChange={onInputChange}
            placeholder="Enter receiver's name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="receiverContact">Contact Number</Label>
          <Input
            id="receiverContact"
            name="receiverContact"
            value={receiverContact}
            onChange={onInputChange}
            placeholder="Enter receiver's contact number"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="receiverAddress">Address</Label>
          <Textarea
            id="receiverAddress"
            name="receiverAddress"
            value={receiverAddress}
            onChange={onInputChange}
            placeholder="Enter receiver's address"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiverInformation;
