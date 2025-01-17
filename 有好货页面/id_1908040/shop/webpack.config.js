const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = { 
  entry: "./index.js",
  mode: "development",
  devServer: {
    contentBase: "./dist",
    host: '0.0.0.0',
    hot: true
  },
  optimization: {
      minimize: false
  },
  module: {
    rules: [
　　　　{
　　　　　　test: /\.(png|jpg)$/,
　　　　　　loader: 'url-loader?limit=8192'
　　　　},
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-syntax-jsx',
              ['@babel/plugin-transform-react-jsx', {pragma:"create"}]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {template: "index.html"}
    ),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
}
