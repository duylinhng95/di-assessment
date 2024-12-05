import axios from 'axios';

export async function fetchHtml(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}
