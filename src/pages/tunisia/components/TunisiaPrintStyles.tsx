import React from "react";

const TunisiaPrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A5 landscape;
            margin: 10mm;
          }
          
          /* Reset all elements to ensure proper printing */
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
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
            font-size: 9pt !important;
          }
          
          /* Hide non-printable elements */
          .print\\:hidden,
          .no-print,
          button,
          .button,
          [role="button"],
          input,
          select,
          .sidebar,
          nav,
          header,
          aside,
          [class*="sidebar"],
          [class*="nav"],
          [class*="menu"],
          .dashboard,
          [class*="dashboard"] {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Make sure the print container is visible */
          #tunisia-payment-receipt-print,
          .tunisia-payment-receipt,
          .max-w-4xl {
            display: block !important;
            visibility: visible !important;
            position: relative !important;
            width: 100% !important;
            max-width: none !important;
            overflow: visible !important;
            page-break-inside: avoid !important;
            color: black !important;
            background-color: white !important;
            margin: 0 !important;
            padding: 8mm !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          
          /* Make headings and text print with the right colors */
          h1, h2, h3, h4, h5, h6, p, div, span, table {
            color: black !important;
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
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;