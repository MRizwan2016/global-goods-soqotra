import React from 'react';
import CountryInvoiceDashboard from '@/components/shared/CountryInvoiceDashboard';

const TunisiaInvoiceDashboard = () => {
  return (
    <CountryInvoiceDashboard
      countryName="Tunisia"
      countrySlug="tunisia"
      storageKey="tunisiaShippingInvoices"
      layoutTitle="Tunisia Invoices"
    />
  );
};

export default TunisiaInvoiceDashboard;
