
import { QatarContainer } from "../types/containerTypes";

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

export default mockContainers;
