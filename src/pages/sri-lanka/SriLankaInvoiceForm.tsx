import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SriLankaInvoiceForm = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Placeholder save functionality
    console.log('Save invoice');
  };

  const handlePreview = () => {
    // Placeholder preview functionality
    console.log('Preview invoice');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/sri-lanka')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sri Lanka Invoice</h1>
              <p className="text-gray-600">Create or edit invoice for Sri Lanka destination</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Invoice form coming soon...</p>
            <p className="text-sm text-gray-400">
              This will include shipper details, consignee information, package details, and pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaInvoiceForm;