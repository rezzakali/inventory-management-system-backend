import getEnv from '../common/utils/get-env';

const appConfig = () => ({
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  APP_ORIGIN: getEnv('APP_ORIGIN', 'localhost'),
  PORT: getEnv('PORT', '5000'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  MONGO_URI: getEnv('MONGO_URI'),
  MONGO_URI_ATLAS: getEnv('MONGO_URI_ATLAS'),
  JWT: {
    SECRET: getEnv('JWT_SECRET'),
    EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '30 days'),
  },
  SALT_ROUND: getEnv('SALT_ROUND', '10'),
  COOKIE_EXPIRATION: getEnv('COOKIE_EXPIRATION', '30'),
  // MAILER_SENDER: getEnv('MAILER_SENDER'),
  // RESEND_API_KEY: getEnv('RESEND_API_KEY'),
});

export const config = appConfig();
