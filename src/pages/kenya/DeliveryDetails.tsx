import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockDeliveries } from "./data/mockDeliveryData";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import HeaderSection from "./components/delivery-details/HeaderSection";
import DeliveryActions from "./components/delivery-details/DeliveryActions";
import OverviewTab from "./components/delivery-details/OverviewTab";
import TimelineTab from "./components/delivery-details/TimelineTab";
import DocumentsTab from "./components/delivery-details/DocumentsTab";
import { CargoDelivery } from "./types/deliveryTracking";
import CargoTab from "./components/delivery-details/CargoTab";

const DeliveryDetails = () => {
  const { id } = useParams();
  const delivery = mockDeliveries.find(d => d.id === id) as CargoDelivery;
  
  if (!delivery) {
    return (
      <Layout title="Delivery Details">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Delivery Not Found</h2>
          <p className="text-gray-600 mb-4">The delivery record you're looking for doesn't exist or has been removed.</p>
          <Link to="/kenya/deliveries">
            <Button className="bg-gray-800">
              Back to Delivery List
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1];

  return (
    <Layout title={`Delivery #${delivery.invoiceNumber}`}>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <HeaderSection 
            invoiceNumber={delivery.invoiceNumber}
            id={delivery.id}
            invoiceId={delivery.invoiceId}
            latestStatus={latestStatus?.status}
            paymentStatus={delivery.paymentStatus}
          />
          <DeliveryActions 
            paymentStatus={delivery.paymentStatus}
            invoiceNumber={delivery.invoiceNumber}
          />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white border border-gray-200 rounded-md p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Status Timeline</TabsTrigger>
            <TabsTrigger value="cargo">Cargo Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <OverviewTab delivery={delivery} />
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-4">
            <TimelineTab statuses={delivery.deliveryStatuses} />
          </TabsContent>
          
          <TabsContent value="cargo" className="mt-4">
            <CargoTab 
              cargoDetails={delivery.cargoDetails}
              isDoorToDoor={delivery.isDoorToDoor}
            />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-4">
            <DocumentsTab 
              invoiceNumber={delivery.invoiceNumber} 
              deliveryId={delivery.id} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DeliveryDetails;
