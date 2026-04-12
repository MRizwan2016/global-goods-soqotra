
import React from "react";
import VesselContainerPage from "@/components/shared/vessel-container/VesselContainerPage";
import { SRI_LANKA_CONFIG } from "@/components/shared/vessel-container/countryConfigs";

const SriLankaVesselContainer: React.FC = () => {
  return <VesselContainerPage config={SRI_LANKA_CONFIG} />;
};

export default SriLankaVesselContainer;
