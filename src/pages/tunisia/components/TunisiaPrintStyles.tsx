import React from "react";

const TunisiaPrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          
          /* Hide everything first */
          * {
            visibility: hidden !important;
          }
          
          body, html {
            background: white !important;
            font-size: 10pt !important;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.2 !important;
          }
          
          /* Show both receipt and HBL documents */
          #tunisia-payment-receipt-print,
          #tunisia-payment-receipt-print *,
          .bill-of-lading-document,
          .bill-of-lading-document * {
            visibility: visible !important;
            display: block !important;
          }
          
          /* Receipt styles */
          #tunisia-payment-receipt-print {
            position: static !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
          }
          
          /* HBL document styles */
          .bill-of-lading-document {
            position: static !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
            box-shadow: none !important;
            page-break-before: always !important;
            page-break-inside: avoid !important;
          }
          
          /* Ensure all text is black */
          #tunisia-payment-receipt-print *,
          .bill-of-lading-document * {
            color: black !important;
            background: transparent !important;
          }
          
          /* Grid layouts for print */
          .grid {
            display: grid !important;
          }
          
          .grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
          }
          
          .grid-cols-3 {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
          
          .grid-cols-12 {
            grid-template-columns: repeat(12, 1fr) !important;
          }
          
          .col-span-2 { grid-column: span 2 !important; }
          .col-span-3 { grid-column: span 3 !important; }
          .col-span-4 { grid-column: span 4 !important; }
          .col-span-8 { grid-column: span 8 !important; }
          
          .flex {
            display: flex !important;
          }
          
          .justify-between {
            justify-content: space-between !important;
          }
          
          .text-center {
            text-align: center !important;
          }
          
          .text-right {
            text-align: right !important;
          }
          
          .border, .border-2 {
            border: 1px solid black !important;
          }
          
          .border-r {
            border-right: 1px solid black !important;
          }
          
          .border-b {
            border-bottom: 1px solid black !important;
          }
          
          .border-t {
            border-top: 1px solid black !important;
          }
          
          .font-bold {
            font-weight: bold !important;
          }
          
          .p-2 {
            padding: 4pt !important;
          }
          
          .p-4 {
            padding: 8pt !important;
          }
          
          .mb-1 {
            margin-bottom: 2pt !important;
          }
          
          .mb-2 {
            margin-bottom: 4pt !important;
          }
          
          .mb-4 {
            margin-bottom: 8pt !important;
          }
          
          .mt-2 {
            margin-top: 4pt !important;
          }
          
          .mt-4 {
            margin-top: 8pt !important;
          }
          
          .space-y-2 > * + * {
            margin-top: 4pt !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;