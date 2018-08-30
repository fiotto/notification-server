const path = require('path');
const VueLoader = require('vue-loader');
const webpack = require('webpack');

module.exports = {
//  mode: 'development',
//  mode: 'production',

  entry: {
    'host' : path.join(__dirname, '/src/host/host.js'),
    'guest' : path.join(__dirname, '/src/guest/guest.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public/js')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: 'url-loader'
      },
    ]
	},
  plugins: [
    new VueLoader.VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js',
    }
  },
};
