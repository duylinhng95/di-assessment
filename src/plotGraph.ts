import puppeteer from 'puppeteer';

export async function plotGraphWithPuppeteer(
  values: number[],
  outputPath: string,
): Promise<void> {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Chart</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            body {
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background-color: white;
            }
            canvas {
                display: block;
            }
        </style>
    </head>
    <body>
        <canvas id="chart" width="800" height="600"></canvas>
        <script>
            const ctx = document.getElementById('chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ${JSON.stringify(values.map((_, index) => `Point ${index + 1}`))},
                    datasets: [{
                        label: 'Numeric Values',
                        data: ${JSON.stringify(values)},
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            });
        </script>
    </body>
    </html>
    `;

  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content to the generated HTML
  await page.setContent(htmlContent);

  // Wait for the chart to render
  await page.waitForSelector('#chart');

  // Take a screenshot of the rendered chart
  const canvasElement = await page.$('canvas');
  if (!canvasElement) throw new Error('Canvas element not found.');
  await canvasElement.screenshot({path: outputPath});

  // Close the browser
  await browser.close();
}
