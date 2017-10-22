const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "client", "index.js"),
  output: {
    filename: path.join("client", "dist", "app.js")
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015"]
      }
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        use: ["css-loader", "sass-loader"]
      })
    }]
  },
  resolve: {
    modules: [__dirname + "/node_modules"]
  },
  plugins: [
    new ExtractTextPlugin(path.join("client", "dist", "style.css")),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor.js",
      filename: path.join("client", "dist", "vendor.js"),
      minChunks(module, count) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
  ]
};
