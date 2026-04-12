
import React from "react";
import VesselContainerPage from "@/components/shared/vessel-container/VesselContainerPage";
import { SAUDI_ARABIA_CONFIG } from "@/components/shared/vessel-container/countryConfigs";

const SaudiArabiaVesselContainer: React.FC = () => {
  return <VesselContainerPage config={SAUDI_ARABIA_CONFIG} />;
};

export default SaudiArabiaVesselContainer;
