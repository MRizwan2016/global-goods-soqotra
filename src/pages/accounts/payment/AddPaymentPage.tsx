
import React, { useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useInvoicePayment } from "./hooks/useInvoicePayment";
import { motion } from "framer-motion";
import PaymentPageHeader from "./components/PaymentPageHeader";
import PaymentPageContent from "./components/PaymentPageContent";
import PaymentActionButtons from "./components/PaymentActionButtons";
import ReceiptHandler, { ReceiptHandlerRef } from "./components/ReceiptHandler";

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

  // Reference to receipt handler component with the correct type
  const receiptHandlerRef = useRef<ReceiptHandlerRef>(null);
  
  // Function to generate receipt
  const handleGenerateReceipt = () => {
    if (receiptHandlerRef.current) {
      return receiptHandlerRef.current.generateReceipt();
    }
    return false;
  };

  // Handle save with receipt generation
  const handleSaveWithReceipt = () => {
    // First save the payment
    handleSave();
    
    // Then generate receipt
    handleGenerateReceipt();
  };

  // Check for invoice in session storage (from direct payment link)
  useEffect(() => {
    const storedInvoice = sessionStorage.getItem('selectedInvoice');
    if (storedInvoice) {
      try {
        const parsedInvoice = JSON.parse(storedInvoice);
        console.log("Found invoice in session storage:", parsedInvoice);
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
            <PaymentPageHeader />
          </CardHeader>

          <CardContent className="pt-6">
            <PaymentPageContent
              selectedInvoice={selectedInvoice}
              formState={formState}
              invoicePrefix={invoicePrefix}
              setInvoicePrefix={setInvoicePrefix}
              handleInvoiceSearch={handleInvoiceSearch}
              showInvoiceSelector={showInvoiceSelector}
              setShowInvoiceSelector={setShowInvoiceSelector}
              matchingInvoices={matchingInvoices}
              handleSelectInvoice={handleSelectInvoice}
              countryOptions={countryOptions}
              filteredCurrencies={filteredCurrencies}
              handleCountryChange={handleCountryChange}
              handleSelectChange={handleSelectChange}
              currencySymbol={currencySymbol}
              date={date}
              handleInputChange={handleInputChange}
              handleDateSelect={handleDateSelect}
              handlePaymentAmountChange={handlePaymentAmountChange}
            />
            
            <PaymentActionButtons
              selectedInvoice={selectedInvoice}
              amountPaid={formState.amountPaid}
              onSave={handleSave}
              onSaveWithReceipt={handleSaveWithReceipt}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Receipt Handler Component with properly typed ref */}
      <ReceiptHandler
        ref={receiptHandlerRef}
        formState={formState}
        customerName={selectedInvoice?.consignee1 || selectedInvoice?.consignee || ""}
      />
    </Layout>
  );
};

export default AddPaymentPage;
