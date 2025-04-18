
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QatarJob } from "../../../types/jobTypes";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, Clock, User, Phone, MapPin, Truck, FileText, Package } from "lucide-react";
import { format } from "date-fns";

interface ViewJobModalProps {
  isOpen: boolean;
  job: QatarJob;
  onClose: () => void;
}

const ViewJobModal: React.FC<ViewJobModalProps> = ({ isOpen, job, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy hh:mm a");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-start pt-10">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-2">Job Details</span>
              <Badge className={
                job.status === "COMPLETED" ? "bg-green-500" : 
                job.status === "CANCELLED" ? "bg-red-500" : 
                job.status === "IN_PROGRESS" ? "bg-blue-500" : "bg-amber-500"
              }>
                {job.status}
              </Badge>
            </h2>
            <Button onClick={onClose} variant="ghost" size="icon" className="h-8 w-8">
              <span className="sr-only">Close</span>
              <X size={18} />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Job Information</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm text-gray-500">Job Number</Label>
                    <p className="font-medium">{job.jobNumber}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-500">Job Type</Label>
                    <p className="flex items-center">
                      <Badge className={job.jobType === "COLLECTION" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                        {job.jobType}
                      </Badge>
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500 flex items-center">
                    <Calendar size={14} className="mr-1" /> Date
                  </Label>
                  <p>{formatDate(job.date)}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" /> Time
                  </Label>
                  <p>{job.time} {job.amPm}</p>
                </div>

                <div>
                  <Label className="text-sm text-gray-500 flex items-center">
                    <Truck size={14} className="mr-1" /> Vehicle
                  </Label>
                  <p>{job.vehicle || "Not assigned"}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500 flex items-center">
                    <MapPin size={14} className="mr-1" /> Location
                  </Label>
                  <p>{job.location || job.town || "-"}</p>
                </div>
              </div>
              
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Customer Information</h3>
                
                <div>
                  <Label className="text-sm text-gray-500 flex items-center">
                    <User size={14} className="mr-1" /> Customer Name
                  </Label>
                  <p className="font-medium">{job.customer}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500 flex items-center">
                    <Phone size={14} className="mr-1" /> Mobile Number
                  </Label>
                  <p>{job.mobileNumber}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Sector/Branch</Label>
                  <p>{job.sector || "-"} / {job.branch || "-"}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">City/Town</Label>
                  <p>{job.city || "-"} / {job.town || "-"}</p>
                </div>
              </div>
            </div>
            
            {/* Status Information */}
            {(job.status === "COMPLETED" || job.status === "CANCELLED") && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium border-b pb-2">
                  {job.status === "COMPLETED" ? "Completion Details" : "Cancellation Details"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label className="text-sm text-gray-500">
                      {job.status === "COMPLETED" ? "Completed Date" : "Cancelled Date"}
                    </Label>
                    <p>{formatDateTime(job.status === "COMPLETED" ? job.completionDate : job.cancellationDate)}</p>
                  </div>
                  
                  {job.status === "CANCELLED" && job.cancellationReason && (
                    <div>
                      <Label className="text-sm text-gray-500">Cancellation Reason</Label>
                      <p>{job.cancellationReason}</p>
                    </div>
                  )}
                  
                  {job.status === "COMPLETED" && job.completionNotes && (
                    <div>
                      <Label className="text-sm text-gray-500">Completion Notes</Label>
                      <p>{job.completionNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Items Information */}
            {job.items && job.items.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium border-b pb-2 flex items-center">
                  <Package size={16} className="mr-2" /> Items
                </h3>
                
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border px-3 py-2 text-left">Item</th>
                        <th className="border px-3 py-2 text-center">Qty</th>
                        <th className="border px-3 py-2 text-left">Description</th>
                        <th className="border px-3 py-2 text-right">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {job.items.map((item, index) => (
                        <tr key={item.id || index} className="hover:bg-gray-50">
                          <td className="border px-3 py-2">{item.name || item.itemName || "-"}</td>
                          <td className="border px-3 py-2 text-center">{item.quantity}</td>
                          <td className="border px-3 py-2">{item.description || "-"}</td>
                          <td className="border px-3 py-2 text-right">
                            {item.weight ? `${item.weight} kg` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Remarks */}
            {job.remarks && (
              <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                  <FileText size={16} className="mr-2" />
                  <Label className="font-medium">Remarks</Label>
                </div>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{job.remarks}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJobModal;
