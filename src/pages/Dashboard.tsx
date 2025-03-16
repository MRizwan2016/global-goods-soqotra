
import Layout from "@/components/layout/Layout";
import DestinationCard from "@/components/dashboard/DestinationCard";
import ShipmentChart from "@/components/dashboard/ShipmentChart";
import ShipmentTable from "@/components/dashboard/ShipmentTable";
import { 
  kenyaShipmentData, 
  philippinesShipmentData, 
  sriLankaShipmentData,
  somaliaShipmentData,
  shipmentTableData
} from "@/data/mockData";

const Dashboard = () => {
  console.log("Rendering Dashboard component");
  
  return (
    <Layout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Primary Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DestinationCard 
            country="Kenya" 
            bgColor="bg-soqotra-blue" 
            to="/destinations/kenya" 
          />
          <DestinationCard 
            country="Philippines" 
            bgColor="bg-amber-500" 
            to="/destinations/philippines" 
          />
          <DestinationCard 
            country="Sri Lanka" 
            bgColor="bg-red-500" 
            to="/destinations/sri-lanka" 
          />
          <DestinationCard 
            country="Somalia" 
            bgColor="bg-soqotra-green" 
            to="/destinations/somalia" 
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipment Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <ShipmentChart 
            data={kenyaShipmentData} 
            title="Kenya Shipments - 2023" 
            dataKey="shipments" 
            barColor="#0a2463"
          />
          <ShipmentChart 
            data={philippinesShipmentData} 
            title="Philippines Shipments - 2023" 
            dataKey="shipments" 
            barColor="#f59e0b"
          />
          <ShipmentChart 
            data={sriLankaShipmentData} 
            title="Sri Lanka Shipments - 2023" 
            dataKey="shipments" 
            barColor="#ef4444"
          />
          <ShipmentChart 
            data={somaliaShipmentData} 
            title="Somalia Shipments - 2023" 
            dataKey="shipments" 
            barColor="#41A949"
          />
        </div>
      </div>
      
      <ShipmentTable 
        data={shipmentTableData} 
        title="Recent Cargo Shipments" 
      />
    </Layout>
  );
};

export default Dashboard;
