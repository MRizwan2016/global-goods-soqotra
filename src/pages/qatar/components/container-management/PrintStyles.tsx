
import React from "react";

const PrintStyles: React.FC = () => {
  const globalStyles = `
    @media print {
      body.print-only-manifest {
        background-color: white !important;
      }
      
      body.print-only-manifest nav,
      body.print-only-manifest header,
      body.print-only-manifest footer,
      body.print-only-manifest .no-print {
        display: none !important;
      }
      
      body.print-only-manifest .print-container {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      @page {
        margin: 15mm;
        border: 1px solid #ddd;
      }
      
      .page-break-before {
        page-break-before: always;
      }
      
      table {
        border-collapse: collapse;
        width: 100%;
      }
      
      table, th, td {
        border: 1px solid #ddd !important;
      }
      
      th, td {
        padding: 8px;
        text-align: left;
      }
    }
  `;

  return <style>{globalStyles}</style>;
};

export default PrintStyles;
