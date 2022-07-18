const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: isDev ? "development" : "production",

  devtool: isDev ? "inline-source-map" : false,

  entry: {
    page_action: "./src/page_action.tsx",
    background: "./src/background.ts",
    contents: "./src/contents.ts",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: isDev,
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2019",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebPackPlugin({
      cache: false,
      template: "./public/index.html",
      filename: "./index.html",
      chunks: ["page_action"],
    }),

    new CopyPlugin({
      patterns: [
        { from: "./public/icons", to: "images" },
        { from: "./public/manifest.json", to: "manifest.json" },
      ],
    }),
  ],
};
