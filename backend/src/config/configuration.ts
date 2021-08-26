export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_PORT: Number(process.env.SERVER_PORT || 3001),

  // Redis Web socket client config
  REDIS_WEB_HOST: process.env.REDIS_WEB_HOST || 'localhost',
  REDIS_WEB_PORT: Number(process.env.REDIS_WEB_PORT || 6379),
  REDIS_WEB_PASS: process.env.REDIS_WEB_PASS,
  REDIS_WEB_FAMILY: Number(process.env.REDIS_WEB_FAMILY || 4),
  REDIS_WEB_DB: Number(process.env.REDIS_WEB_DB || 1),

  WEB3_ECOMMERCE_CONTRACT_ADDRESS: process.env.WEB3_ECOMMERCE_CONTRACT_ADDRESS
});
