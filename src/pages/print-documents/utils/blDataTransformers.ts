
import { extractVehicleDetails } from './vehicleDataExtractor';
import { getPackageDescription } from './packageDataExtractor';
import { BillOfLadingData } from '../types/billOfLadingTypes';

/**
 * Transform a Bill of Lading record into standardized BillOfLadingData
 */
export const transformBLRecord = (blRecord: any): BillOfLadingData => {
  const vehicleDetails = blRecord.cargoType === "Car" || blRecord.cargoType === "Truck" 
    ? extractVehicleDetails(blRecord.goodsDescription || "") 
    : {};

  return {
    id: blRecord.id,
    blNumber: blRecord.blNumber,
    date: blRecord.date,
    shipper: blRecord.shipper,
    shipperAddress: blRecord.shipperAddress || "DOHA, QATAR",
    shipperPhone: "+974 XXXX XXXX",
    consignee: blRecord.consignee,
    consigneeAddress: blRecord.consigneeAddress || "N/A",
    consigneeIdNumber: "N/A",
    notifyParty: blRecord.notifyParty || "SAME AS CONSIGNEE",
    notifyPartyAddress: blRecord.notifyPartyAddress || "",
    deliveryAgent: blRecord.deliveryAgent || "N/A",
    portOfLoading: blRecord.loadingPort || "DOHA, QATAR",
    portOfDischarge: blRecord.dischargePort || "COLOMBO, SRI LANKA",
    marks: blRecord.marksAndNumbers || "AS ADDRESSED",
    description: blRecord.goodsDescription || "SAID TO CONTAIN PERSONAL EFFECTS",
    weight: blRecord.grossWeight || "0",
    volume: blRecord.measurement || "0",
    packages: blRecord.packages || "1",
    freightPrepaid: blRecord.freightCharges === "Prepaid",
    vessel: blRecord.vessel || "MV SOQOTRA QUEEN / XXXX",
    voyage: blRecord.voyageNo || "N/A",
    finalDestination: blRecord.destination || "COLOMBO, SRI LANKA",
    dateOfIssue: blRecord.dateOfIssue || blRecord.date,
    cargoType: blRecord.cargoType,
    vehicleMake: blRecord.vehicleMake || vehicleDetails.make,
    vehicleModel: blRecord.vehicleModel || vehicleDetails.model,
    vehicleYear: blRecord.vehicleYear || vehicleDetails.year,
    vehicleColor: blRecord.vehicleColor || vehicleDetails.color,
    chassisNumber: blRecord.chassisNumber || vehicleDetails.chassis,
    containerNo: blRecord.containerNo || "N/A",
    sealNo: blRecord.sealNo || "N/A",
    specialInstructions: blRecord.specialInstructions || ""
  };
};

/**
 * Transform invoice data into a House Bill of Lading
 */
export const transformInvoiceToHBL = (invoiceData: any, id: string): BillOfLadingData => {
  const packageDetails = getPackageDescription(invoiceData);
  const vehicleDetails = invoiceData.cargoType === "Car" || 
                        (invoiceData.packageDetails && invoiceData.packageDetails.some((p: any) => 
                          p.name && p.name.toLowerCase().includes("car")))
    ? extractVehicleDetails(packageDetails) 
    : {};
  
  return {
    id,
    blNumber: `BL-${invoiceData.invoiceNumber || id}`,
    date: invoiceData.date || new Date().toISOString().split('T')[0],
    shipper: invoiceData.shipper1 || "SOQOTRA SHIPPING & LOGISTICS",
    shipperAddress: invoiceData.shipperAddress || "DOHA, QATAR",
    shipperPhone: invoiceData.shipperPhone || "+974 XXXX XXXX",
    consignee: invoiceData.consignee1 || "N/A",
    consigneeAddress: invoiceData.consigneeAddress || "N/A",
    consigneeIdNumber: invoiceData.consigneeIdNumber || invoiceData.nic || "N/A",
    notifyParty: invoiceData.notifyParty || "SAME AS CONSIGNEE",
    notifyPartyAddress: invoiceData.notifyPartyAddress || "",
    deliveryAgent: invoiceData.deliveryAgent || "N/A",
    portOfLoading: "DOHA, QATAR",
    portOfDischarge: invoiceData.warehouse || "COLOMBO, SRI LANKA",
    marks: "AS ADDRESSED",
    description: packageDetails,
    weight: invoiceData.weight || "0",
    volume: invoiceData.volume || "0",
    packages: invoiceData.packages || "1",
    freightPrepaid: invoiceData.paid === true,
    vessel: "MV SOQOTRA QUEEN / XXXX",
    finalDestination: invoiceData.finalDestination || invoiceData.warehouse || "COLOMBO, SRI LANKA",
    dateOfIssue: invoiceData.date || new Date().toISOString().split('T')[0],
    cargoType: invoiceData.cargoType || "Personal Effects",
    vehicleMake: vehicleDetails.make,
    vehicleModel: vehicleDetails.model,
    vehicleYear: vehicleDetails.year,
    vehicleColor: vehicleDetails.color,
    chassisNumber: vehicleDetails.chassis,
    containerNo: invoiceData.containerNo || "N/A",
    sealNo: invoiceData.sealNo || "N/A",
    specialInstructions: invoiceData.specialInstructions || ""
  };
};
