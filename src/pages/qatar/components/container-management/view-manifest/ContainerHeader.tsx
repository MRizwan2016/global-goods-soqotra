
import React from "react";
import { QatarContainer } from "../../../types/containerTypes";

interface ContainerHeaderProps {
  container: QatarContainer;
}

const ContainerHeader: React.FC<ContainerHeaderProps> = ({ container }) => {
  return (
    <div className="flex items-center">
      <div className="text-lg font-semibold mr-2">
        Container #{container.containerNumber}
      </div>
      {container.runningNumber && (
        <span className="text-sm text-gray-500">
          (Running #: {container.runningNumber})
        </span>
      )}
    </div>
  );
};

export default ContainerHeader;
