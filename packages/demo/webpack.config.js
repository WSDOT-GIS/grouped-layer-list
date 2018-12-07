// const webpack = require('webpack');
const path = require('path');

const appNames = [
  "load-from-webmap-app",
  "no-webmap-app"
];

const configs = appNames.map(appName => {
  const config = {
    entry: `./src/${appName}/main.ts`,
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, 'dist', appName),
      filename: 'main.js',
      libraryTarget: "amd"
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js'
      ]
    },
    externals: /^(esri)|(dijit)/i
  }
  return config;
});

module.exports = configs;