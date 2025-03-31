
import React from "react";
import InvoiceSearch from "./InvoiceSearch";
import SelectedInvoiceDetails from "./SelectedInvoiceDetails";
import CountryCurrencySelector from "./CountryCurrencySelector";
import PaymentInformation from "./payment-information";
import InvoiceFormFields from "./InvoiceFormFields";
import { Invoice, FormState } from "../types";

interface PaymentPageContentProps {
  selectedInvoice: Invoice | null;
  formState: FormState;
  invoicePrefix: string;
  setInvoicePrefix: React.Dispatch<React.SetStateAction<string>>;
  handleInvoiceSearch: () => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>;
  matchingInvoices: Invoice[];
  handleSelectInvoice: (invoice: Invoice) => void;
  countryOptions: string[];
  filteredCurrencies: string[];
  handleCountryChange: (country: string) => void;
  handleSelectChange: (name: string, value: string) => void;
  currencySymbol: string;
  date: Date;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateSelect: (date: Date) => void;
  handlePaymentAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentPageContent: React.FC<PaymentPageContentProps> = ({
  selectedInvoice,
  formState,
  invoicePrefix,
  setInvoicePrefix,
  handleInvoiceSearch,
  showInvoiceSelector,
  setShowInvoiceSelector,
  matchingInvoices,
  handleSelectInvoice,
  countryOptions,
  filteredCurrencies,
  handleCountryChange,
  handleSelectChange,
  currencySymbol,
  date,
  handleInputChange,
  handleDateSelect,
  handlePaymentAmountChange
}) => {
  return (
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
    </div>
  );
};

export default PaymentPageContent;
