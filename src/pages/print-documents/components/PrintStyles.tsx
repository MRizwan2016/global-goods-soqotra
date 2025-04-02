
import React from "react";

const PrintStyles: React.FC = () => {
  return (
    <style type="text/css" media="print">
      {`
        @page {
          size: A4 portrait;
          margin: 5mm; /* Reduced from 10mm to 5mm for narrower margins */
        }
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .print\\:hidden {
          display: none !important;
        }
        
        /* Optimize print size for A4 paper */
        .house-bill-of-lading {
          width: 100% !important;
          max-width: 210mm !important;
          padding: 5mm !important;
          margin: 0 !important;
          box-sizing: border-box;
          font-size: 11px !important;
          zoom: 0.9 !important;
        }

        /* Make sure tables can expand properly */
        table {
          width: 100%;
          table-layout: fixed;
        }

        /* Make cargo description area larger */
        .cargo-description {
          min-height: 150px !important;
        }
        
        /* Ensure all content is visible */
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
          max-height: 2.5cm !important;
        }
        
        /* Allow text to wrap properly in all cells */
        td, th {
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          white-space: normal !important;
          padding: 4px !important;
        }
        
        /* Fix for whitespace pre-line formatting */
        .whitespace-pre-line {
          white-space: pre-line !important;
          overflow: visible !important;
        }
        
        /* Reduce vertical spacing to fit all content on one page */
        .house-bill-of-lading .mb-4, 
        .house-bill-of-lading .mb-6 {
          margin-bottom: 0.5rem !important;
        }
        
        .house-bill-of-lading .p-3,
        .house-bill-of-lading .p-4,
        .house-bill-of-lading .p-8 {
          padding: 0.5rem !important;
        }
        
        /* Ensure the entire BL fits on one page */
        .house-bill-of-lading-document {
          page-break-inside: avoid !important;
          page-break-after: always !important;
          page-break-before: auto !important;
        }
      `}
    </style>
  );
};

export default PrintStyles;
