"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_1 = require("./app.config");
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectionString = app_config_1.config.NODE_ENV === 'production'
            ? app_config_1.config.MONGO_URI_ATLAS
            : app_config_1.config.MONGO_URI;
        yield mongoose_1.default.connect(connectionString);
        console.log('Database connection established successfully!');
    }
    catch (error) {
        console.log('Database connection failed!');
        process.exit(1);
    }
});
exports.default = connectDatabase;