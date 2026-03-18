import React from "react";

interface SAPrintStylesProps {
  mode: "invoice" | "hbl" | "manifest" | "receipt";
}

const SAPrintStyles: React.FC<SAPrintStylesProps> = ({ mode }) => {
  const isLandscape = mode === "manifest";
  const isA5 = mode === "receipt";

  return (
    <style>
      {`
        @media print {
          @page {
            size: ${isA5 ? "A5 portrait" : isLandscape ? "A4 landscape" : "A4 portrait"};
            margin: ${isA5 ? "5mm" : "8mm"};
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print, .sa-print-toolbar {
            display: none !important;
          }
          .sa-print-container {
            padding: 0 !important;
            background: white !important;
            max-width: 100% !important;
          }
          #sa-print-content {
            box-shadow: none !important;
            max-width: none !important;
            width: 100% !important;
          }
          .break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}
    </style>
  );
};

export default SAPrintStyles;
