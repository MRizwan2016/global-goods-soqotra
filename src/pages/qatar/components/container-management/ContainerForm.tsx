
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QatarContainer } from "../../types/containerTypes";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";

interface ContainerFormProps {
  existingContainer?: QatarContainer | null;
  onSubmit: (container: QatarContainer) => void;
  onCancel: () => void;
}

const ContainerForm: React.FC<ContainerFormProps> = ({
  existingContainer,
  onSubmit,
  onCancel
}) => {
  // Form state
  const [containerNumber, setContainerNumber] = useState("");
  const [containerType, setContainerType] = useState("20FT");
  const [runningNumber, setRunningNumber] = useState("");
  const [sealNumber, setSealNumber] = useState("");
  const [shippingLine, setShippingLine] = useState("MAERSK");
  const [direction, setDirection] = useState("EXPORT");
  const [sector, setSector] = useState("QAT-SL");
  
  // Load existing container data if provided
  useEffect(() => {
    if (existingContainer) {
      setContainerNumber(existingContainer.containerNumber || "");
      setContainerType(existingContainer.containerType || "20FT");
      setRunningNumber(existingContainer.runningNumber || "");
      setSealNumber(existingContainer.sealNumber || "");
      setShippingLine(existingContainer.shippingLine || "MAERSK");
      setDirection(existingContainer.direction || "EXPORT");
      setSector(existingContainer.sector || "QAT-SL");
    }
  }, [existingContainer]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare the container data
    const containerData: QatarContainer = {
      id: existingContainer?.id || uuidv4(),
      containerNumber: containerNumber.toUpperCase(),
      containerType: containerType,
      runningNumber: runningNumber,
      sealNumber: sealNumber.toUpperCase(),
      shippingLine: shippingLine,
      direction: direction,
      sector: sector,
      status: existingContainer?.status || "PENDING",
      confirmDate: existingContainer?.confirmDate,
      weight: existingContainer?.weight || 0,
      volume: existingContainer?.volume || 0,
      packages: existingContainer?.packages || 0
    };
    
    onSubmit(containerData);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          BACK
        </Button>
        <h2 className="text-2xl font-bold">
          {existingContainer ? "EDIT CONTAINER" : "ADD CONTAINER"}
        </h2>
      </div>
      
      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg">CONTAINER DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="containerNumber">CONTAINER NUMBER</Label>
                <Input
                  id="containerNumber"
                  placeholder="ENTER CONTAINER NUMBER"
                  value={containerNumber}
                  onChange={(e) => setContainerNumber(e.target.value)}
                  required
                  className="uppercase"
                />
              </div>
              
              <div>
                <Label htmlFor="shippingLine">SHIPPING LINE</Label>
                <Select value={shippingLine} onValueChange={setShippingLine}>
                  <SelectTrigger id="shippingLine">
                    <SelectValue placeholder="SELECT SHIPPING LINE" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAERSK">MAERSK</SelectItem>
                    <SelectItem value="MSC">MSC</SelectItem>
                    <SelectItem value="CMA CGM">CMA CGM</SelectItem>
                    <SelectItem value="HAPAG-LLOYD">HAPAG-LLOYD</SelectItem>
                    <SelectItem value="ONE">ONE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="containerType">CONTAINER TYPE</Label>
                <Select value={containerType} onValueChange={setContainerType}>
                  <SelectTrigger id="containerType">
                    <SelectValue placeholder="SELECT CONTAINER TYPE" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20FT">20FT</SelectItem>
                    <SelectItem value="40FT">40FT</SelectItem>
                    <SelectItem value="40HC">40HC</SelectItem>
                    <SelectItem value="45HC">45HC</SelectItem>
                    <SelectItem value="FLAT RACK">FLAT RACK</SelectItem>
                    <SelectItem value="OPEN TOP">OPEN TOP</SelectItem>
                    <SelectItem value="REEFER">REEFER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="direction">DIRECTION</Label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger id="direction">
                    <SelectValue placeholder="SELECT DIRECTION" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXPORT">EXPORT</SelectItem>
                    <SelectItem value="IMPORT">IMPORT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="runningNumber">RUNNING NUMBER</Label>
                <Input
                  id="runningNumber"
                  placeholder="ENTER RUNNING NUMBER"
                  value={runningNumber}
                  onChange={(e) => setRunningNumber(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="sector">SECTOR</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="SELECT SECTOR" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QAT-SL">QATAR-SRI LANKA</SelectItem>
                    <SelectItem value="QAT-IN">QATAR-INDIA</SelectItem>
                    <SelectItem value="QAT-PK">QATAR-PAKISTAN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sealNumber">SEAL NUMBER</Label>
                <Input
                  id="sealNumber"
                  placeholder="ENTER SEAL NUMBER"
                  value={sealNumber}
                  onChange={(e) => setSealNumber(e.target.value)}
                  className="uppercase"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                CANCEL
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                {existingContainer ? "UPDATE CONTAINER" : "ADD CONTAINER"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContainerForm;
