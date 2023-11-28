/*
 * This is production build for project.
 *
 * It's simultaneously doing build and PDF render for hosting online.
 */

const { merge } = require('webpack-merge');

const buildConfig = require('./common.config');

module.exports = merge(buildConfig, {
  mode: 'production'
});
