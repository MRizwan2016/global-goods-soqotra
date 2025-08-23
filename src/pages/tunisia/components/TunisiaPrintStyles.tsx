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
          
          /* Hide everything first */
          * {
            visibility: hidden !important;
          }
          
          body {
            background: white !important;
            font-size: 9pt !important;
            margin: 0 !important;
            padding: 0 !important;
            visibility: visible !important;
          }
          
          /* Hide dashboard and sidebar completely */
          .sidebar, .min-h-screen > div:first-child,
          nav, header, aside, 
          [class*="sidebar"], [class*="nav"], [class*="menu"],
          .dashboard, [class*="dashboard"] {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Show only the receipt container */
          .max-w-4xl {
            visibility: visible !important;
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Show the specific receipt */
          #tunisia-payment-receipt-print {
            visibility: visible !important;
            display: block !important;
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
          
          /* Show all receipt content */
          #tunisia-payment-receipt-print * {
            visibility: visible !important;
            color: black !important;
            background: white !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;