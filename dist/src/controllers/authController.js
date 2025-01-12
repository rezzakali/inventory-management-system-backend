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
exports.signinController = exports.signupController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catch_errors_1 = require("../common/utils/catch-errors");
const logger_1 = require("../common/utils/logger");
const app_config_1 = require("../config/app.config");
const http_config_1 = require("../config/http.config");
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const userModel_1 = __importDefault(require("../models/userModel"));
// signup controller
exports.signupController = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info(`Signup attempt from IP: ${req.ip}, Username: ${req.body.username}`);
    const { username, password } = req.body;
    // check if user already exists in the database
    const user = yield userModel_1.default.findOne({ username });
    if (user) {
        throw new catch_errors_1.BadRequestException('User already exists with this email', "AUTH_EMAIL_ALREADY_EXISTS" /* ErrorCode.AUTH_EMAIL_ALREADY_EXISTS */);
    }
    //   hashed password
    const hashedPassword = bcryptjs_1.default.hashSync(password, Number(app_config_1.config.SALT_ROUND));
    const newUser = new userModel_1.default(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
    // finally save to database
    yield newUser.save();
    // send response
    res.status(http_config_1.HTTPSTATUS.CREATED).json({
        success: true,
        message: 'Thank you for registering!',
    });
}));
// signin controller
exports.signinController = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure email and password from request body
    const { email, password } = req.body;
    // check user with the email
    const user = yield userModel_1.default.findOne({ email });
    // if no user
    if (!user) {
        throw new catch_errors_1.BadRequestException('Invalid credentials', "AUTH_NOT_FOUND" /* ErrorCode.AUTH_NOT_FOUND */);
    }
    // compare the password
    const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
    // if the password is invalid
    if (!isValidPassword) {
        throw new catch_errors_1.BadRequestException('Invalid credentials', "AUTH_NOT_FOUND" /* ErrorCode.AUTH_NOT_FOUND */);
    }
    // generate a jwt token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, app_config_1.config.JWT.SECRET, {
        expiresIn: app_config_1.config.JWT.EXPIRES_IN, // 30 days
    });
    const COOKIE_EXPIRATION = parseInt(app_config_1.config.COOKIE_EXPIRATION || '30', 10) * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    // Set the token as a cookie
    res.cookie('token', token, {
        httpOnly: app_config_1.config.NODE_ENV === 'production' ? true : false, // Makes the cookie inaccessible to JavaScript on the client side
        secure: app_config_1.config.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: app_config_1.config.NODE_ENV === 'production' ? 'strict' : 'none', // Prevents cross-site request forgery (CSRF)
        maxAge: COOKIE_EXPIRATION, // Cookie expiry in milliseconds (30d)
    });
    // return response
    res.status(http_config_1.HTTPSTATUS.OK).json({
        success: true,
        message: 'Welcome back to your account.',
    });
}));
// Password-change
// export const passwordChange = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, oldPassword, newPassword } = req.body;
//     // check user with the email
//     const user = await User.findOne({ email });
//     // if no user
//     if (!user) {
//       return next(new ErrorResponse('Invalid credentials', 404));
//     }
//     // Check if the current password is correct
//     const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
//     if (!isPasswordValid) {
//       return next(new ErrorResponse('Incorrect old password', 401));
//     }
//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     // udpate the password
//     user.password = hashedPassword;
//     await user.save();
//     return res.status(200).json({
//       success: true,
//       message: 'Password changed successfully!',
//     });
//   } catch (error) {
//     return next(new ErrorResponse(error?.message, 500));
//   }
// };
