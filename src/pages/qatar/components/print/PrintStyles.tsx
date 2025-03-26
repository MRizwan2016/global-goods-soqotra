
import React from "react";

interface PrintStylesProps {
  orientation?: "portrait" | "landscape";
}

const PrintStyles: React.FC<PrintStylesProps> = ({ orientation = "portrait" }) => {
  return (
    <style>
      {`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .page-break-before {
            page-break-before: always;
          }
          .no-print {
            display: none !important;
          }
          
          /* Orientation settings */
          @page {
            size: ${orientation === "landscape" ? "landscape" : "portrait"};
            margin: 1cm;
          }
          
          /* Layout adjustments for landscape */
          .landscape table {
            font-size: 0.9em;
          }
          
          /* Fix table width issues */
          table {
            width: 100% !important;
            table-layout: fixed;
          }
          
          /* Add logo styling */
          .logo-container {
            text-align: center;
            margin-bottom: 10px;
          }
          
          /* Section page breaks */
          .print-section {
            page-break-after: always;
          }
          
          /* Last section should not have page break */
          .print-section:last-child {
            page-break-after: avoid;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
