const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'todo.bundle.js'
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
        ]
    }
};