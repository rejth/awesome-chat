const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  const mode = process.env.NODE_ENV || 'development';
  const fileEnv = dotenv.config().parsed;

  const target = mode === 'development' ? 'web' : 'browserslist';
  const devtool = mode === 'development' ? 'inline-source-map' : 'source-map';

  const envKeys = Object
    .keys(fileEnv)
    .reduce((envs, key) => {
      envs[`process.env.${key}`] = JSON.stringify(fileEnv[key]);
      return envs;
    }, {});

  return {
    mode,
    target,
    devtool,

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
      new webpack.DefinePlugin(envKeys),
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
};
