
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellingRateSchema, SellingRateFormValues, districtRateSchema } from "../schema/sellingRateSchema";
import { SellingRatesService } from "@/services/SellingRatesService";

// Define BoxType as an exported type
export type BoxType = {
  id: string;
  name: string;
};

// Export the useSellingRateForm hook
export const useSellingRateForm = (id?: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing] = useState(!!id);
  const [districts, setDistricts] = useState<string[]>([]);
  const [rateBoxes, setRateBoxes] = useState<BoxType[]>([]);
  const [districtRates, setDistrictRates] = useState<{[key: string]: {[key: string]: string}}>({});
  const [isDistrictRatesValid, setIsDistrictRatesValid] = useState(true);
  const [sectors, setSectors] = useState<string[]>([]);

  // Setup form with react-hook-form and zod validation
  const methods = useForm<SellingRateFormValues>({
    resolver: zodResolver(sellingRateSchema),
    defaultValues: {
      tariffNumber: generateTariffNumber(),
      freightType: "S",
      sector: "",
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveUntil: "",
      country: ""
    }
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = methods;
  const watchedCountry = watch("country");

  // Generate a tariff number
  function generateTariffNumber() {
    const prefix = "TR";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Initialize form data when in edit mode
  useEffect(() => {
    if (isEditing && id) {
      // In a real app, fetch data from API
      // Simulate fetching data
      setTimeout(() => {
        const mockSellingRates = {
          id: "1",
          freightType: "S",
          tariffNumber: "TR123456",
          effectiveFrom: "2023-01-01",
          effectiveUntil: "2023-12-31", // Make sure effectiveUntil exists
          district: "Central",
          country: "Kenya",
          sector: "Nairobi",
        };

        // Populate form fields with fetched data
        setValue("tariffNumber", mockSellingRates.tariffNumber);
        setValue("freightType", mockSellingRates.freightType as any);
        setValue("sector", mockSellingRates.sector);
        setValue("effectiveFrom", mockSellingRates.effectiveFrom);
        setValue("effectiveUntil", mockSellingRates.effectiveUntil);
        setValue("country", mockSellingRates.country);
      }, 500);
    }
  }, [isEditing, id, setValue]);

  // Load initial data for rate boxes (package types) and districts
  useEffect(() => {
    // Default rate boxes (package types)
    setRateBoxes([
      { id: "S", name: "SMALL" },
      { id: "M", name: "MEDIUM" },
      { id: "L", name: "LARGE" },
      { id: "XL", name: "EXTRA LARGE" },
      { id: "XXL", name: "DOUBLE XL" }
    ]);

    // Set initial districts based on selected country
    updateDistrictsByCountry(watchedCountry);
  }, []);

  // Update districts when country changes
  useEffect(() => {
    updateDistrictsByCountry(watchedCountry);
    updateSectorsByCountry(watchedCountry);
  }, [watchedCountry]);

  // Update sectors based on selected country
  const updateSectorsByCountry = (country: string) => {
    switch(country) {
      case "Kenya":
        setSectors(["Nairobi", "Mombasa", "Kisumu", "Nakuru"]);
        break;
      case "Sri Lanka":
        setSectors(["Colombo", "Kandy", "Galle", "Jaffna"]);
        break;
      case "Eritrea":
        setSectors(["Asmara", "Keren", "Massawa"]);
        break;
      case "Sudan":
        setSectors(["Khartoum", "Port Sudan", "Omdurman"]);
        break;
      case "Saudi Arabia":
        setSectors(["Riyadh", "Jeddah", "Mecca", "Medina"]);
        break;
      case "United Arab Emirates":
        setSectors(["Dubai", "Abu Dhabi", "Sharjah", "Ajman"]);
        break;
      case "Somalia":
        setSectors(["Mogadishu", "Hargeisa", "Bosaso"]);
        break;
      case "Tunisia":
        setSectors(["Tunis", "Sfax", "Sousse"]);
        break;
      case "Philippines":
        setSectors(["Manila", "Cebu", "Davao", "Quezon City"]);
        break;
      case "Mozambique":
        setSectors(["Maputo", "Beira", "Nampula"]);
        break;
      case "Uganda":
        setSectors(["Kampala", "Entebbe", "Jinja"]);
        break;
      case "Tanzania":
        setSectors(["Dar es Salaam", "Zanzibar", "Dodoma"]);
        break;
      default:
        setSectors([]);
    }
  };

  // Update districts based on selected country
  const updateDistrictsByCountry = (country: string) => {
    switch(country) {
      case "Kenya":
        setDistricts(["Central", "Nairobi", "Coast", "Eastern", "Nyanza", "Rift Valley", "Western"]);
        break;
      case "Sri Lanka":
        setDistricts(["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya"]);
        break;
      case "Eritrea":
        setDistricts(["Anseba", "Debub", "Gash-Barka", "Maekel", "Northern Red Sea", "Southern Red Sea"]);
        break;
      case "Sudan":
        setDistricts(["Khartoum", "North Darfur", "South Darfur", "West Darfur", "Blue Nile"]);
        break;
      case "Saudi Arabia":
        setDistricts(["Riyadh", "Makkah", "Madinah", "Eastern Province", "Jizan"]);
        break;
      case "United Arab Emirates":
        setDistricts(["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Fujairah", "Ras Al Khaimah"]);
        break;
      case "Somalia":
        setDistricts(["Banaadir", "Galguduud", "Hiiraan", "Mudug", "Nugaal"]);
        break;
      case "Tunisia":
        setDistricts(["Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan"]);
        break;
      case "Philippines":
        setDistricts(["Metro Manila", "Cebu", "Davao", "Cagayan", "Iloilo", "Bacolod"]);
        break;
      case "Mozambique":
        setDistricts(["Maputo City", "Maputo Province", "Gaza", "Inhambane", "Sofala", "Manica"]);
        break;
      case "Uganda":
        setDistricts(["Kampala", "Wakiso", "Mukono", "Jinja", "Gulu", "Mbarara"]);
        break;
      case "Tanzania":
        setDistricts(["Dar es Salaam", "Arusha", "Dodoma", "Mwanza", "Zanzibar Urban"]);
        break;
      default:
        setDistricts([]);
    }

    // Reset district rates when the country changes
    setDistrictRates({});
  };

  // Handle input changes for basic form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof SellingRateFormValues, value);
  };

  // Handle rate changes for districts
  const handleRateChange = (district: string, boxId: string, value: string) => {
    // Create a deep copy of current district rates
    const updatedRates = JSON.parse(JSON.stringify(districtRates));
    
    // Initialize district if it doesn't exist
    if (!updatedRates[district]) {
      updatedRates[district] = {};
    }
    
    // Set the rate value
    updatedRates[district][boxId] = value;
    
    // Update state
    setDistrictRates(updatedRates);
    
    // Validate all rates
    validateDistrictRates(updatedRates);
  };

  // Validate that all district rates are positive numbers or empty
  const validateDistrictRates = (rates: {[key: string]: {[key: string]: string}}) => {
    let isValid = true;
    
    Object.keys(rates).forEach(district => {
      Object.keys(rates[district]).forEach(boxId => {
        const value = rates[district][boxId];
        if (value !== "" && (isNaN(parseFloat(value)) || parseFloat(value) < 0)) {
          isValid = false;
        }
      });
    });
    
    setIsDistrictRatesValid(isValid);
  };

  // Add a custom package to the rate boxes
  const addCustomPackage = (packageName: string) => {
    const id = `CUSTOM_${Date.now()}`;
    setRateBoxes(prev => [...prev, { id, name: packageName.toUpperCase() }]);
  };

  // Submit form data
  const onSubmit = async (data: SellingRateFormValues) => {
    if (!isDistrictRatesValid) {
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for saving
      const formattedData = {
        ...data,
        districtRates,
      };
      
      // Save data using the SellingRatesService
      const result = await SellingRatesService.saveSellingRates(formattedData);
      
      setIsSubmitting(false);
      return result;
    } catch (error) {
      console.error("Error saving selling rates:", error);
      setIsSubmitting(false);
      return false;
    }
  };

  return {
    isEditing,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    districts,
    rateBoxes,
    districtRates,
    isDistrictRatesValid,
    handleInputChange,
    handleRateChange,
    onSubmit,
    watch,
    methods,
    sectors,
    addCustomPackage
  };
};
