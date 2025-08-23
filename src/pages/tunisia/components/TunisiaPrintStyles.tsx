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
          
          body {
            background: white !important;
            font-size: 9pt !important;
          }
          
          /* Hide dashboard elements */
          .min-h-screen > div:first-child,
          .sidebar, nav, header, aside,
          [class*="sidebar"], [class*="nav"], [class*="menu"],
          .dashboard, [class*="dashboard"],
          .print\\:hidden {
            display: none !important;
          }
          
          /* Style the receipt */
          #tunisia-payment-receipt-print,
          .tunisia-payment-receipt {
            box-shadow: none !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 8mm !important;
            background: white !important;
            color: black !important;
            border: none !important;
            border-radius: 0 !important;
            width: 100% !important;
          }
          
          .max-w-4xl {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;