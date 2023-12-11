const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require("path");

const RENDER_WIDTH = 1240;

(async () => {

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: RENDER_WIDTH,
      height: 1000 // doesn't matter
    }
  })
  const [page] = await browser.pages()

  await page.goto('http://localhost:8080');


  // To avoid PDF page breaks
  const scrollDimension = await page.evaluate(() => {
    return {
      width: document.scrollingElement.scrollWidth,
      height: document.scrollingElement .scrollHeight
    }
  });

  // await page.setViewport({
  //   width: scrollDimension.width,
  //   height: scrollDimension.height
  // });

  const outDir = path.join(process.cwd(), 'dist');
  const outFile = path.join(outDir, 'Siarhei Filinski CV.pdf');

  console.log(`Cleaning ${outFile} (if exists).`);

  fs.mkdirSync(outDir, { recursive: true });
  fs.rmSync(outFile, { force: true });

  console.log(`Creating ${outFile}.`);

  console.log(scrollDimension);

  await page.pdf({
    path: outFile,
    tagged: true,
    printBackground: true,
    width: scrollDimension.width,
    height: scrollDimension.height
  });

  const exit = await browser.close();
})();
