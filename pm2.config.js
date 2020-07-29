module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./",
      script: "npm run serve",
      watch: false,
      log_file: "pm2_frontend.log",
      time: false,
    },
    {
      name: "api",
      cwd: "./api",
      script: "npm run dev",
      watch: false,
      log_file: "pm2_api.log",
      time: false,
    },
  ],
};
