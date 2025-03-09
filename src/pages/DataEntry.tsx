
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Package, 
  Users, 
  Truck, 
  ShoppingBag,
  BookOpen
} from "lucide-react";

const DataEntry = () => {
  return (
    <Layout title="Data Entry">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/data-entry/invoicing">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
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
        
        <Link to="/data-entry/booking-form-stock">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
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
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
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
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
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
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
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
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
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
      </div>
    </Layout>
  );
};

export default DataEntry;
