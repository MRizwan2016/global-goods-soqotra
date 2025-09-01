import React from "react";

const TunisiaPrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A5 portrait;
            margin: 5mm;
          }
          
          /* Reset everything for print */
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body, html {
            background: white !important;
            font-size: 10pt !important;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.2 !important;
            color: black !important;
            font-family: Arial, sans-serif !important;
          }
          
          /* Hide everything first */
          body > * {
            display: none !important;
          }
          
          /* Show only the receipt */
          #tunisia-payment-receipt-print {
            display: block !important;
            visibility: visible !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            padding: 5mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            position: relative !important;
            max-width: none !important;
            font-size: 8pt !important;
            line-height: 1.2 !important;
          }
          
          /* Make all receipt content visible */
          #tunisia-payment-receipt-print,
          #tunisia-payment-receipt-print * {
            display: block !important;
            visibility: visible !important;
            color: black !important;
            background: white !important;
          }
          
          /* Specific display types for receipt content */
          #tunisia-payment-receipt-print .grid {
            display: grid !important;
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
          
          #tunisia-payment-receipt-print .font-bold {
            font-weight: bold !important;
          }
          
          #tunisia-payment-receipt-print .border {
            border: 1px solid black !important;
          }
          
          #tunisia-payment-receipt-print .border-t {
            border-top: 1px solid black !important;
          }
          
          #tunisia-payment-receipt-print .border-b {
            border-bottom: 1px solid black !important;
          }
          
          #tunisia-payment-receipt-print .mb-6 {
            margin-bottom: 8pt !important;
          }
          
          #tunisia-payment-receipt-print .mb-4 {
            margin-bottom: 6pt !important;
          }
          
          #tunisia-payment-receipt-print .mb-2 {
            margin-bottom: 3pt !important;
          }
          
          #tunisia-payment-receipt-print .mt-2 {
            margin-top: 3pt !important;
          }
          
          #tunisia-payment-receipt-print .p-3 {
            padding: 4pt !important;
          }
          
          #tunisia-payment-receipt-print .py-4 {
            padding-top: 6pt !important;
            padding-bottom: 6pt !important;
          }
          
          #tunisia-payment-receipt-print .pt-4 {
            padding-top: 6pt !important;
          }
          
          #tunisia-payment-receipt-print .space-y-4 > * + * {
            margin-top: 6pt !important;
          }
          
          #tunisia-payment-receipt-print .space-y-2 > * + * {
            margin-top: 3pt !important;
          }
          
          #tunisia-payment-receipt-print .grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
          }
          
          #tunisia-payment-receipt-print .gap-4 {
            gap: 6pt !important;
          }
          
          #tunisia-payment-receipt-print .text-2xl {
            font-size: 14pt !important;
          }
          
          #tunisia-payment-receipt-print .text-xl {
            font-size: 12pt !important;
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
          
          #tunisia-payment-receipt-print .rounded {
            border-radius: 2pt !important;
          }
          
          #tunisia-payment-receipt-print .bg-gray-50 {
            background-color: #f9f9f9 !important;
          }
          
          #tunisia-payment-receipt-print .bg-green-50 {
            background-color: #f0fff4 !important;
          }
          
          #tunisia-payment-receipt-print .border-green-200 {
            border-color: #c6f6d5 !important;
          }
          
          #tunisia-payment-receipt-print .text-green-600 {
            color: #22c55e !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;