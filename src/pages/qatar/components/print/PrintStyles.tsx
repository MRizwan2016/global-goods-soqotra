
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
            visibility: hidden !important;
          }
          
          body.print-only-manifest * {
            visibility: hidden !important;
          }
          
          .print-container, .print-container * {
            visibility: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            padding: 10mm !important;
            background-color: white !important;
          }
          
          /* Orientation settings */
          @page {
            size: ${orientation === "landscape" ? "landscape" : "portrait"};
            margin: 15mm;
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
          
          /* Hide non-print elements */
          .no-print {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Prevent links from showing their URLs */
          a {
            text-decoration: none !important;
            color: #000 !important;
          }
          
          /* Force background colors to print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
