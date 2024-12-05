import * as fetchHtmlModule from '../src/fetchHtml';
import * as parseTableModule from '../src/parseTable';
import * as findNumericColumnModule from '../src/findNumericColumn';
import * as plotGraphModule from '../src/plotGraph';
import * as app from '../src/app';

jest.mock('../src/fetchHtml');
jest.mock('../src/parseTable');
jest.mock('../src/findNumericColumn');
jest.mock('../src/plotGraph');

const url =
  'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression';

describe('App Integration Test', () => {
  const mockHtml = '<html><body><table></table></body></html>';
  const mockTableData = [
    ['Year', 'Height'],
    ['1960', '1.80'],
    ['1964', '1.82'],
    ['1968', '1.85'],
  ];
  const mockNumericColumn = [1.8, 1.82, 1.85];
  const mockOutputPath = 'output.png';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should process the input URL and save the chart image successfully', async () => {
    // Mock module implementations
    (fetchHtmlModule.fetchHtml as jest.Mock).mockResolvedValue(mockHtml);
    (parseTableModule.parseTable as jest.Mock).mockReturnValue(mockTableData);
    (findNumericColumnModule.findNumericColumn as jest.Mock).mockReturnValue(
      mockNumericColumn,
    );
    (plotGraphModule.plotGraphWithPuppeteer as jest.Mock).mockResolvedValue(
      undefined,
    );

    // Run the app
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    await app.main(url);

    // Assertions
    expect(fetchHtmlModule.fetchHtml).toHaveBeenCalledWith(url);
    expect(parseTableModule.parseTable).toHaveBeenCalledWith(mockHtml);
    expect(findNumericColumnModule.findNumericColumn).toHaveBeenCalledWith(
      mockTableData,
    );
    expect(plotGraphModule.plotGraphWithPuppeteer).toHaveBeenCalledWith(
      mockNumericColumn,
      mockOutputPath,
    );
    expect(consoleSpy).toHaveBeenCalledWith(`Graph saved to ${mockOutputPath}`);

    consoleSpy.mockRestore();
  });

  it('should handle errors during the HTML fetch step', async () => {
    (fetchHtmlModule.fetchHtml as jest.Mock).mockRejectedValue(
      new Error('Network error'),
    );

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(app.main(url)).resolves.toBeUndefined(); // The app shouldn't throw
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error:',
      new Error('Network error'),
    );

    consoleSpy.mockRestore();
  });

  it('should handle errors during the table parsing step', async () => {
    (fetchHtmlModule.fetchHtml as jest.Mock).mockResolvedValue(mockHtml);
    (parseTableModule.parseTable as jest.Mock).mockImplementation(() => {
      throw new Error('No table found');
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(app.main(url)).resolves.toBeUndefined(); // The app shouldn't throw
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error:',
      new Error('No table found'),
    );

    consoleSpy.mockRestore();
  });

  it('should handle errors during numeric column identification', async () => {
    (fetchHtmlModule.fetchHtml as jest.Mock).mockResolvedValue(mockHtml);
    (parseTableModule.parseTable as jest.Mock).mockReturnValue(mockTableData);
    (findNumericColumnModule.findNumericColumn as jest.Mock).mockImplementation(
      () => {
        throw new Error('No numeric column found');
      },
    );

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(app.main(url)).resolves.toBeUndefined(); // The app shouldn't throw
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error:',
      new Error('No numeric column found'),
    );

    consoleSpy.mockRestore();
  });

  it('should handle errors during chart plotting', async () => {
    (fetchHtmlModule.fetchHtml as jest.Mock).mockResolvedValue(mockHtml);
    (parseTableModule.parseTable as jest.Mock).mockReturnValue(mockTableData);
    (findNumericColumnModule.findNumericColumn as jest.Mock).mockReturnValue(
      mockNumericColumn,
    );
    (plotGraphModule.plotGraphWithPuppeteer as jest.Mock).mockRejectedValue(
      new Error('Failed to plot graph'),
    );

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(app.main(url)).resolves.toBeUndefined(); // The app shouldn't throw
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error:',
      new Error('Failed to plot graph'),
    );

    consoleSpy.mockRestore();
  });
});
