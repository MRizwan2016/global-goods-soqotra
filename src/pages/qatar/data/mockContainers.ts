
import { QatarContainer, ContainerCargo } from "../types/containerTypes";

// This is the original mockContainers array
const mockContainers: QatarContainer[] = [
  {
    id: "container1",
    containerNumber: "QCTU1234567",
    containerType: "20FT",
    runningNumber: "QT001",
    status: "Available",
    sealNumber: "SL12345",
    weight: 0,
    volume: 0,
    packages: 0,
    vesselId: "",
    direction: "Export",
    etd: "2023-12-15",
    eta: "2023-12-25",
    sector: "QAT-KEN",
    shippingLine: "MSC",
    loadDate: "2023-12-01" // Added property
  },
  {
    id: "container2",
    containerNumber: "QCTU7654321",
    containerType: "40FT",
    runningNumber: "QT002",
    status: "In Transit",
    sealNumber: "SL54321",
    weight: 1250.5,
    volume: 28.5,
    packages: 45,
    vesselId: "vessel1",
    direction: "Import",
    etd: "2023-11-20",
    eta: "2023-12-05",
    sector: "QAT-SL",
    shippingLine: "Maersk",
    loadDate: "2023-11-15" // Added property
  },
  {
    id: "container3",
    containerNumber: "QCTU9876543",
    containerType: "40HC",
    runningNumber: "QT003",
    status: "Loading",
    sealNumber: "SL98765",
    weight: 500.25,
    volume: 10.5,
    packages: 18,
    vesselId: "",
    direction: "Export",
    etd: "2023-12-20",
    eta: "2024-01-05",
    sector: "QAT-UAE",
    shippingLine: "CMA CGM",
    loadDate: "2023-12-10" // Added property
  }
];

// Add mock cargo items
const mockCargoItems: ContainerCargo[] = [
  {
    id: "cargo1",
    containerId: "container1",
    invoiceNumber: "INV12345",
    lineNumber: "LN001",
    packageName: "General Goods",
    volume: 1.2,
    weight: 250,
    quantity: 1,
    shipper: "Qatar Trading Co.",
    consignee: "Kenya Imports Ltd",
    barcode: "BC123456789", // Added property
    wh: "WH001", // Added property
    d2d: true // Added property
  },
  {
    id: "cargo2",
    containerId: "container1",
    invoiceNumber: "INV12346",
    lineNumber: "LN002",
    packageName: "Electronics",
    volume: 0.8,
    weight: 150,
    quantity: 1,
    shipper: "Tech Distributors LLC",
    consignee: "Digital Solutions Kenya",
    barcode: "BC987654321", // Added property
    wh: "WH002", // Added property
    d2d: false // Added property
  },
  {
    id: "cargo3",
    containerId: "container2",
    invoiceNumber: "INV12347",
    lineNumber: "LN003",
    packageName: "Textile Materials",
    volume: 2.5,
    weight: 350,
    quantity: 1,
    shipper: "Qatar Fabrics Intl.",
    consignee: "Sri Lanka Garments",
    barcode: "BC555666777", // Added property
    wh: "WH003", // Added property
    d2d: true // Added property
  },
  {
    id: "cargo4",
    containerId: "container2",
    invoiceNumber: "INV12348",
    lineNumber: "LN004",
    packageName: "Auto Parts",
    volume: 1.5,
    weight: 420,
    quantity: 1,
    shipper: "Qatar Motors Supply",
    consignee: "Colombo Auto Repairs",
    barcode: "BC111222333", // Added property
    wh: "WH004", // Added property
    d2d: false // Added property
  }
];

export { mockContainers, mockCargoItems };
export default mockContainers;
