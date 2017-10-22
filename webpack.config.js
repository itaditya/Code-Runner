const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "client", "index.js"),
  output: {
    filename: path.join("client", "dist", "bundle.js")
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
  ]
};
