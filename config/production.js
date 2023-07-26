const prod = {
  DEPLOY_HOST_URL: process.env.DEPLOY_HOST_URL,
  PORT: process.env.PORT || 1338,
  DB_URL: process.env.DB_URL,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
}

module.exports = prod
