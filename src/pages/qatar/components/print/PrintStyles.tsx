
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
          
          /* Hide everything by default */
          body * {
            visibility: hidden;
          }
          
          /* Then only show what we want to print */
          .print-container, 
          .print-container *,
          .print-only, 
          .print-only * {
            visibility: visible !important;
            overflow: visible !important;
          }
          
          /* Position the print container properly */
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            overflow: visible !important;
            z-index: 9999;
            background-color: white !important;
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
          
          /* Basic styling for print content */
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
            color: black !important;
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
          
          /* For landscape mode, adjust table layout */
          .landscape table {
            font-size: 0.9em;
          }
          
          /* Ensure images print */
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
          }
        }
        
        /* Styles for print preview mode on screen */
        .print-only {
          display: none;
        }
        
        @media screen {
          body.print-only-manifest .print-only {
            display: block !important;
            visibility: visible !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            z-index: 9000;
            padding: 20px;
            min-height: 100vh;
          }
          
          body.print-only-manifest .print\\:hidden {
            display: none !important;
          }
          
          .print-manifest {
            background: white;
            padding: 20px;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
