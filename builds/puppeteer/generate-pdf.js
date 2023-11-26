const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:8080');

  const outDir = path.join(process.cwd(), 'dist');
  const outFile = path.join(outDir, 'Siarhei Filinski CV.pdf');

  fs.mkdirSync(outDir, { recursive: true });
  fs.rmSync(outFile, { force: true });

  console.log(`Creating ${outFile}.`);

  await page.pdf({
    path: outFile,
    format: 'A4',
  });

  await browser.close();
})();
