
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QatarContainer } from "../../types/containerTypes";
import { v4 as uuidv4 } from "uuid";

interface AddContainerProps {
  onSubmit: (container: QatarContainer) => void;
  onCancel: () => void;
  containerData?: QatarContainer | null;
  isEditing?: boolean;
}

const containerTypes = ["20FT", "40FT", "40HC", "20FR", "40FR", "20OT", "40OT"];
const shippingLines = ["MSC", "Maersk", "CMA CGM", "Hapag-Lloyd", "ONE", "Evergreen", "COSCO"];
const sectors = ["QAT-KEN", "QAT-SL", "QAT-UAE", "QAT-SA", "QAT-OM"];
const directions = ["Import", "Export"];

const AddContainer: React.FC<AddContainerProps> = ({ 
  onSubmit, 
  onCancel, 
  containerData = null, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState<QatarContainer>({
    id: "",
    containerNumber: "",
    containerType: "20FT",
    runningNumber: "",
    status: "Available",
    sealNumber: "",
    direction: "Export",
    sector: "QAT-KEN",
    shippingLine: "MSC"
  });

  useEffect(() => {
    if (containerData) {
      setFormData(containerData);
    } else {
      setFormData({
        id: uuidv4(),
        containerNumber: "",
        containerType: "20FT",
        runningNumber: "",
        status: "Available",
        sealNumber: "",
        direction: "Export",
        sector: "QAT-KEN",
        shippingLine: "MSC"
      });
    }
  }, [containerData]);

  const handleChange = (field: keyof QatarContainer, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="mt-0 border-0 shadow-none">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="containerNumber">Container Number</Label>
                <Input
                  id="containerNumber"
                  placeholder="Enter container number"
                  value={formData.containerNumber}
                  onChange={(e) => handleChange("containerNumber", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="containerType">Container Type</Label>
                <Select
                  value={formData.containerType}
                  onValueChange={(value) => handleChange("containerType", value)}
                >
                  <SelectTrigger id="containerType">
                    <SelectValue placeholder="Select container type" />
                  </SelectTrigger>
                  <SelectContent>
                    {containerTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="runningNumber">Running Number</Label>
                <Input
                  id="runningNumber"
                  placeholder="Enter running number"
                  value={formData.runningNumber}
                  onChange={(e) => handleChange("runningNumber", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="sealNumber">Seal Number</Label>
                <Input
                  id="sealNumber"
                  placeholder="Enter seal number"
                  value={formData.sealNumber || ""}
                  onChange={(e) => handleChange("sealNumber", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="shippingLine">Shipping Line</Label>
                <Select
                  value={formData.shippingLine || ""}
                  onValueChange={(value) => handleChange("shippingLine", value)}
                >
                  <SelectTrigger id="shippingLine">
                    <SelectValue placeholder="Select shipping line" />
                  </SelectTrigger>
                  <SelectContent>
                    {shippingLines.map((line) => (
                      <SelectItem key={line} value={line}>
                        {line}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="direction">Direction</Label>
                <Select
                  value={formData.direction || ""}
                  onValueChange={(value) => handleChange("direction", value)}
                >
                  <SelectTrigger id="direction">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    {directions.map((dir) => (
                      <SelectItem key={dir} value={dir}>
                        {dir}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sector">Sector</Label>
                <Select
                  value={formData.sector || ""}
                  onValueChange={(value) => handleChange("sector", value)}
                >
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {isEditing ? "Update Container" : "Add Container"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddContainer;
