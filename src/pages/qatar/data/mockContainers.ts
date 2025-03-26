
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
    shippingLine: "MSC"
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
    shippingLine: "Maersk"
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
    shippingLine: "CMA CGM"
  }
];

// Add mock cargo items
const mockCargoItems: ContainerCargo[] = [
  {
    id: "cargo1",
    containerId: "container1",
    invoiceNumber: "INV12345",
    lineNumber: "LN001",
    barcode: "BC123456789",
    packageName: "General Goods",
    volume: 1.2,
    weight: 250,
    shipper: "Qatar Trading Co.",
    consignee: "Kenya Imports Ltd",
    wh: "WH001",
    d2d: true
  },
  {
    id: "cargo2",
    containerId: "container1",
    invoiceNumber: "INV12346",
    lineNumber: "LN002",
    barcode: "BC987654321",
    packageName: "Electronics",
    volume: 0.8,
    weight: 150,
    shipper: "Tech Distributors LLC",
    consignee: "Digital Solutions Kenya",
    wh: "WH002",
    d2d: false
  },
  {
    id: "cargo3",
    containerId: "container2",
    invoiceNumber: "INV12347",
    lineNumber: "LN003",
    barcode: "BC555666777",
    packageName: "Textile Materials",
    volume: 2.5,
    weight: 350,
    shipper: "Qatar Fabrics Intl.",
    consignee: "Sri Lanka Garments",
    wh: "WH003",
    d2d: true
  },
  {
    id: "cargo4",
    containerId: "container2",
    invoiceNumber: "INV12348",
    lineNumber: "LN004",
    barcode: "BC111222333",
    packageName: "Auto Parts",
    volume: 1.5,
    weight: 420,
    shipper: "Qatar Motors Supply",
    consignee: "Colombo Auto Repairs",
    wh: "WH004",
    d2d: false
  }
];

export { mockContainers, mockCargoItems };
export default mockContainers;
