if (process.env.NODE_ENV === "development") {
  module.exports = {
    apps: [
      {
        name: "groupomania-api",
        cwd: "./api",
        script: "NODE_ENV=production node index.js",
        watch: false,
        time: false,
        log_file: "var/log/api.log"
      },
      {
        name: "groupomania-front-dev",
        cwd: "./",
        script: "npm run serve",
        watch: false,
        time: false,
        log_file: "var/log/front_dev.log"
      }
    ]
  };
}
