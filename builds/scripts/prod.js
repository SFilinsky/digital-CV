const { spawn} = require('node:child_process');

process.env.NODE_ENV = 'production';

module.exports = (variant) => {

  // webpack --config=builds/webpack/prod.config.js

  // Spawning webpack serve process
  const webpackServeProcess = spawn('npx', ['webpack', '--config', './builds/webpack/prod.config.js', '--env', `variant=${variant}`], { shell: true });

  webpackServeProcess.stdout.on('data', (data) => {
    console.log(`Webpack serve output: ${data}`);
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
  }

}
