/*
 * This is build file for development.
 *
 * It's simultaneously doing build and PDF render for using it directly.
 */

const { merge } = require('webpack-merge');
const path = require('path');

const buildConfig = require('./common.config');

const PROJECT_ROOT = path.join(__dirname, '../../');

console.log(
  path.join(PROJECT_ROOT, 'src/**/*'),
  path.join(PROJECT_ROOT, 'builds/puppeteer/'));

module.exports = merge(buildConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(PROJECT_ROOT, 'dist'),
    },
    compress: true,
    port: 8080, // You can specify another port if you want

    watchFiles: {
      paths: [
        path.join(PROJECT_ROOT, 'src/**/*'),
        path.join(PROJECT_ROOT, 'builds/puppeteer/**/*.js')
      ]
    }
  },
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000,
  },
});
