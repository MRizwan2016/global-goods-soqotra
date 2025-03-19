
import React from "react";

interface JobGenerateHeaderProps {
  title: string;
}

const JobGenerateHeader: React.FC<JobGenerateHeaderProps> = ({ title }) => {
  return (
    <h1 className="text-2xl font-bold mb-6 flex items-center">
      <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-10 mr-2" />
      {title}
    </h1>
  );
};

export default JobGenerateHeader;
