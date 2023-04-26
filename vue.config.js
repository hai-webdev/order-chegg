module.exports = {
  assetsDir: "static-vue",
  devServer: {
    proxy: {
      "/api.php": {
        target: "https://chegg88.com/",
      },
      "res": {
        target: "https://chegg88.com/",
      },
      // "/get_body": {
      //   target: "http://8.218.76.10:8080/",
      // },
    },
  },
};
