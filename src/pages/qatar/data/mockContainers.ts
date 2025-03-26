import { ConsigneeListItem, ContainerCargo, ItemListEntry, QatarContainer, UnsettledInvoice } from "../types/containerTypes";
import { v4 as uuidv4 } from 'uuid';

// Container type options
export const containerTypes = [
  { id: "20FT_STANDARD", name: "20FT Standard" },
  { id: "40FT_STANDARD", name: "40FT Standard" },
  { id: "40FT_HIGHC", name: "40FT High Cube" },
  { id: "20FT_REEFER", name: "20FT Reefer" },
  { id: "40FT_REEFER", name: "40FT Reefer" },
  { id: "20FT_OPEN", name: "20FT Open Top" },
  { id: "40FT_OPEN", name: "40FT Open Top" },
  { id: "20FT_FLAT", name: "20FT Flat Rack" },
  { id: "40FT_FLAT", name: "40FT Flat Rack" }
];

// Direction type options
export const directionTypes = [
  { id: "D", name: "Direct" },
  { id: "M", name: "Mix" },
  { id: "K", name: "Kolkata" },
  { id: "C", name: "Chennai" }
];

// Helper function to get the next running number
export const getNextRunningNumber = () => {
  // Find the highest running number in the mockContainers array
  const highest = mockContainers.reduce((max, container) => {
    const num = parseInt(container.runningNumber);
    return num > max ? num : max;
  }, 0);
  
  // Return the next number as string
  return (highest + 1).toString();
};

export const mockContainers: QatarContainer[] = [
  {
    id: uuidv4(),
    runningNumber: "716",
    containerNumber: "PONU8091553",
    sealNumber: "ML-QA0001279",
    containerType: "40FT_HIGHC",
    direction: "K",
    etd: "23/03/2025",
    eta: "05/04/2025",
    loadDate: "20/03/2025",
    weight: 6915.06,
    packages: 65,
    volume: 38.417,
    status: "LOADED",
    sector: "COLOMBO"
  },
  {
    id: uuidv4(),
    runningNumber: "715",
    containerNumber: "PONU8242618",
    sealNumber: "ML-QA0001280",
    containerType: "40FT_HIGHC",
    direction: "M",
    etd: "23/03/2025",
    eta: "05/04/2025",
    loadDate: "19/03/2025",
    weight: 5885.64,
    packages: 72,
    volume: 32.698,
    status: "LOADED",
    sector: "COLOMBO"
  }
];

export const mockCargoItems: ContainerCargo[] = [
  {
    id: uuidv4(),
    containerId: mockContainers[0].id,
    invoiceNumber: "/13135869/N",
    lineNumber: "1",
    barcode: "974",
    packageName: "WOODEN BOX (P/E)",
    volume: 1.275,
    weight: 229.5,
    shipper: "Y G R SENARATHNA",
    consignee: "Y G R SENARATHNA",
    wh: "K",
    d2d: false
  },
  {
    id: uuidv4(),
    containerId: mockContainers[0].id,
    invoiceNumber: "/13135869/N",
    lineNumber: "2",
    packageName: "WASHING MACHINE (P/E)",
    volume: 0.348,
    weight: 62.64,
    shipper: "Y G R SENARATHNA",
    consignee: "Y G R SENARATHNA",
    wh: "K",
    d2d: false
  },
  {
    id: uuidv4(),
    containerId: mockContainers[0].id,
    invoiceNumber: "/13135869/N",
    lineNumber: "3",
    packageName: "TELEVISION SET (P/E)",
    volume: 0.153,
    weight: 27.54,
    shipper: "Y G R SENARATHNA",
    consignee: "Y G R SENARATHNA",
    wh: "K",
    d2d: false
  },
  {
    id: uuidv4(),
    containerId: mockContainers[0].id,
    invoiceNumber: "/13135927/N",
    lineNumber: "1",
    barcode: "974",
    packageName: "PARTY BOX WITH GAS COOLING",
    volume: 0.148,
    weight: 26.64,
    shipper: "M D S S ABEYDEERA",
    consignee: "M D S S ABEYDEERA",
    wh: "K",
    d2d: false
  },
  {
    id: uuidv4(),
    containerId: mockContainers[0].id,
    invoiceNumber: "/13135927/N",
    lineNumber: "3",
    packageName: "MICRO OVEN (P/E)",
    volume: 0.074,
    weight: 13.32,
    shipper: "M D S S ABEYDEERA",
    consignee: "M D S S ABEYDEERA",
    wh: "K",
    d2d: false
  }
];

export const mockItemList: ItemListEntry[] = [
  { 
    id: uuidv4(), 
    invoice: "/13135869/N", 
    shipper: "Y G R SENARATHNA",
    consignee: "Y G R SENARATHNA",
    packageName: "WOODEN BOX (P/E)", 
    quantity: 14, 
    packages: 14,
    volume: 16.215 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135869/N", 
    shipper: "Y G R SENARATHNA",
    consignee: "Y G R SENARATHNA",
    packageName: "WASHING MACHINE (P/E)", 
    quantity: 1, 
    packages: 1,
    volume: 0.348 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135869/N", 
    shipper: "Y G R SENARATHNA",
    consignee: "Y G R SENARATHNA",
    packageName: "TELEVISION SET (P/E)", 
    quantity: 2, 
    packages: 2,
    volume: 0.203 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135927/N", 
    shipper: "M D S S ABEYDEERA",
    consignee: "M D S S ABEYDEERA",
    packageName: "PARTY BOX WITH GAS COOLING", 
    quantity: 1, 
    packages: 1,
    volume: 0.148 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135927/N", 
    shipper: "M D S S ABEYDEERA",
    consignee: "M D S S ABEYDEERA",
    packageName: "MICRO OVEN (P/E)", 
    quantity: 1, 
    packages: 1,
    volume: 0.074 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135927/N", 
    shipper: "M D S S ABEYDEERA",
    consignee: "M D S S ABEYDEERA",
    packageName: "CARTON BOX - SMALL", 
    quantity: 1, 
    packages: 1,
    volume: 0.134 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135928/N", 
    shipper: "M I M RILVAN",
    consignee: "M I M RILVAN",
    packageName: "WOODEN BOX - (1M) - WHITE", 
    quantity: 2, 
    packages: 2,
    volume: 1.804 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135931/N", 
    shipper: "P DINESHKUMAR",
    consignee: "P DINESHKUMAR",
    packageName: "CLOTH RACK (P/E)", 
    quantity: 1, 
    packages: 1,
    volume: 0.102 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135931/N", 
    shipper: "P DINESHKUMAR",
    consignee: "P DINESHKUMAR",
    packageName: "WOODEN BOX - (1.5M) - WHITE", 
    quantity: 1, 
    packages: 1,
    volume: 1.391 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135932/N", 
    shipper: "J A R C ABEYSINGHE",
    consignee: "J A R C ABEYSINGHE",
    packageName: "CARTON BOX (P/E)", 
    quantity: 8, 
    packages: 8,
    volume: 1.487 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135936/N", 
    shipper: "A G D N PADENIYA",
    consignee: "A G D N PADENIYA",
    packageName: "BED BUNDLE (P/E)", 
    quantity: 2, 
    packages: 2,
    volume: 0.386 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135939/N", 
    shipper: "S A AMMA",
    consignee: "S A AMMA",
    packageName: "CARTON BOX 0.188 (P/E)", 
    quantity: 1, 
    packages: 1,
    volume: 0.188 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135940/N", 
    shipper: "U S THASLIM",
    consignee: "U S THASLIM",
    packageName: "CUPBOARD (P/E) ALUMINUIM", 
    quantity: 1, 
    packages: 1,
    volume: 0.148 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135940/N", 
    shipper: "U S THASLIM",
    consignee: "U S THASLIM",
    packageName: "STEEL BOX (P/E)", 
    quantity: 1, 
    packages: 1,
    volume: 3.71 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135942/N", 
    shipper: "AS MANJULA",
    consignee: "AS MANJULA",
    packageName: "WOODEN BOX - (1.5M) - BLACK", 
    quantity: 1, 
    packages: 1,
    volume: 1.391 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135946/N", 
    shipper: "JAYASINGHA A J D P",
    consignee: "JAYASINGHA A J D P",
    packageName: "MATTRESS", 
    quantity: 2, 
    packages: 2,
    volume: 0.458 
  },
  { 
    id: uuidv4(), 
    invoice: "/13135948/N", 
    shipper: "KUMARA G G I N",
    consignee: "KUMARA G G I N",
    packageName: "WOODEN BOX - (2M) - BLACK", 
    quantity: 3, 
    packages: 3,
    volume: 5.565 
  },
  { 
    id: uuidv4(), 
    invoice: "/13136028/N", 
    shipper: "A L M MAHAROOFF",
    consignee: "A L M MAHAROOFF",
    packageName: "CARTON BOX (GIFT)", 
    quantity: 7, 
    packages: 7,
    volume: 0.639 
  },
  { 
    id: uuidv4(), 
    invoice: "/13136036/N", 
    shipper: "G K PEIRIS",
    consignee: "G K PEIRIS",
    packageName: "WOODEN BOX (GIFT)", 
    quantity: 2, 
    packages: 2,
    volume: 2.405 
  },
  { 
    id: uuidv4(), 
    invoice: "/13136044/N", 
    shipper: "R GANESHAN",
    consignee: "R GANESHAN",
    packageName: "CARPET ROLL", 
    quantity: 1, 
    packages: 1,
    volume: 0.05 
  },
  { 
    id: uuidv4(), 
    invoice: "/13136045/N", 
    shipper: "PRIYANAKARA A T L",
    consignee: "MADUWANTHI W L C M",
    packageName: "BLANKET (P/E)", 
    quantity: 2, 
    packages: 2,
    volume: 0.181 
  },
  { 
    id: uuidv4(), 
    invoice: "/13136051/N", 
    shipper: "KUMARA H W",
    consignee: "KUMARA H W",
    packageName: "GAS COOKER (P/E)", 
    quantity: 1, 
    packages: 1,
    volume: 0.266 
  },
  { 
    id: uuidv4(), 
    invoice: "/13136054/N", 
    shipper: "SILVA D T K D",
    consignee: "SILVA D T K D",
    packageName: "CARTON BOX", 
    quantity: 3, 
    packages: 3,
    volume: 0.704 
  },
  { 
    id: uuidv4(), 
    invoice: "/13136060/N", 
    shipper: "FARNAS M T M",
    consignee: "FARNAS M T M",
    packageName: "TOY CAR", 
    quantity: 1, 
    packages: 1,
    volume: 0.019 
  }
];

export const mockUnsettledInvoices: UnsettledInvoice[] = [
  { 
    id: uuidv4(), 
    invoiceNumber: "13135940", 
    gy: "13135940", 
    shipper: "U S THASLIM", 
    consignee: "U S THASLIM", 
    net: 1283, 
    amount: 1283,
    paid: false, 
    due: 1283 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13135942", 
    gy: "13135942", 
    shipper: "AS MANJULA", 
    consignee: "AS MANJULA", 
    net: 500, 
    amount: 500,
    paid: false, 
    due: 500 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13135946", 
    gy: "13135946", 
    shipper: "JAYASINGHA A J D P", 
    consignee: "JAYASINGHA A J D P", 
    net: 528, 
    amount: 528,
    paid: false, 
    due: 528 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13135948", 
    gy: "13135948", 
    shipper: "KUMARA G G I N", 
    consignee: "KUMARA G G I N", 
    net: 498, 
    amount: 498,
    paid: false, 
    due: 498 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136044", 
    gy: "13136044", 
    shipper: "R GANESHAN", 
    consignee: "R GANESHAN", 
    net: 755, 
    amount: 755,
    paid: false, 
    due: 755 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136045", 
    gy: "13136045", 
    shipper: "PRIYANAKARA A T L", 
    consignee: "MADUWANTHI W L C M", 
    net: 150, 
    amount: 150,
    paid: false, 
    due: 150 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136051", 
    gy: "13136051", 
    shipper: "KUMARA H W", 
    consignee: "KUMARA H W", 
    net: 70, 
    amount: 70,
    paid: false, 
    due: 70 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136054", 
    gy: "13136054", 
    shipper: "SILVA D T K D", 
    consignee: "SILVA D T K D", 
    net: 60, 
    amount: 60,
    paid: false, 
    due: 60 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136060", 
    gy: "13136060", 
    shipper: "FARNAS M T M", 
    consignee: "FARNAS M T M", 
    net: 320, 
    amount: 320,
    paid: false, 
    due: 320 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136061", 
    gy: "13136061", 
    shipper: "MEDIWELA M M I T", 
    consignee: "MEDIWELA M M I T", 
    net: 90, 
    amount: 90,
    paid: false, 
    due: 90 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136063", 
    gy: "13136063", 
    shipper: "SANDAMALI N E", 
    consignee: "SANDAMALI N E", 
    net: 220, 
    amount: 220,
    paid: false, 
    due: 220 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136064", 
    gy: "13136064", 
    shipper: "RISWAN A C M", 
    consignee: "RISWAN A C M", 
    net: 530, 
    amount: 530,
    paid: false, 
    due: 530 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136065", 
    gy: "13136065", 
    shipper: "DESHAPRIYA P N A N", 
    consignee: "DESHAPRIYA P N A N", 
    net: 220, 
    amount: 220,
    paid: false, 
    due: 220 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136066", 
    gy: "13136066", 
    shipper: "DISSANAYAKE H D C", 
    consignee: "DISSANAYAKE H D C", 
    net: 220, 
    amount: 220,
    paid: false, 
    due: 220 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136068", 
    gy: "13136068", 
    shipper: "IMTHIYAS M S M G M", 
    consignee: "UMMA K M S S", 
    net: 730, 
    amount: 730,
    paid: false, 
    due: 730 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136071", 
    gy: "13136071", 
    shipper: "ASLAM A B", 
    consignee: "ASLAM A B", 
    net: 825, 
    amount: 825,
    paid: false, 
    due: 825 
  },
  { 
    id: uuidv4(), 
    invoiceNumber: "13136102", 
    gy: "13136102", 
    shipper: "MENIKA R M P", 
    consignee: "PIYADASA I P", 
    net: 465, 
    amount: 465,
    paid: false, 
    due: 465 
  }
];

export const mockConsigneeList: ConsigneeListItem[] = [
  { 
    id: uuidv4(), 
    invoice: "13135869", 
    shipper: "Y G R SENARATHNA",
    consignee: "Y G R SENARATHNA", 
    shipperContact: "Mobile: +974 12345678",
    consigneeContact: "Mobile: +94 71234567",
    volume: 1.776 
  },
  { 
    id: uuidv4(), 
    invoice: "13135927", 
    shipper: "M D S S ABEYDEERA",
    consignee: "M D S S ABEYDEERA", 
    shipperContact: "Mobile: +974 23456789",
    consigneeContact: "Mobile: +94 72345678",
    volume: 0.356 
  },
  { 
    id: uuidv4(), 
    invoice: "13135928", 
    shipper: "M I M RILVAN",
    consignee: "M I M RILVAN", 
    shipperContact: "Mobile: +974 34567890",
    consigneeContact: "Mobile: +94 73456789",
    volume: 1.004 
  },
  { 
    id: uuidv4(), 
    invoice: "13135931", 
    shipper: "P DINESHKUMAR",
    consignee: "P DINESHKUMAR", 
    shipperContact: "Mobile: +974 45678901",
    consigneeContact: "Mobile: +94 74567890",
    volume: 1.391 
  },
  { 
    id: uuidv4(), 
    invoice: "13135932", 
    shipper: "J A R C ABEYSINGHE",
    consignee: "J A R C ABEYSINGHE", 
    shipperContact: "Mobile: +974 56789012",
    consigneeContact: "Mobile: +94 75678901",
    volume: 0.8 
  },
  { 
    id: uuidv4(), 
    invoice: "13135936", 
    shipper: "A G D N PADENIYA",
    consignee: "A G D N PADENIYA", 
    shipperContact: "Mobile: +974 67890123",
    consigneeContact: "Mobile: +94 76789012",
    volume: 0.188 
  },
  { 
    id: uuidv4(), 
    invoice: "13135939", 
    shipper: "S A AMMA",
    consignee: "S A AMMA", 
    shipperContact: "Mobile: +974 78901234",
    consigneeContact: "Mobile: +94 77890123",
    volume: 0.148 
  },
  { 
    id: uuidv4(), 
    invoice: "13135940", 
    shipper: "U S THASLIM",
    consignee: "U S THASLIM", 
    shipperContact: "Mobile: +974 89012345",
    consigneeContact: "Mobile: +94 78901234",
    volume: 3.71 
  },
  { 
    id: uuidv4(), 
    invoice: "13135942", 
    shipper: "AS MANJULA",
    consignee: "AS MANJULA", 
    shipperContact: "Mobile: +974 90123456",
    consigneeContact: "Mobile: +94 79012345",
    volume: 1.391 
  },
  { 
    id: uuidv4(), 
    invoice: "13135946", 
    shipper: "JAYASINGHA A J D P",
    consignee: "JAYASINGHA A J D P", 
    shipperContact: "Mobile: +974 01234567",
    consigneeContact: "Mobile: +94 70123456",
    volume: 1.309 
  },
  { 
    id: uuidv4(), 
    invoice: "13135948", 
    shipper: "KUMARA G G I N",
    consignee: "KUMARA G G I N", 
    shipperContact: "Mobile: +974 12345678",
    consigneeContact: "Mobile: +94 71234567",
    volume: 1.226 
  },
  { 
    id: uuidv4(), 
    invoice: "13136028", 
    shipper: "A L M MAHAROOFF",
    consignee: "A L M MAHAROOFF", 
    shipperContact: "Mobile: +974 23456789",
    consigneeContact: "Mobile: +94 72345678",
    volume: 1.09 
  },
  { 
    id: uuidv4(), 
    invoice: "13136036", 
    shipper: "G K PEIRIS",
    consignee: "G K PEIRIS", 
    shipperContact: "Mobile: +974 34567890",
    consigneeContact: "Mobile: +94 73456789",
    volume: 1.855 
  },
  { 
    id: uuidv4(), 
    invoice: "13136044", 
    shipper: "R GANESHAN",
    consignee: "R GANESHAN", 
    shipperContact: "Mobile: +974 45678901",
    consigneeContact: "Mobile: +94 74567890",
    volume: 0.971 
  },
  { 
    id: uuidv4(), 
    invoice: "13136045", 
    shipper: "PRIYANAKARA A T L",
    consignee: "MADUWANTHI W L C M", 
    shipperContact: "Mobile: +974 56789012",
    consigneeContact: "Mobile: +94 75678901",
    volume: 0.179 
  },
  { 
    id: uuidv4(), 
    invoice: "13136051", 
    shipper: "KUMARA H W",
    consignee: "KUMARA H W", 
    shipperContact: "Mobile: +974 67890123",
    consigneeContact: "Mobile: +94 76789012",
    volume: 0.188 
  },
  { 
    id: uuidv4(), 
    invoice: "13136054", 
    shipper: "SILVA D T K D",
    consignee: "SILVA D T K D", 
    shipperContact: "Mobile: +974 78901234",
    consigneeContact: "Mobile: +94 77890123",
    volume: 0.166 
  },
  { 
    id: uuidv4(), 
    invoice: "13136060", 
    shipper: "FARNAS M T M",
    consignee: "FARNAS M T M", 
    shipperContact: "Mobile: +974 89012345",
    consigneeContact: "Mobile: +94 78901234",
    volume: 0.74 
  },
  { 
    id: uuidv4(), 
    invoice: "13136061", 
    shipper: "MEDIWELA M M I T",
    consignee: "MEDIWELA M M I T", 
    shipperContact: "Mobile: +974 90123456",
    consigneeContact: "Mobile: +94 79012345",
    volume: 0.248 
  },
  { 
    id: uuidv4(), 
    invoice: "13136063", 
    shipper: "SANDAMALI N E",
    consignee: "SANDAMALI N E", 
    shipperContact: "Mobile: +974 01234567",
    consigneeContact: "Mobile: +94 70123456",
    volume: 0.902 
  },
  { 
    id: uuidv4(), 
    invoice: "13136064", 
    shipper: "RISWAN A C M",
    consignee: "RISWAN A C M", 
    shipperContact: "Mobile: +974 12345678",
    consigneeContact: "Mobile: +94 71234567",
    volume: 1.042 
  },
  { 
    id: uuidv4(), 
    invoice: "13136065", 
    shipper: "DESHAPRIYA P N A N",
    consignee: "DESHAPRIYA P N A N", 
    shipperContact: "Mobile: +974 23456789",
    consigneeContact: "Mobile: +94 72345678",
    volume: 0.902 
  },
  { 
    id: uuidv4(), 
    invoice: "13136066", 
    shipper: "DISSANAYAKE H D C",
    consignee: "DISSANAYAKE H D C", 
    shipperContact: "Mobile: +974 34567890",
    consigneeContact: "Mobile: +94 73456789",
    volume: 0.902 
  },
  { 
    id: uuidv4(), 
    invoice: "13136068", 
    shipper: "IMTHIYAS M S M G M",
    consignee: "UMMA K M S S", 
    shipperContact: "Mobile: +974 34567890",
    consigneeContact: "Mobile: +94 73456789",
    volume: 0.902 
  }
];
