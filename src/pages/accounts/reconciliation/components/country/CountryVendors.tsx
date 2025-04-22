
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCountryByCode } from "../../types";
import { Search, User, Ship, Truck, Plus, UserPlus } from "lucide-react";

interface CountryVendorsProps {
  countryCode: string;
}

const CountryVendors: React.FC<CountryVendorsProps> = ({ countryCode }) => {
  const country = getCountryByCode(countryCode);
  
  if (!country) {
    return <div>Country not found</div>;
  }
  
  // Mock entity data
  const vendorData = [
    { id: "V1", name: "Quality Logistics", type: "Service Provider", contact: "John Smith", phone: "+123-456-7890", status: "active" },
    { id: "V2", name: "Marine Supplies Co.", type: "Material Supplier", contact: "Sarah Johnson", phone: "+123-456-7891", status: "active" },
    { id: "V3", name: "Global Transport", type: "Equipment Supplier", contact: "Mike Wilson", phone: "+123-456-7892", status: "inactive" },
  ];
  
  const shippingLines = [
    { id: "SL1", name: "Oceanic Containers", fleet: "12 vessels", contact: "James Brown", phone: "+123-456-7893", status: "active" },
    { id: "SL2", name: "Global Shippers", fleet: "8 vessels", contact: "Emma Davis", phone: "+123-456-7894", status: "active" },
  ];
  
  const freightForwarders = [
    { id: "FF1", name: "Fast Freight Ltd.", specialization: "Air Freight", contact: "Robert Lee", phone: "+123-456-7895", status: "active" },
    { id: "FF2", name: "TransWorld Logistics", specialization: "Sea Freight", contact: "David Chen", phone: "+123-456-7896", status: "active" },
    { id: "FF3", name: "Cargo Masters", specialization: "Land Freight", contact: "Linda Wang", phone: "+123-456-7897", status: "inactive" },
  ];
  
  const exportCustomers = [
    { id: "EC1", name: "Tech Exports Inc.", industry: "Electronics", contact: "Peter Jones", phone: "+123-456-7898", status: "active" },
    { id: "EC2", name: "Fresh Produce Exports", industry: "Agricultural", contact: "Mary Thompson", phone: "+123-456-7899", status: "active" },
  ];
  
  const importCustomers = [
    { id: "IC1", name: "Retail Imports Co.", industry: "Consumer Goods", contact: "Thomas Miller", phone: "+123-456-7900", status: "active" },
    { id: "IC2", name: "Auto Parts Importers", industry: "Automotive", contact: "Jennifer White", phone: "+123-456-7901", status: "active" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{country.name} Local Entities</h2>
        <Button className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Register New Entity
        </Button>
      </div>
      
      <Tabs defaultValue="vendors">
        <TabsList className="mb-4">
          <TabsTrigger value="vendors" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Vendors</span>
          </TabsTrigger>
          <TabsTrigger value="shipping-lines" className="flex items-center gap-1">
            <Ship className="h-4 w-4" />
            <span>Shipping Lines</span>
          </TabsTrigger>
          <TabsTrigger value="freight-forwarders" className="flex items-center gap-1">
            <Truck className="h-4 w-4" />
            <span>Freight Forwarders</span>
          </TabsTrigger>
          <TabsTrigger value="export-customers" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Export Customers</span>
          </TabsTrigger>
          <TabsTrigger value="import-customers" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Import Customers</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search entities..." 
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>
        
        <TabsContent value="vendors">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendorData.map(vendor => (
                  <VendorCard 
                    key={vendor.id}
                    name={vendor.name}
                    subtitle={vendor.type}
                    contact={vendor.contact}
                    phone={vendor.phone}
                    status={vendor.status}
                    icon={<User className="h-5 w-5 text-gray-600" />}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping-lines">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shippingLines.map(line => (
                  <VendorCard 
                    key={line.id}
                    name={line.name}
                    subtitle={line.fleet}
                    contact={line.contact}
                    phone={line.phone}
                    status={line.status}
                    icon={<Ship className="h-5 w-5 text-gray-600" />}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="freight-forwarders">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {freightForwarders.map(ff => (
                  <VendorCard 
                    key={ff.id}
                    name={ff.name}
                    subtitle={ff.specialization}
                    contact={ff.contact}
                    phone={ff.phone}
                    status={ff.status}
                    icon={<Truck className="h-5 w-5 text-gray-600" />}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export-customers">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exportCustomers.map(customer => (
                  <VendorCard 
                    key={customer.id}
                    name={customer.name}
                    subtitle={customer.industry}
                    contact={customer.contact}
                    phone={customer.phone}
                    status={customer.status}
                    icon={<User className="h-5 w-5 text-gray-600" />}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="import-customers">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {importCustomers.map(customer => (
                  <VendorCard 
                    key={customer.id}
                    name={customer.name}
                    subtitle={customer.industry}
                    contact={customer.contact}
                    phone={customer.phone}
                    status={customer.status}
                    icon={<User className="h-5 w-5 text-gray-600" />}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface VendorCardProps {
  name: string;
  subtitle: string;
  contact: string;
  phone: string;
  status: string;
  icon: React.ReactNode;
}

const VendorCard: React.FC<VendorCardProps> = ({ 
  name, 
  subtitle, 
  contact, 
  phone, 
  status,
  icon 
}) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-full">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <div className="mt-4 space-y-1">
        <p className="text-sm">
          <span className="font-medium">Contact:</span> {contact}
        </p>
        <p className="text-sm">
          <span className="font-medium">Phone:</span> {phone}
        </p>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="ghost" size="sm">View</Button>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
    </div>
  );
};

export default CountryVendors;
