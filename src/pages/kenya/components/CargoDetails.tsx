
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

interface CargoDetailsProps {
  weight: string;
  volume: string;
  packages: string;
  description: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CargoDetails = ({
  weight,
  volume,
  packages,
  description,
  onInputChange
}: CargoDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Package size={18} />
          Cargo Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              value={weight}
              onChange={onInputChange}
              placeholder="Weight"
              className="mt-1"
              type="number"
              min="0"
            />
          </div>
          
          <div>
            <Label htmlFor="volume">Volume (m³)</Label>
            <Input
              id="volume"
              name="volume"
              value={volume}
              onChange={onInputChange}
              placeholder="Volume"
              className="mt-1"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <Label htmlFor="packages">Packages</Label>
            <Input
              id="packages"
              name="packages"
              value={packages}
              onChange={onInputChange}
              placeholder="Packages"
              className="mt-1"
              type="number"
              min="1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Cargo Description</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={onInputChange}
            placeholder="Describe the cargo contents"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoDetails;
