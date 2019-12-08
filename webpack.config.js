const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const loaderUtils = require('loader-utils');

const paths = {
  build: path.resolve(__dirname, 'build'),
  public: path.resolve(__dirname, 'public'),
  src: path.resolve(__dirname, 'src'),
};

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  mode: isProd ? 'production' : isDev && 'development',
  bail: isProd, // Stop compilation early in production
  entry: {
    index: path.resolve(paths.src, 'index.js'),
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : undefined,
  resolve: {
    alias: {
      src: paths.src,
    },
  },
  output: {
    path: paths.build,
    filename: '[name].[hash:8].js',
  },
  devServer: {
    // hot: true // enable hot module reloading (HMR)
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  module: {
    rules: [
      // css styles
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 1,
              modules: {
                getLocalIdent: function(
                  context,
                  localIdentName,
                  localName,
                  options
                ) {
                  // taken from react-dev-utils/getCSSModuleLocalIdent.js
                  /**
                   * Copyright (c) 2015-present, Facebook, Inc.
                   *
                   * This source code is licensed under the MIT license found in the
                   * LICENSE file in the root directory of this source tree.
                   */
                  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
                  const fileNameOrFolder = context.resourcePath.match(
                    /index\.module\.(css|scss|sass)$/
                  )
                    ? '[folder]'
                    : '[name]';
                  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
                  const hash = loaderUtils.getHashDigest(
                    path.posix.relative(
                      context.rootContext,
                      context.resourcePath
                    ) + localName,
                    'md5',
                    'base64',
                    5
                  );
                  // Use loaderUtils to find the file or folder name
                  const className = loaderUtils.interpolateName(
                    context,
                    fileNameOrFolder + '_' + localName + '__' + hash,
                    options
                  );
                  // remove the .module that appears in every classname when based on the file.
                  return className.replace('.module_', '_');
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      // images
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          // images smaller than 10kiB will be data urls otherwise they'll be URLs to files
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      // data
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
    ],
  },

  plugins: [
    // production-only plugins
    ...(isProd ? [new CleanWebpackPlugin()] : []),

    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(paths.public, 'index.html'),
      ...(isProd
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : {}),
    }),

    new CopyPlugin([
      { from: paths.public, to: paths.build, ignore: ['index.html'] },
    ]),
  ],

  // don't use node modules in browser even if libraries want them (provide empty mocks)
  node: {
    child_process: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    module: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
