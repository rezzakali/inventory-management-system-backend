"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const get_env_1 = __importDefault(require("../common/utils/get-env"));
const appConfig = () => ({
    NODE_ENV: (0, get_env_1.default)('NODE_ENV', 'development'),
    APP_ORIGIN: (0, get_env_1.default)('APP_ORIGIN', 'localhost'),
    PORT: (0, get_env_1.default)('PORT', '5000'),
    BASE_PATH: (0, get_env_1.default)('BASE_PATH', '/api/v1'),
    MONGO_URI: (0, get_env_1.default)('MONGO_URI'),
    MONGO_URI_ATLAS: (0, get_env_1.default)('MONGO_URI_ATLAS'),
    JWT: {
        SECRET: (0, get_env_1.default)('JWT_SECRET'),
        EXPIRES_IN: (0, get_env_1.default)('JWT_EXPIRES_IN', '30 days'),
    },
    SALT_ROUND: (0, get_env_1.default)('SALT_ROUND', '10'),
    COOKIE_EXPIRATION: (0, get_env_1.default)('COOKIE_EXPIRATION', '30'),
    // MAILER_SENDER: getEnv('MAILER_SENDER'),
    // RESEND_API_KEY: getEnv('RESEND_API_KEY'),
});
exports.config = appConfig();
