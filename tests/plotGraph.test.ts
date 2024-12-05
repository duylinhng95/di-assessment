import {plotGraphWithPuppeteer} from '../src/plotGraph';
import fs from 'fs';

jest.mock('fs');
jest.mock('puppeteer', () => {
  return {
    launch: jest.fn(() => ({
      newPage: jest.fn(() => ({
        setContent: jest.fn(),
        waitForSelector: jest.fn(),
        $: jest.fn(() => ({
          screenshot: jest.fn(({path}) => {
            fs.writeFileSync(path, 'fake_image_content');
          }),
        })),
        close: jest.fn(),
      })),
      close: jest.fn(),
    })),
  };
});

describe('plotGraphWithPuppeteer', () => {
  it('should generate a graph image and save it', async () => {
    const values = [10, 20, 30];
    const outputPath = 'output.png';

    await plotGraphWithPuppeteer(values, outputPath);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      outputPath,
      'fake_image_content',
    );
  });
});
