
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import InvoiceSearch from "./payment/components/InvoiceSearch";
import CountryCurrencySelector from "./payment/components/CountryCurrencySelector";
import SelectedInvoiceDetails from "./payment/components/SelectedInvoiceDetails";
import InvoiceFormFields from "./payment/components/InvoiceFormFields";
import PaymentInformation from "./payment/components/payment-information";
import ActionButtons from "./payment/components/ActionButtons";
import { useInvoicePayment } from "./payment/hooks/useInvoicePayment";

const AddInvoicePayment = () => {
  const navigate = useNavigate();
  const {
    formState,
    invoicePrefix,
    setInvoicePrefix,
    matchingInvoices,
    showInvoiceSelector,
    setShowInvoiceSelector,
    selectedInvoice,
    date,
    filteredCurrencies,
    currencySymbol,
    countryOptions,
    handleInputChange,
    handleSelectChange,
    handleDateSelect,
    handleInvoiceSearch,
    handleSelectInvoice,
    handleSave,
    handleCountryChange,
    handlePaymentAmountChange
  } = useInvoicePayment();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Check if there is an invoice in session storage (from direct payment link)
  React.useEffect(() => {
    const storedInvoice = sessionStorage.getItem('selectedInvoice');
    if (storedInvoice) {
      try {
        const parsedInvoice = JSON.parse(storedInvoice);
        handleSelectInvoice(parsedInvoice);
        // Clear session storage after using it
        sessionStorage.removeItem('selectedInvoice');
      } catch (error) {
        console.error("Error parsing stored invoice:", error);
      }
    }
  }, []);

  return (
    <PrivateRoute requiredFile="paymentMethods">
      <Layout title="Add Invoice Payment">
        <div className="container mx-auto p-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center mb-6"
          >
            <Button 
              variant="outline" 
              onClick={() => navigate("/accounts/payments")}
              className="mr-4 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payments
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-700 to-purple-500 bg-clip-text text-transparent">
                Record Invoice Payment
              </h1>
              <p className="text-muted-foreground">
                Record a new payment against an invoice with currency selection
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Card className="mb-8 shadow-lg border-t-4 border-t-indigo-500 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-white border-b border-indigo-100">
                <CardTitle className="text-xl text-indigo-800 flex items-center gap-2">
                  <Search className="h-5 w-5 text-indigo-500" />
                  Search Invoice
                </CardTitle>
                <CardDescription>
                  Enter the first few characters of an invoice number to search
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <InvoiceSearch 
                  invoicePrefix={invoicePrefix}
                  setInvoicePrefix={setInvoicePrefix}
                  matchingInvoices={matchingInvoices}
                  showInvoiceSelector={showInvoiceSelector}
                  setShowInvoiceSelector={setShowInvoiceSelector}
                  handleSelectInvoice={handleSelectInvoice}
                  handleInvoiceSearch={handleInvoiceSearch}
                />

                <CountryCurrencySelector 
                  formState={formState}
                  handleSelectChange={handleSelectChange}
                  handleCountryChange={handleCountryChange}
                  countryOptions={countryOptions}
                  filteredCurrencies={filteredCurrencies}
                />

                {selectedInvoice && (
                  <SelectedInvoiceDetails 
                    selectedInvoice={selectedInvoice} 
                    formState={formState}
                  />
                )}

                <InvoiceFormFields 
                  formState={formState}
                  handleInputChange={handleInputChange}
                />
                
                <PaymentInformation 
                  formState={formState}
                  currencySymbol={currencySymbol}
                  date={date}
                  handleInputChange={handleInputChange}
                  handleDateSelect={handleDateSelect}
                  handleSelectChange={handleSelectChange}
                  handlePaymentAmountChange={handlePaymentAmountChange}
                />
              </CardContent>
            </Card>
          </motion.div>

          <ActionButtons 
            formState={formState}
            selectedInvoice={selectedInvoice}
            handleSave={handleSave}
          />
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default AddInvoicePayment;
