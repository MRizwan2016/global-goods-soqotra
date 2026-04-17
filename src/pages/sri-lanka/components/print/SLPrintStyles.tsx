import React from "react";

interface SLPrintStylesProps {
  mode: string;
}

const SLPrintStyles: React.FC<SLPrintStylesProps> = ({ mode }) => {
  const isLandscape = mode === "air-manifest" || mode === "sea-manifest";
  const isA5 = mode === "receipt";

  return (
    <style>
      {`
        /* Screen preview: visible A4 page with border */
        .sl-print-page {
          border: 2px solid #000 !important;
          box-sizing: border-box;
        }
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
          .no-print {
            display: none !important;
          }
          .min-h-screen {
            min-height: auto !important;
          }
          .bg-gray-50 {
            background: white !important;
          }
          .shadow-lg {
            box-shadow: none !important;
          }
          .max-w-4xl {
            max-width: none !important;
          }
          .sl-print-page {
            border: 1.5px solid #000 !important;
            width: ${isLandscape ? '281mm' : isA5 ? '138mm' : '194mm'} !important;
            min-height: ${isLandscape ? '194mm' : isA5 ? '200mm' : '281mm'} !important;
            margin: 0 auto !important;
          }
        }
      `}
    </style>
  );
};

export default SLPrintStyles;
