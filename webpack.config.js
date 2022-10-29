const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.production === "true" ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[hash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
};
