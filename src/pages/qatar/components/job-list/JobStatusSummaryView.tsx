
import React from "react";
import { QatarJob } from "../../types/jobTypes";

interface StatusCountsProps {
  total: number;
  pending: number;
  inProgress: number;
  scheduled: number;
  completed: number;
  cancelled: number;
}

interface JobStatusSummaryViewProps {
  jobs: QatarJob[];
  filteredJobs?: QatarJob[];
}

const JobStatusSummaryView: React.FC<JobStatusSummaryViewProps> = ({ jobs, filteredJobs = jobs }) => {
  const statusCounts: StatusCountsProps = {
    total: filteredJobs.length,
    pending: filteredJobs.filter(job => job.status === "PENDING").length,
    inProgress: filteredJobs.filter(job => job.status === "IN_PROGRESS").length,
    scheduled: filteredJobs.filter(job => job.status === "SCHEDULED").length,
    completed: filteredJobs.filter(job => job.status === "COMPLETED").length,
    cancelled: filteredJobs.filter(job => job.status === "CANCELLED").length
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <StatusCard label="Total Jobs" count={statusCounts.total} color="blue" />
      <StatusCard label="Pending" count={statusCounts.pending} color="yellow" />
      <StatusCard label="In Progress" count={statusCounts.inProgress} color="orange" />
      <StatusCard label="Scheduled" count={statusCounts.scheduled} color="indigo" />
      <StatusCard label="Completed" count={statusCounts.completed} color="green" />
      <StatusCard label="Cancelled" count={statusCounts.cancelled} color="red" />
    </div>
  );
};

interface StatusCardProps {
  label: string;
  count: number;
  color: "blue" | "green" | "yellow" | "red" | "orange" | "indigo";
}

const StatusCard: React.FC<StatusCardProps> = ({ label, count, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case "blue": return "bg-blue-50 border-blue-200 text-blue-600";
      case "green": return "bg-green-50 border-green-200 text-green-600";
      case "yellow": return "bg-yellow-50 border-yellow-200 text-yellow-600";
      case "red": return "bg-red-50 border-red-200 text-red-600";
      case "orange": return "bg-orange-50 border-orange-200 text-orange-600";
      case "indigo": return "bg-indigo-50 border-indigo-200 text-indigo-600";
      default: return "bg-gray-50 border-gray-200 text-gray-600";
    }
  };
  
  return (
    <div className={`rounded-lg border ${getColorClasses()} p-3 text-center`}>
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-semibold">{count}</p>
    </div>
  );
};

export default JobStatusSummaryView;
