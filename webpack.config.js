const path = require('path');
const webpack = require('webpack');

const config = {
  context: __dirname
};

config.entry = [
  'babel-polyfill',
  path.join(__dirname, 'src', 'js', 'main.js'),
  // 'webpack/hot/dev-server', path.resolve(__dirname, 'src', 'js', 'main.js')
];

config.module = {
  loaders: [
    {
      loader:  'babel-loader',
      test:    /\.jsx?$/,
      query: {
        presets: ['react', 'es2015', 'stage-0']
      },
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: 'css-loader'
    },
    {
      test: /\.svg$/,
      loader: 'react-svg',
      query: {
        es5: true,
        svgo: {
          plugins: [{removeTitle: false}],
          floatPrecision: 2
        }
      }
    }
  ]
};

config.output = {
  filename: '[name].bundle.js',
  chunkFilename: '[id].chunk.js',
  path: path.join(__dirname, 'static', 'js'),
  publicPath: '/static/js',
  devtoolModuleFilenameTemplate: '[resourcePath]',
  devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
};

config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

config.resolve = {
  extensions: [
    '',
    '.js',
    '.jsx',
    '.css',
    '.svg'
  ],
  modulesDirectories: [
    './src/js',
    './node_modules/'
  ]
};

module.exports = config;
