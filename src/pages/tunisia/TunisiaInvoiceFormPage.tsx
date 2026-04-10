import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import TunisiaInvoiceForm from './components/TunisiaInvoiceForm';
import { TunisiaStorageService } from './services/TunisiaStorageService';
import { TunisiaInvoice } from './types/tunisiaInvoiceTypes';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const TunisiaInvoiceFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [existingInvoice, setExistingInvoice] = useState<TunisiaInvoice | undefined>();
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const loadInvoice = async () => {
        try {
          const invoices = await TunisiaStorageService.loadInvoices();
          const found = invoices.find(inv => inv.id === id);
          if (found) {
            setExistingInvoice(found);
          } else {
            toast.error('Invoice not found');
            navigate('/tunisia/invoices');
          }
        } catch (err) {
          console.error('Error loading invoice:', err);
          toast.error('Error loading invoice');
        } finally {
          setLoading(false);
        }
      };
      loadInvoice();
    }
  }, [id, navigate]);

  const handleSave = async (invoice: TunisiaInvoice) => {
    try {
      if (id) {
        await TunisiaStorageService.updateInvoice(invoice);
      } else {
        await TunisiaStorageService.addInvoice(invoice);
      }
      toast.success(id ? 'Invoice updated successfully' : 'Invoice created successfully');
      navigate('/tunisia/invoices');
    } catch (err) {
      console.error('Error saving invoice:', err);
      toast.error('Error saving invoice');
    }
  };

  if (loading) {
    return (
      <Layout title="Tunisia Invoice">
        <div className="flex items-center justify-center h-64">
          <p>Loading invoice...</p>
        </div>
      </Layout>
    );
  }

  return (
    <TunisiaInvoiceForm
      onBack={() => navigate('/tunisia/invoices')}
      onInvoiceSave={handleSave}
      existingInvoice={existingInvoice}
    />
  );
};

export default TunisiaInvoiceFormPage;
