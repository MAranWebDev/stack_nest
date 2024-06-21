export const ENV = () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  SERVER_PORT: +process.env.SERVER_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
});
