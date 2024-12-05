export function findNumericColumn(data: string[][]): number[] {
  for (let col = 0; col < data[0].length; col++) {
    const column = data
      .slice(1) // Skip header
      .map(row => parseFloat(row[col]))
      .filter(val => !isNaN(val));
    if (column.length > 0) return column;
  }
  throw new Error('No numeric column found in the table.');
}
