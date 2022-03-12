const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  target: mode === 'development' ? 'web' : 'browserslist',
  devtool: mode === 'development' ? 'inline-source-map' : 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },

  devServer: {
    compress: true,
    port: 8090,
    host: '0.0.0.0',
    hot: true,
    open: true,
    historyApiFallback: true,
  },

  plugins: [
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      // js
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },

      // sass/sccs
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
