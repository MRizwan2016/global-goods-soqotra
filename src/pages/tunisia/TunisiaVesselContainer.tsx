
import React from "react";
import VesselContainerPage from "@/components/shared/vessel-container/VesselContainerPage";
import { TUNISIA_CONFIG } from "@/components/shared/vessel-container/countryConfigs";

const TunisiaVesselContainer: React.FC = () => {
  return <VesselContainerPage config={TUNISIA_CONFIG} />;
};

export default TunisiaVesselContainer;
