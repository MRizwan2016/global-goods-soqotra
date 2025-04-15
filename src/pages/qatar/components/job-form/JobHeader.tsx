
import React from "react";
import { useJobForm } from "./context/JobFormContext";

const JobHeader: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">
        Personal Effects Job
      </h2>
      <p className="text-gray-600 mt-1">Create or manage personal effects jobs</p>
    </div>
  );
};

export default JobHeader;
