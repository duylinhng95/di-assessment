import * as cheerio from 'cheerio';

export function parseTable(html: string): string[][] {
  const $ = cheerio.load(html);
  const table = $('table.wikitable').first(); // Select the first table in the document
  if (!table.length) throw new Error('No table found on the page.');

  const rows: string[][] = [];
  table.find('tr').each((_, row) => {
    const cells = $(row)
      .find('th, td')
      .map((_, cell) => $(cell).text().trim())
      .get();
    rows.push(cells);
  });

  return rows;
}
