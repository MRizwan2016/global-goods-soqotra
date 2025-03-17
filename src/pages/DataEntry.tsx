
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  FileText, 
  Package, 
  Users, 
  Truck, 
  ShoppingBag,
  BookOpen,
  Ship,
  FilePen,
  Printer,
  CreditCard
} from "lucide-react";

const DataEntry = () => {
  return (
    <Layout title="Data Entry">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        <Link to="/data-entry/invoicing">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Invoicing</h3>
                <p className="text-gray-500 text-sm">Manage customer invoices</p>
              </div>
            </div>
          </div>
        </Link>
        
        <Link to="/data-entry/invoice-method">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Invoice Method</h3>
                <p className="text-gray-500 text-sm">Record invoice payments</p>
              </div>
            </div>
          </div>
        </Link>
        
        <Link to="/data-entry/booking-form-stock">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Booking Form Stock</h3>
                <p className="text-gray-500 text-sm">Manage invoice book stock</p>
              </div>
            </div>
          </div>
        </Link>
        
        <Link to="/data-entry/bill-of-lading">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Ship className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Bill of Lading</h3>
                <p className="text-gray-500 text-sm">Manage BL for shipments</p>
              </div>
            </div>
          </div>
        </Link>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Cargo Management</h3>
              <p className="text-gray-500 text-sm">Track and manage cargo</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-amber-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Customer Data</h3>
              <p className="text-gray-500 text-sm">Customer information</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Shipping</h3>
              <p className="text-gray-500 text-sm">Manage shipping details</p>
            </div>
          </div>
        </div>
        
        <Link to="/data-entry/selling-rates">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <FilePen className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Selling Rates</h3>
                <p className="text-gray-500 text-sm">Manage selling tariffs</p>
              </div>
            </div>
          </div>
        </Link>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-rose-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
          <div className="flex items-center gap-4">
            <div className="bg-rose-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-rose-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Inventory</h3>
              <p className="text-gray-500 text-sm">Manage product inventory</p>
            </div>
          </div>
        </div>

        <Link to="/data-entry/print-documents">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Printer className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Print Documents</h3>
                <p className="text-gray-500 text-sm">Print invoices and BLs</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default DataEntry;
