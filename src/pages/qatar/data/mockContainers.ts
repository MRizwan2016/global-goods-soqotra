
import { ConsigneeListItem, ContainerCargo, ItemListEntry, QatarContainer, UnsettledInvoice } from "../types/containerTypes";
import { v4 as uuidv4 } from 'uuid';

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
  { id: uuidv4(), itemName: "WOODEN BOX (P/E)", quantity: 14, volume: 16.215 },
  { id: uuidv4(), itemName: "WASHING MACHINE (P/E)", quantity: 1, volume: 0.348 },
  { id: uuidv4(), itemName: "TELEVISION SET (P/E)", quantity: 2, volume: 0.203 },
  { id: uuidv4(), itemName: "PARTY BOX WITH GAS COOLING", quantity: 1, volume: 0.148 },
  { id: uuidv4(), itemName: "MICRO OVEN (P/E)", quantity: 1, volume: 0.074 },
  { id: uuidv4(), itemName: "CARTON BOX - SMALL", quantity: 1, volume: 0.134 },
  { id: uuidv4(), itemName: "WOODEN BOX - (1M) - WHITE", quantity: 2, volume: 1.804 },
  { id: uuidv4(), itemName: "CLOTH RACK (P/E)", quantity: 1, volume: 0.102 },
  { id: uuidv4(), itemName: "WOODEN BOX - (1.5M) - WHITE", quantity: 1, volume: 1.391 },
  { id: uuidv4(), itemName: "CARTON BOX (P/E)", quantity: 8, volume: 1.487 },
  { id: uuidv4(), itemName: "BED BUNDLE (P/E)", quantity: 2, volume: 0.386 },
  { id: uuidv4(), itemName: "CARTON BOX 0.188 (P/E)", quantity: 1, volume: 0.188 },
  { id: uuidv4(), itemName: "CUPBOARD (P/E) ALUMINUIM", quantity: 1, volume: 0.148 },
  { id: uuidv4(), itemName: "STEEL BOX (P/E)", quantity: 1, volume: 3.71 },
  { id: uuidv4(), itemName: "WOODEN BOX - (1.5M) - BLACK", quantity: 1, volume: 1.391 },
  { id: uuidv4(), itemName: "MATTRESS", quantity: 2, volume: 0.458 },
  { id: uuidv4(), itemName: "WOODEN BOX - (2M) - BLACK", quantity: 3, volume: 5.565 },
  { id: uuidv4(), itemName: "CARTON BOX (GIFT)", quantity: 7, volume: 0.639 },
  { id: uuidv4(), itemName: "WOODEN BOX (GIFT)", quantity: 2, volume: 2.405 },
  { id: uuidv4(), itemName: "CARPET ROLL", quantity: 1, volume: 0.05 },
  { id: uuidv4(), itemName: "BLANKET (P/E)", quantity: 2, volume: 0.181 },
  { id: uuidv4(), itemName: "GAS COOKER (P/E)", quantity: 1, volume: 0.266 },
  { id: uuidv4(), itemName: "CARTON BOX", quantity: 3, volume: 0.704 },
  { id: uuidv4(), itemName: "TOY CAR", quantity: 1, volume: 0.019 }
];

export const mockUnsettledInvoices: UnsettledInvoice[] = [
  { id: uuidv4(), invoiceNumber: "13135940", gy: "13135940", shipper: "U S THASLIM", consignee: "U S THASLIM", net: 1283, paid: 0, due: 1283 },
  { id: uuidv4(), invoiceNumber: "13135942", gy: "13135942", shipper: "AS MANJULA", consignee: "AS MANJULA", net: 500, paid: 0, due: 500 },
  { id: uuidv4(), invoiceNumber: "13135946", gy: "13135946", shipper: "JAYASINGHA A J D P", consignee: "JAYASINGHA A J D P", net: 528, paid: 0, due: 528 },
  { id: uuidv4(), invoiceNumber: "13135948", gy: "13135948", shipper: "KUMARA G G I N", consignee: "KUMARA G G I N", net: 498, paid: 0, due: 498 },
  { id: uuidv4(), invoiceNumber: "13136044", gy: "13136044", shipper: "R GANESHAN", consignee: "R GANESHAN", net: 755, paid: 0, due: 755 },
  { id: uuidv4(), invoiceNumber: "13136045", gy: "13136045", shipper: "PRIYANAKARA A T L", consignee: "MADUWANTHI W L C M", net: 150, paid: 0, due: 150 },
  { id: uuidv4(), invoiceNumber: "13136051", gy: "13136051", shipper: "KUMARA H W", consignee: "KUMARA H W", net: 70, paid: 0, due: 70 },
  { id: uuidv4(), invoiceNumber: "13136054", gy: "13136054", shipper: "SILVA D T K D", consignee: "SILVA D T K D", net: 60, paid: 0, due: 60 },
  { id: uuidv4(), invoiceNumber: "13136060", gy: "13136060", shipper: "FARNAS M T M", consignee: "FARNAS M T M", net: 320, paid: 0, due: 320 },
  { id: uuidv4(), invoiceNumber: "13136061", gy: "13136061", shipper: "MEDIWELA M M I T", consignee: "MEDIWELA M M I T", net: 90, paid: 0, due: 90 },
  { id: uuidv4(), invoiceNumber: "13136063", gy: "13136063", shipper: "SANDAMALI N E", consignee: "SANDAMALI N E", net: 220, paid: 0, due: 220 },
  { id: uuidv4(), invoiceNumber: "13136064", gy: "13136064", shipper: "RISWAN A C M", consignee: "RISWAN A C M", net: 530, paid: 0, due: 530 },
  { id: uuidv4(), invoiceNumber: "13136065", gy: "13136065", shipper: "DESHAPRIYA P N A N", consignee: "DESHAPRIYA P N A N", net: 220, paid: 0, due: 220 },
  { id: uuidv4(), invoiceNumber: "13136066", gy: "13136066", shipper: "DISSANAYAKE H D C", consignee: "DISSANAYAKE H D C", net: 220, paid: 0, due: 220 },
  { id: uuidv4(), invoiceNumber: "13136068", gy: "13136068", shipper: "IMTHIYAS M S M G M", consignee: "UMMA K M S S", net: 730, paid: 0, due: 730 },
  { id: uuidv4(), invoiceNumber: "13136071", gy: "13136071", shipper: "ASLAM A B", consignee: "ASLAM A B", net: 825, paid: 0, due: 825 },
  { id: uuidv4(), invoiceNumber: "13136102", gy: "13136102", shipper: "MENIKA R M P", consignee: "PIYADASA I P", net: 465, paid: 0, due: 465 }
];

export const mockConsigneeList: ConsigneeListItem[] = [
  { id: uuidv4(), invoice: "13135869", consignee: "Y G R SENARATHNA", volume: 1.776 },
  { id: uuidv4(), invoice: "13135927", consignee: "M D S S ABEYDEERA", volume: 0.356 },
  { id: uuidv4(), invoice: "13135928", consignee: "M I M RILVAN", volume: 1.004 },
  { id: uuidv4(), invoice: "13135931", consignee: "P DINESHKUMAR", volume: 1.391 },
  { id: uuidv4(), invoice: "13135932", consignee: "J A R C ABEYSINGHE", volume: 0.8 },
  { id: uuidv4(), invoice: "13135936", consignee: "A G D N PADENIYA", volume: 0.188 },
  { id: uuidv4(), invoice: "13135939", consignee: "S A AMMA", volume: 0.148 },
  { id: uuidv4(), invoice: "13135940", consignee: "U S THASLIM", volume: 3.71 },
  { id: uuidv4(), invoice: "13135942", consignee: "AS MANJULA", volume: 1.391 },
  { id: uuidv4(), invoice: "13135946", consignee: "JAYASINGHA A J D P", volume: 1.309 },
  { id: uuidv4(), invoice: "13135948", consignee: "KUMARA G G I N", volume: 1.226 },
  { id: uuidv4(), invoice: "13136028", consignee: "A L M MAHAROOFF", volume: 1.09 },
  { id: uuidv4(), invoice: "13136036", consignee: "G K PEIRIS", volume: 1.855 },
  { id: uuidv4(), invoice: "13136044", consignee: "R GANESHAN", volume: 0.971 },
  { id: uuidv4(), invoice: "13136045", consignee: "MADUWANTHI W L C M", volume: 0.179 },
  { id: uuidv4(), invoice: "13136051", consignee: "KUMARA H W", volume: 0.188 },
  { id: uuidv4(), invoice: "13136054", consignee: "SILVA D T K D", volume: 0.166 },
  { id: uuidv4(), invoice: "13136060", consignee: "FARNAS M T M", volume: 0.74 },
  { id: uuidv4(), invoice: "13136061", consignee: "MEDIWELA M M I T", volume: 0.248 },
  { id: uuidv4(), invoice: "13136063", consignee: "SANDAMALI N E", volume: 0.902 },
  { id: uuidv4(), invoice: "13136064", consignee: "RISWAN A C M", volume: 1.042 },
  { id: uuidv4(), invoice: "13136065", consignee: "DESHAPRIYA P N A N", volume: 0.902 },
  { id: uuidv4(), invoice: "13136066", consignee: "DISSANAYAKE H D C", volume: 0.902 },
  { id: uuidv4(), invoice: "13136068", consignee: "UMMA K M S S", volume: 1.855 },
  { id: uuidv4(), invoice: "13136071", consignee: "ASLAM A B", volume: 0.226 },
  { id: uuidv4(), invoice: "13136102", consignee: "PIYADASA I P", volume: 0.691 },
  { id: uuidv4(), invoice: "13136106", consignee: "MALINGA M A P A", volume: 0.232 },
  { id: uuidv4(), invoice: "13136108", consignee: "NUGEKOTUWA N", volume: 0.941 },
  { id: uuidv4(), invoice: "13136110", consignee: "NAMAL T G S", volume: 0.971 },
  { id: uuidv4(), invoice: "13136111", consignee: "RATNAYAKA R M A K", volume: 1.096 },
  { id: uuidv4(), invoice: "13136117", consignee: "A FAWZIYA", volume: 4.932 },
  { id: uuidv4(), invoice: "13136118", consignee: "HERATH H M S K", volume: 0.902 },
  { id: uuidv4(), invoice: "13136121", consignee: "M P D N MALANIE", volume: 0.298 },
  { id: uuidv4(), invoice: "13136123", consignee: "R P D U PREMASIRI", volume: 0.921 }
];

// Container Types
export const containerTypes = [
  { id: "20FT_NML", name: "20FT_NML" },
  { id: "40FT_HIGHC", name: "40FT_HIGHC" },
  { id: "40FT_STD", name: "40FT_STD" },
  { id: "45FT_HIGHC", name: "45FT_HIGHC" }
];

// Direction types
export const directionTypes = [
  { id: "K", name: "K" },
  { id: "M", name: "M" },
  { id: "COLOMBO", name: "COLOMBO" },
  { id: "KURUNEGALA", name: "KURUNEGALA" }
];

// Sectors
export const sectors = [
  { id: "COLOMBO", name: "COLOMBO : C" },
  { id: "DUBAI", name: "DUBAI : D" },
  { id: "KUWAIT", name: "KUWAIT : K" }
];

// Generate a new running number (incremented from the highest)
export const getNextRunningNumber = (): string => {
  if (mockContainers.length === 0) return "701";
  
  const highestNumber = Math.max(...mockContainers.map(c => parseInt(c.runningNumber)));
  return (highestNumber + 1).toString();
};
