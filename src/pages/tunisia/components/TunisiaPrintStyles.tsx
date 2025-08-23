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
          
          /* Payment receipt specific page size */
          .payment-receipt-print {
            @page {
              size: A5;
              margin: 10mm;
            }
          }
          
          /* HBL specific page size */
          .hbl-print {
            @page {
              size: A4;
              margin: 15mm;
            }
          }
          
          body {
            background: white !important;
            font-size: 12pt !important;
            line-height: 1.2 !important;
          }
          
          /* Hide all non-printable elements */
          .print\\:hidden,
          .no-print,
          nav,
          header,
          .sidebar,
          .navigation,
          .dashboard-nav,
          .dashboard-sidebar,
          .top-bar,
          .app-sidebar,
          .main-nav,
          .side-nav,
          .layout-sidebar,
          .bg-sidebar,
          [data-sidebar],
          [class*="sidebar"],
          [role="navigation"],
          [role="banner"],
          button:not(.print-button),
          .btn:not(.print-button),
          .floating-action,
          .tooltip,
          .dropdown,
          .modal-backdrop,
          .loading-spinner,
          .breadcrumb,
          .tab-navigation,
          .pagination,
          .search-bar,
          .filter-controls,
          .action-buttons,
          .edit-controls,
          .form-controls,
          input,
          select,
          textarea,
          .card-header .actions,
          .card-footer,
          .toolbar,
          .status-bar,
          .notification,
          .alert:not(.print-alert),
          .drawer,
          .overlay,
          .backdrop,
          .menu,
          .dropdown-menu,
          .context-menu,
          .popover,
          .toast,
          .snackbar,
          [role="navigation"],
          [role="banner"],
          [role="complementary"],
          [data-testid*="nav"],
          [data-testid*="menu"],
          [data-testid*="button"]:not([data-testid*="print"]),
          [class*="nav"],
          [class*="menu"]:not([class*="print"]),
          [class*="sidebar"],
          [class*="header"]:not([class*="document"]):not([class*="bill"]):not([class*="hbl"]):not([class*="receipt"]),
          [class*="footer"]:not([class*="document"]):not([class*="bill"]):not([class*="hbl"]):not([class*="receipt"]),
          [class*="toolbar"],
          [class*="action"],
          [class*="control"],
          [class*="button"]:not([class*="print"]),
          [class*="tab"],
          [class*="breadcrumb"],
          [class*="dashboard"]:not([class*="receipt"]):not([class*="invoice"]),
          .bg-sidebar,
          .bg-navigation,
          .main-nav,
          .side-nav,
          .top-nav,
          .app-header,
          .app-sidebar,
          .layout-header,
          .layout-sidebar,
          .page-header:not(.document-header):not(.receipt-header),
          .page-nav,
          .content-header:not(.document-header):not(.receipt-header),
          .layout-container,
          .layout-wrapper,
          .app-layout,
          [data-radix-portal],
          .dialog-overlay,
          .dialog-content > div:first-child:not(.receipt-content):not(.hbl-content),
          .lovable-app-sidebar,
          .app-container > aside,
          .app-container > nav,
          .print-dialog-actions,
          .system-admin-info,
          .logout-section,
          .url-display,
          .browser-chrome,
          .print-options,
          .print-controls,
          /* Tunisia specific navigation elements */
          .tunisia-dashboard-nav,
          .tunisia-sidebar,
          .tunisia-header,
          .tunisia-top-bar,
          .tunisia-navigation,
          .app-top-bar,
          .top-header,
          /* Generic layout elements that should be hidden */
          .min-h-screen > div:first-child:not([class*="receipt"]):not([class*="payment"]),
          .flex.min-h-screen > aside,
          .flex.min-h-screen > nav,
          .bg-card,
          .rounded-lg:not([class*="receipt"]):not([class*="payment"]),
          .shadow-sm:not([class*="receipt"]):not([class*="payment"]),
          /* Back buttons and navigation controls */
          [class*="back"],
          .go-back,
          .return-button,
          /* Language selectors */
          [class*="language"],
          [class*="locale"],
          .lang-selector,
          /* Logout buttons */
          [class*="logout"],
          .sign-out,
          /* Any flex containers that contain navigation */
          .flex.justify-between:has(button),
          .flex.items-center:has([class*="logout"]),
          .flex.items-center:has([class*="language"]) {
            display: none !important;
          }
          
          /* Show only printable content */
          .print\\:block {
            display: block !important;
          }
          
          .print\\:inline {
            display: inline !important;
          }
          
          .print\\:flex {
            display: flex !important;
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