const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const sass = require('sass');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prettierOptions = require('./.prettierrc.json');

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
      pageSrc: path.join(worksDir, name, 'index.html'),
      thumbnailSrc: path.join(worksDir, name, 'thumbnail.png'),
    },
  }));

const htmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="author" content="remin" />
    <link href="index.css" rel="stylesheet" />
  </head>
  <body>
    {content}
  </body>
</html>
`;

const workFileTransformations = [
  {
    test: /\.html$/,
    async transform(contentBuffer) {
      const contentString = contentBuffer.toString();
      if (contentString.indexOf('<body') === -1) {
        return htmlTemplate.replace('{content}', contentString);
      }
      return contentString;
    },
  },
  {
    test: /\.scss$/,
    replacement: '.css',
    async transform(contentBuffer) {
      return (
        await sass.renderSync({
          data: contentBuffer.toString(),
        })
      ).css.toString();
    },
  },
];

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
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
        async transform(contentBuffer, pathString) {
          for (const transformation of workFileTransformations) {
            if (transformation.test.test(pathString)) {
              const transformedContent = await transformation.transform(
                contentBuffer,
                pathString
              );
              return prettier.format(transformedContent, {
                filepath: pathString,
                ...prettierOptions,
              });
            }
          }
          return contentBuffer;
        },
        transformPath(pathString) {
          for (const transformation of workFileTransformations) {
            if (
              transformation.replacement &&
              transformation.test.test(pathString)
            ) {
              return pathString.replace(
                transformation.test,
                transformation.replacement
              );
            }
          }
          return pathString;
        },
      },
    ]),
    new webpack.DefinePlugin({
      WORKS: JSON.stringify(works),
    }),
  ],
};
