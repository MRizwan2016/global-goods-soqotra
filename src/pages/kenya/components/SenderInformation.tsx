
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface SenderInformationProps {
  senderName: string;
  senderContact: string;
  senderAddress: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SenderInformation = ({ 
  senderName, 
  senderContact, 
  senderAddress, 
  onInputChange 
}: SenderInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User size={18} />
          Sender Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="senderName">Sender Name</Label>
          <Input
            id="senderName"
            name="senderName"
            value={senderName}
            onChange={onInputChange}
            placeholder="Enter sender's name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="senderContact">Contact Number</Label>
          <Input
            id="senderContact"
            name="senderContact"
            value={senderContact}
            onChange={onInputChange}
            placeholder="Enter sender's contact number"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="senderAddress">Address</Label>
          <Textarea
            id="senderAddress"
            name="senderAddress"
            value={senderAddress}
            onChange={onInputChange}
            placeholder="Enter sender's address"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SenderInformation;
