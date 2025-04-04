
import * as XLSX from 'xlsx';

// Generate an Excel worksheet from data
export const generateExcelWorksheet = (data: any[], headers: string[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Add header styling and column widths
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  
  // Create column width configuration
  const columnWidths = headers.map((header) => ({
    wch: Math.max(header.length, 10)
  }));
  
  worksheet['!cols'] = columnWidths;
  
  return worksheet;
};

// Add header row with styling to a worksheet
export const addStyledHeader = (worksheet: XLSX.WorkSheet, headers: string[]) => {
  // Create header cells with styling
  headers.forEach((header, idx) => {
    const cell = XLSX.utils.encode_cell({ r: 0, c: idx });
    if (!worksheet[cell]) worksheet[cell] = { v: header };
    worksheet[cell].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "CCCCCC" } }
    };
  });
  
  return worksheet;
};
