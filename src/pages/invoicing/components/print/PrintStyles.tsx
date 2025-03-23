
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
          color-adjust: exact; /* For Firefox */
        }
        .print\\:hidden {
          display: none !important;
        }
        .print\\:shadow-none {
          box-shadow: none !important;
        }
        table {
          page-break-inside: auto;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        thead {
          display: table-header-group;
        }
        tfoot {
          display: table-footer-group;
        }
        @media print {
          html, body {
            width: 210mm; /* A4 width */
            height: 297mm; /* A4 height */
            margin: 0;
            padding: 0;
          }
          .print-container {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
