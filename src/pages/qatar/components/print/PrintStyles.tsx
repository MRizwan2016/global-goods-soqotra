
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
            overflow: visible !important;
          }
          .company-name {
            font-weight: bold;
          }
          .print-container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          img {
            display: block !important;
            visibility: visible !important;
          }
          a[href]:after {
            content: none !important;
          }
          button {
            display: none !important;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
