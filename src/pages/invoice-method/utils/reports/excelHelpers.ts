
import * as XLSX from 'xlsx';

// Generate an Excel worksheet from data
export const generateExcelWorksheet = (data: any[], headers: string[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Add header styling and column widths
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  const headerRange = {
    s: { r: 0, c: 0 },
    e: { r: 0, c: range.e.c }
  };
  
  return worksheet;
};
