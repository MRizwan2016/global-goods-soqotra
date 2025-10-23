import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, Trash2, Edit } from "lucide-react";
import { AlgeriaVehicle } from "../types/algeriaTypes";
import { AlgeriaStorageService } from "../services/AlgeriaStorageService";
import { toast } from "@/components/ui/use-toast";
import { VEHICLE_RATES } from "../types/algeriaTypes";

const AlgeriaVehicleRegistry = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<AlgeriaVehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<AlgeriaVehicle | null>(null);
  const [formData, setFormData] = useState<Partial<AlgeriaVehicle>>({
    make: "",
    model: "",
    year: "",
    color: "",
    chassisNumber: "",
    plateNumber: "",
    engineNumber: "",
    country: "",
    hsCode: "",
    exportPlate: "",
    type: "SEDAN",
    freightCharge: 5500,
    photos: [],
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const loadedVehicles = await AlgeriaStorageService.loadVehicles();
    setVehicles(loadedVehicles);
  };

  const handleInputChange = (field: keyof AlgeriaVehicle, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVehicleTypeChange = (type: AlgeriaVehicle["type"]) => {
    const rate = VEHICLE_RATES.find(r => r.type === type);
    setFormData(prev => ({
      ...prev,
      type,
      freightCharge: rate?.defaultRate || 0
    }));
  };

  const handleSubmit = async () => {
    if (!formData.exportPlate || !formData.chassisNumber) {
      toast({
        title: "Required Fields",
        description: "Export plate and chassis number are required",
        variant: "destructive"
      });
      return;
    }

    const vehicle: AlgeriaVehicle = {
      id: editingVehicle?.id || `VEH-${Date.now()}`,
      make: formData.make || "",
      model: formData.model || "",
      year: formData.year || "",
      color: formData.color || "",
      chassisNumber: formData.chassisNumber || "",
      plateNumber: formData.plateNumber || "",
      engineNumber: formData.engineNumber || "",
      country: formData.country || "",
      hsCode: formData.hsCode || "",
      exportPlate: formData.exportPlate || "",
      type: formData.type || "SEDAN",
      freightCharge: formData.freightCharge || 0,
      photos: formData.photos || [],
    };

    if (editingVehicle) {
      await AlgeriaStorageService.updateVehicle(vehicle);
      toast({
        title: "Vehicle Updated",
        description: `Vehicle ${vehicle.exportPlate} has been updated`,
      });
    } else {
      await AlgeriaStorageService.addVehicle(vehicle);
      toast({
        title: "Vehicle Added",
        description: `Vehicle ${vehicle.exportPlate} has been registered`,
      });
    }

    loadVehicles();
    resetForm();
  };

  const handleEdit = (vehicle: AlgeriaVehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setShowForm(true);
  };

  const handleDelete = async (vehicleId: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      await AlgeriaStorageService.deleteVehicle(vehicleId);
      toast({
        title: "Vehicle Deleted",
        description: "Vehicle has been removed from registry",
      });
      loadVehicles();
    }
  };

  const resetForm = () => {
    setFormData({
      make: "",
      model: "",
      year: "",
      color: "",
      chassisNumber: "",
      plateNumber: "",
      engineNumber: "",
      country: "",
      hsCode: "",
      exportPlate: "",
      type: "SEDAN",
      freightCharge: 5500,
      photos: [],
    });
    setEditingVehicle(null);
    setShowForm(false);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.exportPlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.chassisNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/algeria")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          {showForm ? "Cancel" : "Add Vehicle"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingVehicle ? "Edit Vehicle" : "Register New Vehicle"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Export Plate Number *</Label>
                <Input
                  value={formData.exportPlate}
                  onChange={(e) => handleInputChange("exportPlate", e.target.value)}
                  placeholder="e.g., EXP-12345"
                />
              </div>
              <div>
                <Label>Chassis Number *</Label>
                <Input
                  value={formData.chassisNumber}
                  onChange={(e) => handleInputChange("chassisNumber", e.target.value)}
                  placeholder="Chassis number"
                />
              </div>
              <div>
                <Label>Vehicle Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleVehicleTypeChange(value as AlgeriaVehicle["type"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VEHICLE_RATES.map(rate => (
                      <SelectItem key={rate.type} value={rate.type}>
                        {rate.description} (QR {rate.defaultRate})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Make</Label>
                <Input
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  placeholder="Toyota, Nissan, etc."
                />
              </div>
              <div>
                <Label>Model</Label>
                <Input
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="Camry, Patrol, etc."
                />
              </div>
              <div>
                <Label>Year</Label>
                <Input
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div>
                <Label>Color</Label>
                <Input
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  placeholder="White, Black, etc."
                />
              </div>
              <div>
                <Label>Plate Number</Label>
                <Input
                  value={formData.plateNumber}
                  onChange={(e) => handleInputChange("plateNumber", e.target.value)}
                  placeholder="Local plate"
                />
              </div>
              <div>
                <Label>Engine Number</Label>
                <Input
                  value={formData.engineNumber}
                  onChange={(e) => handleInputChange("engineNumber", e.target.value)}
                  placeholder="Engine number"
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Origin country"
                />
              </div>
              <div>
                <Label>HS Code</Label>
                <Input
                  value={formData.hsCode}
                  onChange={(e) => handleInputChange("hsCode", e.target.value)}
                  placeholder="HS code"
                />
              </div>
              <div>
                <Label>Freight Charge (QR)</Label>
                <Input
                  type="number"
                  value={formData.freightCharge}
                  onChange={(e) => handleInputChange("freightCharge", parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSubmit}>
                {editingVehicle ? "Update Vehicle" : "Save Vehicle"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Registry</CardTitle>
          <div className="flex items-center gap-2 mt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by export plate, chassis, make, or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Export Plate</TableHead>
                  <TableHead>Chassis Number</TableHead>
                  <TableHead>Make/Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Freight (QR)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No vehicles registered yet
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.exportPlate}</TableCell>
                      <TableCell>{vehicle.chassisNumber}</TableCell>
                      <TableCell>{vehicle.make} {vehicle.model}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell>{vehicle.color}</TableCell>
                      <TableCell>{vehicle.freightCharge.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(vehicle)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(vehicle.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgeriaVehicleRegistry;
