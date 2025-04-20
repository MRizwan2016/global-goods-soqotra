import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  FileText, 
  Users, 
  Truck, 
  BookOpen,
  FilePen,
  Printer,
  CreditCard,
  Home
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
                <p className="text-gray-500 text-sm">Manage household goods invoices</p>
              </div>
            </div>
          </div>
        </Link>
        
        <Link to="/data-entry/payment-receivable">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Payment Receivable</h3>
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
                <p className="text-gray-500 text-sm">Manage personal effects forms</p>
              </div>
            </div>
          </div>
        </Link>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Home className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Household Goods</h3>
              <p className="text-gray-500 text-sm">Track personal effects</p>
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
              <p className="text-gray-500 text-sm">Personal effects customers</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Transport</h3>
              <p className="text-gray-500 text-sm">Manage household goods delivery</p>
            </div>
          </div>
        </div>
        
        <Link to="/selling-rates">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <FilePen className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Service Rates</h3>
                <p className="text-gray-500 text-sm">Manage personal effects rates</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/data-entry/print-documents">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-md hover:scale-105 transform">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Printer className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Print Documents</h3>
                <p className="text-gray-500 text-sm">Print household goods forms</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default DataEntry;
