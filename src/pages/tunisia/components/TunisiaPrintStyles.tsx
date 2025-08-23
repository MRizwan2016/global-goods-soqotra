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
          
          /* NUCLEAR ANNIHILATION OF EVERYTHING */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* TOTAL DESTRUCTION - Hide the entire Layout system */
          .flex.min-h-screen,
          .flex-1.flex.flex-col,
          .flex-1.p-6,
          main.flex-1,
          .bg-slate-50,
          body > div,
          #root,
          #root > *,
          body > *:not(.tunisia-payment-receipt):not(.max-w-4xl) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -99999px !important;
            top: -99999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
          }
          
          /* OBLITERATE SIDEBAR AND HEADER COMPLETELY */
          [class*="sidebar"],
          [class*="Sidebar"],
          [class*="header"], 
          [class*="Header"],
          nav, header, aside, footer,
          .navigation, .nav, .menu,
          .dashboard, .admin, .accounts, .upb, .cargo,
          [class*="dashboard"], [class*="admin"], [class*="accounts"],
          [class*="upb"], [class*="cargo"], [class*="collection"],
          [class*="delivery"], [class*="nav"], [class*="menu"],
          [class*="toolbar"], [class*="breadcrumb"],
          [data-testid*="sidebar"],
          [data-testid*="header"],
          .min-h-screen > *:first-child,
          .flex.min-h-screen > *:first-child {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -99999px !important;
            top: -99999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
          }
          
          /* RESET EVERYTHING TO CLEAN STATE */
          html {
            font-size: 9pt !important;
            font-family: Arial, sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
            width: 100% !important;
            height: 100% !important;
          }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
            font-family: Arial, sans-serif !important;
            font-size: 9pt !important;
            line-height: 1.3 !important;
            overflow: visible !important;
            position: static !important;
            width: 100% !important;
            height: 100% !important;
          }
          
          /* FORCE SHOW ONLY payment receipt containers */
          .max-w-4xl,
          .tunisia-payment-receipt {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: static !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 8mm !important;
            background: white !important;
            color: black !important;
            font-family: Arial, sans-serif !important;
            font-size: 9pt !important;
            line-height: 1.3 !important;
            overflow: visible !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            transform: none !important;
            filter: none !important;
            z-index: 999999 !important;
          }
          
          /* Show all receipt children and containers */
          .max-w-4xl *,
          .tunisia-payment-receipt * {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            color: black !important;
            background: white !important;
            position: static !important;
            margin: auto !important;
            padding: auto !important;
            border: none !important;
            box-shadow: none !important;
            text-shadow: none !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
          
          /* Receipt layout fixes */
          .tunisia-payment-receipt .grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            margin-bottom: 10px !important;
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
            margin-top: 3px !important;
          }
          
          /* Receipt typography */
          .tunisia-payment-receipt h1 {
            font-size: 14pt !important;
            font-weight: bold !important;
            color: black !important;
            margin: 0 0 6px 0 !important;
            text-align: center !important;
            background: white !important;
          }
          
          .tunisia-payment-receipt h3 {
            font-size: 10pt !important;
            font-weight: 600 !important;
            color: black !important;
            margin: 8px 0 4px 0 !important;
            background: white !important;
          }
          
          .tunisia-payment-receipt p {
            margin: 2px 0 !important;
            font-size: 8pt !important;
            color: black !important;
            background: white !important;
          }
          
          .tunisia-payment-receipt .text-lg {
            font-size: 11pt !important;
          }
          
          .tunisia-payment-receipt .text-sm {
            font-size: 7pt !important;
          }
          
          .tunisia-payment-receipt .text-xs {
            font-size: 6pt !important;
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
          
          /* Receipt spacing */
          .tunisia-payment-receipt .mb-8 {
            margin-bottom: 10px !important;
          }
          
          .tunisia-payment-receipt .mb-3 {
            margin-bottom: 4px !important;
          }
          
          .tunisia-payment-receipt .mb-2 {
            margin-bottom: 3px !important;
          }
          
          .tunisia-payment-receipt .mt-4 {
            margin-top: 6px !important;
          }
          
          .tunisia-payment-receipt .pt-2,
          .tunisia-payment-receipt .pt-4 {
            padding-top: 3px !important;
          }
          
          /* Force white backgrounds and black text */
          .tunisia-payment-receipt,
          .tunisia-payment-receipt * {
            background-color: white !important;
            color: black !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;