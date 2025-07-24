
const PrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            background: white !important;
            font-size: 10pt !important;
          }
          .print-container {
            padding: 0 !important;
            background: white !important;
            max-width: 100% !important;
            height: 100% !important;
          }
          .print-content {
            padding: 0 !important;
            page-break-inside: avoid;
          }
          .no-print {
            display: none !important;
          }
          #print-invoice-content, #eritrea-invoice-print {
            box-shadow: none !important;
            max-width: none !important;
            transform: scale(0.9);
            transform-origin: top left;
          }
          .break-after {
            page-break-after: always;
          }
          .break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
