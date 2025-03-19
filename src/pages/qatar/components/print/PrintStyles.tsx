
import React from "react";

const PrintStyles: React.FC = () => {
  return (
    <style type="text/css" media="print">
      {`
        @page {
          size: A4 landscape;
          margin: 10mm;
        }
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }
        .print\\:hidden {
          display: none !important;
        }
        .bg-blue-100 {
          background-color: #dbeafe !important;
        }
        .bg-green-100 {
          background-color: #d1fae5 !important;
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
            width: 297mm; /* A4 width in landscape */
            height: 210mm; /* A4 height in landscape */
          }
          .company-name {
            font-weight: bold;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
