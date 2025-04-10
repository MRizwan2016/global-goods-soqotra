
import SellingRatesList from "@/pages/selling-rates/SellingRatesList";
import SellingRatesForm from "@/pages/selling-rates/SellingRatesForm";
import { RouteConfig } from "./types";

export const sellingRatesRoutes: RouteConfig[] = [
  {
    path: "/selling-rates",
    element: SellingRatesList,
    private: true,
    requiredFile: "sellingRates"
  },
  {
    path: "/data-entry/selling-rates",
    element: SellingRatesList,
    private: true,
    requiredFile: "sellingRates"
  },
  {
    path: "/selling-rates/new",
    element: SellingRatesForm,
    private: true,
    requiredFile: "sellingRates"
  },
  {
    path: "/data-entry/selling-rates/new",
    element: SellingRatesForm,
    private: true,
    requiredFile: "sellingRates"
  },
  {
    path: "/selling-rates/edit/:id",
    element: SellingRatesForm,
    private: true,
    requiredFile: "sellingRates"
  },
  {
    path: "/data-entry/selling-rates/edit/:id",
    element: SellingRatesForm,
    private: true,
    requiredFile: "sellingRates"
  }
];
