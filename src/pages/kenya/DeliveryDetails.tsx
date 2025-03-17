
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockDeliveries } from "./data/mockDeliveryData";
import { 
  ArrowLeft, 
  Truck, 
  MapPin, 
  Package, 
  User, 
  CalendarClock,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Scale,
  Box,
  FileText,
  Phone,
  CircleDashed,
  ClipboardEdit,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeliveryStatus } from "./types/deliveryTracking";
import { toast } from "sonner";

const DeliveryDetails = () => {
  const { id } = useParams();
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("processing");
  const [statusNotes, setStatusNotes] = useState("");
  
  // Find the delivery based on ID from mock data
  const delivery = mockDeliveries.find(d => d.id === id);
  
  if (!delivery) {
    return (
      <Layout title="Delivery Details">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Delivery Not Found</h2>
          <p className="text-gray-600 mb-4">The delivery record you're looking for doesn't exist or has been removed.</p>
          <Link to="/kenya/deliveries">
            <Button className="bg-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Delivery List
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Get the latest status
  const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1];
  
  // Format status label
  const formatStatusLabel = (status: string): string => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'in-transit':
        return <Badge className="bg-orange-500">In Transit</Badge>;
      case 'at-warehouse':
        return <Badge className="bg-purple-500">At Warehouse</Badge>;
      case 'out-for-delivery':
        return <Badge className="bg-indigo-500">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };
  
  // Get payment status badge
  const getPaymentBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'partial':
        return <Badge className="bg-amber-500">Partial</Badge>;
      case 'pending':
        return <Badge className="bg-red-500">Unpaid</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  // Handle updating delivery status
  const handleUpdateStatus = () => {
    toast.success(`Status updated to ${formatStatusLabel(newStatus)}`);
    setStatusUpdateOpen(false);
  };
  
  // Arrange delivery
  const handleArrangeDelivery = () => {
    if (delivery.paymentStatus !== 'completed') {
      toast.error("Cannot arrange delivery: Payment is not completed");
      return;
    }
    toast.success("Delivery has been arranged. Driver will be assigned shortly.");
  };

  return (
    <Layout title={`Delivery #${delivery.invoiceNumber}`}>
      <div className="space-y-6">
        {/* Header with basic info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link to="/kenya/deliveries">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <ArrowLeft size={16} />
                    Back
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">
                  Delivery {delivery.invoiceNumber}
                </h1>
                {getStatusBadge(latestStatus?.status || 'pending')}
                {getPaymentBadge(delivery.paymentStatus)}
              </div>
              <p className="text-gray-500 text-sm">
                Tracking ID: {delivery.id} | Invoice ID: {delivery.invoiceId}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Dialog open={statusUpdateOpen} onOpenChange={setStatusUpdateOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <ClipboardEdit size={16} />
                    Update Status
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Delivery Status</DialogTitle>
                    <DialogDescription>
                      Select the new status for delivery #{delivery.invoiceNumber}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="status" className="text-sm font-medium">Status</label>
                      <Select
                        value={newStatus}
                        onValueChange={setNewStatus}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="in-transit">In Transit</SelectItem>
                          <SelectItem value="at-warehouse">At Warehouse</SelectItem>
                          <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                      <textarea 
                        id="notes"
                        value={statusNotes}
                        onChange={(e) => setStatusNotes(e.target.value)}
                        className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="Add any notes about this status update"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setStatusUpdateOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateStatus}>Update Status</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button 
                className={`gap-1 ${delivery.paymentStatus !== 'completed' ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                onClick={handleArrangeDelivery}
                disabled={delivery.paymentStatus !== 'completed'}
              >
                <Truck size={16} />
                Arrange Delivery
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content with tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white border border-gray-200 rounded-md p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Status Timeline</TabsTrigger>
            <TabsTrigger value="cargo">Cargo Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender & Receiver */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Sender & Receiver</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <User size={14} className="text-green-600" />
                      Sender Information
                    </h4>
                    <div className="grid grid-cols-1 gap-1 text-sm ml-5">
                      <div><span className="font-medium">Name:</span> {delivery.sender.name}</div>
                      <div><span className="font-medium">Contact:</span> {delivery.sender.contactNumber}</div>
                      <div><span className="font-medium">Address:</span> {delivery.sender.address}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <User size={14} className="text-blue-600" />
                      Receiver Information
                    </h4>
                    <div className="grid grid-cols-1 gap-1 text-sm ml-5">
                      <div><span className="font-medium">Name:</span> {delivery.receiver.name}</div>
                      <div><span className="font-medium">Contact:</span> {delivery.receiver.contactNumber}</div>
                      <div><span className="font-medium">Address:</span> {delivery.receiver.address}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Delivery Location */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Delivery Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <MapPin size={14} className="text-red-600" />
                      Destination Details
                    </h4>
                    <div className="grid grid-cols-1 gap-1 text-sm ml-5">
                      <div><span className="font-medium">County:</span> {delivery.deliveryLocation.county}</div>
                      <div><span className="font-medium">District:</span> {delivery.deliveryLocation.district}</div>
                      <div><span className="font-medium">Full Address:</span> {delivery.deliveryLocation.address}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <Truck size={14} className="text-purple-600" />
                      Warehouse Information
                    </h4>
                    <div className="grid grid-cols-1 gap-1 text-sm ml-5">
                      <div><span className="font-medium">Origin:</span> {delivery.originWarehouse}</div>
                      <div><span className="font-medium">Destination:</span> {delivery.destinationWarehouse}</div>
                      <div><span className="font-medium">Door to Door:</span> {delivery.isDoorToDoor ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Transport Details */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Transport Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <User size={14} className="text-indigo-600" />
                      Driver Information
                    </h4>
                    {delivery.assignedDriver ? (
                      <div className="grid grid-cols-1 gap-1 text-sm ml-5">
                        <div><span className="font-medium">Name:</span> {delivery.assignedDriver.name}</div>
                        <div><span className="font-medium">License:</span> {delivery.assignedDriver.licenseNumber}</div>
                        <div><span className="font-medium">Contact:</span> {delivery.assignedDriver.contactNumber}</div>
                      </div>
                    ) : (
                      <div className="text-sm ml-5 text-amber-600">No driver assigned yet</div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <Truck size={14} className="text-orange-600" />
                      Vehicle Information
                    </h4>
                    {delivery.assignedVehicle ? (
                      <div className="grid grid-cols-1 gap-1 text-sm ml-5">
                        <div><span className="font-medium">Registration:</span> {delivery.assignedVehicle.registrationNumber}</div>
                        <div><span className="font-medium">Type:</span> {delivery.assignedVehicle.type}</div>
                        <div><span className="font-medium">Capacity:</span> {delivery.assignedVehicle.capacity}</div>
                      </div>
                    ) : (
                      <div className="text-sm ml-5 text-amber-600">No vehicle assigned yet</div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment & Schedules */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Payment & Schedules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <CalendarClock size={14} className="text-teal-600" />
                      Schedule Information
                    </h4>
                    <div className="grid grid-cols-1 gap-1 text-sm ml-5">
                      <div><span className="font-medium">Collection Date:</span> {delivery.collectionDate}</div>
                      <div><span className="font-medium">Estimated Delivery:</span> {delivery.estimatedDeliveryDate}</div>
                      {delivery.actualDeliveryDate && (
                        <div><span className="font-medium">Actual Delivery:</span> {delivery.actualDeliveryDate}</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <DollarSign size={14} className="text-green-600" />
                      Payment Information
                    </h4>
                    <div className="grid grid-cols-1 gap-1 text-sm ml-5">
                      <div>
                        <span className="font-medium">Payment Status:</span> {getPaymentBadge(delivery.paymentStatus)}
                      </div>
                      <div className="mt-2">
                        {delivery.paymentStatus !== 'completed' ? (
                          <Link to={`/accounts/add-payment/${delivery.invoiceId}`}>
                            <Button size="sm" variant="outline" className="h-7 text-xs">View Payment Details</Button>
                          </Link>
                        ) : (
                          <div className="flex items-center text-green-600">
                            <CheckCircle2 size={14} className="mr-1" />
                            Payment completed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status Timeline</CardTitle>
                <CardDescription>Track the complete delivery journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6">
                    {delivery.deliveryStatuses.map((status: DeliveryStatus, index: number) => (
                      <div key={status.id} className="relative pl-10">
                        <div className="absolute left-0 p-1 bg-white rounded-full border-2 border-blue-500">
                          <CircleDashed size={18} className="text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold">
                              {formatStatusLabel(status.status)}
                            </div>
                            {getStatusBadge(status.status)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(status.timestamp).toLocaleString()}
                          </div>
                          {status.location && (
                            <div className="text-xs flex items-center mt-1">
                              <MapPin size={12} className="mr-1 text-gray-500" />
                              {status.location}
                            </div>
                          )}
                          {status.notes && (
                            <div className="text-sm mt-1">{status.notes}</div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            <span className="font-medium">Updated by:</span> {status.updatedBy}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Cargo Details Tab */}
          <TabsContent value="cargo" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cargo Information</CardTitle>
                <CardDescription>Details about cargo contents and measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Cargo Measurements</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <div className="flex justify-center mb-2">
                          <Scale className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="text-sm font-medium">Weight</div>
                        <div className="text-lg font-bold">{delivery.cargoDetails.weight} kg</div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <div className="flex justify-center mb-2">
                          <Box className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="text-sm font-medium">Volume</div>
                        <div className="text-lg font-bold">{delivery.cargoDetails.volume} m³</div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <div className="flex justify-center mb-2">
                          <Package className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="text-sm font-medium">Packages</div>
                        <div className="text-lg font-bold">{delivery.cargoDetails.packages}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Cargo Description</h4>
                    <div className="border border-gray-200 rounded-md p-4">
                      <p className="text-sm">{delivery.cargoDetails.description}</p>
                    </div>
                    
                    <h4 className="text-sm font-medium mb-2 mt-4">Special Instructions</h4>
                    <div className="border border-gray-200 rounded-md p-4">
                      <p className="text-sm italic text-gray-500">
                        {delivery.isDoorToDoor 
                          ? "This is a door-to-door delivery. Please ensure proper coordination with the receiver."
                          : "This is a warehouse pickup delivery. Customer will pick up from the destination warehouse."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>View and print related documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to={`/data-entry/invoicing/print/${delivery.invoiceId}`} target="_blank">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText size={16} />
                      View Invoice #{delivery.invoiceNumber}
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="justify-start gap-2">
                    <FileText size={16} />
                    Delivery Note
                  </Button>
                  
                  <Button variant="outline" className="justify-start gap-2">
                    <FileText size={16} />
                    Cargo Manifest
                  </Button>
                  
                  <Button variant="outline" className="justify-start gap-2">
                    <FileText size={16} />
                    Proof of Delivery
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DeliveryDetails;
