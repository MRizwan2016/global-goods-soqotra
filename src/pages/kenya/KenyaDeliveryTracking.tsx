
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockDeliveries } from "./data/mockDeliveryData";
import { CarFront, UserRoundCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";
import { CargoDelivery } from "./types/deliveryTracking";
import DeliveryFilterBar from "./components/DeliveryFilterBar";
import DeliveryTable from "./components/DeliveryTable";
import DeliveryPaginationFooter from "./components/DeliveryPaginationFooter";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const KenyaDeliveryTracking = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const entriesPerPage = 10;

  const filteredDeliveries = mockDeliveries.filter((delivery: CargoDelivery) => {
    const searchMatch = 
      delivery.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.receiver.name.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.sender.name.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.receiver.contactNumber.includes(searchText) ||
      delivery.deliveryLocation.county.toLowerCase().includes(searchText.toLowerCase());

    const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1]?.status || "";
    const statusMatch = statusFilter === "all" || latestStatus === statusFilter;

    const warehouseMatch = 
      warehouseFilter === "all" || 
      delivery.destinationWarehouse.includes(warehouseFilter === "mombasa" ? "Mombasa" : "Nairobi");

    const paymentMatch = paymentFilter === "all" || delivery.paymentStatus === paymentFilter;

    return searchMatch && statusMatch && warehouseMatch && paymentMatch;
  });

  const totalPages = Math.ceil(filteredDeliveries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredDeliveries.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleViewDelivery = (deliveryId: string) => {
    navigate(`/kenya/delivery/${deliveryId}`);
  };

  return (
    <Layout title="Kenya Cargo Delivery Tracking">
      <PageBreadcrumb className="mb-4" />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-[#f0f3f8] border-b border-[#d6dce8] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/kenya" />
            <h3 className="text-lg font-medium text-[#1e2a3a]">Kenya Cargo Collection & Delivery Management</h3>
          </div>
          <div className="flex gap-2">
            <Link to="/kenya/vehicles">
              <Button variant="outline" className="flex items-center gap-1 border-[#3b5998] text-[#3b5998] hover:bg-[#3b5998] hover:text-white">
                <CarFront size={14} />
                Manage Vehicles
              </Button>
            </Link>
            <Link to="/kenya/drivers">
              <Button variant="outline" className="flex items-center gap-1 border-[#3b5998] text-[#3b5998] hover:bg-[#3b5998] hover:text-white">
                <UserRoundCog size={14} />
                Manage Drivers
              </Button>
            </Link>
            <Link to="/kenya/delivery/new">
              <Button className="bg-[#3b5998] hover:bg-[#1e2a3a]">Add New Delivery</Button>
            </Link>
          </div>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          <DeliveryFilterBar
            searchText={searchText}
            setSearchText={setSearchText}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            warehouseFilter={warehouseFilter}
            setWarehouseFilter={setWarehouseFilter}
            paymentFilter={paymentFilter}
            setPaymentFilter={setPaymentFilter}
          />
          <div className="overflow-x-auto border border-gray-200 rounded-md">
            <DeliveryTable entries={currentEntries} onViewDelivery={handleViewDelivery} />
          </div>
          <DeliveryPaginationFooter
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirstEntry={indexOfFirstEntry}
            indexOfLastEntry={indexOfLastEntry}
            totalEntries={filteredDeliveries.length}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default KenyaDeliveryTracking;
