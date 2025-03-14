import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { packageOptions } from "@/data/packageOptions";

// Import components
import InvoiceFormHeader from "./components/InvoiceFormHeader";
import BasicInformation from "./components/BasicInformation";
import PaymentDetails from "./components/PaymentDetails";
import PackageDetailsSection from "./components/PackageDetailsSection";
import ShipperConsigneeDetails from "./components/ShipperConsigneeDetails";
import FormActions from "./components/FormActions";

const mockInvoiceBooks = [
  { bookNumber: "722", startPage: "13136051", endPage: "13136100", available: ["13136051", "13136052", "13136053"] },
  { bookNumber: "723", startPage: "13136101", endPage: "13136150", available: ["13136101", "13136102"] },
];

// Country to sector mapping
const countrySectorMap = {
  "Sri Lanka": "COLOMBO : C",
  "Philippines": "MANILA : M",
  "Kenya": "NAIROBI : N",
  "Saudi Arabia": "RIYADH : R",
  "United Arab Emirates": "DUBAI : U",
  "Eritrea": "ASMARA : A",
  "Sudan": "KHARTOUM : K",
  "Tunisia": "TUNIS : T",
  "Uganda": "KAMPALA : K",
  "Kuwait": "KUWAIT : K",
  "Oman": "MUSCAT : M",
  "Qatar": "DOHA : D"
};

const InvoiceForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const existingInvoice = isEditing 
    ? mockInvoiceData.find(inv => inv.id === id) 
    : null;
    
  const [formState, setFormState] = useState({
    sector: existingInvoice?.sector || "COLOMBO : C",
    branch: existingInvoice?.branch || "DOHA : HOF",
    warehouse: existingInvoice?.warehouse || "Colombo : C",
    salesRep: existingInvoice?.salesAgent || "",
    doorToDoor: existingInvoice?.doorToDoor ? "YES" : "NO",
    driver: existingInvoice?.driver || "",
    district: existingInvoice?.district || "COLOMBO : C - C",
    volume: existingInvoice?.volume || "0",
    catZone: existingInvoice?.catZone || "Normal Rate : 0",
    weight: existingInvoice?.weight || "0",
    freightBy: existingInvoice?.freightBy || "SEA",
    packages: existingInvoice?.packages || "0",
    invoiceNumber: existingInvoice?.invoiceNumber || "",
    remarks: existingInvoice?.remarks || "",
    invoiceDate: existingInvoice?.date || "",
    giftCargo: "NO",
    prePaid: "NO",
    country: existingInvoice?.country || "Sri Lanka", // Add country field with default
    
    // Package details
    packagesName: "",
    selectedPackage: null,
    length: "",
    width: "",
    height: "",
    cubicMetre: "",
    cubicFeet: "",
    packageWeight: "0",
    boxNumber: "0",
    volumeWeight: "0",
    price: "0",
    documentsFee: "0",
    total: "0",
    
    // Shipping details
    handOverBy: existingInvoice?.handOverBy || "",
    shipper1: existingInvoice?.shipper1 || "",
    shipper2: existingInvoice?.shipper2 || "",
    shipperMobile: existingInvoice?.shipperMobile || "",
    shipperIdNumber: existingInvoice?.shipperIdNumber || "",
    collectionAddress: existingInvoice?.collectionAddress || "",
    shipperCity: existingInvoice?.shipperCity || "",
    
    consignee1: existingInvoice?.consignee1 || "",
    consignee2: existingInvoice?.consignee2 || "",
    address: existingInvoice?.address || "",
    consigneeCity: existingInvoice?.consigneeCity || "",
    consigneeMobile: existingInvoice?.consigneeMobile || "",
    consigneeLandline: existingInvoice?.consigneeLandline || "",
    consigneeIdNumber: existingInvoice?.consigneeIdNumber || "",
    
    // Payment details
    freight: existingInvoice?.gross || "0",
    destinationTransport: "0",
    document: "0",
    localTransport: "0",
    packing: "0",
    storage: "0",
    destinationClearing: "0",
    destinationDoorDelivery: "0",
    other: "0",
    gross: existingInvoice?.gross || "0",
    discount: existingInvoice?.discount || "0",
    net: existingInvoice?.net || "0",
    agentName: "",
    agentNumber: "0",
    subZone: "1 : Colombo",
  });
  
  const [packageItems, setPackageItems] = useState<any[]>(
    existingInvoice?.packageDetails || []
  );
  
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [availableInvoices, setAvailableInvoices] = useState<any[]>([]);
  
  useEffect(() => {
    if (isEditing) return;
    
    const allInvoices = mockInvoiceBooks.flatMap(book => 
      book.available.map(num => ({
        bookNumber: book.bookNumber,
        invoiceNumber: num
      }))
    );
    
    setAvailableInvoices(allInvoices);
  }, [isEditing]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'freight') {
      setFormState(prev => ({
        ...prev,
        gross: value,
        net: calculateNet(String(value), String(prev.discount))
      }));
    }
    
    if (name === 'discount') {
      setFormState(prev => ({
        ...prev,
        net: calculateNet(String(prev.gross), String(value))
      }));
    }
    
    // If country changes, update the sector
    if (name === 'country') {
      const sectorForCountry = countrySectorMap[value as keyof typeof countrySectorMap];
      if (sectorForCountry) {
        setFormState(prev => ({
          ...prev,
          sector: sectorForCountry
        }));
      }
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));

    // If country changes through select, update the sector
    if (name === 'country') {
      const sectorForCountry = countrySectorMap[value as keyof typeof countrySectorMap];
      if (sectorForCountry) {
        setFormState(prev => ({
          ...prev,
          sector: sectorForCountry
        }));
      }
    }
  };
  
  const calculateNet = (gross: string, discount: string) => {
    const grossValue = parseFloat(gross) || 0;
    const discountValue = parseFloat(discount) || 0;
    return String(grossValue - discountValue);
  };

  const handlePackageSelect = (description: string) => {
    const selectedPackage = packageOptions.find(pkg => pkg.description === description);
    if (selectedPackage) {
      setFormState(prev => ({
        ...prev,
        packagesName: description,
        selectedPackage,
        length: String(selectedPackage.dimensions.length),
        width: String(selectedPackage.dimensions.width),
        height: String(selectedPackage.dimensions.height),
        cubicMetre: String(selectedPackage.volumeInMeters),
        price: String(selectedPackage.price),
        documentsFee: String(selectedPackage.documentsFee),
        total: String(selectedPackage.total)
      }));
    }
  };
  
  const handleAddPackage = () => {
    if (!formState.packagesName) {
      toast.error("Please select a package");
      return;
    }
    
    const newPackage = {
      id: Date.now().toString(),
      name: formState.packagesName,
      length: formState.length,
      width: formState.width,
      height: formState.height,
      volume: formState.cubicMetre,
      weight: formState.packageWeight,
      boxNumber: formState.boxNumber,
      volumeWeight: formState.volumeWeight,
      price: formState.price,
      documentsFee: formState.documentsFee,
      total: formState.total
    };
    
    setPackageItems([...packageItems, newPackage]);
    
    setFormState(prev => ({
      ...prev,
      packagesName: "",
      selectedPackage: null,
      length: "",
      width: "",
      height: "",
      cubicMetre: "",
      price: "0",
      documentsFee: "0",
      total: "0",
      packageWeight: "0",
      boxNumber: "0",
      volumeWeight: "0",
    }));
  };
  
  const handleRemovePackage = (id: string) => {
    setPackageItems(packageItems.filter(item => item.id !== id));
  };
  
  const handleSelectInvoice = (invoiceNumber: string) => {
    setFormState(prev => ({
      ...prev,
      invoiceNumber
    }));
    setShowInvoiceSelector(false);
    toast.success(`Invoice number ${invoiceNumber} selected`);
  };
  
  const handleSave = () => {
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      return;
    }
    
    console.log("Saving invoice:", { ...formState, packageItems });
    toast.success("Invoice saved successfully");
    
    window.location.href = "/data-entry/invoicing";
  };
  
  return (
    <Layout title={isEditing ? "Update Invoice" : "Add Invoice"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <InvoiceFormHeader isEditing={isEditing} />
        
        <div className="p-4">
          <BasicInformation 
            formState={formState}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            showInvoiceSelector={showInvoiceSelector}
            setShowInvoiceSelector={setShowInvoiceSelector}
            availableInvoices={availableInvoices}
            handleSelectInvoice={handleSelectInvoice}
            isEditing={isEditing}
            countrySectorMap={countrySectorMap}
          />
          
          <ShipperConsigneeDetails
            formState={formState}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
          
          <PaymentDetails 
            formState={formState}
            handleInputChange={handleInputChange}
          />
          
          <PackageDetailsSection 
            formState={formState}
            handleInputChange={handleInputChange}
            packageOptions={packageOptions}
            handlePackageSelect={handlePackageSelect}
            handleAddPackage={handleAddPackage}
            packageItems={packageItems}
            handleRemovePackage={handleRemovePackage}
          />
          
          <FormActions handleSave={handleSave} />
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceForm;
