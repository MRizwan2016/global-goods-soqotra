
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountryByCode } from "../../types";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  Users,
  Ship,
  Truck,
  Building,
  AlertCircle,
  Globe
} from "lucide-react";

interface CountryOverviewProps {
  countryCode: string;
}

const CountryOverview: React.FC<CountryOverviewProps> = ({ countryCode }) => {
  const country = getCountryByCode(countryCode);
  
  if (!country) {
    return <div>Country not found</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{country.name} Overview</h2>
          <p className="text-gray-500">Financial reconciliation overview for {country.name}</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border">
          <Globe className="h-5 w-5 text-purple-600" />
          <span className="font-semibold">{country.name}</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">
            {country.currency}
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{country.currencySymbol} 125,430</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Reconciliation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{country.currencySymbol} 35,750</div>
                <div className="text-xs text-amber-600 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  12 transactions pending
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{country.currencySymbol} 87,920</div>
                <div className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  +8.3% from last month
                </div>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{country.currencySymbol} 37,510</div>
                <div className="text-xs text-blue-600 flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  Current financial period
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-500" />
              Registered Entities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>Vendors</span>
                </div>
                <span className="font-semibold">24</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-gray-500" />
                  <span>Shipping Lines</span>
                </div>
                <span className="font-semibold">8</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-500" />
                  <span>Freight Forwarders</span>
                </div>
                <span className="font-semibold">12</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>Export Customers</span>
                </div>
                <span className="font-semibold">47</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>Import Customers</span>
                </div>
                <span className="font-semibold">32</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4 text-indigo-500" />
              Financial Institutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span>Banks</span>
                </div>
                <span className="font-semibold">5</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span>Insurance Companies</span>
                </div>
                <span className="font-semibold">3</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>Exchange Rate</span>
                </div>
                <span className="font-semibold">1 USD = {country.currencySymbol} 3.67</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-500" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 p-1 rounded">
                    <DollarSign className="h-3 w-3 text-green-600" />
                  </span>
                  <span>Payment reconciled</span>
                </div>
                <span className="text-gray-500">2h ago</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 p-1 rounded">
                    <Users className="h-3 w-3 text-blue-600" />
                  </span>
                  <span>New vendor registered</span>
                </div>
                <span className="text-gray-500">5h ago</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 p-1 rounded">
                    <AlertCircle className="h-3 w-3 text-amber-600" />
                  </span>
                  <span>Payment variance detected</span>
                </div>
                <span className="text-gray-500">1d ago</span>
              </li>
              <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 p-1 rounded">
                    <Ship className="h-3 w-3 text-purple-600" />
                  </span>
                  <span>New shipping line added</span>
                </div>
                <span className="text-gray-500">2d ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CountryOverview;
