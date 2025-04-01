
import { mockBLData } from "../components/mockData";

export interface BillOfLading {
  id: string;
  blNumber: string;
  date: string;
  shipper: string;
  consignee: string;
  origin: string;
  destination: string;
  cargoType: string;
  vessel: string;
  status: string;
}

export const getBillOfLadingData = (): BillOfLading[] => {
  return mockBLData;
};

export const filterBillOfLadingData = (
  data: BillOfLading[],
  searchText: string,
  origin: string,
  destination: string,
  cargoType: string,
  status: string
): BillOfLading[] => {
  return data.filter(
    (item) =>
      (searchText === "" || 
        item.blNumber.toLowerCase().includes(searchText.toLowerCase()) || 
        item.shipper.toLowerCase().includes(searchText.toLowerCase()) || 
        item.consignee.toLowerCase().includes(searchText.toLowerCase())) &&
      (origin === "ALL" || item.origin === origin) &&
      (destination === "ALL" || item.destination === destination) &&
      (cargoType === "ALL" || item.cargoType === cargoType) &&
      (status === "ALL" || item.status === status)
  );
};

export const paginateBillOfLadingData = (
  data: BillOfLading[],
  currentPage: number,
  entriesPerPage: number
): BillOfLading[] => {
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  return data.slice(indexOfFirstEntry, indexOfLastEntry);
};
