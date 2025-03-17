
import BillOfLadingList from "@/pages/bill-of-lading/BillOfLadingList";
import BillOfLadingForm from "@/pages/bill-of-lading/BillOfLadingForm";
import { RouteConfig } from "./types";

export const ladingRoutes: RouteConfig[] = [
  {
    path: "/data-entry/bill-of-lading",
    element: <BillOfLadingList />,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading/new",
    element: <BillOfLadingForm />,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading/edit/:id",
    element: <BillOfLadingForm />,
    private: true
  }
];
