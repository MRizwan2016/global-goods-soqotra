
import BillOfLadingList from "@/pages/bill-of-lading/BillOfLadingList";
import BillOfLadingForm from "@/pages/bill-of-lading/BillOfLadingForm";
import { RouteConfig } from "./types";

export const ladingRoutes: RouteConfig[] = [
  {
    path: "/bill-of-lading",
    element: <BillOfLadingList />,
    private: true
  },
  {
    path: "/bill-of-lading/new",
    element: <BillOfLadingForm />,
    private: true
  },
  {
    path: "/bill-of-lading/edit",
    element: <BillOfLadingForm />,
    private: true
  }
];
