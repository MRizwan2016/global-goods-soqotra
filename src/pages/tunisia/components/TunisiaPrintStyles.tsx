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
          
          /* NUCLEAR APPROACH: Hide absolutely everything first */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Hide all body content completely */
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            font-family: Arial, sans-serif !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            color: black !important;
            overflow: hidden !important;
          }
          
          /* Hide every single element in the body */
          body > * {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -9999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          
          /* Hide navigation, sidebars, headers, etc. */
          nav, 
          header, 
          aside, 
          footer,
          .sidebar,
          .navigation,
          .nav,
          .menu,
          .header,
          .footer,
          .controls,
          .toolbar,
          .breadcrumb,
          [class*="nav"],
          [class*="menu"],
          [class*="sidebar"],
          [class*="header"],
          [class*="footer"],
          [class*="toolbar"],
          [id*="nav"],
          [id*="menu"],
          [id*="sidebar"],
          [id*="header"],
          [id*="footer"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -9999px !important;
            width: 0 !important;
            height: 0 !important;
          }
          
          /* Hide dashboard specific elements */
          .dashboard,
          .admin,
          .accounts,
          .upb,
          .cargo,
          [class*="dashboard"],
          [class*="admin"],
          [class*="accounts"],
          [class*="upb"],
          [class*="cargo"],
          [class*="collection"],
          [class*="delivery"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
          
          /* Only show tunisia payment receipt */
          .tunisia-payment-receipt {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: static !important;
            left: auto !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 15mm !important;
            background: white !important;
            color: black !important;
            overflow: visible !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            page-break-inside: avoid;
          }
          
          /* Show all children of the payment receipt */
          .tunisia-payment-receipt,
          .tunisia-payment-receipt * {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            color: black !important;
            background-color: transparent !important;
            position: static !important;
            left: auto !important;
            width: auto !important;
            height: auto !important;
          }
          
          /* Layout for receipt content */
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
          
          /* Typography for receipt */
          .tunisia-payment-receipt h1 {
            font-size: 18pt !important;
            font-weight: bold !important;
            color: black !important;
            margin: 0 0 8px 0 !important;
            text-align: center !important;
          }
          
          .tunisia-payment-receipt h3 {
            font-size: 12pt !important;
            font-weight: 600 !important;
            color: black !important;
            margin: 12px 0 6px 0 !important;
          }
          
          .tunisia-payment-receipt p {
            margin: 2px 0 !important;
            font-size: 10pt !important;
            color: black !important;
          }
          
          .tunisia-payment-receipt .text-lg {
            font-size: 14pt !important;
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
          
          /* Margins for receipt sections */
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
          
          /* Remove all effects */
          .tunisia-payment-receipt * {
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