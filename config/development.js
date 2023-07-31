const dev = {
  DEPLOY_HOST_URL: process.env.DEPLOY_HOST_URL,
  PORT: process.env.PORT || 1338,
  DB_URL: process.env.DB_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
}
module.exports = dev
