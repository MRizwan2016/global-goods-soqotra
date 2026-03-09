
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
            size: A4 ${orientation === "landscape" ? "landscape" : "portrait"};
            margin: 10mm;
          }
          
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body, html {
            visibility: visible !important;
            overflow: visible !important;
            background-color: white !important;
            height: auto !important;
            width: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            color: black !important;
            font-family: Arial, sans-serif !important;
          }
          
          /* Only hide elements explicitly marked as no-print */
          .no-print,
          .print\\:hidden {
            display: none !important;
          }
          
          /* Ensure all print containers and their children are visible */
          .print-container,
          .print-container *,
          .print-content,
          .print-content * {
            visibility: visible !important;
          }
          
          .print-container,
          .print-content {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            overflow: visible !important;
            background-color: white !important;
            color: black !important;
          }

          /* Text colors for print */
          h1, h2, h3, h4, h5, h6, p, span, div, td, th {
            color: black !important;
          }
          
          /* Table styles */
          table {
            border-collapse: collapse;
            width: 100%;
            page-break-inside: auto;
          }
          
          table, th, td {
            border: 1px solid #ddd !important;
            padding: 8px !important;
          }
          
          th {
            background-color: #f2f2f2 !important;
          }
          
          tr {
            page-break-inside: avoid;
          }
          
          /* Badge styles */
          .badge, [class*="badge-"], .badge-outline {
            background-color: white !important;
            color: black !important;
            border: 1px solid #333 !important;
          }
          
          /* Print header */
          .print-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #333 !important;
          }
          
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
          }
          
          svg, canvas, .qrcode {
            background-color: white !important;
            display: block !important;
            visibility: visible !important;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
