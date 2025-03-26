
import React from "react";

interface PrintStylesProps {
  orientation?: string;
}

const PrintStyles: React.FC<PrintStylesProps> = ({ orientation = "portrait" }) => {
  return (
    <style type="text/css" media="print">
      {`
        @page {
          size: A4 ${orientation};
          margin: 10mm;
        }
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .print-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 0;
          background-color: white;
        }
        .company-name {
          color: #1E40AF !important;
        }
        button, .no-print {
          display: none !important;
        }
        .bg-blue-600 {
          background-color: #2563EB !important;
          color: white !important;
        }
        .bg-blue-100 {
          background-color: #DBEAFE !important;
        }
        .bg-gray-100 {
          background-color: #F3F4F6 !important;
        }
        .border {
          border: 1px solid #000 !important;
        }
        .border-r {
          border-right: 1px solid #000 !important;
        }
        .border-b {
          border-bottom: 1px solid #000 !important;
        }
        .text-blue-800 {
          color: #1E40AF !important;
        }
        
        /* Page break classes */
        .page-break-before {
          page-break-before: always;
        }
        .page-break-after {
          page-break-after: always;
        }
        .page-break-after-avoid {
          page-break-after: avoid;
        }
        .page-break-inside-avoid {
          page-break-inside: avoid;
        }
      `}
    </style>
  );
};

export default PrintStyles;
