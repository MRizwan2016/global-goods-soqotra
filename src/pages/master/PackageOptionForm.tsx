
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { packageOptions } from "@/data/packageOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Import components
import FormHeader from "./components/package-form/FormHeader";
import DescriptionInput from "./components/package-form/DescriptionInput";
import DimensionsTab from "./components/package-form/DimensionsTab";
import VolumeBasedPricingTab from "./components/package-form/VolumeBasedPricingTab";
import WeightBasedPricingTab from "./components/package-form/WeightBasedPricingTab";
import LegacyPricingTab from "./components/package-form/LegacyPricingTab";
import FormActions from "./components/package-form/FormActions";
import { usePackageForm } from "./components/package-form/usePackageForm";

const PackageOptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const existingPackage = isEditing 
    ? packageOptions.find(pkg => pkg.id === Number(id)) 
    : null;

  // Default active tab
  const [activeTab, setActiveTab] = useState("dimensions");

  // Use our custom hook for form handling
  const {
    formState,
    volumeInMeters,
    totals,
    handleInputChange,
    handleSave
  } = usePackageForm({
    existingPackage,
    onSave: (packageData) => {
      // In a real app, this would make an API call to save the data
      console.log("Package to save:", packageData);
      
      toast.success(`Package option ${isEditing ? "updated" : "added"} successfully (Simulated)`);
      navigate("/master/package-options");
    }
  });

  const handleCancel = () => {
    navigate("/master/package-options");
  };
  
  return (
    <Layout title={isEditing ? "Edit Package Option" : "Add Package Option"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <FormHeader isEditing={isEditing} />
        
        <div className="p-4">
          <DescriptionInput 
            description={formState.description} 
            onChange={handleInputChange} 
          />
          
          <Tabs defaultValue="dimensions" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              <TabsTrigger value="volume-based">Volume Based Pricing</TabsTrigger>
              <TabsTrigger value="weight-based">Weight Based Pricing</TabsTrigger>
              <TabsTrigger value="legacy">Legacy Pricing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dimensions">
              <DimensionsTab 
                formState={formState} 
                volumeInMeters={volumeInMeters}
                onChange={handleInputChange}
              />
            </TabsContent>
            
            <TabsContent value="volume-based" className="space-y-6">
              <VolumeBasedPricingTab 
                formState={formState}
                totals={totals}
                onChange={handleInputChange}
              />
            </TabsContent>
            
            <TabsContent value="weight-based" className="space-y-6">
              <WeightBasedPricingTab 
                formState={formState}
                totals={totals}
                onChange={handleInputChange}
              />
            </TabsContent>
            
            <TabsContent value="legacy">
              <LegacyPricingTab 
                formState={formState}
                total={totals.legacy}
                onChange={handleInputChange}
              />
            </TabsContent>
          </Tabs>
          
          <FormActions 
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PackageOptionForm;
