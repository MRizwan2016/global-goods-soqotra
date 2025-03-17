
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
          element={<PrivateRoute element={<Index />} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/data-entry"
          element={<PrivateRoute element={<DataEntry />} />}
        />
        
        {/* Admin Routes */}
        <Route
          path="/admin/control-panel"
          element={<PrivateRoute element={<ControlPanel />} />}
        />
        <Route
          path="/admin/user-registration"
          element={<PrivateRoute element={<UserRegistration />} />}
        />
        
        {/* Invoice Routes */}
        <Route
          path="/data-entry/invoicing"
          element={<PrivateRoute element={<InvoiceList />} />}
        />
        <Route
          path="/data-entry/invoicing/new"
          element={<PrivateRoute element={<InvoiceForm />} />}
        />
        <Route
          path="/data-entry/invoicing/edit/:id"
          element={<PrivateRoute element={<InvoiceForm />} />}
        />
        <Route
          path="/data-entry/invoicing/print/:id"
          element={<PrivateRoute element={<InvoicePrint />} />}
        />
        <Route
          path="/data-entry/invoicing/book/activate"
          element={<PrivateRoute element={<BookingFormActivate />} />}
        />
        <Route
          path="/data-entry/invoicing/book/issue"
          element={<PrivateRoute element={<BookingFormIssue />} />}
        />
        <Route
          path="/data-entry/invoicing/book/stock"
          element={<PrivateRoute element={<BookingFormStock />} />}
        />
        
        {/* Kenya Delivery Tracking Routes */}
        <Route
          path="/kenya"
          element={<PrivateRoute element={<KenyaDashboard />} />}
        />
        <Route
          path="/kenya/deliveries"
          element={<PrivateRoute element={<KenyaDeliveryTracking />} />}
        />
        <Route
          path="/kenya/delivery/:id"
          element={<PrivateRoute element={<DeliveryDetails />} />}
        />
        <Route
          path="/kenya/delivery/new"
          element={<PrivateRoute element={<NewDeliveryForm />} />}
        />
        
        {/* Bill of Lading Routes */}
        <Route
          path="/data-entry/bill-of-lading"
          element={<PrivateRoute element={<BillOfLadingList />} />}
        />
        <Route
          path="/data-entry/bill-of-lading/new"
          element={<PrivateRoute element={<BillOfLadingForm />} />}
        />
        <Route
          path="/data-entry/bill-of-lading/edit/:id"
          element={<PrivateRoute element={<BillOfLadingForm />} />}
        />
        
        {/* Reports Routes */}
        <Route
          path="/reports/cargo"
          element={<PrivateRoute element={<CargoReportsPage />} />}
        />
        <Route
          path="/reports/financial"
          element={<PrivateRoute element={<FinancialReportsPage />} />}
        />
        
        {/* Accounts Routes */}
        <Route
          path="/accounts/add-payment/:id"
          element={<PrivateRoute element={<AddInvoicePayment />} />}
        />
        <Route
          path="/accounts/payment-methods"
          element={<PrivateRoute element={<PaymentMethodsPage />} />}
        />
        <Route
          path="/accounts/reconciliation"
          element={<PrivateRoute element={<ReconciliationPage />} />}
        />
        
        {/* Master Routes */}
        <Route
          path="/master/sales-rep"
          element={<PrivateRoute element={<SalesRepList />} />}
        />
        <Route
          path="/master/sales-rep/new"
          element={<PrivateRoute element={<SalesRepForm />} />}
        />
        <Route
          path="/master/sales-rep/edit/:id"
          element={<PrivateRoute element={<SalesRepForm />} />}
        />
        <Route
          path="/master/town"
          element={<PrivateRoute element={<TownList />} />}
        />
        <Route
          path="/master/town/new"
          element={<PrivateRoute element={<TownForm />} />}
        />
        <Route
          path="/master/town/edit/:id"
          element={<PrivateRoute element={<TownForm />} />}
        />
        <Route
          path="/master/package-options"
          element={<PrivateRoute element={<PackageOptionsList />} />}
        />
        <Route
          path="/master/package-options/new"
          element={<PrivateRoute element={<PackageOptionForm />} />}
        />
        <Route
          path="/master/package-options/edit/:id"
          element={<PrivateRoute element={<PackageOptionForm />} />}
        />
        <Route
          path="/master/package-options/import"
          element={<PrivateRoute element={<PackageOptionsImport />} />}
        />
        <Route
          path="/master/invoice-book/stock"
          element={<PrivateRoute element={<InvoiceBookStock />} />}
        />
        <Route
          path="/master/invoice-book/new"
          element={<PrivateRoute element={<InvoiceBookForm />} />}
        />
        <Route
          path="/master/invoice-book/edit/:id"
          element={<PrivateRoute element={<InvoiceBookForm />} />}
        />
        
        {/* Selling Rates Routes */}
        <Route
          path="/selling-rates"
          element={<PrivateRoute element={<SellingRatesList />} />}
        />
        <Route
          path="/selling-rates/new"
          element={<PrivateRoute element={<SellingRatesForm />} />}
        />
        <Route
          path="/selling-rates/edit/:id"
          element={<PrivateRoute element={<SellingRatesForm />} />}
        />
        
        {/* Print Documents */}
        <Route
          path="/print-documents"
          element={<PrivateRoute element={<PrintDocuments />} />}
        />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
