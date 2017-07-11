module.exports = (webpack) => ({
  plugins: {
    "postcss-import": {
      addDependencyTo: webpack,
      path: ["./src/styles"],
    },
    "postcss-cssnext": {
      browers: ["last 5 versions"],
    },
    "cssnano": require("cssnano")({
      presets: [
        "default",
        {
          autoprefixer: false,
          discardComments: {
            removeAll: true,
          },
          discardUnused: false,
          mergeIdents: false,
          reduceIdents: false,
          safe: true,
          sourceMap: true,
        },
      ]
    }),
    "postcss-reporter": {},
  },
})
