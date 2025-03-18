
import React from "react";

const PrintStyles: React.FC = () => {
  return (
    <style type="text/css" media="print">
      {`
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .print\\:hidden {
          display: none !important;
        }
        .print\\:shadow-none {
          box-shadow: none !important;
        }
      `}
    </style>
  );
};

export default PrintStyles;
