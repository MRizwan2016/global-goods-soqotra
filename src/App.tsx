
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DataEntry from "./pages/DataEntry";
import NotFound from "./pages/NotFound";
import InvoiceList from "./pages/invoicing/InvoiceList";
import InvoiceForm from "./pages/invoicing/InvoiceForm";
import InvoicePrint from "./pages/invoicing/InvoicePrint";
import BookingFormStock from "./pages/invoicing/BookingFormStock";
import BookingFormActivate from "./pages/invoicing/BookingFormActivate";
import BookingFormIssue from "./pages/invoicing/BookingFormIssue";
import InvoiceBookStock from "./pages/master/InvoiceBookStock";
import InvoiceBookForm from "./pages/master/InvoiceBookForm";
import SalesRepList from "./pages/master/SalesRepList";
import SalesRepForm from "./pages/master/SalesRepForm";
import TownList from "./pages/master/TownList";
import TownForm from "./pages/master/TownForm";
import PackageOptionsList from "./pages/master/PackageOptionsList";
import PackageOptionForm from "./pages/master/PackageOptionForm";
import SellingRatesList from "./pages/selling-rates/SellingRatesList";
import SellingRatesForm from "./pages/selling-rates/SellingRatesForm";
import BillOfLadingList from "./pages/bill-of-lading/BillOfLadingList";
import BillOfLadingForm from "./pages/bill-of-lading/BillOfLadingForm";
import PrintDocuments from "./pages/print-documents/PrintDocuments";
import ControlPanel from "./pages/admin/ControlPanel";
import UserRegistration from "./pages/admin/UserRegistration";
import Login from "./pages/admin/Login";
import PrivateRoute from "./components/auth/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Data Entry Routes */}
          <Route path="/data-entry" element={<DataEntry />} />
          <Route path="/data-entry/invoicing" element={<InvoiceList />} />
          <Route path="/data-entry/invoicing/new" element={<InvoiceForm />} />
          <Route path="/data-entry/invoicing/edit/:id" element={<InvoiceForm />} />
          <Route path="/data-entry/invoicing/print/:id" element={<InvoicePrint />} />
          <Route path="/data-entry/booking-form-stock" element={<BookingFormStock />} />
          <Route path="/data-entry/booking-form-stock/activate" element={<BookingFormActivate />} />
          <Route path="/data-entry/booking-form-stock/issue" element={<BookingFormIssue />} />
          <Route path="/data-entry/selling-rates" element={<SellingRatesList />} />
          <Route path="/data-entry/selling-rates/new" element={<SellingRatesForm />} />
          <Route path="/data-entry/selling-rates/edit/:id" element={<SellingRatesForm />} />
          <Route path="/data-entry/bill-of-lading" element={<BillOfLadingList />} />
          <Route path="/data-entry/bill-of-lading/new" element={<BillOfLadingForm />} />
          <Route path="/data-entry/bill-of-lading/edit/:id" element={<BillOfLadingForm />} />
          <Route path="/data-entry/print-documents" element={<PrintDocuments />} />
          
          {/* Master Data Routes */}
          <Route path="/master/invoice-book" element={<InvoiceBookStock />} />
          <Route path="/master/invoice-book/add" element={<InvoiceBookForm />} />
          <Route path="/master/sales-rep" element={<SalesRepList />} />
          <Route path="/master/sales-rep/add" element={<SalesRepForm />} />
          <Route path="/master/sales-rep/edit/:id" element={<SalesRepForm />} />
          <Route path="/master/town" element={<TownList />} />
          <Route path="/master/town/add" element={<TownForm />} />
          <Route path="/master/town/edit/:id" element={<TownForm />} />
          <Route path="/master/package-options" element={<PackageOptionsList />} />
          <Route path="/master/package-options/add" element={<PackageOptionForm />} />
          <Route path="/master/package-options/edit/:id" element={<PackageOptionForm />} />
          
          {/* Admin Routes */}
          <Route path="/admin/control-panel" element={<ControlPanel />} />
          <Route path="/admin/register" element={<UserRegistration />} />
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
