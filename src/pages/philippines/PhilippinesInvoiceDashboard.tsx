import React from 'react';
import CountryInvoiceDashboard from '@/components/shared/CountryInvoiceDashboard';

const PhilippinesInvoiceDashboard = () => {
  return (
    <CountryInvoiceDashboard
      countryName="Philippines"
      countrySlug="philippines"
      storageKey="philippinesInvoices"
      layoutTitle="Philippines Invoices"
    />
  );
};

export default PhilippinesInvoiceDashboard;
