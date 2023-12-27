/*
 * This is common build file for dev and prod.
 *
 * It shouldn't be used directly, only as part of `dev` or `prod` build.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = async (env) => {

  const variantName = env.variant;

  console.log("Dev mode:", isDevelopment);
  console.log(`Used Variant: ${variantName}`);

  return {
    entry: `./src/variants/${variantName}/index.ts`,
    output: {
      path: path.resolve('./dist'),
      filename: 'index.js',
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
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: isDevelopment
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
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
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: isDevelopment
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            },
          ],
        },

        {
          test: /\.(woff(2)?|ttf|eot)$/,
          type: 'asset/resource',
        },

        {
          test: /\.svg$/,
          type: 'asset/resource',
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.ttf', '.svg']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `./src/variants/${variantName}/index.html`,
        filename: `index.html`,
        scriptLoading: 'blocking',
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      })
    ],
  };
}
