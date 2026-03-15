import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface ManifestInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  shipperName: string;
  consigneeName: string;
  serviceType: string;
  total: string;
  weight: string;
  volume: string;
  description: string;
  packages: string;
  terminal?: string;
}

interface ManifestData {
  id: string;
  invoices: ManifestInvoice[];
  type: 'air' | 'sea';
  createdAt: string;
}

interface CountryManifestPageProps {
  countryName: string;
  countrySlug: string;
  manifestStorageKey?: string;
  manifestType: 'air' | 'sea';
  defaultDestination?: string;
}

const CountryManifestPage: React.FC<CountryManifestPageProps> = ({
  countryName,
  countrySlug,
  manifestStorageKey,
  manifestType,
  defaultDestination = 'DESTINATION',
}) => {
  const { manifestId } = useParams();
  const navigate = useNavigate();
  const [manifestData, setManifestData] = useState<ManifestData | null>(null);
  const [loading, setLoading] = useState(true);

  const storageKey = manifestStorageKey || `${countrySlug}Manifests`;

  useEffect(() => {
    if (manifestId) {
      const manifests = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const manifest = manifests.find((m: ManifestData) => m.id === manifestId);

      if (manifest && manifest.type === manifestType) {
        setManifestData(manifest);
      } else {
        toast.error(`${manifestType === 'air' ? 'Air' : 'Sea'} manifest not found`);
        navigate(`/${countrySlug}`);
      }
    }
    setLoading(false);
  }, [manifestId, navigate, countrySlug, storageKey, manifestType]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading manifest...</div>
      </div>
    );
  }

  if (!manifestData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Manifest not found</div>
      </div>
    );
  }

  const totalWeight = manifestData.invoices.reduce((sum, inv) => sum + (parseFloat(inv.weight) || 0), 0);
  const totalPackages = manifestData.invoices.reduce((sum, inv) => sum + (parseInt(inv.packages) || 0), 0);
  const totalVolume = manifestData.invoices.reduce((sum, inv) => sum + (parseFloat(inv.volume) || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="no-print p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate(`/${countrySlug}`)} variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{manifestType === 'air' ? 'Air' : 'Sea'} Manifest - {countryName}</h1>
              <p className="text-gray-600">Manifest ID: {manifestId}</p>
            </div>
          </div>
          <Button onClick={handlePrint} className="flex items-center gap-2">
            Print Manifest
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="border-2 border-gray-800 p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold uppercase">SOQOTRA LOGISTICS</h2>
            <p className="text-sm text-gray-600">{manifestType === 'air' ? 'AIR CARGO' : 'SEA CARGO'} MANIFEST</p>
            <p className="text-sm text-gray-600">Destination: {defaultDestination} | {countryName.toUpperCase()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div><strong>Manifest No:</strong> {manifestData.id}</div>
            <div><strong>Date:</strong> {new Date(manifestData.createdAt).toLocaleDateString()}</div>
            <div><strong>Total Shipments:</strong> {manifestData.invoices.length}</div>
            <div><strong>Total Weight:</strong> {totalWeight.toFixed(2)} kg</div>
          </div>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">#</th>
                <th className="border border-gray-400 p-2 text-left">Invoice No</th>
                <th className="border border-gray-400 p-2 text-left">Shipper</th>
                <th className="border border-gray-400 p-2 text-left">Consignee</th>
                <th className="border border-gray-400 p-2 text-right">Packages</th>
                <th className="border border-gray-400 p-2 text-right">Weight (kg)</th>
                <th className="border border-gray-400 p-2 text-right">Volume (m³)</th>
                <th className="border border-gray-400 p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {manifestData.invoices.map((invoice, index) => (
                <tr key={invoice.id}>
                  <td className="border border-gray-400 p-2">{index + 1}</td>
                  <td className="border border-gray-400 p-2">{invoice.invoiceNumber}</td>
                  <td className="border border-gray-400 p-2">{invoice.shipperName}</td>
                  <td className="border border-gray-400 p-2">{invoice.consigneeName}</td>
                  <td className="border border-gray-400 p-2 text-right">{invoice.packages || '1'}</td>
                  <td className="border border-gray-400 p-2 text-right">{parseFloat(invoice.weight || '0').toFixed(2)}</td>
                  <td className="border border-gray-400 p-2 text-right">{parseFloat(invoice.volume || '0').toFixed(4)}</td>
                  <td className="border border-gray-400 p-2">{invoice.description || 'PERSONAL EFFECTS'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td className="border border-gray-400 p-2" colSpan={4}>TOTALS</td>
                <td className="border border-gray-400 p-2 text-right">{totalPackages}</td>
                <td className="border border-gray-400 p-2 text-right">{totalWeight.toFixed(2)}</td>
                <td className="border border-gray-400 p-2 text-right">{totalVolume.toFixed(4)}</td>
                <td className="border border-gray-400 p-2"></td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium mb-8">Prepared By: ___________________</p>
              <p className="text-sm font-medium">Date: ___________________</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-8">Authorized By: ___________________</p>
              <p className="text-sm font-medium">Date: ___________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryManifestPage;
