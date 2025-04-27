
import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <div className="animate-pulse">Loading invoice data...</div>
    </div>
  );
};

export default LoadingState;
