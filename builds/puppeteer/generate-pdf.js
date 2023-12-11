const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require("path");

(async () => {

  const browser = await puppeteer.launch({
    headless: true
  })
  const [page] = await browser.pages()

  await page.goto('http://localhost:8080');

  // To avoid PDF page breaks
  const scrollDimension = await page.evaluate(() => {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  });
  await page.setViewport({
    width: scrollDimension.width,
    height: scrollDimension.height
  });

  const outDir = path.join(process.cwd(), 'dist');
  const outFile = path.join(outDir, 'Siarhei Filinski CV.pdf');

  console.log(`Cleaning ${outFile} (if exists).`);

  fs.mkdirSync(outDir, { recursive: true });
  fs.rmSync(outFile, { force: true });

  console.log(`Creating ${outFile}.`);

  await page.pdf({
    path: outFile,
    tagged: true,
    printBackground: true,
    width: "1240px",
    height: "3760.770px"
  });

  const exit = await browser.close();
})();
