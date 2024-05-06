export const ENV = () => ({
  SERVER_PORT: +process.env.SERVER_PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
});
