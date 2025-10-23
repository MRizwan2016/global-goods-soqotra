import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, FileText, Printer, Edit, Trash2, Eye, Plane, Ship } from 'lucide-react';
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
      const parsedInvoices = JSON.parse(stored);
      setInvoices(parsedInvoices);
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.shipperName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.consigneeName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewInvoice = () => {
    navigate('/sri-lanka/invoice/add');
  };

  const handleEditInvoice = (id: string) => {
    navigate(`/sri-lanka/invoice/edit/${id}`);
  };

  const handlePrintInvoice = (id: string) => {
    navigate(`/sri-lanka/invoice/print/${id}`);
  };

  const handleDeleteInvoice = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      const updatedInvoices = invoices.filter(inv => inv.id !== id);
      localStorage.setItem('sriLankaInvoices', JSON.stringify(updatedInvoices));
      setInvoices(updatedInvoices);
      toast.success('Invoice deleted successfully');
    }
  };

  const handleInvoiceSelection = (invoiceId: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices(prev => [...prev, invoiceId]);
    } else {
      setSelectedInvoices(prev => prev.filter(id => id !== invoiceId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(filteredInvoices.map(inv => inv.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleCreateManifest = (type: 'air' | 'sea') => {
    if (selectedInvoices.length === 0) {
      toast.error('Please select invoices to include in the manifest');
      return;
    }

    const selectedInvoiceData = invoices.filter(inv => selectedInvoices.includes(inv.id));
    const manifestData = {
      invoices: selectedInvoiceData,
      type,
      createdAt: new Date().toISOString()
    };

    // Save manifest data to localStorage
    const manifests = JSON.parse(localStorage.getItem('sriLankaManifests') || '[]');
    const manifestId = `MAN-${Date.now()}`;
    manifests.push({ id: manifestId, ...manifestData });
    localStorage.setItem('sriLankaManifests', JSON.stringify(manifests));

    // Navigate to manifest page
    if (type === 'air') {
      navigate(`/sri-lanka/manifest/air/${manifestId}`);
    } else {
      navigate(`/sri-lanka/manifest/sea/${manifestId}`);
    }
    
    toast.success(`${type === 'air' ? 'Air' : 'Sea'} manifest created successfully`);
  };

  const selectedServiceTypes = selectedInvoices.length > 0 
    ? [...new Set(invoices.filter(inv => selectedInvoices.includes(inv.id)).map(inv => inv.serviceType))]
    : [];

  const canCreateAirManifest = selectedServiceTypes.includes('AIR FREIGHT');
  const canCreateSeaManifest = selectedServiceTypes.includes('SEA FREIGHT');

  return (
    <Layout title="Sri Lanka Invoices">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sri Lanka Invoices</h1>
            <p className="text-gray-600 mt-1">Manage your Sri Lanka shipping invoices</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedInvoices.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowManifestOptions(!showManifestOptions)}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Create Manifest ({selectedInvoices.length})
                </Button>
                {showManifestOptions && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleCreateManifest('air')}
                      disabled={!canCreateAirManifest}
                      className="flex items-center gap-2"
                    >
                      <Plane className="h-4 w-4" />
                      Air Manifest
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCreateManifest('sea')}
                      disabled={!canCreateSeaManifest}
                      className="flex items-center gap-2"
                    >
                      <Ship className="h-4 w-4" />
                      Sea Manifest
                    </Button>
                  </div>
                )}
              </div>
            )}
            <Button onClick={handleNewInvoice} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by invoice number, shipper, or consignee..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{invoices.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Air Freight</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {invoices.filter(inv => inv.serviceType === 'AIR FREIGHT').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sea Freight</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {invoices.filter(inv => inv.serviceType === 'SEA FREIGHT').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'No invoices match your search criteria.' : 'Get started by creating your first invoice.'}
                </p>
                {!searchTerm && (
                  <Button onClick={handleNewInvoice}>Create Invoice</Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        <Checkbox
                          checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice #</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Shipper</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Consignee</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <Checkbox
                            checked={selectedInvoices.includes(invoice.id)}
                            onCheckedChange={(checked) => handleInvoiceSelection(invoice.id, checked as boolean)}
                          />
                        </td>
                        <td className="py-3 px-4 font-medium text-blue-600">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {invoice.date}
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {invoice.shipperName || 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {invoice.consigneeName || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.serviceType === 'AIR FREIGHT' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {invoice.serviceType}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          QAR {parseFloat(invoice.total || '0').toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditInvoice(invoice.id)}
                              className="flex items-center gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePrintInvoice(invoice.id)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteInvoice(invoice.id)}
                              className="flex items-center gap-1 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
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