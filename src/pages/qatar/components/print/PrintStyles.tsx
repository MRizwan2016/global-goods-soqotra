
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
          
          /* Reset all elements to ensure proper printing */
          * {
            box-sizing: border-box;
          }
          
          /* Make sure everything is visible in print */
          body, html {
            visibility: visible !important;
            overflow: visible !important;
            background-color: white !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            color: black !important;
            font-family: Arial, sans-serif !important;
          }
          
          /* Hide non-printable elements */
          .print\\:hidden,
          .no-print,
          button,
          .button,
          [role="button"],
          input,
          select {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Make sure the print container is visible */
          .print-container, 
          .print-content,
          #print-container-manifest {
            display: block !important;
            visibility: visible !important;
            position: relative !important;
            width: 100% !important;
            overflow: visible !important;
            page-break-inside: avoid !important;
            color: black !important;
            background-color: white !important;
          }
          
          /* Make headings and text print with the right colors */
          h1, h2, h3, h4, h5, h6, p, table, div {
            color: black !important;
            color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Ensure tables print properly */
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
            color: black !important;
          }
          
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          /* Add page breaks if needed */
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-after {
            page-break-after: always;
          }
          
          /* Special formatting for the container header */
          .print-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #333 !important;
          }
          
          .print-header h1 {
            font-size: 24px !important;
            font-weight: bold !important;
          }
          
          /* Ensure images print */
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
