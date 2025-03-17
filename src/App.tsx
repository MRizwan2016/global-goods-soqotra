
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
import PaymentMethodsPage from "./pages/accounts/PaymentMethodsPage";
import AddInvoicePayment from "./pages/accounts/AddInvoicePayment";
import ReconciliationPage from "./pages/accounts/ReconciliationPage";
import FinancialReportsPage from "./pages/reports/FinancialReportsPage";
import CargoReportsPage from "./pages/reports/CargoReportsPage";
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
          <Route path="/data-entry" element={
            <PrivateRoute requiredFile="invoicing">
              <DataEntry />
            </PrivateRoute>
          } />
          <Route path="/data-entry/invoicing" element={
            <PrivateRoute requiredFile="invoicing">
              <InvoiceList />
            </PrivateRoute>
          } />
          <Route path="/data-entry/invoicing/new" element={
            <PrivateRoute requiredFile="invoicing">
              <InvoiceForm />
            </PrivateRoute>
          } />
          <Route path="/data-entry/invoicing/edit/:id" element={
            <PrivateRoute requiredFile="invoicing">
              <InvoiceForm />
            </PrivateRoute>
          } />
          <Route path="/data-entry/invoicing/print/:id" element={
            <PrivateRoute requiredFile="invoicing">
              <InvoicePrint />
            </PrivateRoute>
          } />
          <Route path="/data-entry/booking-form-stock" element={
            <PrivateRoute requiredFile="invoiceBook">
              <BookingFormStock />
            </PrivateRoute>
          } />
          <Route path="/data-entry/booking-form-stock/activate" element={
            <PrivateRoute requiredFile="invoiceBook">
              <BookingFormActivate />
            </PrivateRoute>
          } />
          <Route path="/data-entry/booking-form-stock/issue" element={
            <PrivateRoute requiredFile="invoiceBook">
              <BookingFormIssue />
            </PrivateRoute>
          } />
          <Route path="/data-entry/selling-rates" element={
            <PrivateRoute requiredFile="sellingRates">
              <SellingRatesList />
            </PrivateRoute>
          } />
          <Route path="/data-entry/selling-rates/new" element={
            <PrivateRoute requiredFile="sellingRates">
              <SellingRatesForm />
            </PrivateRoute>
          } />
          <Route path="/data-entry/selling-rates/edit/:id" element={
            <PrivateRoute requiredFile="sellingRates">
              <SellingRatesForm />
            </PrivateRoute>
          } />
          <Route path="/data-entry/bill-of-lading" element={
            <PrivateRoute>
              <BillOfLadingList />
            </PrivateRoute>
          } />
          <Route path="/data-entry/bill-of-lading/new" element={
            <PrivateRoute>
              <BillOfLadingForm />
            </PrivateRoute>
          } />
          <Route path="/data-entry/bill-of-lading/edit/:id" element={
            <PrivateRoute>
              <BillOfLadingForm />
            </PrivateRoute>
          } />
          <Route path="/data-entry/print-documents" element={
            <PrivateRoute>
              <PrintDocuments />
            </PrivateRoute>
          } />
          
          {/* Accounts Routes */}
          <Route path="/accounts/payment-methods" element={
            <PrivateRoute requiredFile="paymentMethods">
              <PaymentMethodsPage />
            </PrivateRoute>
          } />
          <Route path="/accounts/payment-methods/add" element={
            <PrivateRoute requiredFile="paymentMethods">
              <AddInvoicePayment />
            </PrivateRoute>
          } />
          <Route path="/accounts/payments" element={
            <PrivateRoute requiredFile="paymentMethods">
              <PaymentMethodsPage />
            </PrivateRoute>
          } />
          <Route path="/accounts/payments/add" element={
            <PrivateRoute requiredFile="paymentMethods">
              <AddInvoicePayment />
            </PrivateRoute>
          } />
          <Route path="/accounts/reconciliation" element={
            <PrivateRoute requiredFile="reconciliation">
              <ReconciliationPage />
            </PrivateRoute>
          } />
          
          {/* Reports Routes */}
          <Route path="/reports/financial" element={
            <PrivateRoute requiredFile="financialReports">
              <FinancialReportsPage />
            </PrivateRoute>
          } />
          <Route path="/reports/cargo" element={
            <PrivateRoute requiredFile="cargoReports">
              <CargoReportsPage />
            </PrivateRoute>
          } />
          
          {/* Master Data Routes */}
          <Route path="/master/invoice-book" element={
            <PrivateRoute requiredFile="invoiceBook">
              <InvoiceBookStock />
            </PrivateRoute>
          } />
          <Route path="/master/invoice-book/add" element={
            <PrivateRoute requiredFile="invoiceBook">
              <InvoiceBookForm />
            </PrivateRoute>
          } />
          <Route path="/master/sales-rep" element={
            <PrivateRoute requiredFile="salesRep">
              <SalesRepList />
            </PrivateRoute>
          } />
          <Route path="/master/sales-rep/add" element={
            <PrivateRoute requiredFile="salesRep">
              <SalesRepForm />
            </PrivateRoute>
          } />
          <Route path="/master/sales-rep/edit/:id" element={
            <PrivateRoute requiredFile="salesRep">
              <SalesRepForm />
            </PrivateRoute>
          } />
          <Route path="/master/town" element={
            <PrivateRoute requiredFile="town">
              <TownList />
            </PrivateRoute>
          } />
          <Route path="/master/town/add" element={
            <PrivateRoute requiredFile="town">
              <TownForm />
            </PrivateRoute>
          } />
          <Route path="/master/town/edit/:id" element={
            <PrivateRoute requiredFile="town">
              <TownForm />
            </PrivateRoute>
          } />
          <Route path="/master/package-options" element={
            <PrivateRoute requiredFile="packageOptions">
              <PackageOptionsList />
            </PrivateRoute>
          } />
          <Route path="/master/package-options/add" element={
            <PrivateRoute requiredFile="packageOptions">
              <PackageOptionForm />
            </PrivateRoute>
          } />
          <Route path="/master/package-options/edit/:id" element={
            <PrivateRoute requiredFile="packageOptions">
              <PackageOptionForm />
            </PrivateRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/control-panel" element={
            <PrivateRoute requireAdmin>
              <ControlPanel />
            </PrivateRoute>
          } />
          <Route path="/admin/register" element={
            <PrivateRoute requireAdmin>
              <UserRegistration />
            </PrivateRoute>
          } />
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
