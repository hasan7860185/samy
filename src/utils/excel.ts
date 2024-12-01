import { read, utils } from 'xlsx';
import { Client } from '../types';

export async function parseExcelFile(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to array of arrays and filter out empty rows
        const rows = utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
        const filteredRows = rows.filter(row => row.some(cell => cell));
        
        resolve(filteredRows);
      } catch (error) {
        reject(new Error('Failed to parse Excel file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });
}

export function validateExcelData(data: string[][]): boolean {
  if (data.length < 2) { // At least header row and one data row
    return false;
  }

  // Check if required columns exist
  const headers = data[0].map(h => h.toLowerCase().trim());
  const requiredColumns = ['name', 'phone'];
  
  return requiredColumns.every(col => 
    headers.some(header => header.includes(col))
  );
}