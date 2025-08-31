import React from "react";

const TunisiaPrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A5;
            margin: 10mm;
          }
          
          body, html {
            background: white !important;
            font-size: 10pt !important;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.2 !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Show everything by default for print */
          * {
            visibility: visible !important;
            color: black !important;
          }
          
          /* Hide ALL non-receipt elements for print */
          body > *:not(#tunisia-payment-receipt-print),
          .print\\:hidden,
          .no-print,
          button,
          .button,
          [role="button"],
          input,
          select,
          .print\\:hidden *,
          .no-print *,
          .sidebar,
          .navigation,
          nav,
          header,
          .header,
          .navbar,
          .menu,
          .layout,
          .dashboard,
          [data-radix-popper-content-wrapper],
          [data-state="open"],
          aside,
          .aside {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Show only the receipt */
          #tunisia-payment-receipt-print,
          #tunisia-payment-receipt-print * {
            display: block !important;
            visibility: visible !important;
          }
          
          /* Receipt on A5 page */
          #tunisia-payment-receipt-print {
            width: 148mm !important;
            height: 210mm !important;
            background: white !important;
            color: black !important;
            padding: 10mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            position: relative !important;
            box-sizing: border-box !important;
            font-size: 9pt !important;
            line-height: 1.3 !important;
          }
          
          /* HBL Printable Content Container */
          #hbl-printable-content {
            width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            position: relative !important;
            overflow: visible !important;
            max-width: none !important;
          }

          /* HBL Document Container */
          .hbl-document {
            width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            position: relative !important;
          }

          /* HBL Front Page */
          .hbl-front-page {
            width: 210mm !important;
            height: 297mm !important;
            background: white !important;
            color: black !important;
            padding: 5mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            display: block !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            position: relative !important;
            transform: scale(1) !important;
            transform-origin: top left !important;
          }
          
          /* HBL Back Page */
          .hbl-back-page {
            width: 210mm !important;
            height: 297mm !important;
            background: white !important;
            color: black !important;
            padding: 5mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            page-break-before: always !important;
            page-break-inside: avoid !important;
            display: block !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            position: relative !important;
            transform: scale(1) !important;
            transform-origin: top left !important;
          }
          
          /* Remove all margins and paddings inside print containers */
          .hbl-front-page .max-w-4xl,
          .hbl-back-page .max-w-4xl {
            max-width: 100% !important;
            padding: 5mm !important;
            margin: 0 !important;
          }
          
          /* Force all text to be black */
          #tunisia-payment-receipt-print *,
          #hbl-printable-content *,
          .hbl-document *,
          .hbl-front-page *,
          .hbl-back-page * {
            color: black !important;
            background: transparent !important;
          }
          
          /* Grid layouts */
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
            grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
          }
          
          .col-span-2 { grid-column: span 2 / span 2 !important; }
          .col-span-3 { grid-column: span 3 / span 3 !important; }
          .col-span-4 { grid-column: span 4 / span 4 !important; }
          .col-span-8 { grid-column: span 8 / span 8 !important; }
          
          .flex {
            display: flex !important;
          }
          
          .justify-between {
            justify-content: space-between !important;
          }
          
          .items-center {
            align-items: center !important;
          }
          
          .text-center {
            text-align: center !important;
          }
          
          .text-right {
            text-align: right !important;
          }
          
          /* Borders */
          .border {
            border: 1px solid black !important;
          }
          
          .border-2 {
            border: 2px solid black !important;
          }
          
          .border-black {
            border-color: black !important;
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
          
          /* Typography */
          .font-bold {
            font-weight: bold !important;
          }
          
          .font-semibold {
            font-weight: 600 !important;
          }
          
          .text-lg {
            font-size: 12pt !important;
          }
          
          .text-sm {
            font-size: 9pt !important;
          }
          
          .text-xs {
            font-size: 8pt !important;
          }
          
          /* Spacing */
          .p-2 {
            padding: 3pt !important;
          }
          
          .p-4 {
            padding: 6pt !important;
          }
          
          .mb-1 {
            margin-bottom: 1pt !important;
          }
          
          .mb-2 {
            margin-bottom: 2pt !important;
          }
          
          .mb-4 {
            margin-bottom: 4pt !important;
          }
          
          .mt-2 {
            margin-top: 2pt !important;
          }
          
          .mt-4 {
            margin-top: 4pt !important;
          }
          
          .space-y-2 > * + * {
            margin-top: 2pt !important;
          }
          
          .space-y-3 > * + * {
            margin-top: 3pt !important;
          }
          
          .min-h-\\[40px\\] {
            min-height: 15pt !important;
          }
          
          .min-h-\\[200px\\] {
            min-height: 60pt !important;
          }
          
          .min-h-\\[300px\\] {
            min-height: 90pt !important;
          }
          
          /* Additional spacing utilities */
          .gap-2 {
            gap: 2pt !important;
          }
          
          .gap-4 {
            gap: 4pt !important;
          }
          
          .space-y-1 > * + * {
            margin-top: 1pt !important;
          }
          
          .space-y-4 > * + * {
            margin-top: 4pt !important;
          }
          
          /* Utility classes */
          .uppercase {
            text-transform: uppercase !important;
          }
          
          .max-w-4xl {
            max-width: 100% !important;
          }
          
          /* Remove any container constraints */
          .container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;