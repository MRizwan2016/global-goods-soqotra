import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, FileText, Printer, Edit, Trash2, Eye, Plane, Ship, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';

interface SriLankaInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  shipperName: string;
  consigneeName: string;
  serviceType: string;
  total: string;
  status?: string;
  bookNumber?: string;
  pageNumber?: string;
  salesRepresentative?: string;
  driverName?: string;
  whatsappNumber?: string;
  shipperMobile?: string;
  consigneeMobile?: string;
  jobNumber?: string;
}

const SriLankaDashboard = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<SriLankaInvoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [showManifestOptions, setShowManifestOptions] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const stored = localStorage.getItem('sriLankaInvoices');
    if (stored) {
      setInvoices(JSON.parse(stored));
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    String(invoice.invoiceNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(invoice.shipperName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(invoice.consigneeName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewInvoice = () => navigate('/sri-lanka/invoice/add');
  const handleEditInvoice = (id: string) => navigate(`/sri-lanka/invoice/edit/${id}`);
  const handlePrintInvoice = (id: string) => navigate(`/sri-lanka/invoice/print/${id}`);

  const handleDeleteInvoice = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      const updatedInvoices = invoices.filter(inv => inv.id !== id);
      localStorage.setItem('sriLankaInvoices', JSON.stringify(updatedInvoices));
      setInvoices(updatedInvoices);
      toast.success('Invoice deleted successfully');
    }
  };

  const handleInvoiceSelection = (invoiceId: string, checked: boolean) => {
    setSelectedInvoices(prev => checked ? [...prev, invoiceId] : prev.filter(id => id !== invoiceId));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedInvoices(checked ? filteredInvoices.map(inv => inv.id) : []);
  };

  const handleShareWhatsApp = (invoice: SriLankaInvoice) => {
    const phoneNumber = invoice.whatsappNumber || invoice.consigneeMobile || invoice.shipperMobile || '';
    if (!phoneNumber) {
      toast.error('No WhatsApp number available. Please add a WhatsApp number in the invoice.');
      return;
    }
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
    const message = encodeURIComponent(
      `📦 E-Invoice: ${invoice.invoiceNumber}\n` +
      `📅 Date: ${invoice.date}\n` +
      `👤 Shipper: ${invoice.shipperName}\n` +
      `📍 Consignee: ${invoice.consigneeName}\n` +
      `💰 Total: QAR ${parseFloat((invoice as any).pricing?.net || invoice.total || '0').toFixed(2)}\n` +
      `📋 Book: ${invoice.bookNumber || 'N/A'} | Page: ${invoice.pageNumber || 'N/A'}\n` +
      `🚚 Driver: ${invoice.driverName || 'N/A'}\n` +
      `📞 Sales Rep: ${invoice.salesRepresentative || 'N/A'}`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const handleCreateManifest = (type: 'air' | 'sea') => {
    if (selectedInvoices.length === 0) {
      toast.error('Please select invoices to include in the manifest');
      return;
    }
    const selectedInvoiceData = invoices.filter(inv => selectedInvoices.includes(inv.id));
    const manifests = JSON.parse(localStorage.getItem('sriLankaManifests') || '[]');
    const manifestId = `MAN-${Date.now()}`;
    manifests.push({ id: manifestId, invoices: selectedInvoiceData, type, createdAt: new Date().toISOString() });
    localStorage.setItem('sriLankaManifests', JSON.stringify(manifests));
    navigate(type === 'air' ? `/sri-lanka/manifest/air/${manifestId}` : `/sri-lanka/manifest/sea/${manifestId}`);
    toast.success(`${type === 'air' ? 'Air' : 'Sea'} manifest created successfully`);
  };

  const selectedServiceTypes = selectedInvoices.length > 0 
    ? [...new Set(invoices.filter(inv => selectedInvoices.includes(inv.id)).map(inv => inv.serviceType))]
    : [];

  return (
    <Layout title="Sri Lanka Invoices">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sri Lanka Invoices</h1>
            <p className="text-muted-foreground mt-1">Manage your Sri Lanka shipping invoices</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedInvoices.length > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowManifestOptions(!showManifestOptions)} className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Create Manifest ({selectedInvoices.length})
                </Button>
                {showManifestOptions && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleCreateManifest('air')} disabled={!selectedServiceTypes.includes('AIR FREIGHT')} className="flex items-center gap-2">
                      <Plane className="h-4 w-4" /> Air Manifest
                    </Button>
                    <Button variant="outline" onClick={() => handleCreateManifest('sea')} disabled={!selectedServiceTypes.includes('SEA FREIGHT')} className="flex items-center gap-2">
                      <Ship className="h-4 w-4" /> Sea Manifest
                    </Button>
                  </div>
                )}
              </div>
            )}
            <Button onClick={handleNewInvoice} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Invoice
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by invoice number, shipper, or consignee..."
            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{invoices.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Air Freight</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{invoices.filter(inv => inv.serviceType === 'AIR FREIGHT').length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sea Freight</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{invoices.filter(inv => inv.serviceType === 'SEA FREIGHT').length}</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Saved Invoices</CardTitle></CardHeader>
          <CardContent>
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No invoices found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'No invoices match your search criteria.' : 'Get started by creating your first invoice.'}
                </p>
                {!searchTerm && <Button onClick={handleNewInvoice}>Create Invoice</Button>}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">
                        <Checkbox checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0} onCheckedChange={handleSelectAll} />
                      </th>
                      <th className="text-left py-3 px-2 font-medium">Invoice #</th>
                      <th className="text-left py-3 px-2 font-medium">Job #</th>
                      <th className="text-left py-3 px-2 font-medium">Date</th>
                      <th className="text-left py-3 px-2 font-medium">Book #</th>
                      <th className="text-left py-3 px-2 font-medium">Page #</th>
                      <th className="text-left py-3 px-2 font-medium">Sales Rep</th>
                      <th className="text-left py-3 px-2 font-medium">Driver</th>
                      <th className="text-left py-3 px-2 font-medium">Shipper</th>
                      <th className="text-left py-3 px-2 font-medium">Consignee</th>
                      <th className="text-left py-3 px-2 font-medium">Service</th>
                      <th className="text-left py-3 px-2 font-medium">Total</th>
                      <th className="text-center py-3 px-2 font-medium">WhatsApp</th>
                      <th className="text-center py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <Checkbox checked={selectedInvoices.includes(invoice.id)} onCheckedChange={(checked) => handleInvoiceSelection(invoice.id, checked as boolean)} />
                        </td>
                        <td className="py-3 px-2 font-medium text-primary">{invoice.invoiceNumber}</td>
                        <td className="py-3 px-2 text-xs">{invoice.jobNumber || '-'}</td>
                        <td className="py-3 px-2">{invoice.date}</td>
                        <td className="py-3 px-2 font-semibold">{invoice.bookNumber || '-'}</td>
                        <td className="py-3 px-2">{invoice.pageNumber || '-'}</td>
                        <td className="py-3 px-2 text-xs">{invoice.salesRepresentative || '-'}</td>
                        <td className="py-3 px-2 text-xs">{invoice.driverName || '-'}</td>
                        <td className="py-3 px-2">{invoice.shipperName || 'N/A'}</td>
                        <td className="py-3 px-2">{invoice.consigneeName || 'N/A'}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.serviceType === 'AIR FREIGHT' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {invoice.serviceType}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-medium">QAR {parseFloat((invoice as any).pricing?.net || invoice.total || '0').toFixed(2)}</td>
                        <td className="py-3 px-2 text-center">
                          <Button variant="outline" size="sm" onClick={() => handleShareWhatsApp(invoice)} title="Share e-Invoice via WhatsApp" className="text-green-600 hover:bg-green-50">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleEditInvoice(invoice.id)} title="Edit">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handlePrintInvoice(invoice.id)} title="Preview/BL/Print PDF">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteInvoice(invoice.id)} title="Delete" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SriLankaDashboard;
