
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Edit, Trash, BookOpen, Plus } from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { packageOptions, PackageOption } from "@/data/packageOptions";

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
    selectedPackage: null as PackageOption | null,
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
    consignee1: existingInvoice?.consignee1 || "",
    consignee2: existingInvoice?.consignee2 || "",
    address: existingInvoice?.address || "",
    
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
    
    // Update gross and net when freight changes
    if (name === 'freight') {
      setFormState(prev => ({
        ...prev,
        gross: value,
        net: calculateNet(String(value), prev.discount)
      }));
    }
    
    // Update net when discount changes
    if (name === 'discount') {
      setFormState(prev => ({
        ...prev,
        net: calculateNet(prev.gross, String(value))
      }));
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
    
    // Reset form
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">SECTOR:</label>
              <select
                name="sector"
                value={formState.sector}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="COLOMBO : C">COLOMBO : C</option>
                <option value="DOHA : D">DOHA : D</option>
                <option value="MANILA : M">MANILA : M</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">BRANCH:</label>
              <select
                name="branch"
                value={formState.branch}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="DOHA : HOF">DOHA : HOF</option>
                <option value="DUBAI : DXB">DUBAI : DXB</option>
                <option value="COLOMBO : CMB">COLOMBO : CMB</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">WAREHOUSE:</label>
              <select
                name="warehouse"
                value={formState.warehouse}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="Colombo : C">Colombo : C</option>
                <option value="Manila : M">Manila : M</option>
                <option value="Doha : D">Doha : D</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">SALES REP:</label>
              <select
                name="salesRep"
                value={formState.salesRep}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="ABDUL/262">ABDUL/262</option>
                <option value="AHMED/101">AHMED/101</option>
                <option value="SARAH/305">SARAH/305</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">DOOR TO DOOR:</label>
              <select
                name="doorToDoor"
                value={formState.doorToDoor}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="NO">NO</option>
                <option value="YES">YES</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">DRIVER:</label>
              <select
                name="driver"
                value={formState.driver}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="ABDUL HAMEED/D">ABDUL HAMEED/D</option>
                <option value="MOHAMMED ALI/D">MOHAMMED ALI/D</option>
                <option value="RAJEEV KUMAR/D">RAJEEV KUMAR/D</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">DISTRICT:</label>
              <select
                name="district"
                value={formState.district}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="COLOMBO : C - C">COLOMBO : C - C</option>
                <option value="DOHA : D - D">DOHA : D - D</option>
                <option value="MANILA : M - M">MANILA : M - M</option>
                <option value="ANURADHAPURA : K - K">ANURADHAPURA : K - K</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">VOLUME:</label>
              <Input 
                name="volume"
                value={formState.volume}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">CAT/ ZONE:</label>
              <select
                name="catZone"
                value={formState.catZone}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="Normal Rate : 0">Normal Rate : 0</option>
                <option value="Premium Rate : 1">Premium Rate : 1</option>
                <option value="Economy Rate : 2">Economy Rate : 2</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">WEIGHT:</label>
              <Input 
                name="weight"
                value={formState.weight}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">FREIGHT BY:</label>
              <select
                name="freightBy"
                value={formState.freightBy}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="SEA">SEA</option>
                <option value="AIR">AIR</option>
                <option value="LAND">LAND</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">PACKAGES:</label>
              <Input 
                name="packages"
                value={formState.packages}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">INVOICE NUMBER:</label>
              <div className="flex gap-2">
                <Input 
                  name="invoiceNumber"
                  value={formState.invoiceNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  readOnly={!isEditing}
                  placeholder="Select an invoice number"
                />
                {!isEditing && (
                  <Button 
                    type="button"
                    onClick={() => setShowInvoiceSelector(!showInvoiceSelector)}
                    className="bg-blue-500 hover:bg-blue-600 px-2"
                  >
                    <BookOpen size={18} />
                  </Button>
                )}
              </div>
              
              {showInvoiceSelector && (
                <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg p-2 max-h-60 overflow-y-auto absolute z-10">
                  <h4 className="font-medium text-sm mb-2 px-2">Select an Invoice Number</h4>
                  {availableInvoices.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1">
                      {availableInvoices.map((inv) => (
                        <div 
                          key={inv.invoiceNumber}
                          onClick={() => handleSelectInvoice(inv.invoiceNumber)}
                          className="text-sm py-1 px-2 hover:bg-blue-50 cursor-pointer rounded flex justify-between"
                        >
                          <span>{inv.invoiceNumber}</span>
                          <span className="text-gray-500">(Book {inv.bookNumber})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 p-2">No available invoice numbers</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium mb-1">REMARKS:</label>
              <Textarea 
                name="remarks"
                value={formState.remarks}
                onChange={handleInputChange}
                className="border border-gray-300 min-h-[80px]"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">INVOICE DATE:</label>
              <Input 
                type="date"
                name="invoiceDate"
                value={formState.invoiceDate}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">GIFT CARGO:</label>
              <select
                name="giftCargo"
                value={formState.giftCargo}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="NO">NO</option>
                <option value="YES">YES</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">PRE PAID:</label>
              <select
                name="prePaid"
                value={formState.prePaid}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="NO">NO</option>
                <option value="YES">YES</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">SUB ZONE:</label>
              <select
                name="subZone"
                value={formState.subZone}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="1 : Colombo">1 : Colombo</option>
                <option value="2 : Kandy">2 : Kandy</option>
                <option value="3 : Galle">3 : Galle</option>
              </select>
            </div>
          </div>
          
          {/* Payment Section */}
          <div className="mt-8">
            <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
              PAYMENT DETAILS
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">FREIGHT:</label>
                <Input 
                  name="freight"
                  value={formState.freight}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">AGENT NAME:</label>
                <Input 
                  name="agentName"
                  value={formState.agentName}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DESTINATION TRANSPORT:</label>
                <Input 
                  name="destinationTransport"
                  value={formState.destinationTransport}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">AGENT NUMBER:</label>
                <Input 
                  name="agentNumber"
                  value={formState.agentNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DOCUMENT:</label>
                <Input 
                  name="document"
                  value={formState.document}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">INVOICE NUMBER:</label>
                <Input 
                  name="invoiceNumber"
                  value={formState.invoiceNumber}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">LOCAL TRANSPORT:</label>
                <Input 
                  name="localTransport"
                  value={formState.localTransport}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">INVOICE DATE:</label>
                <Input 
                  name="invoiceDate"
                  value={formState.invoiceDate}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">PACKING:</label>
                <Input 
                  name="packing"
                  value={formState.packing}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">BRANCH:</label>
                <Input 
                  name="branchDisplay"
                  value={formState.branch}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">STORAGE:</label>
                <Input 
                  name="storage"
                  value={formState.storage}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">SECTOR:</label>
                <Input 
                  name="sectorDisplay"
                  value={formState.sector}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DESTINATION CLEARING:</label>
                <Input 
                  name="destinationClearing"
                  value={formState.destinationClearing}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">WAREHOUSE:</label>
                <Input 
                  name="warehouseDisplay"
                  value={formState.warehouse}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DESTINATION DOOR DELIVERY:</label>
                <Input 
                  name="destinationDoorDelivery"
                  value={formState.destinationDoorDelivery}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">FREIGHT BY:</label>
                <Input 
                  name="freightByDisplay"
                  value={formState.freightBy}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">OTHER:</label>
                <Input 
                  name="other"
                  value={formState.other}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">VOLUME:</label>
                <Input 
                  name="volumeDisplay"
                  value={formState.volume}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">GROSS:</label>
                <Input 
                  name="gross"
                  value={formState.gross}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">WEIGHT:</label>
                <Input 
                  name="weightDisplay"
                  value={formState.weight}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DISCOUNT:</label>
                <Input 
                  name="discount"
                  value={formState.discount}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  type="number"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">PACKAGES:</label>
                <Input 
                  name="packagesDisplay"
                  value={formState.packages}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">NET:</label>
                <Input 
                  name="net"
                  value={formState.net}
                  readOnly
                  className="border border-gray-300 bg-gray-100 font-bold"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DOOR TO DOOR:</label>
                <Input 
                  name="doorToDoorDisplay"
                  value={formState.doorToDoor}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium mb-1">CAT/ ZONE:</label>
                <Input 
                  name="catZoneDisplay"
                  value={formState.catZone}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium mb-1">DISTRICT:</label>
                <Input 
                  name="districtDisplay"
                  value={formState.district}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
              PACKAGES DETAILS
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">PACKAGES NAME:</label>
                <select
                  name="packagesName"
                  value={formState.packagesName}
                  onChange={(e) => handlePackageSelect(e.target.value)}
                  className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
                >
                  <option value="">Select a package</option>
                  {packageOptions.map(pkg => (
                    <option key={pkg.id} value={pkg.description}>
                      {pkg.description}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">PRICE:</label>
                <Input 
                  name="price"
                  value={formState.price}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DOCUMENTS FEE:</label>
                <Input 
                  name="documentsFee"
                  value={formState.documentsFee}
                  readOnly
                  className="border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">TOTAL:</label>
                <Input 
                  name="total"
                  value={formState.total}
                  readOnly
                  className="border border-gray-300 bg-gray-50 font-bold"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">CUBIC METRE:</label>
                <Input 
                  name="cubicMetre"
                  value={formState.cubicMetre}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  readOnly
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">LENGTH:</label>
                <Input 
                  name="length"
                  value={formState.length}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">CUBIC FEET:</label>
                <Input 
                  name="cubicFeet"
                  value={formState.cubicFeet}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                  readOnly
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">WIDTH:</label>
                <Input 
                  name="width"
                  value={formState.width}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">WEIGHT:</label>
                <Input 
                  name="packageWeight"
                  value={formState.packageWeight}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">HEIGHT:</label>
                <Input 
                  name="height"
                  value={formState.height}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">BOX NUMBER:</label>
                <Input 
                  name="boxNumber"
                  value={formState.boxNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">VOLUME WEIGHT:</label>
                <Input 
                  name="volumeWeight"
                  value={formState.volumeWeight}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="md:col-span-1 flex items-end">
                <Button
                  type="button"
                  onClick={handleAddPackage}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 w-full"
                >
                  <Plus size={18} className="mr-2" />
                  Add Package
                </Button>
              </div>
            </div>
            
            {/* Package Items List */}
            {packageItems.length > 0 && (
              <div className="mt-4 border border-gray-200 rounded overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell className="font-medium">Package</TableCell>
                      <TableCell className="font-medium">Dimensions (L×W×H)</TableCell>
                      <TableCell className="font-medium">Volume</TableCell>
                      <TableCell className="font-medium">Weight</TableCell>
                      <TableCell className="font-medium">Price</TableCell>
                      <TableCell className="font-medium">Docs Fee</TableCell>
                      <TableCell className="font-medium">Total</TableCell>
                      <TableCell className="font-medium">Action</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packageItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{`${item.length}×${item.width}×${item.height}`}</TableCell>
                        <TableCell>{item.volume}</TableCell>
                        <TableCell>{item.weight}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.documentsFee}</TableCell>
                        <TableCell className="font-bold">{item.total}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            onClick={() => handleRemovePackage(item.id)}
                            className="bg-red-500 hover:bg-red-600 p-1 h-8 w-8"
                          >
                            <Trash size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end gap-4">
            <Button 
              type="button"
              onClick={() => navigate("/data-entry/invoicing")}
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

export default InvoiceForm;
