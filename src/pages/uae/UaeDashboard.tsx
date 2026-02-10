import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UaeDashboard = () => {
  const navigate = useNavigate();

  return (
     <div className="min-h-screen bg-[#f8f9fb] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1e2a3a]">UAE Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage invoices and shipments to United Arab Emirates</p>
          </div>
          <Button 
            onClick={() => navigate('/uae/invoice/add')}
            className="flex items-center gap-2 bg-[#3b5998] hover:bg-[#1e2a3a]"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-[#1e2a3a]">0</p>
              </div>
              <FileText className="h-8 w-8 text-[#3b5998]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                <p className="text-2xl font-bold text-[#1e2a3a]">0</p>
              </div>
              <Search className="h-8 w-8 text-[#5a7ab5]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-[#1e2a3a]">0</p>
              </div>
              <FileText className="h-8 w-8 text-[#7b9acc]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 bg-[#1e2a3a]">
            <h2 className="text-lg font-semibold text-white">Recent Invoices</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No invoices found</p>
              <Button 
                onClick={() => navigate('/uae/invoice/add')}
                className="mt-4 border-[#3b5998] text-[#3b5998] hover:bg-[#3b5998] hover:text-white"
                variant="outline"
              >
                Create Your First Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UaeDashboard;