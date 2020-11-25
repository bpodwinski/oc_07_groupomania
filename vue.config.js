module.exports = {
  pluginOptions: {
    i18n: {
      locale: "fr",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  },
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://crios:3000"
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
