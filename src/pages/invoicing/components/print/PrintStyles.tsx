
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
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
        
        .print\\:hidden {
          display: none !important;
        }
        
        .print\\:shadow-none {
          box-shadow: none !important;
        }
        
        table {
          page-break-inside: auto;
          width: 100%;
          border-collapse: collapse;
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
            background-color: white;
          }
          
          .print-container {
            width: 100% !important;
            max-width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            background-color: white;
          }
          
          button, .no-print {
            display: none !important;
          }
          
          @page {
            size: A4;
            margin: 10mm;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
