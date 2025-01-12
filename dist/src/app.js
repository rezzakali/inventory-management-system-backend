"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app_config_1 = require("./config/app.config");
const errorHandler_1 = require("./middleware/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const BASE_PATH = app_config_1.config.BASE_PATH;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: app_config_1.config.APP_ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(`${BASE_PATH}/auth`, authRoutes_1.default);
app.use(errorHandler_1.errorHandler);
// default error
app.use((_err, req, res, next) => {
    if (res.headersSent) {
        return next();
    }
    res.status(500).json({ error: 'There was a server side error!' });
});
exports.default = app;
