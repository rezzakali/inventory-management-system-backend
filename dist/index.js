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
const app_1 = __importDefault(require("./src/app"));
const app_config_1 = require("./src/config/app.config");
const database_config_1 = __importDefault(require("./src/config/database.config"));
app_1.default.listen(app_config_1.config.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server listening on port ${app_config_1.config.PORT} in ${app_config_1.config.NODE_ENV}`);
    yield (0, database_config_1.default)();
}));