
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
            visibility: visible !important;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            padding: 10mm;
          }
          
          /* Fix for delayed printing */
          @keyframes printDelay {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .print-container {
            animation: printDelay 0.5s;
            animation-fill-mode: forwards;
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
            border-collapse: collapse;
            margin-bottom: 10mm;
            page-break-inside: auto;
          }
          
          table, th, td {
            border: 1px solid #000 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          th {
            background-color: #f0f0f0 !important;
            color: #000 !important;
            font-weight: bold;
            padding: 8px;
            text-align: left;
          }
          
          td {
            padding: 8px;
            text-align: left;
          }
          
          /* Add logo styling */
          .logo-container {
            text-align: center;
            margin-bottom: 10mm;
          }
          
          /* Section page breaks */
          .print-section {
            page-break-after: always;
          }
          
          /* Last section should not have page break */
          .print-section:last-child {
            page-break-after: avoid;
          }
          
          /* Ensure print-only elements are visible */
          .print-only {
            display: block !important;
            visibility: visible !important;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
