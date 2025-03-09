
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data-entry" element={<DataEntry />} />
          <Route path="/data-entry/invoicing" element={<InvoiceList />} />
          <Route path="/data-entry/invoicing/new" element={<InvoiceForm />} />
          <Route path="/data-entry/invoicing/edit/:id" element={<InvoiceForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
