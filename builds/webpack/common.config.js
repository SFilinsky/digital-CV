/*
 * This is common build file for dev and prod.
 *
 * It shouldn't be used directly, only as part of `dev` or `prod` build.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },

      /*
        CSS/SCSS Modules
       */
      {
        test: /\.module\.(scss|css)$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-modules-typescript-loader",
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          },
        ],
      },

      /*
        Plain CSS/SCSS
       */
      {
        test: /\.(scss|css)$/,
        exclude: /\.module\.(scss|css)$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ],
};
