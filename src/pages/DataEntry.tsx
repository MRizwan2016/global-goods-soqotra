
import Layout from "@/components/layout/Layout";

const DataEntry = () => {
  return (
    <Layout title="Data Entry">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Entry Module</h2>
        <p className="text-gray-600 mb-6">
          Please select a specific data entry option from the sidebar to proceed with cargo management operations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
            <h3 className="font-medium text-lg mb-2">Invoicing</h3>
            <p className="text-gray-600 text-sm mb-4">Create and manage customer invoices for shipments</p>
            <a href="/data-entry/invoicing" className="text-soqotra-blue hover:underline text-sm font-medium">
              Go to Invoicing →
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
            <h3 className="font-medium text-lg mb-2">Payment Receivable</h3>
            <p className="text-gray-600 text-sm mb-4">Record and track payments from customers</p>
            <a href="/data-entry/payment" className="text-soqotra-blue hover:underline text-sm font-medium">
              Go to Payment Receivable →
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
            <h3 className="font-medium text-lg mb-2">Load Container</h3>
            <p className="text-gray-600 text-sm mb-4">Manage cargo loading into shipping containers</p>
            <a href="/data-entry/container" className="text-soqotra-blue hover:underline text-sm font-medium">
              Go to Load Container →
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
            <h3 className="font-medium text-lg mb-2">Load Vessel</h3>
            <p className="text-gray-600 text-sm mb-4">Manage vessel loading schedules and cargo</p>
            <a href="/data-entry/vessel" className="text-soqotra-blue hover:underline text-sm font-medium">
              Go to Load Vessel →
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
            <h3 className="font-medium text-lg mb-2">Load Air Cargo</h3>
            <p className="text-gray-600 text-sm mb-4">Manage air freight shipments and scheduling</p>
            <a href="/data-entry/air-cargo" className="text-soqotra-blue hover:underline text-sm font-medium">
              Go to Load Air Cargo →
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-md p-5 hover:border-soqotra-blue hover:shadow-md transition-all">
            <h3 className="font-medium text-lg mb-2">Packing List</h3>
            <p className="text-gray-600 text-sm mb-4">Create and manage packing lists for shipments</p>
            <a href="/data-entry/packing-list" className="text-soqotra-blue hover:underline text-sm font-medium">
              Go to Packing List →
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataEntry;
