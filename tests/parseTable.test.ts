import {parseTable} from '../src/parseTable';

describe('parseTable', () => {
  const mockHtml = `
        <html>
            <body>
                <table class="wikitable">
                    <tr><th>Header1</th><th>Header2</th></tr>
                    <tr><td>1</td><td>2</td></tr>
                    <tr><td>3</td><td>4</td></tr>
                </table>
            </body>
        </html>
    `;

  it('should parse table data into a 2D array', () => {
    const tableData = parseTable(mockHtml);
    expect(tableData).toEqual([
      ['Header1', 'Header2'],
      ['1', '2'],
      ['3', '4'],
    ]);
  });

  it('should throw an error if no table is found', () => {
    const noTableHtml = '<html><body><p>No table here</p></body></html>';
    expect(() => parseTable(noTableHtml)).toThrow(
      'No table found on the page.',
    );
  });
});
