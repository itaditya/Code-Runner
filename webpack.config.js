const path = require("path");

module.exports = {
  entry: path.join(__dirname, "client", "index.js"),
  output: {
    filename: path.join("client", "dist", "bundle.js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  resolve: {
    modules: [__dirname + "/node_modules"]
  }
};
