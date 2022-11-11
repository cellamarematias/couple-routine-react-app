const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
//*@type {import('webpack).configuration}*/
module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "[name].[contenthash].js",
      publicPath: ""
    },
    module: {
        rules: [
          {
            use: "babel-loader",
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
          },
          {
            use: ["style-loader", "css-loader", "sass-loader"],
            test: /\.(css|scss|sass)$/,
          },
          {
            type: "asset",
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
          },
        ],
      },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
        favicon: "./public/heart.ico"

      }),
    ],
  };