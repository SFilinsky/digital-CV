/*
 * This is production build for project.
 *
 * It's simultaneously doing build and PDF render for hosting online.
 */

const { merge } = require('webpack-merge');

const buildConfig = require('./common.config');
const path = require("path");

module.exports = async (env) => {
  return merge(
    await buildConfig(env),
    {
      mode: 'production',
      output: {
        path: path.resolve('./docs'),
        clean: true
      }
    }
  );
}
