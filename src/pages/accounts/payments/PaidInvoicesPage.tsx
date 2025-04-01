
import React from 'react';
import Layout from '@/components/layout/Layout';

const PaidInvoicesPage: React.FC = () => {
  return (
    <Layout title="Paid Invoices">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Paid Invoices</h1>
        
        <div className="border rounded-md p-8 flex items-center justify-center">
          <p className="text-gray-500">
            Paid invoices will appear here. This page is under development.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PaidInvoicesPage;
