
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeliveryFilterBarProps {
  searchText: string;
  setSearchText: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  warehouseFilter: string;
  setWarehouseFilter: (value: string) => void;
  paymentFilter: string;
  setPaymentFilter: (value: string) => void;
}

const DeliveryFilterBar: React.FC<DeliveryFilterBarProps> = ({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  warehouseFilter,
  setWarehouseFilter,
  paymentFilter,
  setPaymentFilter,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-1">
        <Filter size={14} className="text-gray-500" />
        <span className="text-sm text-gray-500">Filters:</span>
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="h-8 w-40">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="in-transit">In Transit</SelectItem>
          <SelectItem value="at-warehouse">At Warehouse</SelectItem>
          <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
        <SelectTrigger className="h-8 w-40">
          <SelectValue placeholder="Filter by Warehouse" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Warehouses</SelectItem>
          <SelectItem value="mombasa">Mombasa CFS</SelectItem>
          <SelectItem value="nairobi">Nairobi CFS</SelectItem>
        </SelectContent>
      </Select>

      <Select value={paymentFilter} onValueChange={setPaymentFilter}>
        <SelectTrigger className="h-8 w-40">
          <SelectValue placeholder="Filter by Payment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payments</SelectItem>
          <SelectItem value="completed">Paid</SelectItem>
          <SelectItem value="partial">Partial</SelectItem>
          <SelectItem value="pending">Unpaid</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative ml-auto">
        <Input
          type="text"
          placeholder="Search deliveries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-9 pr-3 py-1 h-8 border border-gray-300 rounded text-sm w-60"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
      </div>
    </div>
  );
};

export default DeliveryFilterBar;
