
import { CountryConfig } from "./types";

export const SRI_LANKA_CONFIG: CountryConfig = {
  country: "Sri Lanka",
  countryCode: "LK",
  runningNumberPrefix: "C",
  containerRunningPrefix: "C",
  sectors: [
    { label: "SRI LANKA", code: "C" },
  ],
  shippingLines: [
    { label: "ABUDHABI SHIPPING", code: "ADS" },
    { label: "MSC", code: "MSC" },
    { label: "MAERSK", code: "MAE" },
    { label: "CMA CGM", code: "CMA" },
    { label: "HAPAG-LLOYD", code: "HAP" },
    { label: "ONE LINE", code: "ONE" },
    { label: "EVERGREEN", code: "EVG" },
    { label: "COSCO", code: "COS" },
  ],
  portsOfLoading: ["DOHA, QATAR", "HAMAD PORT, QATAR"],
  portsOfDischarge: ["COLOMBO, SRI LANKA", "HAMBANTOTA, SRI LANKA"],
  containerTypes: ["20FT_NML", "40FT_NML", "40FT_HC", "45FT_HC"],
  directions: ["COLOMBO", "GALLE", "KURUNEGALA", "MIX"],
  confirmStatuses: ["NOT CONFIRM", "CONFIRMED"],
  useNumberPlate: false,
};

export const SAUDI_ARABIA_CONFIG: CountryConfig = {
  country: "Saudi Arabia",
  countryCode: "SA",
  runningNumberPrefix: "S",
  containerRunningPrefix: "S",
  sectors: [
    { label: "JEDDAH", code: "J" },
    { label: "DAMMAM", code: "D" },
    { label: "RIYADH", code: "R" },
  ],
  shippingLines: [
    { label: "ABUDHABI SHIPPING", code: "ADS" },
    { label: "MSC", code: "MSC" },
    { label: "MAERSK", code: "MAE" },
    { label: "CMA CGM", code: "CMA" },
    { label: "HAPAG-LLOYD", code: "HAP" },
    { label: "ONE LINE", code: "ONE" },
    { label: "BAHRI", code: "BAH" },
  ],
  portsOfLoading: ["DOHA, QATAR", "HAMAD PORT, QATAR"],
  portsOfDischarge: ["JEDDAH, SAUDI ARABIA", "DAMMAM, SAUDI ARABIA", "RIYADH DRY PORT, SAUDI ARABIA"],
  containerTypes: ["20FT_NML", "40FT_NML", "40FT_HC", "45FT_HC"],
  directions: ["EXPORT", "IMPORT", "MIX"],
  confirmStatuses: ["NOT CONFIRM", "CONFIRMED"],
  useNumberPlate: false,
};

export const SUDAN_CONFIG: CountryConfig = {
  country: "Sudan",
  countryCode: "SD",
  runningNumberPrefix: "D",
  containerRunningPrefix: "D",
  sectors: [
    { label: "PORT SUDAN", code: "P" },
    { label: "KHARTOUM", code: "K" },
  ],
  shippingLines: [
    { label: "ABUDHABI SHIPPING", code: "ADS" },
    { label: "MSC", code: "MSC" },
    { label: "MAERSK", code: "MAE" },
    { label: "CMA CGM", code: "CMA" },
    { label: "DAL SHIPPING", code: "DAL" },
  ],
  portsOfLoading: ["DOHA, QATAR", "HAMAD PORT, QATAR"],
  portsOfDischarge: ["PORT SUDAN, SUDAN", "KHARTOUM DRY PORT, SUDAN"],
  containerTypes: ["20FT_NML", "40FT_NML", "40FT_HC", "45FT_HC"],
  directions: ["EXPORT", "IMPORT", "MIX"],
  confirmStatuses: ["NOT CONFIRM", "CONFIRMED"],
  useNumberPlate: false,
};

export const TUNISIA_CONFIG: CountryConfig = {
  country: "Tunisia",
  countryCode: "TN",
  runningNumberPrefix: "T",
  containerRunningPrefix: "T",
  sectors: [
    { label: "TUNIS", code: "T" },
    { label: "SFAX", code: "S" },
  ],
  shippingLines: [
    { label: "ABUDHABI SHIPPING", code: "ADS" },
    { label: "MSC", code: "MSC" },
    { label: "CMA CGM", code: "CMA" },
    { label: "MAERSK", code: "MAE" },
    { label: "COTUNAV", code: "CTN" },
  ],
  portsOfLoading: ["DOHA, QATAR", "HAMAD PORT, QATAR"],
  portsOfDischarge: ["TUNIS, TUNISIA", "SFAX, TUNISIA", "RADES, TUNISIA"],
  containerTypes: ["20FT_NML", "40FT_NML", "40FT_HC", "45FT_HC"],
  directions: ["EXPORT", "IMPORT", "MIX"],
  confirmStatuses: ["NOT CONFIRM", "CONFIRMED"],
  useNumberPlate: true,
};
