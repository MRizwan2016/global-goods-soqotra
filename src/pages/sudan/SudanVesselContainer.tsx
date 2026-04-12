
import React from "react";
import VesselContainerPage from "@/components/shared/vessel-container/VesselContainerPage";
import { SUDAN_CONFIG } from "@/components/shared/vessel-container/countryConfigs";

const SudanVesselContainer: React.FC = () => {
  return <VesselContainerPage config={SUDAN_CONFIG} />;
};

export default SudanVesselContainer;
