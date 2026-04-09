import { useState, useEffect } from "react";
import { doorToDoorPricing, kenyaPackageTypes, calculateVolumeWeight, calculateCubicFeet, countryCodes } from "../data/kenyaData";
import { toast } from "sonner";
import { syncInvoiceToExternal } from "@/lib/externalSync";
import { RegionalInvoiceService } from "@/services/RegionalInvoiceService";

export interface KenyaPackageItem {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  cubicMetre: number;
  cubicFeet: number;
  volumeWeight: number;
}

export interface KenyaFormData {
  invoiceNumber: string;
  invoiceDate: string;
  jobNumber: string;
  port: string;
  sector: string;
  salesRep: string;
  driver: string;
  district: string;
  bookNumber: string;
  isInvoiceActivated: boolean;
  doorToDoor: "YES" | "NO";
  doorToDoorPrice: number;
  shipperPrefix: string;
  shipperName: string;
  shipperCity: string;
  shipperAddress: string;
  shipperMobile: string;
  shipperEmail: string;
  shipperIdNumber: string;
  shipperCountry: string;
  consigneePrefix: string;
  consigneeName: string;
  consigneeCity: string;
  consigneeAddress: string;
  consigneeMobile: string;
  consigneeEmail: string;
  consigneeIdNumber: string;
  consigneeCountry: string;
  totalPackages: number;
  totalWeight: number;
  totalVolume: number;
  freight: number;
  documentsFee: number;
  localTransport: number;
  destinationTransport: number;
  packing: number;
  storage: number;
  destinationClearing: number;
  destinationDoorDelivery: number;
  other: number;
  gross: number;
  discount: number;
  net: number;
  remarks: string;
  giftCargo: "YES" | "NO";
  prePaid: "YES" | "NO";
  freightBy: "SEA" | "AIR" | "LAND";
  paymentStatus: "PAID" | "UNPAID";
}

export const useKenyaInvoice = (invoiceId?: string) => {
  const [formData, setFormData] = useState<KenyaFormData>({
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split('T')[0],
    jobNumber: "",
    port: "",
    sector: "",
    salesRep: "",
    driver: "",
    district: "",
    bookNumber: "",
    isInvoiceActivated: false,
    doorToDoor: "NO",
    doorToDoorPrice: 0,
    shipperPrefix: "",
    shipperName: "",
    shipperCity: "",
    shipperAddress: "",
    shipperMobile: "",
    shipperEmail: "",
    shipperIdNumber: "",
    shipperCountry: "QATAR",
    consigneePrefix: "",
    consigneeName: "",
    consigneeCity: "",
    consigneeAddress: "",
    consigneeMobile: "",
    consigneeEmail: "",
    consigneeIdNumber: "",
    consigneeCountry: "KENYA",
    totalPackages: 0,
    totalWeight: 0,
    totalVolume: 0,
    freight: 0,
    documentsFee: 0,
    localTransport: 0,
    destinationTransport: 0,
    packing: 0,
    storage: 0,
    destinationClearing: 0,
    destinationDoorDelivery: 0,
    other: 0,
    gross: 0,
    discount: 0,
    net: 0,
    remarks: "",
    giftCargo: "NO",
    prePaid: "NO",
    freightBy: "SEA",
    paymentStatus: "UNPAID"
  });

  const [packageItems, setPackageItems] = useState<KenyaPackageItem[]>([]);
  const [selectedPackageType, setSelectedPackageType] = useState("");
  const [packageInput, setPackageInput] = useState({
    name: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    quantity: "1"
  });

  // Auto-calculate door-to-door pricing
  useEffect(() => {
    if (formData.doorToDoor === "YES" && formData.sector && formData.totalWeight > 0) {
      const pricing = doorToDoorPricing[formData.sector as keyof typeof doorToDoorPricing];
      if (pricing) {
        const doorToDoorAmount = formData.totalWeight * pricing.price;
        setFormData(prev => ({ ...prev, doorToDoorPrice: doorToDoorAmount, destinationDoorDelivery: doorToDoorAmount }));
      }
    } else {
      setFormData(prev => ({ ...prev, doorToDoorPrice: 0, destinationDoorDelivery: 0 }));
    }
  }, [formData.doorToDoor, formData.sector, formData.totalWeight]);

  // Auto-calculate totals
  useEffect(() => {
    const gross = formData.freight + formData.documentsFee + formData.localTransport +
                  formData.destinationTransport + formData.packing + formData.storage +
                  formData.destinationClearing + formData.destinationDoorDelivery + formData.other;
    const net = gross - formData.discount;
    setFormData(prev => ({ ...prev, gross, net }));
  }, [
    formData.freight, formData.documentsFee, formData.localTransport,
    formData.destinationTransport, formData.packing, formData.storage,
    formData.destinationClearing, formData.destinationDoorDelivery,
    formData.other, formData.discount
  ]);

  // Auto-calculate package totals
  useEffect(() => {
    const totalPackages = packageItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalWeight = packageItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    const totalVolume = packageItems.reduce((sum, item) => sum + (item.cubicMetre * item.quantity), 0);
    // Auto documentation fee: 50 QAR if total >= 1 CBM
    const docFee = totalVolume >= 1.0 ? 50 : 0;
    setFormData(prev => ({ ...prev, totalPackages, totalWeight, totalVolume, documentsFee: docFee }));
  }, [packageItems]);

  // Auto mobile country code
  useEffect(() => {
    if (formData.shipperCountry && countryCodes[formData.shipperCountry]) {
      const cc = countryCodes[formData.shipperCountry];
      if (formData.shipperMobile && !formData.shipperMobile.startsWith(cc)) {
        const clean = formData.shipperMobile.replace(/^\+\d{1,4}\s?/, '');
        setFormData(prev => ({ ...prev, shipperMobile: `${cc} ${clean}` }));
      }
    }
  }, [formData.shipperCountry]);

  useEffect(() => {
    if (formData.consigneeCountry && countryCodes[formData.consigneeCountry]) {
      const cc = countryCodes[formData.consigneeCountry];
      if (formData.consigneeMobile && !formData.consigneeMobile.startsWith(cc)) {
        const clean = formData.consigneeMobile.replace(/^\+\d{1,4}\s?/, '');
        setFormData(prev => ({ ...prev, consigneeMobile: `${cc} ${clean}` }));
      }
    }
  }, [formData.consigneeCountry]);

  const handleFormChange = (field: keyof KenyaFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePackageTypeSelect = (packageType: string) => {
    const selectedType = kenyaPackageTypes.find(pkg => pkg.name === packageType);
    if (selectedType) {
      const cbm = (selectedType.dimensions.length * selectedType.dimensions.width * selectedType.dimensions.height) / 1000000;
      const autoWeight = cbm * 1000; // 1 CBM = 1000 kg
      setPackageInput({
        name: selectedType.name,
        length: selectedType.dimensions.length.toString(),
        width: selectedType.dimensions.width.toString(),
        height: selectedType.dimensions.height.toString(),
        weight: autoWeight.toFixed(2),
        quantity: "1"
      });
      setSelectedPackageType(packageType);
    }
  };

  const handlePackageInputChange = (field: string, value: string) => {
    setPackageInput(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-calculate weight from CBM when dimensions change
      if (['length', 'width', 'height'].includes(field)) {
        const l = parseFloat(field === 'length' ? value : prev.length) || 0;
        const w = parseFloat(field === 'width' ? value : prev.width) || 0;
        const h = parseFloat(field === 'height' ? value : prev.height) || 0;
        if (l > 0 && w > 0 && h > 0) {
          const cbm = (l * w * h) / 1000000;
          updated.weight = (cbm * 1000).toFixed(2); // 1 CBM = 1000 kg
        }
      }
      return updated;
    });
  };

  const addPackageItem = async () => {
    if (!packageInput.name || !packageInput.length || !packageInput.width ||
        !packageInput.height || !packageInput.weight || !packageInput.quantity) {
      toast.error("Please fill all package details");
      return;
    }
    const length = parseFloat(packageInput.length);
    const width = parseFloat(packageInput.width);
    const height = parseFloat(packageInput.height);
    const weight = parseFloat(packageInput.weight);
    const quantity = parseInt(packageInput.quantity);
    const cubicMetre = (length * width * height) / 1000000;
    const cubicFeet = calculateCubicFeet(cubicMetre);
    const volumeWeight = calculateVolumeWeight(length, width, height);

    const boxNumber = packageItems.length + 1;

    const newItem: KenyaPackageItem = {
      id: Date.now().toString(),
      name: packageInput.name,
      length, width, height, weight, quantity,
      cubicMetre, cubicFeet, volumeWeight
    };
    setPackageItems(prev => [...prev, newItem]);

    // Save custom package type to DB
    const isKnown = kenyaPackageTypes.some(p => p.name === packageInput.name);
    if (!isKnown) {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        await supabase.from('package_types').upsert({
          name: packageInput.name,
          length_inches: length,
          width_inches: width,
          height_inches: height,
          volume_cbm: cubicMetre,
          weight_kg: weight,
          country: 'Kenya',
          is_default: false,
        }, { onConflict: 'name' });
      } catch (e) {
        console.error("Error saving package type:", e);
      }
    }

    setPackageInput({ name: "", length: "", width: "", height: "", weight: "", quantity: "1" });
    setSelectedPackageType("");
    toast.success("Package added successfully");
  };

  const removePackageItem = (id: string) => {
    setPackageItems(prev => prev.filter(item => item.id !== id));
    toast.success("Package removed");
  };

  const saveInvoice = async () => {
    try {
      if (!formData.invoiceNumber) { toast.error("Invoice number is required"); return false; }
      if (!formData.shipperName || !formData.consigneeName) { toast.error("Shipper and Consignee names are required"); return false; }
      if (packageItems.length === 0) { toast.error("At least one package item is required"); return false; }

      const invoiceRow = {
        country: 'Kenya',
        invoice_number: formData.invoiceNumber,
        invoice_date: formData.invoiceDate,
        job_number: formData.jobNumber,
        book_number: formData.bookNumber,
        service_type: formData.freightBy,
        freight_by: formData.freightBy,
        shipper_prefix: formData.shipperPrefix,
        shipper_name: formData.shipperName,
        shipper_country: formData.shipperCountry,
        shipper_city: formData.shipperCity,
        shipper_address: formData.shipperAddress,
        shipper_mobile: formData.shipperMobile,
        shipper_email: formData.shipperEmail,
        shipper_id_number: formData.shipperIdNumber,
        consignee_prefix: formData.consigneePrefix,
        consignee_name: formData.consigneeName,
        consignee_country: formData.consigneeCountry,
        consignee_city: formData.consigneeCity,
        consignee_address: formData.consigneeAddress,
        consignee_mobile: formData.consigneeMobile,
        consignee_email: formData.consigneeEmail,
        consignee_id_number: formData.consigneeIdNumber,
        sales_representative: formData.salesRep,
        driver_name: formData.driver,
        port: formData.port,
        sector: formData.sector,
        district: formData.district,
        door_to_door: formData.doorToDoor,
        total_packages: formData.totalPackages,
        total_weight: formData.totalWeight,
        total_volume: formData.totalVolume,
        freight: formData.freight,
        documents_fee: formData.documentsFee,
        local_transport: formData.localTransport,
        destination_transport: formData.destinationTransport,
        packing_charges: formData.packing,
        storage: formData.storage,
        destination_clearing: formData.destinationClearing,
        destination_door_delivery: formData.destinationDoorDelivery,
        other: formData.other,
        gross: formData.gross,
        discount: formData.discount,
        net: formData.net,
        gift_cargo: formData.giftCargo,
        pre_paid: formData.prePaid,
        payment_status: formData.paymentStatus,
        remarks: formData.remarks,
        status: 'ACTIVE',
      };

      const pkgRows = packageItems.map((item, idx) => ({
        package_name: item.name,
        length: item.length,
        width: item.width,
        height: item.height,
        weight: item.weight,
        quantity: item.quantity,
        cubic_metre: item.cubicMetre,
        cubic_feet: item.cubicFeet,
        volume_weight: item.volumeWeight,
        box_number: idx + 1,
      }));

      const savedId = await RegionalInvoiceService.save(invoiceRow as any, pkgRows as any, invoiceId);
      if (savedId) {
        await syncInvoiceToExternal({ ...invoiceRow, id: savedId, packageItems });
        toast.success("Kenya invoice saved successfully!");
        return true;
      } else {
        toast.error("Failed to save invoice");
        return false;
      }
    } catch (error) {
      console.error("❌ KENYA INVOICE SAVE ERROR:", error);
      toast.error("Failed to save Kenya invoice");
      return false;
    }
  };

  const loadInvoice = async (id: string) => {
    try {
      const result = await RegionalInvoiceService.getById(id);
      if (result) {
        const inv = result.invoice;
        setFormData(prev => ({
          ...prev,
          invoiceNumber: inv.invoice_number || '',
          invoiceDate: inv.invoice_date || prev.invoiceDate,
          jobNumber: inv.job_number || '',
          bookNumber: inv.book_number || '',
          port: inv.port || '',
          sector: inv.sector || '',
          salesRep: inv.sales_representative || '',
          driver: inv.driver_name || '',
          district: inv.district || '',
          doorToDoor: (inv.door_to_door as any) || 'NO',
          shipperPrefix: inv.shipper_prefix || '',
          shipperName: inv.shipper_name || '',
          shipperCity: inv.shipper_city || '',
          shipperAddress: inv.shipper_address || '',
          shipperMobile: inv.shipper_mobile || '',
          shipperEmail: inv.shipper_email || '',
          shipperIdNumber: inv.shipper_id_number || '',
          shipperCountry: inv.shipper_country || 'QATAR',
          consigneePrefix: inv.consignee_prefix || '',
          consigneeName: inv.consignee_name || '',
          consigneeCity: inv.consignee_city || '',
          consigneeAddress: inv.consignee_address || '',
          consigneeMobile: inv.consignee_mobile || '',
          consigneeEmail: inv.consignee_email || '',
          consigneeIdNumber: inv.consignee_id_number || '',
          consigneeCountry: inv.consignee_country || 'KENYA',
          freight: inv.freight || 0,
          documentsFee: inv.documents_fee || 0,
          localTransport: inv.local_transport || 0,
          destinationTransport: inv.destination_transport || 0,
          packing: inv.packing_charges || 0,
          storage: inv.storage || 0,
          destinationClearing: inv.destination_clearing || 0,
          destinationDoorDelivery: inv.destination_door_delivery || 0,
          other: inv.other || 0,
          gross: inv.gross || 0,
          discount: inv.discount || 0,
          net: inv.net || 0,
          freightBy: (inv.freight_by as any) || 'SEA',
          giftCargo: (inv.gift_cargo as any) || 'NO',
          prePaid: (inv.pre_paid as any) || 'NO',
          paymentStatus: (inv.payment_status as any) || 'UNPAID',
          remarks: inv.remarks || '',
        }));
        setPackageItems(result.packages.map(p => ({
          id: p.id,
          name: p.package_name || '',
          length: p.length || 0,
          width: p.width || 0,
          height: p.height || 0,
          weight: p.weight || 0,
          quantity: p.quantity || 1,
          cubicMetre: p.cubic_metre || 0,
          cubicFeet: p.cubic_feet || 0,
          volumeWeight: p.volume_weight || 0,
        })));
        return true;
      }
      toast.error("Invoice not found");
      return false;
    } catch (error) {
      console.error("Error loading invoice:", error);
      toast.error("Failed to load invoice");
      return false;
    }
  };

  return {
    formData,
    packageItems,
    selectedPackageType,
    packageInput,
    handleFormChange,
    handlePackageTypeSelect,
    handlePackageInputChange,
    addPackageItem,
    removePackageItem,
    saveInvoice,
    loadInvoice,
  };
};
