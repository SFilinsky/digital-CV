/*
 * This is build file for development.
 *
 * It's simultaneously doing build and PDF render for using it directly.
 */

const { merge } = require('webpack-merge');
const path = require('path');

const buildConfig = require('./common.config');

module.exports = merge(buildConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'dist'),
    },
    compress: true,
    port: 8080, // You can specify another port if you want
  },
});
