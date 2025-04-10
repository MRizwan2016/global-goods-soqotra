
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
    path: "/data-entry/selling-rates",
    element: SellingRatesList,
    private: true
  },
  {
    path: "/selling-rates/new",
    element: SellingRatesForm,
    private: true
  },
  {
    path: "/data-entry/selling-rates/new",
    element: SellingRatesForm,
    private: true
  },
  {
    path: "/selling-rates/edit/:id",
    element: SellingRatesForm,
    private: true
  },
  {
    path: "/data-entry/selling-rates/edit/:id",
    element: SellingRatesForm,
    private: true
  }
];
