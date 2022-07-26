const path = require("path");
const { ProvidePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: isDev ? "development" : "production",

  devtool: isDev ? "inline-source-map" : false,

  entry: {
    background: "./src/background/index.ts",
    page_action: "./src/page_action/index.tsx",
    contents: "./src/content_scripts/index.tsx",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin()],
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
              minify: !isDev,
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

    // esbuild が auto import jsx に対応して無いので、
    // ProvidePluginを使って import 文を挿入する
    new ProvidePlugin({ React: "react" }),
  ],
};
