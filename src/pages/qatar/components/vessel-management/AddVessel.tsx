
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid } from "@/components/ui/grid";
import { ArrowLeft, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useVesselForm } from "./hooks/useVesselForm";
import VesselDetailsForm from "./components/VesselDetailsForm";
import ShippingDetailsForm from "./components/ShippingDetailsForm";
import { AddVesselProps } from "./types/vesselTypes";

const AddVessel: React.FC<AddVesselProps> = ({ 
  onVesselCreated, 
  onCancel 
}) => {
  const {
    formData,
    existingRunningNumbers,
    handleInputChange,
    handleSelectChange,
    handleSubmit
  } = useVesselForm(onVesselCreated);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Add New Vessel</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">Vessel Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <VesselDetailsForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  existingRunningNumbers={existingRunningNumbers}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ShippingDetailsForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                />
              </CardContent>
            </Card>
          </div>
        </Grid>

        <div className="flex justify-end mt-6 space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Vessel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddVessel;
