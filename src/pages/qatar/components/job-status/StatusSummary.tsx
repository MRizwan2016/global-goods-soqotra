
import React from "react";

interface StatusSummaryProps {
  statusCounts: {
    total: number;
    pending: number;
    inProgress: number;
    scheduled: number;
    completed: number;
    cancelled: number;
  };
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ statusCounts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <div className="bg-gray-50 p-3 rounded border border-gray-200">
        <p className="text-sm text-gray-500">TOTAL JOBS</p>
        <p className="text-xl font-semibold">{statusCounts.total}</p>
      </div>
      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
        <p className="text-sm text-yellow-600">PENDING</p>
        <p className="text-xl font-semibold text-yellow-600">{statusCounts.pending}</p>
      </div>
      <div className="bg-orange-50 p-3 rounded border border-orange-200">
        <p className="text-sm text-orange-600">IN PROGRESS</p>
        <p className="text-xl font-semibold text-orange-600">{statusCounts.inProgress}</p>
      </div>
      <div className="bg-blue-50 p-3 rounded border border-blue-200">
        <p className="text-sm text-blue-600">SCHEDULED</p>
        <p className="text-xl font-semibold text-blue-600">{statusCounts.scheduled}</p>
      </div>
      <div className="bg-green-50 p-3 rounded border border-green-200">
        <p className="text-sm text-green-600">COMPLETED</p>
        <p className="text-xl font-semibold text-green-600">{statusCounts.completed}</p>
      </div>
      <div className="bg-red-50 p-3 rounded border border-red-200">
        <p className="text-sm text-red-600">CANCELLED</p>
        <p className="text-xl font-semibold text-red-600">{statusCounts.cancelled}</p>
      </div>
    </div>
  );
};

export default StatusSummary;
