
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { FileText, DollarSign, Ship, Plane, Package } from "lucide-react";

const DataEntry = () => {
  return (
    <Layout title="Data Entry">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Entry Module</h2>
        <p className="text-gray-600 mb-6">
          Please select a specific data entry option to proceed with cargo management operations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/data-entry/invoicing" className="block">
            <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="text-soqotra-blue" />
                <h3 className="font-medium text-lg">Invoicing</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Create and manage customer invoices for shipments</p>
              <span className="text-soqotra-blue hover:underline text-sm font-medium">
                Go to Invoicing →
              </span>
            </div>
          </Link>
          
          <Link to="/data-entry/payment" className="block">
            <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-soqotra-blue" />
                <h3 className="font-medium text-lg">Payment Receivable</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Record and track payments from customers</p>
              <span className="text-soqotra-blue hover:underline text-sm font-medium">
                Go to Payment Receivable →
              </span>
            </div>
          </Link>
          
          <Link to="/data-entry/container" className="block">
            <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Ship className="text-soqotra-blue" />
                <h3 className="font-medium text-lg">Load Container</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Manage cargo loading into shipping containers</p>
              <span className="text-soqotra-blue hover:underline text-sm font-medium">
                Go to Load Container →
              </span>
            </div>
          </Link>
          
          <Link to="/data-entry/vessel" className="block">
            <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Ship className="text-soqotra-blue" />
                <h3 className="font-medium text-lg">Load Vessel</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Manage vessel loading schedules and cargo</p>
              <span className="text-soqotra-blue hover:underline text-sm font-medium">
                Go to Load Vessel →
              </span>
            </div>
          </Link>
          
          <Link to="/data-entry/air-cargo" className="block">
            <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="text-soqotra-blue" />
                <h3 className="font-medium text-lg">Load Air Cargo</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Manage air freight shipments and scheduling</p>
              <span className="text-soqotra-blue hover:underline text-sm font-medium">
                Go to Load Air Cargo →
              </span>
            </div>
          </Link>
          
          <Link to="/data-entry/packing-list" className="block">
            <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Package className="text-soqotra-blue" />
                <h3 className="font-medium text-lg">Packing List</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Create and manage packing lists for shipments</p>
              <span className="text-soqotra-blue hover:underline text-sm font-medium">
                Go to Packing List →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DataEntry;
