
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data/mockData";
import BasicInvoiceInfo from "@/components/invoicing/BasicInvoiceInfo";
import PackageDetails from "@/components/invoicing/PackageDetails";
import ShippingDetails from "@/components/invoicing/ShippingDetails";

const mockInvoiceBooks = [
  { bookNumber: "722", startPage: "13136051", endPage: "13136100", available: ["13136051", "13136052", "13136053"] },
  { bookNumber: "723", startPage: "13136101", endPage: "13136150", available: ["13136101", "13136102"] },
];

const InvoiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    
    // Package details
    packagesName: "",
    length: "",
    width: "",
    height: "",
    cubicMetre: "",
    cubicFeet: "",
    packageWeight: "0",
    boxNumber: "0",
    volumeWeight: "0",
    
    // Shipping details
    handOverBy: existingInvoice?.handOverBy || "",
    shipper1: existingInvoice?.shipper1 || "",
    shipper2: existingInvoice?.shipper2 || "",
    consignee1: existingInvoice?.consignee1 || "",
    consignee2: existingInvoice?.consignee2 || "",
    address: existingInvoice?.address || "",
  });
  
  const [packageItems, setPackageItems] = useState<any[]>(
    existingInvoice?.packageDetails || []
  );
  
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
  };
  
  const handleSave = () => {
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      return;
    }
    
    console.log("Saving invoice:", { ...formState, packageItems });
    toast.success("Invoice saved successfully");
    
    navigate("/data-entry/invoicing");
  };
  
  return (
    <Layout title={isEditing ? "Update Invoice" : "Add Invoice"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            {isEditing ? "Update Invoice" : "Add Invoice"}
          </h3>
        </div>
        
        <div className="p-4">
          <BasicInvoiceInfo 
            formState={formState}
            handleInputChange={handleInputChange}
            isEditing={isEditing}
            availableInvoices={availableInvoices}
          />
          
          <PackageDetails 
            formState={formState}
            handleInputChange={handleInputChange}
            packageItems={packageItems}
            setPackageItems={setPackageItems}
          />
          
          <ShippingDetails 
            formState={formState}
            handleInputChange={handleInputChange}
          />
          
          <div className="flex justify-end gap-3 mt-6">
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
            <Button 
              onClick={() => navigate("/data-entry/invoicing")}
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceForm;
