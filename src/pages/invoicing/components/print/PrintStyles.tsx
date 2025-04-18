
const PrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
          }
          .print-container {
            padding: 0 !important;
            background: white !important;
          }
          .print-content {
            padding: 0 !important;
          }
          .print:hidden {
            display: none !important;
          }
          #print-invoice-content {
            box-shadow: none !important;
            max-width: none !important;
          }
        }
      `}
    </style>
  );
};

export default PrintStyles;
