
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Ship, 
  Truck, 
  Package, 
  FileText, 
  MapPin, 
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

const UgandaDashboard: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Layout title="Uganda Operations">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <CountryBackButton />
          <LanguageSwitcher />
        </div>
        <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>Uganda Logistics Operations</h1>
        <p className="text-gray-600">Mombasa clearance to Kampala terminal operations</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Link to="/uganda/clearance">
          <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
            <FileText size={16} />
            Customs Clearance
          </Button>
        </Link>
        <Link to="/uganda/deliveries">
          <Button variant="outline" className="flex items-center gap-2">
            <Package size={16} />
            Delivery Tracking
          </Button>
        </Link>
        <Link to="/uganda/vehicles">
          <Button variant="outline" className="flex items-center gap-2">
            <Truck size={16} />
            Fleet Management
          </Button>
        </Link>
      </div>

      {/* Key Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Ship className="h-4 w-4 text-purple-600" />
              Pending Clearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">At Mombasa Port</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-600" />
              In Transit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">Mombasa to Kampala</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              At Kampala Terminal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">Ready for customs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-600" />
              Delivered Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-gray-500">Released & delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Operations Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Uganda Operations Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                <Ship className="h-4 w-4 text-blue-600" />
                <span className="text-sm">1. Cargo arrives at Mombasa Port</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                <FileText className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">2. Customs clearance at Mombasa</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                <Truck className="h-4 w-4 text-purple-600" />
                <span className="text-sm">3. Transit to Kampala Terminal</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">4. Uganda customs release & delivery</span>
              </div>
            </div>
            <Link to="/uganda/clearance">
              <Button variant="outline" className="w-full mt-4 flex items-center gap-2">
                View Clearance Status
                <ArrowRight size={14} />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 border-l-4 border-green-400 bg-green-50">
                <div>
                  <p className="text-sm font-medium">CL-UG-002 cleared</p>
                  <p className="text-xs text-gray-500">Uganda Import Ltd</p>
                </div>
                <span className="text-xs text-gray-400">2h ago</span>
              </div>
              <div className="flex justify-between items-center p-2 border-l-4 border-blue-400 bg-blue-50">
                <div>
                  <p className="text-sm font-medium">UG-DEL-001 in transit</p>
                  <p className="text-xs text-gray-500">Kampala Trading Co.</p>
                </div>
                <span className="text-xs text-gray-400">4h ago</span>
              </div>
              <div className="flex justify-between items-center p-2 border-l-4 border-yellow-400 bg-yellow-50">
                <div>
                  <p className="text-sm font-medium">Vehicle UAG 003C maintenance</p>
                  <p className="text-xs text-gray-500">Scheduled service</p>
                </div>
                <span className="text-xs text-gray-400">6h ago</span>
              </div>
            </div>
            <Link to="/uganda/deliveries">
              <Button variant="outline" className="w-full mt-4 flex items-center gap-2">
                View All Activities
                <ArrowRight size={14} />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/uganda/clearance/new">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                <FileText className="h-5 w-5" />
                New Clearance Request
              </Button>
            </Link>
            <Link to="/uganda/delivery/new">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                <Package className="h-5 w-5" />
                Schedule Delivery
              </Button>
            </Link>
            <Link to="/uganda/vehicles">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                <Truck className="h-5 w-5" />
                Manage Fleet
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default UgandaDashboard;
