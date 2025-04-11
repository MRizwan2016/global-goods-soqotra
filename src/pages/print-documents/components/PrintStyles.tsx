
import React from "react";

const PrintStyles: React.FC = () => {
  return (
    <style type="text/css" media="print">
      {`
        @page {
          size: A4 portrait;
          margin: 5mm; /* Reduced margin for more content space */
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
          background-color: white !important;
          width: 100% !important;
          height: auto !important;
          visibility: visible !important;
          margin: 0 !important;
          padding: 0 !important;
          font-family: Arial, sans-serif !important;
        }
        
        /* Force everything to be visible for print */
        * {
          visibility: visible !important;
        }
        
        .print\\:hidden {
          display: none !important;
        }
        
        /* Remove background colors and optimize for print */
        .house-bill-of-lading {
          width: 100% !important;
          max-width: 210mm !important;
          padding: 5mm !important;
          margin: 0 !important;
          box-sizing: border-box;
          font-size: 10px !important;
          zoom: 0.9 !important;
          background-color: white !important;
          color: black !important;
        }

        /* Remove all gradient backgrounds */
        .nav-button-gradient-upb,
        .nav-button-gradient-accounts,
        .nav-button-gradient-admin,
        .nav-button-gradient-cargo,
        .submenu-header-upb,
        .submenu-header-accounts,
        .submenu-header-admin,
        .submenu-header-cargo,
        .submenu-item-upb,
        .submenu-item-accounts,
        .submenu-item-admin,
        .submenu-item-cargo {
          background: white !important;
          background-image: none !important;
          background-color: white !important;
        }

        /* Make sure tables can expand properly */
        table {
          width: 100%;
          table-layout: fixed;
          background-color: white !important;
        }

        /* Make cargo description area taller for full content */
        .cargo-description {
          min-height: 180px !important;
        }
        
        /* Ensure all content is visible with no truncation */
        .bl-number {
          overflow: visible !important;
          white-space: normal !important;
          text-overflow: initial !important;
          max-width: 100% !important;
          word-break: break-word !important;
        }
        
        /* Make sure the logo is visible */
        .house-bill-of-lading img {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          max-height: 2cm !important;
        }
        
        /* Allow text to wrap properly in all cells */
        td, th {
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          white-space: normal !important;
          padding: 3px !important;
          background-color: white !important;
          color: black !important;
        }
        
        /* Fix for whitespace pre-line formatting */
        .whitespace-pre-line {
          white-space: pre-line !important;
          overflow: visible !important;
        }
        
        /* Reduce vertical spacing to fit all content on one page */
        .house-bill-of-lading .mb-4, 
        .house-bill-of-lading .mb-6,
        .house-bill-of-lading .mb-3,
        .house-bill-of-lading .mb-2 {
          margin-bottom: 0.25rem !important;
        }
        
        .house-bill-of-lading .p-3,
        .house-bill-of-lading .p-4,
        .house-bill-of-lading .p-8,
        .house-bill-of-lading .p-6,
        .house-bill-of-lading .p-2 {
          padding: 0.25rem !important;
        }
        
        /* Ensure the entire BL fits on one page */
        .house-bill-of-lading-document {
          page-break-inside: avoid !important;
          page-break-after: always !important;
          page-break-before: auto !important;
          background-color: white !important;
        }

        /* Ensure borders are visible in print */
        .border, .border-2, .border-black, .border-gray-400 {
          border-color: black !important;
          border-width: 1px !important;
        }

        /* Force white background and black text */
        .bg-soqotra-blue, .bg-gray-50, .bg-gradient-to-br {
          background: white !important;
          background-color: white !important;
          color: black !important;
        }

        /* Special fixes for print containers */
        .print-container, 
        .print-content, 
        #print-job-schedule-wrapper,
        #print-container-manifest {
          display: block !important;
          visibility: visible !important;
          width: 100% !important;
          overflow: visible !important;
          background-color: white !important;
          color: black !important;
        }
      `}
    </style>
  );
};

export default PrintStyles;
