const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");

module.exports = {
  devtool: 'inline-source-map',
  mode:  'development',
  entry: './src/index.tsx',
  output: {
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    chunkFilename: "static/js/[name].chunk.js",
  },
  devServer: {
    port: 3000,
    hot: true
    // open: true
  },
  resolve: {
    alias: {
      "components" : path.resolve(__dirname, 'src/components/'),
      "store" : path.resolve(__dirname, 'src/store/'),
      "pages" : path.resolve(__dirname, 'src/pages/'),
      "sass" : path.resolve(__dirname, 'src/sass'),
      "@app" : path.resolve(__dirname, 'src/'),
      "asserts" : path.resolve(__dirname, 'src/asserts/')
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  stats: {
    preset: 'minimal',
    moduleTrace: true,
    errorDetails: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      // {
      //   test: /\.m?js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader"
      //   }
      // }
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg||woff2||woff||less||ttf||eot)$/,
        loader: "file-loader",
        options: {
          name: "static/fonts/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'static/images/[name].[ext]',
        },
      }
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
  
 
};