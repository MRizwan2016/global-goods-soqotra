
import SellingRatesList from "@/pages/selling-rates/SellingRatesList";
import SellingRatesForm from "@/pages/selling-rates/SellingRatesForm";
import { RouteConfig } from "./types";

export const sellingRatesRoutes: RouteConfig[] = [
  {
    path: "/selling-rates",
    element: SellingRatesList,
    private: true
  },
  {
    path: "/data-entry/selling-rates",  // This route was available but no changes were being made
    element: SellingRatesList,
    private: true
  },
  {
    path: "/selling-rates/new",
    element: SellingRatesForm,
    private: true
  },
  {
    path: "/data-entry/selling-rates/new",  // Add this route
    element: SellingRatesForm,
    private: true
  },
  {
    path: "/selling-rates/edit/:id",  // Fix: Change from /selling-rates/edit to include the :id parameter
    element: SellingRatesForm,
    private: true
  },
  {
    path: "/data-entry/selling-rates/edit/:id",  // Add this route with the :id parameter
    element: SellingRatesForm,
    private: true
  }
];
