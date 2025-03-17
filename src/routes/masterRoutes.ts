
import InvoiceBookForm from "@/pages/master/InvoiceBookForm";
import InvoiceBookStock from "@/pages/master/InvoiceBookStock";
import PackageOptionForm from "@/pages/master/PackageOptionForm";
import PackageOptionsList from "@/pages/master/PackageOptionsList";
import PackageOptionsImport from "@/pages/master/PackageOptionsImport";
import SalesRepForm from "@/pages/master/SalesRepForm";
import SalesRepList from "@/pages/master/SalesRepList";
import TownForm from "@/pages/master/TownForm";
import TownList from "@/pages/master/TownList";
import { RouteConfig } from "./types";

export const masterRoutes: RouteConfig[] = [
  {
    path: "/master/book/new",
    element: InvoiceBookForm,
    private: true
  },
  {
    path: "/master/book/edit",
    element: InvoiceBookForm,
    private: true
  },
  {
    path: "/master/book/stock",
    element: InvoiceBookStock,
    private: true
  },
  {
    path: "/master/town",
    element: TownList,
    private: true
  },
  {
    path: "/master/town/new",
    element: TownForm,
    private: true
  },
  {
    path: "/master/town/edit",
    element: TownForm,
    private: true
  },
  {
    path: "/master/package/import",
    element: PackageOptionsImport,
    private: true
  },
  {
    path: "/master/package/new",
    element: PackageOptionForm,
    private: true
  },
  {
    path: "/master/package/edit",
    element: PackageOptionForm,
    private: true
  },
  {
    path: "/master/package/list",
    element: PackageOptionsList,
    private: true
  },
  {
    path: "/master/salesrep/new",
    element: SalesRepForm,
    private: true
  },
  {
    path: "/master/salesrep/list",
    element: SalesRepList,
    private: true
  }
];
