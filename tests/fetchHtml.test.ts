import {fetchHtml} from '../src/fetchHtml';
import axios from 'axios';

jest.mock('axios');

describe('fetchHtml', () => {
  it('should fetch HTML from a URL', async () => {
    const mockHtml = '<html><body><h1>Test</h1></body></html>';
    (axios.get as jest.Mock).mockResolvedValue({data: mockHtml});

    const html = await fetchHtml('https://example.com');
    expect(html).toBe(mockHtml);
    expect(axios.get).toHaveBeenCalledWith('https://example.com');
  });

  it('should throw an error if the request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchHtml('https://example.com')).rejects.toThrow(
      'Network error',
    );
  });
});
