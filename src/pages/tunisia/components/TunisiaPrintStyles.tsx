import React from "react";

const TunisiaPrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A5;
            margin: 15mm;
          }
          
          /* Reset everything for print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-sizing: border-box !important;
          }
          
          /* Hide the entire document first */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
            background: white !important;
            font-family: Arial, sans-serif !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            color: black !important;
          }
          
          /* Hide everything by default */
          body * {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Only show the tunisia payment receipt and make it the entire page */
          .tunisia-payment-receipt {
            display: block !important;
            visibility: visible !important;
            position: static !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
            page-break-after: avoid !important;
            overflow: visible !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          
          /* Show all children of the receipt */
          .tunisia-payment-receipt,
          .tunisia-payment-receipt * {
            display: block !important;
            visibility: visible !important;
            color: black !important;
            background-color: transparent !important;
          }
          
          /* Specific layout overrides for receipt content */
          .tunisia-payment-receipt .grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 15px !important;
            margin-bottom: 15px !important;
          }
          
          .tunisia-payment-receipt .flex {
            display: flex !important;
          }
          
          .tunisia-payment-receipt .text-center {
            text-align: center !important;
          }
          
          .tunisia-payment-receipt .justify-between {
            justify-content: space-between !important;
          }
          
          .tunisia-payment-receipt .space-y-2 > * + * {
            margin-top: 4px !important;
          }
          
          .tunisia-payment-receipt .mb-8 {
            margin-bottom: 15px !important;
          }
          
          .tunisia-payment-receipt .mb-3 {
            margin-bottom: 6px !important;
          }
          
          .tunisia-payment-receipt .mb-2 {
            margin-bottom: 4px !important;
          }
          
          .tunisia-payment-receipt .mt-4 {
            margin-top: 8px !important;
          }
          
          .tunisia-payment-receipt .pt-2 {
            padding-top: 4px !important;
          }
          
          /* Typography */
          .tunisia-payment-receipt h1 {
            font-size: 18pt !important;
            font-weight: bold !important;
            color: black !important;
            margin: 0 0 8px 0 !important;
            display: block !important;
          }
          
          .tunisia-payment-receipt h3 {
            font-size: 12pt !important;
            font-weight: 600 !important;
            color: black !important;
            margin: 0 0 6px 0 !important;
            display: block !important;
          }
          
          .tunisia-payment-receipt p {
            display: block !important;
            margin: 2px 0 !important;
            font-size: 10pt !important;
          }
          
          .tunisia-payment-receipt .text-lg {
            font-size: 14pt !important;
            display: block !important;
          }
          
          .tunisia-payment-receipt .text-sm {
            font-size: 9pt !important;
          }
          
          .tunisia-payment-receipt .font-bold {
            font-weight: bold !important;
          }
          
          .tunisia-payment-receipt .font-semibold {
            font-weight: 600 !important;
          }
          
          .tunisia-payment-receipt .font-medium {
            font-weight: 500 !important;
          }
          
          /* Borders */
          .tunisia-payment-receipt .border-t {
            border-top: 1px solid black !important;
          }
          
          .tunisia-payment-receipt .border-b {
            border-bottom: 1px solid black !important;
          }
          
          /* Tables if any */
          .tunisia-payment-receipt table {
            width: 100% !important;
            border-collapse: collapse !important;
            display: table !important;
          }
          
          .tunisia-payment-receipt th,
          .tunisia-payment-receipt td {
            border: 1px solid black !important;
            padding: 4px !important;
            text-align: left !important;
            display: table-cell !important;
          }
          
          /* Remove all box shadows, transitions, and effects */
          .tunisia-payment-receipt * {
            box-shadow: none !important;
            text-shadow: none !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
          
          /* Show only printable content */
          .print\\:block {
            display: block !important;
            visibility: visible !important;
          }
          
          .print\\:inline {
            display: inline !important;
            visibility: visible !important;
          }
          
          .print\\:flex {
            display: flex !important;
            visibility: visible !important;
          }
          
          /* Bill of Lading specific styles */
          .house-bill-of-lading,
          [class*="bill-of-lading"],
          [class*="hbl-document"],
          [id*="hbl"],
          [id*="bill-of-lading"] {
            display: block !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: white !important;
            color: black !important;
            font-size: 10pt !important;
            line-height: 1.3 !important;
            page-break-inside: avoid;
          }
          
          /* Table styles for bill of lading */
          table {
            border-collapse: collapse !important;
            width: 100% !important;
            font-size: 9pt !important;
            page-break-inside: avoid;
          }
          
          th, td {
            border: 1px solid black !important;
            padding: 2px 4px !important;
            text-align: left !important;
            vertical-align: top !important;
          }
          
          th {
            background: white !important;
            font-weight: bold !important;
          }
          
          /* Typography for print */
          h1, h2, h3, h4, h5, h6 {
            color: black !important;
            margin: 2px 0 !important;
            line-height: 1.2 !important;
          }
          
          p {
            margin: 1px 0 !important;
            line-height: 1.3 !important;
          }
          
          /* Border styles */
          .border,
          .border-black,
          .border-gray-400 {
            border: 1px solid black !important;
          }
          
          .border-2 {
            border: 2px solid black !important;
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
          
          .border-l {
            border-left: 1px solid black !important;
          }
          
          /* Grid and layout */
          .grid {
            display: grid !important;
          }
          
          .flex {
            display: flex !important;
          }
          
          /* Text styles */
          .font-bold {
            font-weight: bold !important;
          }
          
          .font-semibold {
            font-weight: 600 !important;
          }
          
          .text-center {
            text-align: center !important;
          }
          
          .text-right {
            text-align: right !important;
          }
          
          /* Ensure main content is visible */
          main,
          .main-content,
          .page-content,
          .content,
          .container,
          .wrapper {
            all: unset !important;
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          
          /* Force show document containers */
          [class*="document"],
          [class*="invoice"],
          [class*="receipt"],
          [class*="report"],
          [class*="certificate"] {
            display: block !important;
            background: white !important;
            color: black !important;
          }
          
          /* Tunisia Payment Receipt specific styles */
          .tunisia-payment-receipt {
            display: block !important;
            background: white !important;
            color: black !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 15mm !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            page-break-inside: avoid;
          }
          
          .tunisia-payment-receipt h1 {
            font-size: 18pt !important;
            margin-bottom: 8px !important;
          }
          
          .tunisia-payment-receipt h3 {
            font-size: 12pt !important;
            margin-bottom: 6px !important;
            margin-top: 12px !important;
          }
          
          .tunisia-payment-receipt .grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
          
          .tunisia-payment-receipt .space-y-2 > div {
            margin-bottom: 4px !important;
          }
          
          /* Page breaks */
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-after {
            page-break-after: always;
          }
          
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          
          /* Remove shadows and effects */
          * {
            box-shadow: none !important;
            text-shadow: none !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;