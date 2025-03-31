
import React, { useState } from "react";
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
import ReceiptView from "@/components/payment/ReceiptView";
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
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState({
    receiptNumber: "",
    invoiceNumber: "",
    date: "",
    customer: "",
    amount: 0,
    paymentMethod: "cash",
    currency: "QAR",
    remarks: ""
  });

  // Function to generate receipt
  const handleGenerateReceipt = () => {
    if (!formState.invoiceNumber || formState.amountPaid <= 0) {
      return;
    }

    // Generate a receipt number
    const receiptNumber = `R-${Date.now().toString().substring(6)}`;
    
    // Set receipt data
    setReceiptData({
      receiptNumber: receiptNumber,
      invoiceNumber: formState.invoiceNumber,
      date: formState.paymentCollectDate,
      customer: formState.customerName || (selectedInvoice?.consignee1 || selectedInvoice?.consignee || ""),
      amount: formState.amountPaid,
      paymentMethod: formState.receivableAccount,
      currency: formState.currency,
      remarks: formState.remarks
    });
    
    // Show receipt modal
    setShowReceipt(true);
  };

  // Handle save with receipt generation
  const handleSaveWithReceipt = () => {
    // First save the payment
    handleSave();
    
    // Then generate receipt
    handleGenerateReceipt();
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
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate('/accounts/payments')}
                  className="w-full md:w-1/4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-full md:w-1/4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={!selectedInvoice || formState.amountPaid <= 0}
                >
                  Save Payment
                </button>
                <button
                  onClick={handleSaveWithReceipt}
                  className="w-full md:w-2/4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                  disabled={!selectedInvoice || formState.amountPaid <= 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 17.5v-11" />
                  </svg>
                  Save & Generate Receipt
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Receipt View */}
      <ReceiptView 
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        receiptData={receiptData}
      />
    </Layout>
  );
};

export default AddPaymentPage;
