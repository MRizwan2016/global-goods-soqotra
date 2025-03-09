
// Mock data for destination charts
export const kenyaShipmentData = [
  { name: 'Nairobi', shipments: 421 },
  { name: 'Mombasa', shipments: 362 },
  { name: 'Kisumu', shipments: 175 },
  { name: 'Nakuru', shipments: 124 },
];

export const philippinesShipmentData = [
  { name: 'Manila', shipments: 542 },
  { name: 'Cebu', shipments: 321 },
  { name: 'Davao', shipments: 234 },
  { name: 'Quezon', shipments: 198 },
];

export const sriLankaShipmentData = [
  { name: 'Colombo', shipments: 485 },
  { name: 'Galle', shipments: 221 },
  { name: 'Kandy', shipments: 198 },
];

export const somaliaShipmentData = [
  { name: 'Mogadishu', shipments: 312 },
  { name: 'Hargeisa', shipments: 156 },
  { name: 'Kismayo', shipments: 98 },
];

// Mock data for shipment table
export const shipmentTableData = [
  {
    id: "SQ-001",
    invoiceNumber: "INV-2023-001",
    agent: "John Doe",
    transport: "Sea",
    freightBy: "Maersk Line",
    warehouse: "Warehouse A",
    packages: 24,
    dateCleared: "2023-10-15",
    receipt: "RCP-001",
    timeIn: "09:30",
    timeOut: "14:45",
  },
  {
    id: "SQ-002",
    invoiceNumber: "INV-2023-002",
    agent: "Jane Smith",
    transport: "Air",
    freightBy: "Qatar Airways",
    warehouse: "Warehouse B",
    packages: 12,
    dateCleared: "2023-10-16",
    receipt: "RCP-002",
    timeIn: "10:15",
    timeOut: "16:30",
  },
  {
    id: "SQ-003",
    invoiceNumber: "INV-2023-003",
    agent: "Ahmed Hassan",
    transport: "Sea",
    freightBy: "MSC",
    warehouse: "Warehouse A",
    packages: 36,
    dateCleared: "2023-10-17",
    receipt: "RCP-003",
    timeIn: "08:45",
    timeOut: "15:20",
  },
];

// For empty state example
export const emptyTableData = [];
