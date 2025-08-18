import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, MapPin, Calendar, Phone, User, Truck, Clock } from "lucide-react";
import { mockDeliveries } from "../../data/mockDeliveryData";
import { CargoDelivery } from "../../types/deliveryTracking";

const CustomerTrackingPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<CargoDelivery | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setNotFound(false);
    setSearchResult(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Search by invoice number or delivery ID
    const delivery = mockDeliveries.find(
      d => d.invoiceNumber === searchTerm.trim() || d.id === searchTerm.trim()
    );

    if (delivery) {
      setSearchResult(delivery);
    } else {
      setNotFound(true);
    }
    
    setIsSearching(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'out-for-delivery': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-transit': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'at-warehouse': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Package className="h-7 w-7 text-blue-600" />
            Track Your Shipment
          </CardTitle>
          <CardDescription>
            Enter your invoice number or tracking ID to get real-time updates on your cargo delivery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              placeholder="Enter invoice number (e.g., 13136051)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !searchTerm.trim()}
              className="px-6"
            >
              {isSearching ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {isSearching ? 'Searching...' : 'Track'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {notFound && (
        <Card className="border-red-200">
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Shipment Not Found</h3>
            <p className="text-red-600">
              We couldn't find a shipment with the number "{searchTerm}". 
              Please check your invoice number and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {searchResult && (
        <div className="space-y-6">
          {/* Shipment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Invoice Number</label>
                    <p className="font-semibold">{searchResult.invoiceNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Origin</label>
                    <p className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      {searchResult.originWarehouse}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Destination</label>
                    <p className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-green-600" />
                      {searchResult.destinationWarehouse}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Current Status</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(searchResult.deliveryStatuses[searchResult.deliveryStatuses.length - 1].status)}>
                        {formatStatus(searchResult.deliveryStatuses[searchResult.deliveryStatuses.length - 1].status)}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estimated Delivery</label>
                    <p className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      {new Date(searchResult.estimatedDeliveryDate).toLocaleDateString()}
                    </p>
                  </div>
                  {searchResult.actualDeliveryDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Actual Delivery</label>
                      <p className="flex items-center gap-1 text-green-600 font-semibold">
                        <Calendar className="h-4 w-4" />
                        {new Date(searchResult.actualDeliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
              <CardDescription>Track your shipment's journey from origin to destination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResult.deliveryStatuses.map((status, index) => (
                  <div key={status.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === searchResult.deliveryStatuses.length - 1 
                          ? 'bg-blue-600' 
                          : 'bg-green-600'
                      }`} />
                      {index < searchResult.deliveryStatuses.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getStatusColor(status.status)}>
                          {formatStatus(status.status)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(status.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700">{status.notes}</p>
                      {status.location && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {status.location}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">Updated by: {status.updatedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Receiver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p>{searchResult.receiver.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact</label>
                  <p className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-blue-600" />
                    {searchResult.receiver.contactNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Delivery Address</label>
                  <p className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-green-600" />
                    {searchResult.deliveryLocation.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            {searchResult.assignedDriver && searchResult.assignedVehicle && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Team
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Driver</label>
                    <p>{searchResult.assignedDriver.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact</label>
                    <p className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-blue-600" />
                      {searchResult.assignedDriver.contactNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Vehicle</label>
                    <p>{searchResult.assignedVehicle.registrationNumber} ({searchResult.assignedVehicle.capacity})</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Cargo Details */}
          <Card>
            <CardHeader>
              <CardTitle>Cargo Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Weight</label>
                  <p className="font-semibold">{searchResult.cargoDetails.weight} kg</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Volume</label>
                  <p className="font-semibold">{searchResult.cargoDetails.volume} m³</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Packages</label>
                  <p className="font-semibold">{searchResult.cargoDetails.packages} pcs</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Service Type</label>
                  <p className="font-semibold">{searchResult.isDoorToDoor ? 'Door-to-Door' : 'Port-to-Port'}</p>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p>{searchResult.cargoDetails.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerTrackingPortal;