
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobListFiltersProps {
  searchText: string;
  statusFilter: string;
  typeFilter: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

const JobListFilters: React.FC<JobListFiltersProps> = ({
  searchText,
  statusFilter,
  typeFilter,
  onSearchChange,
  onStatusChange,
  onTypeChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <Input
        type="text"
        placeholder="Search by Job Number, Customer, Mobile, or Town..."
        value={searchText}
        onChange={onSearchChange}
      />

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="SCHEDULED">Scheduled</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="COLLECTION">Collection</SelectItem>
          <SelectItem value="DELIVERY">Delivery</SelectItem>
          <SelectItem value="PACKING">Packing</SelectItem>
          <SelectItem value="UNPACKING">Unpacking</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobListFilters;
