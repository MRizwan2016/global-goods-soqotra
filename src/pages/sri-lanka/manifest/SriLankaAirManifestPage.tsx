import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SriLankaAirManifest from '../documents/SriLankaAirManifest';
import { toast } from 'sonner';

interface SriLankaInvoice {
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
}

interface ManifestData {
  id: string;
  invoices: SriLankaInvoice[];
  type: 'air' | 'sea';
  createdAt: string;
}

const SriLankaAirManifestPage = () => {
  const { manifestId } = useParams();
  const navigate = useNavigate();
  const [manifestData, setManifestData] = useState<ManifestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (manifestId) {
      const manifests = JSON.parse(localStorage.getItem('sriLankaManifests') || '[]');
      const manifest = manifests.find((m: ManifestData) => m.id === manifestId);
      
      if (manifest && manifest.type === 'air') {
        setManifestData(manifest);
      } else {
        toast.error('Air manifest not found');
        navigate('/sri-lanka');
      }
    }
    setLoading(false);
  }, [manifestId, navigate]);

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

  const shipments = manifestData.invoices.map(invoice => ({
    awbNumber: invoice.invoiceNumber,
    shipper: invoice.shipperName,
    consignee: invoice.consigneeName,
    destination: 'COLOMBO',
    pieces: parseInt(invoice.packages) || 1,
    weight: parseFloat(invoice.weight) || 0,
    description: invoice.description || 'PERSONAL EFFECTS'
  }));

  const flightInfo = {
    flightNumber: `UL${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}`,
    departure: 'DOH',
    arrival: 'CMB',
    date: new Date().toISOString().split('T')[0],
    aircraft: 'A330-300'
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="no-print p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/sri-lanka')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Air Manifest</h1>
              <p className="text-gray-600">Manifest ID: {manifestId}</p>
            </div>
          </div>
          <Button onClick={handlePrint} className="flex items-center gap-2">
            Print Manifest
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <SriLankaAirManifest 
          shipments={shipments}
          flightInfo={flightInfo}
        />
      </div>
    </div>
  );
};

export default SriLankaAirManifestPage;