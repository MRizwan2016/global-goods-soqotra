
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QatarContainer } from "../../types/containerTypes";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface AddContainerProps {
  onSubmit: (container: QatarContainer) => void;
  onCancel: () => void;
  containerData?: QatarContainer | null;
  isEditing?: boolean;
}

const containerTypes = ["20FT", "40FT", "40HC", "20FR", "40FR", "20OT", "40OT"];
const shippingLines = ["MSC", "Maersk", "CMA CGM", "Hapag-Lloyd", "ONE", "Evergreen", "COSCO"];
const sectors = ["QAT-KEN", "QAT-SL", "QAT-UAE", "QAT-SA", "QAT-OM"];
const directions = ["Import", "Export", "MIX"];

// Generate running numbers starting from 100
const generateRunningNumber = (existingNumbers: string[] = []): string => {
  // Find the highest existing number
  let highestNumber = 99; // Start at 99 so the first container will be 100
  
  existingNumbers.forEach(numStr => {
    if (!numStr) return;
    
    // Extract numeric part if the running number is not just a number
    const numericPart = numStr.replace(/\D/g, '');
    const num = parseInt(numericPart);
    
    if (!isNaN(num) && num > highestNumber) {
      highestNumber = num;
    }
  });
  
  // Return the next number
  return (highestNumber + 1).toString();
};

// Function to generate a job number based on container details
const generateJobNumber = (containerNumber: string = "", sector: string = ""): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  
  // Extract sector prefix if available
  const sectorPrefix = sector.split('-')[0] || 'QAT';
  
  // Extract container number suffix (last 4 digits or characters)
  const containerSuffix = containerNumber 
    ? containerNumber.slice(-4) 
    : random.toString().slice(0, 4);
    
  return `JOB-${sectorPrefix}-${year}${month}${day}-${containerSuffix}`;
};

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
    shippingLine: "MSC",
    loadDate: new Date().toISOString().split('T')[0],
    jobNumber: ""
  });

  // Store existing running numbers for auto-generation
  const [existingRunningNumbers, setExistingRunningNumbers] = useState<string[]>([]);
  const [jobNumber, setJobNumber] = useState<string>("");

  useEffect(() => {
    // Get existing running numbers from mock data or localStorage
    const fetchExistingRunningNumbers = async () => {
      try {
        // Attempt to get existing running numbers from localStorage
        const savedNumbers = localStorage.getItem('existingRunningNumbers');
        let mockNumbers: string[] = [];
        
        if (savedNumbers) {
          try {
            mockNumbers = JSON.parse(savedNumbers);
            console.log("Loaded existing running numbers:", mockNumbers);
          } catch (err) {
            console.error("Error parsing saved running numbers:", err);
            mockNumbers = ["100", "101", "102", "103"];
          }
        } else {
          // Mock data for now - in a real app, fetch from API
          mockNumbers = ["100", "101", "102", "103"];
          localStorage.setItem('existingRunningNumbers', JSON.stringify(mockNumbers));
        }
        
        setExistingRunningNumbers(mockNumbers);
        
        // Set a new running number if not editing
        if (!containerData && !formData.runningNumber) {
          const newNumber = generateRunningNumber(mockNumbers);
          console.log("Generated new running number:", newNumber);
          
          setFormData(prev => ({...prev, runningNumber: newNumber}));
          
          // Add the new number to our list
          const updatedNumbers = [...mockNumbers, newNumber];
          setExistingRunningNumbers(updatedNumbers);
          localStorage.setItem('existingRunningNumbers', JSON.stringify(updatedNumbers));
        }
      } catch (error) {
        console.error("Failed to fetch running numbers:", error);
        toast.error("Failed to generate running number");
      }
    };
    
    fetchExistingRunningNumbers();
  }, []);

  useEffect(() => {
    if (containerData) {
      setFormData(containerData);
      
      // If job number already exists for this container, retrieve it
      if (containerData.id) {
        if (containerData.jobNumber) {
          setJobNumber(containerData.jobNumber);
        } else {
          // Generate new job number
          const newJobNumber = generateJobNumber(containerData.containerNumber, containerData.sector);
          setJobNumber(newJobNumber);
        }
      }
    } else {
      // For new containers
      const newRunningNumber = generateRunningNumber(existingRunningNumbers);
      const newId = uuidv4();
      
      setFormData({
        id: newId,
        containerNumber: "",
        containerType: "20FT",
        runningNumber: newRunningNumber,
        status: "Available",
        sealNumber: "",
        direction: "Export",
        sector: "QAT-KEN",
        shippingLine: "MSC",
        loadDate: new Date().toISOString().split('T')[0],
        jobNumber: ""
      });
      
      // Generate a job number placeholder
      const placeholderJobNumber = generateJobNumber("", "QAT-KEN");
      setJobNumber(placeholderJobNumber);
    }
  }, [containerData, existingRunningNumbers]);

  const handleChange = (field: keyof QatarContainer, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // If container number or sector changes, update job number
    if (field === 'containerNumber' || field === 'sector') {
      const newJobNumber = generateJobNumber(
        field === 'containerNumber' ? value as string : formData.containerNumber,
        field === 'sector' ? value as string : formData.sector
      );
      setJobNumber(newJobNumber);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add job number to form data and ensure running number is included
    const completeFormData: QatarContainer = {
      ...formData,
      jobNumber: jobNumber,
      runningNumber: formData.runningNumber || generateRunningNumber(existingRunningNumbers)
    };
    
    // Ensure we have a running number
    if (!completeFormData.runningNumber) {
      toast.error("Failed to generate running number");
      return;
    }
    
    // Save job number to localStorage
    if (completeFormData.id) {
      localStorage.setItem(`jobNumber_${completeFormData.id}`, jobNumber);
    }
    
    // Add this running number to our saved list if it's a new container
    if (!isEditing && formData.runningNumber) {
      // Make sure the running number is not already in the list
      if (!existingRunningNumbers.includes(formData.runningNumber)) {
        const updatedNumbers = [...existingRunningNumbers, formData.runningNumber];
        localStorage.setItem('existingRunningNumbers', JSON.stringify(updatedNumbers));
      }
    }
    
    // Log the complete form data
    console.log("Submitting container:", completeFormData);
    
    onSubmit(completeFormData);
  };

  // Generate running number options
  const generateRunningNumberOptions = () => {
    const options = [];
    const start = 100;
    const end = start + 50; // Show 50 options
    
    for (let i = start; i <= end; i++) {
      options.push(i.toString());
    }
    
    return options;
  };

  return (
    <Card className="mt-0 border-0 shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="outline" onClick={onCancel} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Container" : "Add Container"}
          </h2>
        </div>
        
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
                <Label htmlFor="runningNumber">Running Number (auto-generated)</Label>
                <Select
                  value={formData.runningNumber}
                  onValueChange={(value) => handleChange("runningNumber", value)}
                >
                  <SelectTrigger id="runningNumber">
                    <SelectValue placeholder="Select running number" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateRunningNumberOptions().map((num) => (
                      <SelectItem key={num} value={num}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              
              <div>
                <Label htmlFor="jobNumber">Job Number (auto-generated)</Label>
                <Input
                  id="jobNumber"
                  value={jobNumber}
                  readOnly
                  className="bg-gray-100"
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
              
              <div>
                <Label htmlFor="loadDate">Load Date</Label>
                <Input
                  id="loadDate"
                  type="date"
                  value={formData.loadDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleChange("loadDate", e.target.value)}
                />
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
