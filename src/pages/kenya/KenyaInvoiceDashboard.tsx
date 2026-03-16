import React from 'react';
import CountryInvoiceDashboard from '@/components/shared/CountryInvoiceDashboard';

const KenyaInvoiceDashboard = () => {
  return (
    <CountryInvoiceDashboard
      countryName="Kenya"
      countrySlug="kenya"
      storageKey="kenyaInvoices"
      layoutTitle="Kenya Invoices"
    />
  );
};

export default KenyaInvoiceDashboard;
