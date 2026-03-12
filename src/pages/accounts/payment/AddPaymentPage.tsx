
import React, { useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useInvoicePayment } from "./hooks/useInvoicePayment";
import { motion } from "framer-motion";
import PaymentPageHeader from "./components/PaymentPageHeader";
import PaymentPageContent from "./components/PaymentPageContent";
import PaymentActionButtons from "./components/PaymentActionButtons";
import ReceiptHandler, { ReceiptHandlerRef } from "./components/ReceiptHandler";
import { toast } from "sonner";
import DigitalCalculator from "@/components/calculator/DigitalCalculator";

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
    // First save the payment and only generate receipt if save was successful
    const saveSuccessful = handleSave();
    
    if (saveSuccessful) {
      // Then generate receipt
      const receiptGenerated = handleGenerateReceipt();
      
      if (!receiptGenerated) {
        toast.error("Failed to generate receipt");
      }
    } else {
      toast.error("Payment must be saved successfully before generating receipt");
    }
  };

  // Note: sessionStorage reading is handled by useInvoicePayment hook

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
              amountPaid={formState.amountPaid || 0}
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
      
      {/* Add Digital Calculator */}
      <DigitalCalculator />
    </Layout>
  );
};

export default AddPaymentPage;
