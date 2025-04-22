
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockDeliveries } from "./data/mockDeliveryData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CargoDelivery } from "./types/deliveryTracking";
import HeaderSection from "./components/delivery-details/HeaderSection";
import OverviewTab from "./components/delivery-details/OverviewTab";
import TimelineTab from "./components/delivery-details/TimelineTab";
import DocumentsTab from "./components/delivery-details/DocumentsTab";
import CargoTab from "./components/delivery-details/CargoTab";
import TransportTab from "./components/delivery-details/TransportTab";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DeliveryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<CargoDelivery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchDeliveryData = () => {
      setLoading(true);
      try {
        const foundDelivery = mockDeliveries.find(del => del.id === id);
        if (foundDelivery) {
          setDelivery(foundDelivery);
        } else {
          toast.error("Delivery not found");
          setTimeout(() => navigate("/kenya/deliveries"), 1000);
        }
      } catch (error) {
        console.error("Error fetching delivery data:", error);
        toast.error("Failed to load delivery details");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryData();
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout title="Loading Delivery Details">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!delivery) {
    return (
      <Layout title="Delivery Not Found">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Delivery Not Found</h2>
            <p className="text-gray-600 mb-4">The requested delivery could not be found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1]?.status || 'pending';

  return (
    <Layout title={`Delivery ${delivery.invoiceNumber} Details`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <HeaderSection 
          invoiceNumber={delivery.invoiceNumber} 
          id={delivery.id} 
          invoiceId={delivery.invoiceId}
          latestStatus={latestStatus}
          paymentStatus={delivery.paymentStatus}
        />

        <div className="mt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="cargo">Cargo</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <OverviewTab delivery={delivery} />
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-4">
              <TimelineTab statuses={delivery.deliveryStatuses} />
            </TabsContent>
            
            <TabsContent value="cargo" className="mt-4">
              <CargoTab cargoDetails={delivery.cargoDetails} isDoorToDoor={delivery.isDoorToDoor} />
            </TabsContent>
            
            <TabsContent value="transport" className="mt-4">
              <TransportTab 
                assignedDriver={delivery.assignedDriver} 
                assignedVehicle={delivery.assignedVehicle}
                collectionDate={delivery.collectionDate}
                estimatedDeliveryDate={delivery.estimatedDeliveryDate}
                actualDeliveryDate={delivery.actualDeliveryDate}
                originWarehouse={delivery.originWarehouse}
                destinationWarehouse={delivery.destinationWarehouse}
              />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-4">
              <DocumentsTab invoiceNumber={delivery.invoiceNumber} deliveryId={delivery.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryDetails;
