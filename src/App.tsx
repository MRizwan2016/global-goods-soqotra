
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PrivateRoute from "./components/auth/PrivateRoute";

// Auth Pages
import Login from "./pages/admin/Login";

// Main Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DataEntry from "./pages/DataEntry";
import NotFound from "./pages/NotFound";

// Admin Pages
import ControlPanel from "./pages/admin/ControlPanel";
import UserRegistration from "./pages/admin/UserRegistration";

// Invoice Pages
import InvoiceList from "./pages/invoicing/InvoiceList";
import InvoiceForm from "./pages/invoicing/InvoiceForm";
import InvoicePrint from "./pages/invoicing/InvoicePrint";
import BookingFormActivate from "./pages/invoicing/BookingFormActivate";
import BookingFormIssue from "./pages/invoicing/BookingFormIssue";
import BookingFormStock from "./pages/invoicing/BookingFormStock";

// Kenya Delivery Tracking Pages
import KenyaDashboard from "./pages/kenya/KenyaDashboard";
import KenyaDeliveryTracking from "./pages/kenya/KenyaDeliveryTracking";
import DeliveryDetails from "./pages/kenya/DeliveryDetails";
import NewDeliveryForm from "./pages/kenya/NewDeliveryForm";

// Bill of Lading Pages
import BillOfLadingList from "./pages/bill-of-lading/BillOfLadingList";
import BillOfLadingForm from "./pages/bill-of-lading/BillOfLadingForm";

// Reports Pages
import CargoReportsPage from "./pages/reports/CargoReportsPage";
import FinancialReportsPage from "./pages/reports/FinancialReportsPage";

// Accounts Pages
import AddInvoicePayment from "./pages/accounts/AddInvoicePayment";
import PaymentMethodsPage from "./pages/accounts/PaymentMethodsPage";
import ReconciliationPage from "./pages/accounts/ReconciliationPage";

// Master Pages
import SalesRepList from "./pages/master/SalesRepList";
import SalesRepForm from "./pages/master/SalesRepForm";
import TownList from "./pages/master/TownList";
import TownForm from "./pages/master/TownForm";
import PackageOptionsList from "./pages/master/PackageOptionsList";
import PackageOptionForm from "./pages/master/PackageOptionForm";
import PackageOptionsImport from "./pages/master/PackageOptionsImport";
import InvoiceBookStock from "./pages/master/InvoiceBookStock";
import InvoiceBookForm from "./pages/master/InvoiceBookForm";

// Selling Rates Pages
import SellingRatesList from "./pages/selling-rates/SellingRatesList";
import SellingRatesForm from "./pages/selling-rates/SellingRatesForm";

// Print Documents Page
import PrintDocuments from "./pages/print-documents/PrintDocuments";

// Import CSS
import "./App.css";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public route for login */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Index />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry"
          element={
            <PrivateRoute>
              <DataEntry />
            </PrivateRoute>
          }
        />
        
        {/* Admin Routes */}
        <Route
          path="/admin/control-panel"
          element={
            <PrivateRoute>
              <ControlPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/user-registration"
          element={
            <PrivateRoute>
              <UserRegistration />
            </PrivateRoute>
          }
        />
        
        {/* Invoice Routes */}
        <Route
          path="/data-entry/invoicing"
          element={
            <PrivateRoute>
              <InvoiceList />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry/invoicing/new"
          element={
            <PrivateRoute>
              <InvoiceForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry/invoicing/edit/:id"
          element={
            <PrivateRoute>
              <InvoiceForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry/invoicing/print/:id"
          element={
            <PrivateRoute>
              <InvoicePrint />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry/invoicing/book/activate"
          element={
            <PrivateRoute>
              <BookingFormActivate />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry/invoicing/book/issue"
          element={
            <PrivateRoute>
              <BookingFormIssue />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry/invoicing/book/stock"
          element={
            <PrivateRoute>
              <BookingFormStock />
            </PrivateRoute>
          }
        />
        
        {/* Kenya Delivery Tracking Routes */}
        <Route
          path="/kenya"
          element={
            <PrivateRoute>
              <KenyaDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/kenya/deliveries"
          element={
            <PrivateRoute>
              <KenyaDeliveryTracking />
            </PrivateRoute>
          }
        />
        <Route
          path="/kenya/delivery/:id"
          element={
            <PrivateRoute>
              <DeliveryDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/kenya/delivery/new"
          element={
            <PrivateRoute>
              <NewDeliveryForm />
            </PrivateRoute>
          }
        />
        
        {/* Bill of Lading Routes */}
        <Route
          path="/data-entry/bill-of-lading"
          element={
            <PrivateRoute>
              <BillOfLadingList />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry/bill-of-lading/new"
          element={
            <PrivateRoute>
              <BillOfLadingForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry/bill-of-lading/edit/:id"
          element={
            <PrivateRoute>
              <BillOfLadingForm />
            </PrivateRoute>
          }
        />
        
        {/* Reports Routes */}
        <Route
          path="/reports/cargo"
          element={
            <PrivateRoute>
              <CargoReportsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/financial"
          element={
            <PrivateRoute>
              <FinancialReportsPage />
            </PrivateRoute>
          }
        />
        
        {/* Accounts Routes */}
        <Route
          path="/accounts/add-payment/:id"
          element={
            <PrivateRoute>
              <AddInvoicePayment />
            </PrivateRoute>
          }
        />
        <Route
          path="/accounts/payment-methods"
          element={
            <PrivateRoute>
              <PaymentMethodsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/accounts/reconciliation"
          element={
            <PrivateRoute>
              <ReconciliationPage />
            </PrivateRoute>
          }
        />
        
        {/* Master Routes */}
        <Route
          path="/master/sales-rep"
          element={
            <PrivateRoute>
              <SalesRepList />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/sales-rep/new"
          element={
            <PrivateRoute>
              <SalesRepForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/sales-rep/edit/:id"
          element={
            <PrivateRoute>
              <SalesRepForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/town"
          element={
            <PrivateRoute>
              <TownList />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/town/new"
          element={
            <PrivateRoute>
              <TownForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/town/edit/:id"
          element={
            <PrivateRoute>
              <TownForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/package-options"
          element={
            <PrivateRoute>
              <PackageOptionsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/package-options/new"
          element={
            <PrivateRoute>
              <PackageOptionForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/package-options/edit/:id"
          element={
            <PrivateRoute>
              <PackageOptionForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/package-options/import"
          element={
            <PrivateRoute>
              <PackageOptionsImport />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/invoice-book/stock"
          element={
            <PrivateRoute>
              <InvoiceBookStock />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/invoice-book/new"
          element={
            <PrivateRoute>
              <InvoiceBookForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/master/invoice-book/edit/:id"
          element={
            <PrivateRoute>
              <InvoiceBookForm />
            </PrivateRoute>
          }
        />
        
        {/* Selling Rates Routes */}
        <Route
          path="/selling-rates"
          element={
            <PrivateRoute>
              <SellingRatesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/selling-rates/new"
          element={
            <PrivateRoute>
              <SellingRatesForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/selling-rates/edit/:id"
          element={
            <PrivateRoute>
              <SellingRatesForm />
            </PrivateRoute>
          }
        />
        
        {/* Print Documents */}
        <Route
          path="/print-documents"
          element={
            <PrivateRoute>
              <PrintDocuments />
            </PrivateRoute>
          }
        />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
