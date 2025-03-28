
import React from "react";

interface PrintStylesProps {
  orientation?: "portrait" | "landscape";
}

const PrintStyles: React.FC<PrintStylesProps> = ({ orientation = "portrait" }) => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: ${orientation === "landscape" ? "landscape" : "portrait"};
            margin: 15mm;
          }
          
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: white !important;
          }
          
          .print-only {
            display: block !important;
            visibility: visible !important;
          }
          
          .print:hidden {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Make headings and text print with the right colors */
          h1, h2, h3, h4, h5, h6, p, table, div {
            color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Ensure tables print properly */
          table {
            border-collapse: collapse;
            width: 100%;
          }
          
          table, th, td {
            border: 1px solid #ddd;
          }
          
          th, td {
            padding: 8px;
            text-align: left;
          }
          
          /* Add page breaks if needed */
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-after {
            page-break-after: always;
          }
          
          /* Hide non-printable elements */
          button, .print\:hidden, .no-print {
            display: none !important;
          }
          
          /* Ensure the print container is visible */
          .print-container {
            display: block !important;
            visibility: visible !important;
            width: 100% !important;
            max-width: none !important;
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
          }
          
          /* For landscape mode, adjust table layout */
          .landscape table {
            font-size: 0.9em;
          }
        }
        
        /* Styles for print preview mode */
        .print-only {
          display: none;
        }
        
        @media screen {
          body.print-only-manifest .print-only {
            display: block;
          }
          
          body.print-only-manifest .print\:hidden {
            display: none;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
