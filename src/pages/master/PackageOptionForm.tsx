
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { packageOptions, PackageOption } from "@/data/packageOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const PackageOptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const existingPackage = isEditing 
    ? packageOptions.find(pkg => pkg.id === Number(id)) 
    : null;
    
  const [formState, setFormState] = useState({
    description: existingPackage?.description || "",
    length: existingPackage?.dimensions.length.toString() || "",
    width: existingPackage?.dimensions.width.toString() || "",
    height: existingPackage?.dimensions.height.toString() || "",
    weightInKg: existingPackage?.weightInKg?.toString() || "",
    // Sri Lanka (volume-based)
    sriLankaPrice: existingPackage?.pricing?.sriLanka?.price.toString() || "",
    sriLankaDocFee: existingPackage?.pricing?.sriLanka?.documentsFee.toString() || "0",
    // Philippines (volume-based)
    philippinesPrice: existingPackage?.pricing?.philippines?.price.toString() || "",
    philippinesDocFee: existingPackage?.pricing?.philippines?.documentsFee.toString() || "0",
    // Kenya (weight-based)
    kenyaMombasaPrice: existingPackage?.pricing?.kenya?.mombasa?.price.toString() || "",
    kenyaMombasaDocFee: existingPackage?.pricing?.kenya?.mombasa?.documentsFee.toString() || "35",
    kenyaNairobiPrice: existingPackage?.pricing?.kenya?.nairobi?.price.toString() || "",
    kenyaNairobiDocFee: existingPackage?.pricing?.kenya?.nairobi?.documentsFee.toString() || "35",
    // Eritrea (weight-based)
    eritreaAsmaraPrice: existingPackage?.pricing?.eritrea?.asmara?.price.toString() || "",
    eritreaAsmaraDocFee: existingPackage?.pricing?.eritrea?.asmara?.documentsFee.toString() || "40",
    eritreaHargeisaPrice: existingPackage?.pricing?.eritrea?.hargeisa?.price.toString() || "",
    eritreaHargeisaDocFee: existingPackage?.pricing?.eritrea?.hargeisa?.documentsFee.toString() || "40",
    // Sudan (weight-based)
    sudanPortSudanPrice: existingPackage?.pricing?.sudan?.portSudan?.price.toString() || "",
    sudanPortSudanDocFee: existingPackage?.pricing?.sudan?.portSudan?.documentsFee.toString() || "45",
    // Legacy fields
    price: existingPackage?.price.toString() || "",
    documentsFee: existingPackage?.documentsFee.toString() || "0",
  });
  
  const [volumeInMeters, setVolumeInMeters] = useState(existingPackage?.volumeInMeters.toString() || "0");
  const [totals, setTotals] = useState({
    sriLanka: "0",
    philippines: "0",
    kenyaMombasa: "0",
    kenyaNairobi: "0",
    eritreaAsmara: "0",
    eritreaHargeisa: "0",
    sudanPortSudan: "0",
    legacy: existingPackage?.total.toString() || "0"
  });

  // Default active tab
  const [activeTab, setActiveTab] = useState("dimensions");
  
  useEffect(() => {
    // Calculate volume in cubic meters when dimensions change
    const length = parseFloat(formState.length) || 0;
    const width = parseFloat(formState.width) || 0;
    const height = parseFloat(formState.height) || 0;
    
    // Convert from inches to meters and calculate volume
    const volumeInches = length * width * height;
    const volumeMeters = volumeInches * 0.000016387064; // Convert cubic inches to cubic meters
    
    setVolumeInMeters(volumeMeters.toFixed(3));
    
    // Calculate totals for each destination
    const newTotals = {
      sriLanka: (parseFloat(formState.sriLankaPrice) + parseFloat(formState.sriLankaDocFee)).toFixed(2),
      philippines: (parseFloat(formState.philippinesPrice) + parseFloat(formState.philippinesDocFee)).toFixed(2),
      kenyaMombasa: (parseFloat(formState.kenyaMombasaPrice) + parseFloat(formState.kenyaMombasaDocFee)).toFixed(2),
      kenyaNairobi: (parseFloat(formState.kenyaNairobiPrice) + parseFloat(formState.kenyaNairobiDocFee)).toFixed(2),
      eritreaAsmara: (parseFloat(formState.eritreaAsmaraPrice) + parseFloat(formState.eritreaAsmaraDocFee)).toFixed(2),
      eritreaHargeisa: (parseFloat(formState.eritreaHargeisaPrice) + parseFloat(formState.eritreaHargeisaDocFee)).toFixed(2),
      sudanPortSudan: (parseFloat(formState.sudanPortSudanPrice) + parseFloat(formState.sudanPortSudanDocFee)).toFixed(2),
      legacy: (parseFloat(formState.price) + parseFloat(formState.documentsFee)).toFixed(2)
    };
    
    setTotals(newTotals);
  }, [formState]);

  // Update Kenya and other weight-based prices when weight changes
  useEffect(() => {
    if (formState.weightInKg) {
      const weight = parseFloat(formState.weightInKg);
      if (!isNaN(weight)) {
        // Apply weight-based pricing if no manual values have been set
        if (!formState.kenyaMombasaPrice) {
          const price = (weight * 7.5).toFixed(2);
          setFormState(prev => ({...prev, kenyaMombasaPrice: price}));
        }
        if (!formState.kenyaNairobiPrice) {
          const price = (weight * 8.2).toFixed(2);
          setFormState(prev => ({...prev, kenyaNairobiPrice: price}));
        }
        if (!formState.eritreaAsmaraPrice) {
          const price = (weight * 9.5).toFixed(2);
          setFormState(prev => ({...prev, eritreaAsmaraPrice: price}));
        }
        if (!formState.eritreaHargeisaPrice) {
          const price = (weight * 8.7).toFixed(2);
          setFormState(prev => ({...prev, eritreaHargeisaPrice: price}));
        }
        if (!formState.sudanPortSudanPrice) {
          const price = (weight * 10.2).toFixed(2);
          setFormState(prev => ({...prev, sudanPortSudanPrice: price}));
        }
      }
    }
  }, [formState.weightInKg]);

  // When volume changes, update Sri Lanka and Philippines prices (volume-based)
  useEffect(() => {
    const volume = parseFloat(volumeInMeters);
    if (!isNaN(volume)) {
      // Calculate Sri Lanka price if not manually set (365 per cubic meter)
      if (!formState.sriLankaPrice) {
        const price = (volume * 365).toFixed(2);
        const docFee = volume > 1 ? "50.00" : "0.00";
        setFormState(prev => ({
          ...prev, 
          sriLankaPrice: price,
          sriLankaDocFee: docFee
        }));
      }

      // Calculate Philippines price if not manually set (328 per cubic meter, 10% cheaper)
      if (!formState.philippinesPrice) {
        const price = (volume * 328.5).toFixed(2);
        const docFee = volume > 1 ? "45.00" : "0.00";
        setFormState(prev => ({
          ...prev, 
          philippinesPrice: price,
          philippinesDocFee: docFee
        }));
      }

      // Update legacy price for backward compatibility
      if (!formState.price) {
        setFormState(prev => ({
          ...prev,
          price: (volume * 365).toFixed(2),
          documentsFee: volume > 1 ? "50.00" : "0.00"
        }));
      }
    }
  }, [volumeInMeters]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // Validation
    if (!formState.description) {
      toast.error("Description is required");
      return;
    }
    
    if (!formState.length || !formState.width || !formState.height) {
      toast.error("All dimensions are required");
      return;
    }
    
    if (!formState.weightInKg) {
      toast.error("Weight is required");
      return;
    }
    
    // Create new package object with the enhanced structure
    const newPackage: Omit<PackageOption, "id"> = {
      description: formState.description,
      dimensions: {
        length: parseFloat(formState.length),
        width: parseFloat(formState.width),
        height: parseFloat(formState.height),
      },
      volumeInMeters: parseFloat(volumeInMeters),
      weightInKg: parseFloat(formState.weightInKg),
      pricing: {
        sriLanka: {
          price: parseFloat(formState.sriLankaPrice) || 0,
          documentsFee: parseFloat(formState.sriLankaDocFee) || 0,
          isVolumeBasedPricing: true
        },
        philippines: {
          price: parseFloat(formState.philippinesPrice) || 0,
          documentsFee: parseFloat(formState.philippinesDocFee) || 0,
          isVolumeBasedPricing: true
        },
        kenya: {
          mombasa: {
            price: parseFloat(formState.kenyaMombasaPrice) || 0,
            documentsFee: parseFloat(formState.kenyaMombasaDocFee) || 0,
            isVolumeBasedPricing: false
          },
          nairobi: {
            price: parseFloat(formState.kenyaNairobiPrice) || 0,
            documentsFee: parseFloat(formState.kenyaNairobiDocFee) || 0,
            isVolumeBasedPricing: false
          }
        },
        eritrea: {
          asmara: {
            price: parseFloat(formState.eritreaAsmaraPrice) || 0,
            documentsFee: parseFloat(formState.eritreaAsmaraDocFee) || 0,
            isVolumeBasedPricing: false
          },
          hargeisa: {
            price: parseFloat(formState.eritreaHargeisaPrice) || 0,
            documentsFee: parseFloat(formState.eritreaHargeisaDocFee) || 0,
            isVolumeBasedPricing: false
          }
        },
        sudan: {
          portSudan: {
            price: parseFloat(formState.sudanPortSudanPrice) || 0,
            documentsFee: parseFloat(formState.sudanPortSudanDocFee) || 0,
            isVolumeBasedPricing: false
          }
        }
      },
      // Legacy fields for backward compatibility
      price: parseFloat(formState.price) || 0,
      documentsFee: parseFloat(formState.documentsFee) || 0,
      total: parseFloat(totals.legacy)
    };
    
    // In a real app, this would make an API call to save the data
    console.log("Package to save:", isEditing ? { id: Number(id), ...newPackage } : newPackage);
    
    toast.success(`Package option ${isEditing ? "updated" : "added"} successfully (Simulated)`);
    navigate("/master/package-options");
  };

  const getPricingMethodLabel = (isVolumeBasedPricing: boolean) => {
    return isVolumeBasedPricing 
      ? "Volume-Based Pricing (per cubic meter)" 
      : "Weight-Based Pricing (per kg)";
  };
  
  return (
    <Layout title={isEditing ? "Edit Package Option" : "Add Package Option"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            {isEditing ? "Edit Package Option" : "Add Package Option"}
          </h3>
          <p className="text-sm text-green-600 mt-1">
            {isEditing ? "Update package option details" : "Create a new package option for your shipment needs"}
          </p>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Description:</label>
              <Input 
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="e.g., WOODEN BOX or CARTON BOX"
              />
            </div>
          </div>
          
          <Tabs defaultValue="dimensions" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              <TabsTrigger value="volume-based">Volume Based Pricing</TabsTrigger>
              <TabsTrigger value="weight-based">Weight Based Pricing</TabsTrigger>
              <TabsTrigger value="legacy">Legacy Pricing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dimensions" className="p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col md:col-span-2">
                  <h4 className="font-medium text-gray-700 mb-2">Dimensions & Weight</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Length (inches):</label>
                      <Input 
                        name="length"
                        value={formState.length}
                        onChange={handleInputChange}
                        type="number"
                        className="border border-gray-300"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Width (inches):</label>
                      <Input 
                        name="width"
                        value={formState.width}
                        onChange={handleInputChange}
                        type="number"
                        className="border border-gray-300"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Height (inches):</label>
                      <Input 
                        name="height"
                        value={formState.height}
                        onChange={handleInputChange}
                        type="number"
                        className="border border-gray-300"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Weight (kg):</label>
                      <Input 
                        name="weightInKg"
                        value={formState.weightInKg}
                        onChange={handleInputChange}
                        type="number"
                        className="border border-gray-300"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Volume (cubic meters):</label>
                  <Input 
                    value={volumeInMeters}
                    readOnly
                    className="border border-gray-300 bg-gray-50 font-bold"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="volume-based" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h4 className="font-medium text-blue-700 mb-2">
                      {getPricingMethodLabel(true)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      These countries use volume-based pricing for shipments.
                    </p>
                  </div>
                  
                  {/* Sri Lanka Pricing */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h5 className="font-medium mb-2">Sri Lanka</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Price:</label>
                        <Input 
                          name="sriLankaPrice"
                          value={formState.sriLankaPrice}
                          onChange={handleInputChange}
                          type="number"
                          step="0.01"
                          className="border border-gray-300"
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Documents Fee:</label>
                        <Input 
                          name="sriLankaDocFee"
                          value={formState.sriLankaDocFee}
                          onChange={handleInputChange}
                          type="number"
                          step="0.01"
                          className="border border-gray-300"
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Total:</label>
                        <Input 
                          value={totals.sriLanka}
                          readOnly
                          className="border border-gray-300 bg-gray-50 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Philippines Pricing */}
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-medium mb-2">Philippines</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Price:</label>
                        <Input 
                          name="philippinesPrice"
                          value={formState.philippinesPrice}
                          onChange={handleInputChange}
                          type="number"
                          step="0.01"
                          className="border border-gray-300"
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Documents Fee:</label>
                        <Input 
                          name="philippinesDocFee"
                          value={formState.philippinesDocFee}
                          onChange={handleInputChange}
                          type="number"
                          step="0.01"
                          className="border border-gray-300"
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Total:</label>
                        <Input 
                          value={totals.philippines}
                          readOnly
                          className="border border-gray-300 bg-gray-50 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weight-based" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h4 className="font-medium text-green-700 mb-2">
                      {getPricingMethodLabel(false)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      These countries use weight-based pricing for shipments.
                    </p>
                  </div>
                  
                  {/* Kenya Pricing */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h5 className="font-medium mb-2">Kenya</h5>
                    
                    {/* Mombasa */}
                    <div className="mb-4">
                      <h6 className="text-sm text-gray-700 mb-1">Mombasa</h6>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Price:</label>
                          <Input 
                            name="kenyaMombasaPrice"
                            value={formState.kenyaMombasaPrice}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Documents Fee:</label>
                          <Input 
                            name="kenyaMombasaDocFee"
                            value={formState.kenyaMombasaDocFee}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Total:</label>
                          <Input 
                            value={totals.kenyaMombasa}
                            readOnly
                            className="border border-gray-300 bg-gray-50 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Nairobi */}
                    <div>
                      <h6 className="text-sm text-gray-700 mb-1">Nairobi</h6>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Price:</label>
                          <Input 
                            name="kenyaNairobiPrice"
                            value={formState.kenyaNairobiPrice}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Documents Fee:</label>
                          <Input 
                            name="kenyaNairobiDocFee"
                            value={formState.kenyaNairobiDocFee}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Total:</label>
                          <Input 
                            value={totals.kenyaNairobi}
                            readOnly
                            className="border border-gray-300 bg-gray-50 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Eritrea Pricing */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h5 className="font-medium mb-2">Eritrea</h5>
                    
                    {/* Asmara */}
                    <div className="mb-4">
                      <h6 className="text-sm text-gray-700 mb-1">Asmara</h6>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Price:</label>
                          <Input 
                            name="eritreaAsmaraPrice"
                            value={formState.eritreaAsmaraPrice}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Documents Fee:</label>
                          <Input 
                            name="eritreaAsmaraDocFee"
                            value={formState.eritreaAsmaraDocFee}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Total:</label>
                          <Input 
                            value={totals.eritreaAsmara}
                            readOnly
                            className="border border-gray-300 bg-gray-50 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hargeisa */}
                    <div>
                      <h6 className="text-sm text-gray-700 mb-1">Hargeisa</h6>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Price:</label>
                          <Input 
                            name="eritreaHargeisaPrice"
                            value={formState.eritreaHargeisaPrice}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Documents Fee:</label>
                          <Input 
                            name="eritreaHargeisaDocFee"
                            value={formState.eritreaHargeisaDocFee}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Total:</label>
                          <Input 
                            value={totals.eritreaHargeisa}
                            readOnly
                            className="border border-gray-300 bg-gray-50 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sudan Pricing */}
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-medium mb-2">Sudan</h5>
                    
                    {/* Port Sudan */}
                    <div>
                      <h6 className="text-sm text-gray-700 mb-1">Port Sudan</h6>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Price:</label>
                          <Input 
                            name="sudanPortSudanPrice"
                            value={formState.sudanPortSudanPrice}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Documents Fee:</label>
                          <Input 
                            name="sudanPortSudanDocFee"
                            value={formState.sudanPortSudanDocFee}
                            onChange={handleInputChange}
                            type="number"
                            step="0.01"
                            className="border border-gray-300"
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Total:</label>
                          <Input 
                            value={totals.sudanPortSudan}
                            readOnly
                            className="border border-gray-300 bg-gray-50 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="legacy" className="p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Price (Legacy):</label>
                  <Input 
                    name="price"
                    value={formState.price}
                    onChange={handleInputChange}
                    type="number"
                    step="0.01"
                    className="border border-gray-300"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Documents Fee (Legacy):</label>
                  <Input 
                    name="documentsFee"
                    value={formState.documentsFee}
                    onChange={handleInputChange}
                    type="number"
                    step="0.01"
                    className="border border-gray-300"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Total (Legacy):</label>
                  <Input 
                    value={totals.legacy}
                    readOnly
                    className="border border-gray-300 bg-gray-50 font-bold"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-end gap-4">
            <Button 
              type="button"
              onClick={() => navigate("/master/package-options")}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600"
            >
              {isEditing ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PackageOptionForm;
