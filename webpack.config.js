const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const bundleName = 'moochr';
module.exports = {
    watch: true,
    watchOptions: {
        ignored: "node_modules"
    },
    entry: ['./src/index.js', './src/styles/index.css'],
    optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true
            }
          }
        }
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: `javascripts/${bundleName}.bundle.js`
    },
    resolve: {
        alias: {
            'vue$' : 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
              },
              // other vue-loader options go here
              optimizeSSR: false // Set to false to avoid a issue caused by target set to node.
            }
          },
          {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader']
          }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `stylesheets/${bundleName}.bundle.css`,
        }),
        new CleanWebpackPlugin('public',{
            exclude: ['index.html']
        })
    ]
};