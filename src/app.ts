import {fetchHtml} from './fetchHtml';
import {parseTable} from './parseTable';
import {plotGraphWithPuppeteer} from './plotGraph';
import {findNumericColumn} from './findNumericColumn';

export async function main(
  url: string,
  options?: {output: string},
): Promise<void> {
  const outputPath = options?.output ?? 'output.png';

  try {
    const html = await fetchHtml(url);
    const tableData = parseTable(html);
    const numericColumn = findNumericColumn(tableData);
    await plotGraphWithPuppeteer(numericColumn, outputPath);

    console.log(`Graph saved to ${outputPath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}
