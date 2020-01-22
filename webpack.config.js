const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const worksDir = 'works';
const works = fs
  .readdirSync(path.resolve(__dirname, worksDir))
  .filter(name => {
    try {
      fs.accessSync(path.resolve(__dirname, worksDir, name, 'work.json'));
    } catch {
      return false;
    }
    return true;
  })
  .map(name => ({
    ...require(path.resolve(__dirname, worksDir, name, 'work.json')),
    ...{
      name,
      pageSrc: path.join(worksDir, name),
      thumbnailSrc: path.join(worksDir, name, 'thumbnail.png'),
    },
  }));

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnError: true,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, worksDir)],
        use: [
          {
            loader: 'file-loader?name=[path][name].[ext]',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, worksDir),
        to: path.resolve(__dirname, 'dist', 'works'),
      },
    ]),
    new webpack.DefinePlugin({
      WORKS: JSON.stringify(works),
    }),
  ],
};
