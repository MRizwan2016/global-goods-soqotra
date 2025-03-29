
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvoicePayment } from "./hooks/useInvoicePayment";
import ActionButtons from "./components/ActionButtons";
import InvoiceSearch from "./components/InvoiceSearch";
import SelectedInvoiceDetails from "./components/SelectedInvoiceDetails";
import InvoiceFormFields from "./components/InvoiceFormFields";
import CountryCurrencySelector from "./components/CountryCurrencySelector";
import PaymentInformation from "./components/payment-information";
import { motion } from "framer-motion";

const AddPaymentPage = () => {
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

  const navigate = useNavigate();

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
    <Layout title="Add Payment">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-6 max-w-5xl"
      >
        <Card className="shadow-lg border-t-4 border-t-blue-600">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
              <span className="inline-block p-2 mr-3 bg-blue-600 text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt">
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 17.5v-11" />
                </svg>
              </span>
              Invoice Payment
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Search for Invoice or Pick one already shown from direct link */}
              {!selectedInvoice && (
                <InvoiceSearch 
                  invoicePrefix={invoicePrefix}
                  setInvoicePrefix={setInvoicePrefix}
                  handleInvoiceSearch={handleInvoiceSearch}
                  showInvoiceSelector={showInvoiceSelector}
                  setShowInvoiceSelector={setShowInvoiceSelector}
                  matchingInvoices={matchingInvoices}
                  handleSelectInvoice={handleSelectInvoice}
                />
              )}

              {/* Display selected invoice details */}
              {selectedInvoice && (
                <>
                  <SelectedInvoiceDetails 
                    selectedInvoice={selectedInvoice}
                    formState={formState}
                  />
                  
                  {/* Country and Currency Selection */}
                  <CountryCurrencySelector 
                    formState={formState}
                    countryOptions={countryOptions}
                    filteredCurrencies={filteredCurrencies}
                    handleCountryChange={handleCountryChange}
                    handleSelectChange={handleSelectChange}
                  />
                  
                  {/* Payment Amount and Date */}
                  <PaymentInformation 
                    formState={formState}
                    currencySymbol={currencySymbol}
                    date={date}
                    handleInputChange={handleInputChange}
                    handleDateSelect={handleDateSelect}
                    handleSelectChange={handleSelectChange}
                    handlePaymentAmountChange={handlePaymentAmountChange}
                  />
                  
                  {/* Invoice Fields */}
                  <InvoiceFormFields 
                    formState={formState}
                    handleInputChange={handleInputChange}
                  />
                </>
              )}
              
              {/* Action Buttons */}
              <ActionButtons 
                formState={formState}
                selectedInvoice={selectedInvoice}
                handleSave={handleSave}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default AddPaymentPage;
