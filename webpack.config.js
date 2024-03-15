module.exports = {
  entry: "./src/js/index.ts",
  output: {
    filename: "./bundle.js",
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: "/(node_modules)/",
        use: [
          {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
