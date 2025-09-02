
import React from "react";

const TunisiaPrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A5 portrait;
            margin: 10mm;
          }
          
          /* Force print color accuracy */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Hide everything on the page */
          body * {
            visibility: hidden !important;
          }
          
          /* Show only the receipt and its children */
          #tunisia-payment-receipt-print,
          #tunisia-payment-receipt-print * {
            visibility: visible !important;
          }
          
          /* Position receipt for print */
          #tunisia-payment-receipt-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            font-family: Arial, sans-serif !important;
            font-size: 10pt !important;
            line-height: 1.3 !important;
            padding: 5mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          
          /* Reset all text colors to black for print */
          #tunisia-payment-receipt-print,
          #tunisia-payment-receipt-print *,
          #tunisia-payment-receipt-print .text-primary,
          #tunisia-payment-receipt-print .text-muted-foreground {
            color: black !important;
            background: transparent !important;
          }
          
          /* Ensure proper display for layout elements */
          #tunisia-payment-receipt-print .grid {
            display: grid !important;
          }
          
          #tunisia-payment-receipt-print .grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
            gap: 10mm !important;
          }
          
          #tunisia-payment-receipt-print .flex {
            display: flex !important;
          }
          
          #tunisia-payment-receipt-print .justify-between {
            justify-content: space-between !important;
          }
          
          #tunisia-payment-receipt-print .text-center {
            text-align: center !important;
          }
          
          #tunisia-payment-receipt-print .text-right {
            text-align: right !important;
          }
          
          /* Typography for print */
          #tunisia-payment-receipt-print h1 {
            font-size: 14pt !important;
            font-weight: bold !important;
            margin-bottom: 4pt !important;
          }
          
          #tunisia-payment-receipt-print h2 {
            font-size: 12pt !important;
            font-weight: bold !important;
            margin-bottom: 3pt !important;
          }
          
          #tunisia-payment-receipt-print h3 {
            font-size: 11pt !important;
            font-weight: bold !important;
            margin-bottom: 2pt !important;
          }
          
          #tunisia-payment-receipt-print .text-lg {
            font-size: 11pt !important;
          }
          
          #tunisia-payment-receipt-print .text-sm {
            font-size: 9pt !important;
          }
          
          #tunisia-payment-receipt-print .text-xs {
            font-size: 8pt !important;
          }
          
          /* Spacing for print */
          #tunisia-payment-receipt-print .mb-8 {
            margin-bottom: 6pt !important;
          }
          
          #tunisia-payment-receipt-print .mb-3 {
            margin-bottom: 2pt !important;
          }
          
          #tunisia-payment-receipt-print .space-y-2 > * + * {
            margin-top: 2pt !important;
          }
          
          #tunisia-payment-receipt-print .border-t {
            border-top: 1px solid black !important;
            padding-top: 2pt !important;
          }
          
          #tunisia-payment-receipt-print .font-semibold,
          #tunisia-payment-receipt-print .font-bold {
            font-weight: bold !important;
          }
          
          /* Ensure proper spacing between sections */
          #tunisia-payment-receipt-print > div {
            page-break-inside: avoid !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;
