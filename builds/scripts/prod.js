const webpack = require('webpack');
const prodConfig = require('../webpack/prod.config.js');

module.exports = (variant) => {

  process.env.NODE_ENV = 'production';
  process.env.variant = variant

  const compiler = webpack(prodConfig(process.env));

  compiler.run((err, status) => {});
}
