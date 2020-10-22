module.exports = {
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://crios:3000",
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
