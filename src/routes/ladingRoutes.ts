
import BillOfLadingList from "@/pages/bill-of-lading/BillOfLadingList";
import BillOfLadingForm from "@/pages/bill-of-lading/BillOfLadingForm";
import HouseBillOfLadingDocument from "@/pages/print-documents/components/house-bill-of-lading/HouseBillOfLadingDocument";
import { RouteConfig } from "./types";

export const ladingRoutes: RouteConfig[] = [
  {
    path: "/bill-of-lading",
    element: BillOfLadingList,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading",
    element: BillOfLadingList,
    private: true
  },
  {
    path: "/bill-of-lading/new",
    element: BillOfLadingForm,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading/new",
    element: BillOfLadingForm,
    private: true
  },
  {
    path: "/bill-of-lading/edit/:id",
    element: BillOfLadingForm,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading/edit/:id",
    element: BillOfLadingForm,
    private: true
  },
  {
    path: "/bill-of-lading/print/:id",
    element: HouseBillOfLadingDocument,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading/print/:id",
    element: HouseBillOfLadingDocument,
    private: true
  }
];
