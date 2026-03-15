import React from 'react';
import CountryInvoiceDashboard from '@/components/shared/CountryInvoiceDashboard';

const SaudiArabiaInvoiceDashboard = () => {
  return (
    <CountryInvoiceDashboard
      countryName="Saudi Arabia"
      countrySlug="saudi-arabia"
      storageKey="saudiArabiaInvoices"
      layoutTitle="Saudi Arabia Invoices"
    />
  );
};

export default SaudiArabiaInvoiceDashboard;
