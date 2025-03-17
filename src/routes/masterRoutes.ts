
import SalesRepList from "@/pages/master/SalesRepList";
import SalesRepForm from "@/pages/master/SalesRepForm";
import TownList from "@/pages/master/TownList";
import TownForm from "@/pages/master/TownForm";
import PackageOptionsList from "@/pages/master/PackageOptionsList";
import PackageOptionForm from "@/pages/master/PackageOptionForm";
import PackageOptionsImport from "@/pages/master/PackageOptionsImport";
import InvoiceBookStock from "@/pages/master/InvoiceBookStock";
import InvoiceBookForm from "@/pages/master/InvoiceBookForm";
import { RouteConfig } from "./types";

export const masterRoutes: RouteConfig[] = [
  {
    path: "/master/sales-rep",
    element: <SalesRepList />,
    private: true
  },
  {
    path: "/master/sales-rep/new",
    element: <SalesRepForm />,
    private: true
  },
  {
    path: "/master/sales-rep/edit/:id",
    element: <SalesRepForm />,
    private: true
  },
  {
    path: "/master/town",
    element: <TownList />,
    private: true
  },
  {
    path: "/master/town/new",
    element: <TownForm />,
    private: true
  },
  {
    path: "/master/town/edit/:id",
    element: <TownForm />,
    private: true
  },
  {
    path: "/master/package-options",
    element: <PackageOptionsList />,
    private: true
  },
  {
    path: "/master/package-options/new",
    element: <PackageOptionForm />,
    private: true
  },
  {
    path: "/master/package-options/edit/:id",
    element: <PackageOptionForm />,
    private: true
  },
  {
    path: "/master/package-options/import",
    element: <PackageOptionsImport />,
    private: true
  },
  {
    path: "/master/invoice-book/stock",
    element: <InvoiceBookStock />,
    private: true
  },
  {
    path: "/master/invoice-book/new",
    element: <InvoiceBookForm />,
    private: true
  },
  {
    path: "/master/invoice-book/edit/:id",
    element: <InvoiceBookForm />,
    private: true
  }
];
