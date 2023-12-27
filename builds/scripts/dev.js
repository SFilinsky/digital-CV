const { spawn} = require('node:child_process');
const path = require('path');

process.env.NODE_ENV = 'development';

let generatePDFProcess;

module.exports = (variant) => {

  function generatePDF() {
    console.log("Running PDF generation.");
    generatePDFProcess = spawn('node', [path.join(process.cwd(), './builds/puppeteer/generate-pdf.js')]);

    generatePDFProcess.stdout.on('data', (data) => {
      console.log(`generate-pdf.js output: ${data}`);
    });

    generatePDFProcess.stderr.on('data', (data) => {
      console.error(`generate-pdf.js error: ${data}`);
    });

    generatePDFProcess.on('close', (code) => {
      if (code === 0) {
        console.log("PDF generation run was successful.");
      } else {
        console.log(`generate-pdf.js process exited with code ${code}`);
      }
      generatePDFProcess = null;
    });
  }

  // This function is needed since colored Webpack output doesn't allow to detect successful compilation
  function stripAnsiColors(str) {
    return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PR-Za-z]/g, '');
  }

  // Spawning webpack serve process
  const webpackServeProcess = spawn('npx', ['webpack', 'serve', '--config', './builds/webpack/dev.config.js', '--env', `variant=${variant}`], { shell: true });

  webpackServeProcess.stdout.on('data', (data) => {
    console.log(`Webpack serve output: ${data}`);

    if (stripAnsiColors(data.toString()).includes('compiled successfully')) {
      generatePDF();
    }
  });

  webpackServeProcess.stderr.on('data', (data) => {
    console.error(`Webpack serve error: ${data}`);
  });

  webpackServeProcess.on('error', (error) => {
    console.log('Failed to run webpack.');
    console.log(error.stack)
  });

  webpackServeProcess.on('close', (code) => {
    console.log(`Webpack serve process exited with code ${code}`);
  });

  function cleanProcesses() {
    if (webpackServeProcess) {
      webpackServeProcess.kill();
    }
    if (generatePDFProcess) {
      generatePDFProcess.kill();
    }
  }

  process.on('SIGINT', () => {
    console.log('Shutting down...');
    cleanProcesses();
    process.exit();
  });

  process.on('SIGTERM', () => {
    cleanProcesses();
    process.exit();
  });

}
