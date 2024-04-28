const path = require('node:path')
const process = require('node:process')
const portfinder = require('portfinder')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')

const webpackBaseConfig = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    port: 3333,
    hot: true,
    open: true,
    host: 'localhost',
    compress: true,
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
          'sass-loader',
        ],
      },
    ],

  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },

}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = webpackBaseConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    }
    else {
      process.env.PORT = port
      webpackBaseConfig.devServer.port = port
      webpackBaseConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
                        `Your application is running here: http://${webpackBaseConfig.devServer.host}:${port}`,
          ],
          notes: [],
        },
        clearConsole: true,
      }))
      resolve(webpackBaseConfig)
    }
  })
})
